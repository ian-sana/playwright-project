import { Page } from "@playwright/test";
import { BasePage } from '@/page-objects/base.page';
import { FinancialServicesPage } from '@/page-objects/3cloud/financial-services.page';
import { GetStartedPage } from '@/page-objects/3cloud/get-started.page';
import { HomePage } from '../page-objects/3cloud/home.page';

import { ContactLoginPage } from '@/page-objects/herokuapp/contact-login.page';
import { ContactListPage } from '@/page-objects/herokuapp/contact-list.page';
import { AddContactPage } from '@/page-objects/herokuapp/add-contact.page';
import { AddUserPage } from '@/page-objects/herokuapp/add-user.page';
import { th } from "@faker-js/faker/.";

export class UiFixture {
    private base: BasePage;
    homePage: HomePage;
    getStartedPage: GetStartedPage;
    financialServicesPage: FinancialServicesPage;

    contactLoginPage: ContactLoginPage;
    contactListPage: ContactListPage
    addContactPage: AddContactPage;
    addUserPage: AddUserPage;
    
    constructor(page: Page) {
        this.base = new BasePage(page);
        this.homePage = new HomePage(page);
        this.getStartedPage = new GetStartedPage(page);
        this.financialServicesPage = new FinancialServicesPage(page);

        this.contactLoginPage = new ContactLoginPage(page);
        this.contactListPage = new ContactListPage(page);
        this.addContactPage = new AddContactPage(page);
        this.addUserPage = new AddUserPage(page);
    }
}