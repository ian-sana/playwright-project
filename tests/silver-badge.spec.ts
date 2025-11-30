import { test, expect } from '@playwright/test';
import { ContactLoginPage } from '@/page-objects/contact-login.page';
import { validateSchema } from '@/utils/schema-validator';

test('create user via api', async ({ request }) => {
  const response = await request.post('https://thinking-tester-contact-list.herokuapp.com/users', {
    data: {
      email: 'sample22@example.com',
      firstName: 'sample22',
      lastName: 'test',
      password: 'sample123'
    }
  });

    expect(response.status()).toBe(201);
});

test('login user and add contact via api', async ({ request }) => {

  const userLogin = await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
    data: {
      email: 'sample22@example.com',
      password: 'sample123'
    }
  });

  expect(userLogin.status()).toBe(200);
  const userLoginBody = await userLogin.json();
  // console.log(userLoginBody);
  const token = `Bearer ${userLoginBody.token}`;

  // const addContact = await request.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
  //   data: {
  //     firstName: 'Sample123',
  //     lastName: 'Test123',
  //     email: 'Sample123@example.com'
  //   },
  //   headers: {
  //     Authorization: token
  //   }
  // });

  // expect(addContact.status()).toBe(201);
  // const addContactBody = await addContact.json();
  // const contactId = addContactBody._id;

  const contactId = '6927f8279d60af00159db5c4'; // existing contact id

  const getContacts = await request.get(`https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`, {
    headers: {
      Authorization: token
    }
  });

  await validateSchema('GET_contacts', await getContacts.json());

});

test('intercepted test', async ({ page }) => {

  let capturedRequest: any = null;
  let capturedResponse: any = null;

  // Intercept the route
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
  
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  const contactLoginPage = new ContactLoginPage(page);
  await contactLoginPage.login('sample22@example.com', 'sample123');
  await page.waitForURL(/contactList/, { timeout: 10000 });

  // Assertions on captured request
  expect(capturedRequest).not.toBeNull();
  expect(capturedRequest.method).toBe('POST');
  expect(capturedRequest.payload).toEqual({
    email: 'sample22@example.com',
    password: 'sample123'
  });

  // Assertions on captured response
  expect(capturedResponse).not.toBeNull();
  expect(capturedResponse.status).toBe(200);
  expect(capturedResponse.body).toHaveProperty('token');
  
  console.log('Captured Request:', capturedRequest);
  console.log('Captured Response:', capturedResponse);
});
