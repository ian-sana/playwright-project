import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';

export class ContactListPage extends BasePage {

    private contactListHeading = this.page.getByRole('heading', { name: 'Contact List', exact: true });
    private table = this.page.locator('.contactTable');
    private addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' });
    private logoutButton = this.page.getByRole('button', { name: 'Logout' });

    isAtContactListPage(): Locator {
        return this.contactListHeading;
    }

    async navigateToAddNewContact() {
        await this.addANewContactButton.click();
    }

    getTableLocator(): Locator {
        return this.table;
    }

    getTableCellByText(text: string): Locator {
        const locator = this.page.getByRole('cell', { name: text });
        return locator;
    }

    async logout() {
        await this.logoutButton.click();
    }
}