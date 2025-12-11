import { test as base } from '@playwright/test';
import { APIClients } from "@/api-objects/client-registry";
import { UserAPI } from '@/api-objects/clients/user.api';
import { ContactAPI } from '@/api-objects/clients/contact.api';

type Credentials = {
  email: string;
  password: string;
};

export const test = base.extend<{ api: APIClients, credentials: Credentials }>({
  api: async ({ request, baseURL }, use) => {
    const apiClients: APIClients = {
      user: new UserAPI(request, baseURL!),
      contact: new ContactAPI(request, baseURL!),
    };
    await use(apiClients);
  },
  credentials: async ({}, use) => {
    const creds = {
      email: process.env.HEROKU_EMAIL || '',
      password: process.env.HEROKU_PASSWORD || '',
  };
    await use(creds);
  },
});

export { expect } from '@playwright/test';