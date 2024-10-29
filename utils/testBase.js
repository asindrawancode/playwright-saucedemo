// utils/testBase.js

const { test: baseTest } = require('@playwright/test');
const { addAttachment } = require('allure-playwright');

// Extend Playwright's base test to add screenshots on failure
const test = baseTest.extend({
    async base({ page }, use, testInfo) {
        await use(page); // Use page context

        // After each test, check if it failed and attach a screenshot
        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot();
            await addAttachment('Screenshot on Failure', screenshot, 'image/png');
        }
    },
});

module.exports = { test };