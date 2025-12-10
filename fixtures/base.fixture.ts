import { test as base } from '@playwright/test';
import { UiFixture } from '@/fixtures/ui.fixture';
import { APIFixture } from '@/fixtures/api.fixture';

type TestFixtures = {
    ui: UiFixture;
    api: APIFixture;
};

export const test = base.extend<TestFixtures>({
    ui: async ({ page }, use) => {
        await use(new UiFixture(page));
    },
    api: async ({ request, baseURL }, use) => {
        await use(new APIFixture(request, baseURL));
    },
});

export { expect } from '@playwright/test';