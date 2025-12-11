import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/3cloud/home.page';
import { FinancialServicesPage } from '../page-objects/3cloud/financial-services.page';

type TestFixtures = {
    homePage: HomePage;
    financialServicesPage: FinancialServicesPage;
};

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    financialServicesPage: async ({ page }, use) => {
        await use(new FinancialServicesPage(page));
    },
});

export { expect } from '@playwright/test';