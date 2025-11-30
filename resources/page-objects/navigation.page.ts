import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';
import { FinancialServicesPage } from '@/page-objects/financial-services.page';

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