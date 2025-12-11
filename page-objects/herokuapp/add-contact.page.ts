import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';

type ContactData = {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    email?: string;
    phone?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    city?: string;
    stateOrProvince?: string;
    postalCode?: string;
    country?: string;
};

type FieldMap = {
    firstName: Locator;
    lastName: Locator;
} & Partial<Record<Exclude<keyof ContactData, 'firstName' | 'lastName'>, Locator>>;

export class AddContactPage extends BasePage {

    private firstNameInput = this.page.getByRole('textbox', { name: '* First Name:' });
    private lastNameInput = this.page.getByRole('textbox', { name: '* Last Name:' });
    private dateOfBirthInput = this.page.getByRole('textbox', { name: 'Date of Birth:' });
    private emailInput = this.page.getByRole('textbox', { name: 'Email:' });
    private phoneInput = this.page.getByRole('textbox', { name: 'Phone:' });
    private streetAddress1Input = this.page.getByRole('textbox', { name: 'Street Address 1:' });
    private streetAddress2Input = this.page.getByRole('textbox', { name: 'Street Address 2:' });
    private cityInput = this.page.getByRole('textbox', { name: 'City:' });
    private stateOrProvinceInput = this.page.getByRole('textbox', { name: 'State or Province:' });
    private postalCodeInput = this.page.getByRole('textbox', { name: 'Postal Code:' });
    private countryInput = this.page.getByRole('textbox', { name: 'Country:' });
    private submitButton = this.page.getByRole('button', { name: 'Submit' });
    private cancelButton = this.page.getByRole('button', { name: 'Cancel' });

    async addNewContact(contact: ContactData) {

        const fieldMap: FieldMap = {
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            dateOfBirth: this.dateOfBirthInput,
            email: this.emailInput,
            phone: this.phoneInput,
            streetAddress1: this.streetAddress1Input,
            streetAddress2: this.streetAddress2Input,
            city: this.cityInput,
            stateOrProvince: this.stateOrProvinceInput,
            postalCode: this.postalCodeInput,
            country: this.countryInput,
        };

        for (const [key, value] of Object.entries(contact)) {
            if (value !== undefined) {
                const locator = fieldMap[key as keyof ContactData];
                if (locator) {
                    await locator.fill(value);
                }
            }
        }

        await this.submitButton.click();
    }
}
