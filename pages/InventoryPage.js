// pages/InventoryPage.js

const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.sortSelect = '.product_sort_container';
        this.productPrices = '.inventory_item_price';
        this.inventoryItems = '.inventory_item';
        this.cartIcon = '.shopping_cart_link';
        this.firstProductAddToCart = 'button[data-test="add-to-cart-sauce-labs-backpack"]';

    }

    async sortProductsBy(optionValue) {
        await this.page.selectOption(this.sortSelect, { label: optionValue });
    }

    async addProductsUnderPrice(maxPrice) {
        const products = await this.page.$$(this.inventoryItems);
        for (const product of products) {
            const priceElement = await product.$(this.productPrices);
            const priceText = await priceElement.textContent();
            const price = parseFloat(priceText.replace('$', ''));

            if (price < maxPrice) {
                const addButton = await product.$('button[data-test^="add-to-cart-"]');
                await addButton.click();
            }
        }
    }

    async addFirstProductToCart() {
        await this.page.click(this.firstProductAddToCart);
    }

    async navigateToCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = InventoryPage;
