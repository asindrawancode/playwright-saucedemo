// tests/advanced-shopping.spec.js

const { test, expect } = require('@playwright/test');
const InventoryPage = require('../pages/InventoryPage');
const CheckoutPage = require('../pages/CheckoutPage');
const InventoryCartPage = require('../pages/InventoryCartPage');
const { login } = require('../utils/authHelper');


test.describe('Advanced Shopping Workflow', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, process.env.USERNAME, process.env.PASSWORD);
    });

    test('should complete a complex shopping scenario successfully', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new InventoryCartPage(page);

        // Sort products by price, low to high
        await inventoryPage.sortProductsBy('Price (low to high)');

        // Add products below a certain price, e.g., $15
        const maxPrice = 15;
        await inventoryPage.addProductsUnderPrice(maxPrice);

        // Go to the cart
        await inventoryPage.navigateToCart();

        // Proceed to Checkout
        await cartPage.proceedToCheckout();

        // Fill shipping info
        await checkoutPage.enterShippingInformation('John', 'Doe', '12345');

        // Expected outcome: This is just a placeholder – replace it with a proper calculation if needed
        const expectedTotalCost = 19.42; // Calculated or expected total
        await cartPage.verifyTotalAmount(expectedTotalCost);

        // and complete checkout
        await checkoutPage.finishCheckout();

        // Verify order completion
        await expect(page.locator(checkoutPage.orderConfirmationText)).toHaveText('Thank you for your order!');

    });
});
