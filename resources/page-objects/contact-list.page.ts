import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';

export class ContactListPage extends BasePage {

    private contactListHeading = this.page.getByRole('heading', { name: 'Contact List' });
    private addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' });
    private logoutButton = this.page.getByRole('button', { name: 'Logout' });

    async isAtContactListPage(): Promise<boolean> {
        return await this.contactListHeading.isVisible();
    }

    async navigateToAddNewContact() {
        await this.addANewContactButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}