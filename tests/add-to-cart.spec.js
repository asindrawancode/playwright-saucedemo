// tests/add-to-cart.spec.js

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');


test.describe('Product Cart Tests', () => {
    test('should add first, second, third, and forth, product to cart successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate(process.env.BASE_URL);
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

        await inventoryPage.addProductToCartByName("Sauce Labs Backpack");
        await inventoryPage.addProductToCartByName("Sauce Labs Bike Light");
        await inventoryPage.addProductToCartByName("Sauce Labs Bolt T-Shirt");
        await inventoryPage.addProductToCartByName("Sauce Labs Fleece Jacket");

        // await inventoryPage.addRandomProductsToCart(4);
        
        await inventoryPage.navigateToCart();

        // Verify that the product was added to the cart.
        await expect(page.locator('.cart_item')).toHaveCount(4);
    });
});
