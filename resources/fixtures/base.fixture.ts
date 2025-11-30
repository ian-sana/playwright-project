import { test as base } from '@playwright/test';
import { NavPage } from '../page-objects/navigation.page';
import { FinancialServicesPage } from '../page-objects/financial-services.page';

type TestFixtures = {
    navPage: NavPage;
    financialServicesPage: FinancialServicesPage;
};

export const test = base.extend<TestFixtures>({
    navPage: async ({ page }, use) => {
        await use(new NavPage(page));
    },
    financialServicesPage: async ({ page }, use) => {
        await use(new FinancialServicesPage(page));
    },
});

export { expect } from '@playwright/test';