import { APIRequestContext, APIResponse } from '@playwright/test';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  data?: any;
  timeout?: number;
}

export class BaseAPI {
  constructor(private request: APIRequestContext, private baseURL: string = '') {
    // console.log("Base url::   ", baseURL)
  }

  private buildURL(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }
    return url.toString();
  }

  async get(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildURL(endpoint, options?.params);
    return this.request.get(url, {
      headers: options?.headers,
      timeout: options?.timeout
    });
  }

  async post(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildURL(endpoint, options?.params);
    return this.request.post(url, {
      headers: options?.headers,
      data: options?.data,
      timeout: options?.timeout
    });
  }

  async put(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildURL(endpoint, options?.params);
    return this.request.put(url, {
      headers: options?.headers,
      data: options?.data,
      timeout: options?.timeout
    });
  }

  async delete(endpoint: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.buildURL(endpoint, options?.params);
    return this.request.delete(url, {
      headers: options?.headers,
      timeout: options?.timeout
    });
  }

}