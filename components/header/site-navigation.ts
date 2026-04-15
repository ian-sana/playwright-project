import { Page, Locator } from '@playwright/test';
import { FinancialServicesPage } from '@/page-objects/3cloud/financial-services.page';

export class SiteNavigation {
    private page: Page;
    
    private whoWeServeLink: Locator;
    private financialServicesLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whoWeServeLink = this.page.getByRole('link', { name: 'Who We Serve' });
        this.financialServicesLink = this.page.getByRole('link', { name: 'Financial Services' });
    }

    async hoverWhoWeServe() {
        await this.whoWeServeLink.hover();
    }

    async clickFinancialServices() {
        await this.financialServicesLink.click();
    }
}
