import { APIResponse } from '@playwright/test';

export class ApiResponseHandler {
    
  static async validateStatus(response: APIResponse, expectedStatus: number): Promise<void> {
    if (response.status() !== expectedStatus) {
      const body = await response.text();
      throw new Error(
        `Expected status ${expectedStatus}, got ${response.status()}. Response: ${body}`
      );
    }
  }

  static async getJson<T>(response: APIResponse): Promise<T> {
    return await response.json() as T;
  }

  static async getText(response: APIResponse): Promise<string> {
    return await response.text();
  }

  static getHeaders(response: APIResponse): Record<string, string> {
    return response.headers();
  }

  static getStatus(response: APIResponse): number {
    return response.status();
  }

  static async validateAndGetJson<T>(
    response: APIResponse, 
    expectedStatus: number = 200
  ): Promise<T> {
    await this.validateStatus(response, expectedStatus);
    return await this.getJson<T>(response);
  }
}