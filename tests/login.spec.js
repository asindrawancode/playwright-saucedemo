// tests/login.spec.js

require('dotenv').config();  // Import and configure dotenv at the beginning
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');


const BASE_URL = process.env.BASE_URL;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

test.describe('Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(BASE_URL);

        await loginPage.login(USERNAME, PASSWORD);

        // Verify successful login
        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    });
});
