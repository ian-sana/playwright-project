import { defineConfig } from '@playwright/test';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
// require('dotenv').config();

const actionTimeout = 10000; // 10 seconds
const testTimeout = 30000; // 30 seconds
const baseURL = process.env.BASE_URL || 'https://3cloudsolutions.com/';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  timeout: testTimeout,
  expect: {
    timeout: actionTimeout,
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        // viewport: { width: 1920, height: 1080 },
        // launchOptions: {
        //   args: ['--start-maximized']
        // },
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'silver-badge',
      testMatch: 'tests/silver-badge.spec.ts',
      use: {
        browserName: 'chromium',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      }
    },

    // add more projects here if needed
    // {
    //   name: '3CTest',
    //   testMatch: 'tests/bronze.spec.ts',
    //   use: {
    //     viewport: { width: 1920, height: 1200 },
    //   }
    // },

  ],

});
