import { test as base } from '@playwright/test';
import { UiFixture } from '@/fixtures/ui.fixture';
import { APIFixture } from '@/fixtures/api.fixture';

type Credentials = {
  email: string;
  password: string;
};

type TestFixtures = {
    ui: UiFixture;
    api: APIFixture;
    credentials: Credentials;
};

export const test = base.extend<TestFixtures>({
    ui: async ({ page }, use) => {
        await use(new UiFixture(page));
    },
    api: async ({ request, baseURL }, use) => {
        await use(new APIFixture(request, baseURL));
    },
    credentials: async ({}, use) => {
      const creds = {
        email: process.env.HEROKU_EMAIL || '',
        password: process.env.HEROKU_PASSWORD || '',
      };
      await use(creds);
    }
});

export { expect } from '@playwright/test';