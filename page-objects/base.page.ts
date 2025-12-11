import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected root: Locator;
    protected header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = this.page.locator('body');
        this.header = this.root.locator('h1');
    }

    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await this.header.waitFor({ state: 'visible' });
    }

    // async waitForLoad() {
    //     await this.header.waitFor({ state: 'visible' });
    // }

    // commented out as not used currently
    // abstract isAt(): Promise<boolean>;
}