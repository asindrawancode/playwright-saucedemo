// pages/InventoryCartPage.js

const BasePage = require('./BasePage');

class InventoryCartPage extends BasePage {
    constructor(page) {
        super(page);
        this.totalLabel = '.summary_total_label';
        this.checkoutButton = 'button[data-test="checkout"]';
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async verifyTotalAmount(expectedTotal) {
        const totalText = await this.page.$eval(this.totalLabel, el => el.textContent);
        const totalValue = parseFloat(totalText.replace('Total: $', ''));

        if (totalValue !== expectedTotal) {
            throw new Error(`Total ${totalValue} did not match expected ${expectedTotal}`);
        }
    }
}

module.exports = InventoryCartPage;
