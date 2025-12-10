import { test as base } from '@playwright/test';
import { APIClients } from "@/api-objects/index";
import { UserAPI } from '@/api-objects/clients/user.api';

export const test = base.extend<{ api: APIClients }>({
  api: async ({ request, baseURL }, use) => {
    const apiClients: APIClients = {
      user: new UserAPI(request, baseURL!),
    };

    await use(apiClients);
  }
});

export { expect } from '@playwright/test';