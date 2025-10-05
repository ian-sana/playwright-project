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

    async goto(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.header.waitFor({ state: 'visible' });
    }

    // async waitForLoad() {
    //     await this.header.waitFor({ state: 'visible' });
    // }

}