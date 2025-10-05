import { Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { FinancialServicesPage } from './financial-services';

export class NavPage extends BasePage {

    private whoWeServeLink: Locator = this.page.getByRole('link', { name: 'Who We Serve' });
    private financialServicesLink: Locator = this.page.getByRole('link', { name: 'Financial Services' });

    async hoverWhoWeServe() {
        await this.whoWeServeLink.hover();
    }

    async clickFinancialServices(): Promise<FinancialServicesPage> {
        await this.financialServicesLink.click();
        return new FinancialServicesPage(this.page);
    }
}