import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';
import { SiteNavigation } from '@/componnts/header/site-navigation';
import { FinancialServicesPage } from '@/page-objects/3cloud/financial-services.page';

export class HomePage extends BasePage {

    private siteNav: SiteNavigation;
    private introText: Locator = this.page.locator('.intro-text');

    constructor(page: any) {
        super(page);
        this.siteNav = new SiteNavigation(this.page);
    }

    getIntroTextLocator(): Locator {
        return this.introText;
    }

    getNavigation(): SiteNavigation {
        return this.siteNav;
    }

    // async hoverWhoWeServe() {
    //     await this.siteNav.hoverWhoWeServe();
    // }

    // async clickFinancialServices(): Promise<FinancialServicesPage> {
    //     await this.siteNav.clickFinancialServices();
    //     return new FinancialServicesPage(this.page);
    // }
}