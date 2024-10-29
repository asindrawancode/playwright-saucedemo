// tests/logout.spec.js

const { test, expect } = require('@playwright/test');
const { login } = require('../utils/authHelper');


test('Logout and verify redirect to login page', async ({ page }) => {
    await login(page, process.env.USERNAME, process.env.PASSWORD);

    // Assuming there's a menu button and a logout button
    await page.click('#react-burger-menu-btn'); // Open the menu
    await page.click('#logout_sidebar_link');   // Click logout

    // Verify we're taken back to the login page
    await expect(page).toHaveURL(process.env.BASE_URL);
    await expect(page.locator('#login-button')).toBeVisible();
});
