import { test, expect } from '@/fixtures/single.fixture';
import { ContactLoginPage } from '@/page-objects/herokuapp/contact-login.page';
import { ContactListPage } from '@/page-objects/herokuapp/contact-list.page';
import { LoginUserPaylod } from '@/api-objects/models/user.model';
import { CreateContactPayload } from '@/api-objects/models/contact.model';
import { validateSchema } from '@/utils/schema-validator';
import { faker } from '@faker-js/faker';


test('ui flow', async ({ page }) => {
  let capturedRequest: any = null;
  let capturedResponse: any = null;

  await test.step('Intercept the route', async () => {
    await page.route('**/users/login', async (route) => {
      const request = route.request();
      capturedRequest = {
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        payload: request.postDataJSON()
      };

      // Continue with the request
      const response = await route.fetch();
      capturedResponse = {
        status: response.status(),
        headers: response.headers(),
        body: await response.json()
      };

      // Fulfill the response
      await route.fulfill({ response });
    });
  });

  await test.step('Login to page', async () => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    const contactLoginPage = new ContactLoginPage(page);
    await contactLoginPage.login('sample22@example.com', 'sample123');
    await page.waitForURL(/contactList/, { timeout: 10000 });
  })
  
  expect(capturedRequest).not.toBeNull();
  expect(capturedRequest.method).toBe('POST');
  expect(capturedRequest.payload).toEqual({
    email: 'sample22@example.com',
    password: 'sample123'
  });

  expect(capturedResponse).not.toBeNull();
  expect(capturedResponse.status).toBe(200);
  expect(capturedResponse.body).toHaveProperty('token');
});


test('API Test', async ({ api, page, credentials }) => {
  const userPayload: LoginUserPaylod = {
    email: credentials.email,
    password: credentials.password
  };

  let token: string;
  let contactId: string;

  await test.step('Login via API', async () => {
    const loginResponse = await api.user.login(userPayload);
    expect(loginResponse.status()).toBe(200);
    
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody).toHaveProperty('token');
    await validateSchema('POST_users_login', loginResponseBody);
    
    token = `Bearer ${loginResponseBody.token}`;
  });

  let firstName: string;
  let lastName: string;

  await test.step('Create contact via API', async () => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    
    const contactPayload: CreateContactPayload = {
      firstName: firstName,
      lastName: lastName,
    };

    const createContactResponse = await api.contact.createContact(
      contactPayload, 
      { headers: { Authorization: token } }
    );
    expect(createContactResponse.status()).toBe(201);
    
    const contactResponseBody = await createContactResponse.json();
    contactId = contactResponseBody._id;
  });

  await test.step('Login via UI and verify page header is displayed', async () => {
    await page.goto('/');
    
    const contactLoginPage = new ContactLoginPage(page);
    await contactLoginPage.login(userPayload.email, userPayload.password);
    const contactListPage = new ContactListPage(page);
    await expect(contactListPage.isAtContactListPage()).toBeVisible();
  });

  await test.step('Verify created contact appears in contact list', async () => {
    const contactListPage = new ContactListPage(page);
    const contactFullName = `${firstName} ${lastName}`;
    await expect(contactListPage.getTableCellByText(contactFullName)).toBeVisible();
  });
})

test('mock test', async ({ page, credentials }) => { 

  await page.route('**/contacts', async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    // Modify the response body
    json[0].firstName = 'MockedName';
    json[0].lastName = 'MockedLastName';

    // Fulfill with the modified response
    await route.fulfill({ response, json });
    
  });

  await page.goto('/');
  const contactLoginPage = new ContactLoginPage(page);
  await contactLoginPage.login(credentials.email, credentials.password);
  const contactListPage = new ContactListPage(page);
  await expect(contactListPage.isAtContactListPage()).toBeVisible();
  const firstCell = contactListPage.getTableCellByText('MockedName');
  await expect(firstCell).toBeVisible();

});