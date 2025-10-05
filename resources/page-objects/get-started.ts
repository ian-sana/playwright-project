import { expect, FrameLocator, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class GetStartedPage extends BasePage {

    private formFrame: FrameLocator = this.page.frameLocator('[title="Form 0"]');
    private formFill: Locator = this.formFrame.locator('//form[contains(@id,"hsForm")]');
    private firstNameInput: Locator = this.formFrame.getByRole('textbox', { name: 'First name' });
    private lastNameInput: Locator = this.formFrame.getByRole('textbox', { name: 'Last name' });
    private companyNameInput: Locator = this.formFrame.getByRole('textbox', { name: 'Company name' });
    private emailInput: Locator = this.formFrame.getByRole('textbox', { name: 'Email' });
    private jobTitleInput: Locator = this.formFrame.getByRole('textbox', { name: 'Job title' });
    private phoneNumberInput: Locator = this.formFrame.getByRole('textbox', { name: 'Phone number' });
    private commentsInput: Locator = this.formFrame.getByRole('textbox', { name: 'Comments' });
    private submitButton: Locator = this.formFrame.getByRole('button', { name: 'SUBMIT' });

    jobTitleError: Locator = this.formFrame.locator('//div[contains(@class,"jobtitle")]//ul//label');
    phoneNumberError: Locator = this.formFrame.locator('//div[contains(@class,"phone")]//ul//label');
    commentsError: Locator = this.formFrame.locator('//div[contains(@class,"message")]//ul//label');
    errorMsg: Locator = this.formFrame.locator('//label[text()="Please complete all required fields."]');

    async fillForm(firstName: string, lastName: string, companyName: string, email: string, jobTitle: string, phoneNumber: string, comments: string): Promise<void> {
        // Using Promise.all to fill all fields concurrently
        await Promise.all([this.firstNameInput.fill(firstName),
        this.lastNameInput.fill(lastName),
        this.companyNameInput.fill(companyName),
        this.emailInput.fill(email),
        this.jobTitleInput.fill(jobTitle),
        this.phoneNumberInput.fill(phoneNumber),
        this.commentsInput.fill(comments)]);

        // await this.firstNameInput.fill(firstName);
        // await this.lastNameInput.fill(lastName);
        // await this.companyNameInput.fill(companyName);
        // await this.emailInput.fill(email);
        // await this.jobTitleInput.fill(jobTitle);
        // await this.phoneNumberInput.fill(phoneNumber);
        // await this.commentsInput.fill(comments);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async verifyJobTitleErrorMessage(expectedText: string) {
        await expect(this.jobTitleError).toBeVisible();
        await expect(this.jobTitleError).toHaveText(expectedText);
    }

    async verifyPhoneNumberErrorErrorMessage(expectedText: string) {
        await expect(this.phoneNumberError).toBeVisible();
        await expect(this.phoneNumberError).toHaveText(expectedText);
    }

    async verifyCommentsErrorMessage(expectedText: string) {
        await expect(this.commentsError).toBeVisible();
        await expect(this.commentsError).toHaveText(expectedText);
    }

}