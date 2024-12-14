// pages/InventoryPage.js

const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.sortSelect = '.product_sort_container';
        this.productPrices = '.inventory_item_price';
        this.inventoryItems = '.inventory_item';
        this.cartIcon = '.shopping_cart_link';
        this.productAddButton = 'button[data-test^="add-to-cart-"]';

        this.cartItems = '.cart_item';
        this.itemName = '.inventory_item_name';
        this.removeButton = 'button[data-test^="remove-"]';
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

    async addProductToCartByName(productName) {
        // Locate the product that matches the product name
        const products = await this.page.$$(this.inventoryItems);
        for (const product of products) {
            const titleElement = await product.$('.inventory_item_name');
            const titleText = await titleElement.textContent();
            if (titleText.trim() === productName) {
                const addButton = await product.$('button[data-test^="add-to-cart-"]');
                await addButton.click();
                return; // Product found and added to cart
            }
        }
        throw new Error(`Product with name "${productName}" not found.`);
    }

    async addRandomProductsToCart(count) {
        // Add a specified number of random products to the cart
        const products = await this.page.$$(this.inventoryItems);
        if (count > products.length) {
            throw new Error('Requested count exceeds the number of available products');
        }
        // Create a shuffled array of indices
        const indices = [...Array(products.length).keys()];
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        // Select the first 'count' indices
        const selectedIndices = indices.slice(0, count);
        for (const index of selectedIndices) {
            const product = products[index];
            const addButton = await product.$(this.productAddButton);
            await addButton.click();
        }
    }

    async removeItemByIndex(index) {
        const items = await this.page.$$(this.cartItems);
        if (index >= 0 && index < items.length) {
            const item = items[index];
            const removeBtn = await item.$(this.removeButton);
            await removeBtn.click();
        } else {
            throw new Error('Invalid item index');
        }
    }

    async navigateToCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = InventoryPage;
