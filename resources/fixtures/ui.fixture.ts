import { Page } from "@playwright/test";
import { BasePage } from '@/page-objects/base.page';
import { FinancialServicesPage } from '@/page-objects/financial-services.page';
import { GetStartedPage } from '@/page-objects/get-started.page';
import { NavPage } from '@/page-objects/navigation.page';

export class UiFixture {
    private base: BasePage;
    navPage: NavPage;
    getStartedPage: GetStartedPage;
    financialServicesPage: FinancialServicesPage;
    
    constructor(page: Page) {
        this.base = new BasePage(page);
        this.navPage = new NavPage(page);
        this.getStartedPage = new GetStartedPage(page);
        this.financialServicesPage = new FinancialServicesPage(page);
    }
}