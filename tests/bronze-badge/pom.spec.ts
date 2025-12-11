import { test, expect } from '@playwright/test';
import data from '@/testData/tc1.json';
import { HomePage } from '@/page-objects/3cloud/home.page';
import { FinancialServicesPage } from '@/page-objects/3cloud/financial-services.page';
import { GetStartedPage } from '@/page-objects/3cloud/get-started.page';

test.describe('3Cloud Solutions Test Suite', () => {
  let homePage: HomePage;
  let financialServicesPage: FinancialServicesPage;
  // let getStartedPage: GetStartedPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    financialServicesPage = new FinancialServicesPage(page);
    // getStartedPage = new GetStartedPage(page);
  });

  test('validate error messages', async ({ }) => {
    await homePage.goto();
    await homePage.getNavigation().hoverWhoWeServe();
    await homePage.getNavigation().clickFinancialServices();
    const getStartedPage = await financialServicesPage.clickLetsTalkAndWaitForPopup();

    await getStartedPage.fillForm(data.firstname, data.lastname, data.company,
      data.email, data.jobTitle, data.phoneNumber, data.comments
    );
    await getStartedPage.submitForm();

    await getStartedPage.verifyJobTitleErrorMessage('Please complete this required field.');
    await getStartedPage.verifyCommentsErrorMessage('Please complete this required field.');
    await getStartedPage.verifyPhoneNumberErrorErrorMessage('Please complete this required field.');
    await expect(getStartedPage.errorMsg).toBeVisible();
  });
})

