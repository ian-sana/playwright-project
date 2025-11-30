import { Locator } from '@playwright/test';
import { BasePage } from '@/page-objects/base.page';
import { GetStartedPage } from '@/page-objects/get-started.page';

export class FinancialServicesPage extends BasePage {

    private supportSection: Locator = this.page.locator('section').filter({ hasText: 'How 3Cloud Supports' });
    private letsTalkLink: Locator = this.supportSection.getByRole('link', { name: 'Let’s Talk' });

    /**
     * Clicks the 'Let’s Talk' link and returns the popup page.
     */
    async clickLetsTalkAndWaitForPopup(): Promise<GetStartedPage> {

        // const popupPromise = this.page.waitForEvent('popup');
        // await this.letsTalkLink.click();
        // return await popupPromise;

        // Alternative approach using context.waitForEvent
        // This is more reliable in some cases, especially if the popup is opened in a new tab.
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.letsTalkLink.click()
        ]);
        await popup.waitForLoadState();
        return new GetStartedPage(popup);
    }

    async getSupportSection() {
        return this.supportSection;
    }
}