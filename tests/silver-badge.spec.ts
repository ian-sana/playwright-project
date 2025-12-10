import { test, expect } from '@/fixtures/single.fixture';
import { ContactLoginPage } from '@/page-objects/contact-login.page';
import { LoginUserPaylod } from '@/api-objects/models/user.model';

test('ui flow', async ({ page }) => {
  let capturedRequest: any = null;
  let capturedResponse: any = null;

  // Intercept the route
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
  
  console.log('Captured Request:', capturedRequest);
  console.log('Captured Response:', capturedResponse);

});


test('API Test', async ({ api }) => {
  const userPayload: LoginUserPaylod = {
    email: "sample22@example.com",
    password: "sample123"
  };

  const response = api.user.login(userPayload)
  console.log(response)
})