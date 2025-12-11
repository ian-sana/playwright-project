import { BaseAPI, RequestOptions } from '@baseAPI';
import { ENDPOINTS } from '@/enums/api-endpoints';
import { CreateContactPayload } from '../models/contact.model';

export class ContactAPI extends BaseAPI {

  async getContactById(contactId: string, options?: RequestOptions){
    const response = await this.get(`${ENDPOINTS.CONTACTS}/${contactId}`, {
      headers: options?.headers
    });
    return response;
  }

  async createContact(payload: CreateContactPayload, options?: RequestOptions){
    const response = await this.post(ENDPOINTS.CONTACTS, {
      headers: options?.headers,
      data: payload
    });
    return response;
  }

}
