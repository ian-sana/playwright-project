import { APIRequestContext } from '@playwright/test';
import { ApiMethod } from '../enums/api-method.enums';

export class BaseApi {
  requestContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.requestContext = request;
  }

  protected async makeRequest(apiMethod: ApiMethod, url: string, body?: Record<string, any>, token?: string) {
    const response = await this.requestContext.fetch(url, {
      method: apiMethod,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      data: body ? body : null,
    });
    return response;
  }
}