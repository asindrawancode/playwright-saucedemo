// tests/add-to-cart.spec.js

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');


test.describe('Product Cart Tests', () => {
    test('should add first product to cart successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate(process.env.BASE_URL);
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.navigateToCart();

        // Verify that the product was added to the cart.
        await expect(page.locator('.cart_item')).toHaveCount(1);
    });
});
