import { Locator } from '@playwright/test';
import { BasePage } from '@basePage';

export class ContactLoginPage extends BasePage {

    private emailInput: Locator = this.page.getByRole('textbox', { name: 'Email' });
    private passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
    private submitButton = this.page.getByRole('button', { name: 'Submit' });
    private signUpButton = this.page.getByRole('button', { name: 'Sign up' });

    async isAtContactLoginPage(): Promise<boolean> {
        return await this.submitButton.isVisible();
    }

    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async navigateToSignUp() {
        await this.signUpButton.click();
    }
}