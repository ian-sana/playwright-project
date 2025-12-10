import { test as base } from '@playwright/test';
import { UserAPI } from "@/api-objects/clients/user.api";

export const test = base.extend<{ user: UserAPI;}>({
  user: async ({ request, baseURL }, use) => {
    const api = new UserAPI(request, baseURL!);
    await use(api);
  }
});

export { expect } from '@playwright/test';