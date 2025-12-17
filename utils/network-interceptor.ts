import { Page } from '@playwright/test';

export interface CapturedRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  payload?: any;
}

export interface CapturedResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

export interface InterceptionResult {
  request: CapturedRequest;
  response: CapturedResponse;
}

/**
 * Captures both the request and response of a network call that matches the given URL pattern.
 *
 * - Intercepts the request and stores method, URL, headers, and JSON payload.
 * - Continues the request using `route.fetch()` to retrieve the real response.
 * - Captures the response status, headers, and JSON body.
 * - Returns both captured request and response details as an `InterceptionResult`.
 *
 * @param page       Playwright Page instance used to register the route.
 * @param urlPattern URL or pattern to intercept (example: "**\\/api\\/user").
 * @returns          An object containing captured request and response details.
 */
export async function captureNetworkCall(page: Page,
  urlPattern: string): Promise<InterceptionResult> {

  const captured: Partial<InterceptionResult> = {};
  await page.route(urlPattern, async (route) => {
    const request = route.request();
    captured.request = {
      method: request.method(),
      url: request.url(),
      headers: request.headers(),
      payload: request.postDataJSON()
    };

    // Continue with the actual request
    const response = await route.fetch();
    captured.response = {
      status: response.status(),
      headers: response.headers(),
      body: await response.json()
    };

    // Fulfill with the actual response
    await route.fulfill({ response });
  });

  return captured as InterceptionResult;
}

/**
 * Intercepts a network request matching the given URL pattern and returns a mocked response.
 *
 * - If `mockData` is provided, that payload will be used instead of the real response.
 * - If NO `mockData` is provided, the function fetches the original response
 *   and allows optional modification through the `modifier` callback.
 * - The final JSON (mocked or modified) is then fulfilled back to Playwright.
 *
 * @param page       Playwright Page object used to register the route.
 * @param urlPattern URL or pattern to intercept (e.g. "**\\/api\\/user").
 * @param mockData   Optional JSON object to use as the mocked response body.
 * @param modifier   Optional function to transform the intercepted JSON before returning it.
 */
export async function mockNetworkResponse(page: Page, urlPattern: string,
  mockData?: any, modifier?: (json: any) => any): Promise<void> {

  await page.route(urlPattern, async (route) => {
    const response = await route.fetch();
    let json = mockData ?? (await response.json());

    console.log("Original JSON:: ", json);
    // Apply modifier if provided
    if (modifier) {
      json = modifier(json);
    }
    console.log("Final JSON:: ", json);

    await route.fulfill({ response, json });
  });
}

