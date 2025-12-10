import { Locator } from '@playwright/test';
import { BasePage } from '@basePage';

export class AddUserPage extends BasePage {

    private addUserHeading = this.page.getByRole('heading', { name: 'Add User' });
    private firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
    private lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
    private emailInput = this.page.getByRole('textbox', { name: 'Email' });
    private passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    private submitButton = this.page.getByRole('button', { name: 'Submit' });

    async isAtAddUserPage(): Promise<boolean> {
        return await this.addUserHeading.isVisible();
    }

    async signUp(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

}