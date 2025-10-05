import { test, expect } from '@playwright/test';
import data from '../resources/test-data/tc1.json';
import { NavPage } from '../resources/page-objects/nav-page';

test('validate error messages pom', async ({ page }) => {
  const navPage = new NavPage(page);

  await test.step('Navigate to the 3Cloud Solutions homepage', async () => {
    await navPage.goto('/');
  });

  await test.step('Hover over the "Who We Serve" menu item in the navigation bar', async () => {
    await navPage.hoverWhoWeServe();
  });

  const financialServicesPage = await test.step('Click on the “Financial Services” link from the dropdown', async () => {
     return await navPage.clickFinancialServices();
  });

  const getStartedPage = await test.step('Click the “Let’s Talk” button on the Financial Services page', async () => {
    return await financialServicesPage.clickLetsTalkAndWaitForPopup();
  });

  await test.step('Fill the required fields', async () => {
    await getStartedPage.fillForm(
      data.firstname,
      data.lastname,
      data.company,
      data.email,
      data.jobTitle,
      data.phoneNumber,
      data.comments
    );
  });

  await test.step('Submit the form', async () => {
    await getStartedPage.submitForm();
  });

  await test.step('Validate error messages', async () => {
    await getStartedPage.verifyJobTitleErrorMessage('Please complete this required field.');
    await getStartedPage.verifyCommentsErrorMessage('Please complete this required field.');
    await getStartedPage.verifyPhoneNumberErrorErrorMessage('Please complete this required field.');
    await expect(getStartedPage.errorMsg).toBeVisible();
  });
});