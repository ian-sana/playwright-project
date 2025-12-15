import { faker } from '@faker-js/faker';

export interface CreateContactPayload {
  firstName: string;
  lastName: string;
  birthdate?: string;
  email?: string;
  phone?: string;
  country?: string;
}

export function CreateContactPayload(): CreateContactPayload {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}
