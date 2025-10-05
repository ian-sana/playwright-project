import { test, expect } from '@playwright/test';
import data from '../resources/test-data/tc1.json';

test('validate error messages', async ({ page }) => {

  await test.step('Navigate to the 3Cloud Solutions homepage', async () => {
    await page.goto('/');
    await page.waitForLoadState();
  });

  await test.step('Hover over the "Who We Serve" menu item in the navigation bar', async () => {

    // to test noEmit (type-checking only)
    // await expect(page.getByRole('link', { name: 'Who We Serve' })).toBeVisibles();

    // to test eslint from eslint.config.mjs
    // const whoWeServeLink = await page.getByRole('link', { name: 'Who We Serve' });
    // whoWeServeLink.hover();

    await page.getByRole('link', { name: 'Who We Serve' }).hover();
  });

  await test.step('Click on the “Financial Services” link from the dropdown', async () => {
    await page.getByRole('link', { name: 'Financial Services' }).click();
  });

  const newTab = await test.step('Click the “Let’s Talk” button on the Financial Services page', async () => {
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.locator('section')
        .filter({ hasText: 'How 3Cloud Supports' })
        .getByRole('link', { name: 'Let’s Talk' }).click(),
    ]);
    await popup.waitForLoadState('load');
    return popup;
  });

  const page1Frame = newTab.frameLocator('[title="Form 0"]');
  const fname = page1Frame.getByRole('textbox', { name: 'First Name' });
  const lname = page1Frame.getByRole('textbox', { name: 'Last Name' });
  const company = page1Frame.getByRole('textbox', { name: 'Company name' });
  const email = page1Frame.getByRole('textbox', { name: 'Email' });
  const btn = page1Frame.getByRole('button', { name: 'SUBMIT' });

  const jobTitleError = page1Frame.locator('//div[contains(@class,"jobtitle")]//ul//label');
  const phoneNumberError = page1Frame.locator('//div[contains(@class,"phone")]//ul//label');
  const commentsError = page1Frame.locator('//div[contains(@class,"message")]//ul//label');
  const errorMsg = page1Frame.locator('//label[text()="Please complete all required fields."]');

  await test.step('Fill required fields and submit the form', async () => {
    await fname.fill(data.firstname);
    await lname.fill(data.lastname);
    await company.fill(data.company);
    await email.fill(data.email);
    await btn.click();
  });

  await test.step('Capture screenshot of error messages', async () => {
    await page1Frame.locator('body').screenshot({ path: 'screenshots/error messages.png' });
  });

  await test.step('Validate error messages', async () => {
    await expect(jobTitleError).toBeVisible();
    await expect(jobTitleError).toHaveText('Please complete this required field.');
    await expect(phoneNumberError).toBeVisible();
    await expect(phoneNumberError).toHaveText('Please complete this required field.');
    await expect(commentsError).toBeVisible();
    await expect(commentsError).toHaveText('Please complete this required field.');
    await expect(errorMsg).toBeVisible();
  });
  
  
});
