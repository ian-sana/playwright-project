import { test, expect } from '@/fixtures/base.fixture';
import { LoginUserPaylod } from '@/api-objects/models/user.model';
import { CreateContactPayload } from '@/api-objects/models/contact.model';
import { validateSchema } from '@/utils/schema-validator';
import { captureNetworkCall, mockNetworkResponse } from '@/utils/network-interceptor';
import { ENDPOINTS } from '@/enums/api-endpoints';
import testData from '@/testData/silver-badge.json';

test('ui flow', async ({ page, ui, credentials }) => {
  // Arrange
  let interception: any;
  interception = captureNetworkCall(page, ENDPOINTS.LOGIN);

  // Act
  await page.goto('/');
  await ui.contactLoginPage.login(credentials.email, credentials.password);
  await expect(ui.contactListPage.getTableLocator()).toBeVisible();
  const { request, response } = await interception;
  console.log('Captured Request:: ', request);
  console.log('Captured Response:: ', response);
  
  // Assert
  expect(request).not.toBeNull();
  expect(request.method).toBe('POST');
  expect(request.payload).toEqual({
    email: credentials.email,
    password: credentials.password
  });
  expect(response).not.toBeNull();
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

test('mock test', async ({ page, ui, credentials }) => { 
  // Arrange
  await mockNetworkResponse(page, ENDPOINTS.CONTACTS,
    undefined, (json) => {
      json[0].firstName = testData.firstName;
      json[0].lastName = testData.lastName;
      return json;
    }
  );

  // Act
  await ui.contactLoginPage.goto();
  await ui.contactLoginPage.login(credentials.email, credentials.password);

  // Assert
  await expect(ui.contactListPage.getTableLocator()).toBeVisible();
  const contactFullName = `${testData.firstName} ${testData.lastName}`;
  const firstCell = ui.contactListPage.getTableCellByText(contactFullName);
  await expect(firstCell).toBeVisible();
});

test('API Test', async ({ api, ui, credentials }) => {
  // Arrange
  const userPayload: LoginUserPaylod = {
    email: credentials.email,
    password: credentials.password
  };

  const loginResponse = await api.user.login(userPayload);
  const loginResponseBody = await loginResponse.json();

  expect(loginResponse.status()).toBe(200);
  expect(loginResponseBody).toHaveProperty('token');
  await validateSchema('POST_users_login', loginResponseBody);
  const token = `Bearer ${loginResponseBody.token}`;
  
  // Act
  const contactPayload = CreateContactPayload(); 
  const createContactResponse = await api.contact.createContact(
    contactPayload, { headers: { 
      Authorization: token } });

  expect(createContactResponse.status()).toBe(201);
  const contactResponseBody = await createContactResponse.json();
  const contactId = contactResponseBody._id;

  await ui.contactLoginPage.goto();
  const contactLoginPage = ui.contactLoginPage;
  await contactLoginPage.login(userPayload.email, userPayload.password);

  // Assert
  await expect(ui.contactListPage.isAtContactListPage()).toBeVisible();
  const contactFullName = `${contactPayload.firstName} ${contactPayload.lastName}`;
  await expect(ui.contactListPage.getTableCellByText(contactFullName)).toBeVisible();
});
