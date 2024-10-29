// tests/checkout.spec.js

const { test, expect } = require('@playwright/test');
const { login } = require('../utils/authHelper');
const InventoryPage = require('../pages/InventoryPage');
const CheckoutPage = require('../pages/CheckoutPage');


test.describe('Checkout Process Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, process.env.USERNAME, process.env.PASSWORD);
    });

    test('should complete checkout successfully', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addFirstProductToCart();
        await inventoryPage.navigateToCart();

        await checkoutPage.proceedToCheckout();
        await checkoutPage.enterShippingInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();

        // Verify order completion
        await expect(page.locator(checkoutPage.orderConfirmationText)).toHaveText('Thank you for your order!!');
    });
});
