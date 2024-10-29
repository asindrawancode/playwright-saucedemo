// pages/CheckoutPage.js

const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.checkoutButton = 'button[data-test="checkout"]';
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueButton = 'input[data-test="continue"]';
        this.finishButton = 'button[data-test="finish"]';
        this.orderConfirmationText = 'h2[data-test="complete-header"]';
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async enterShippingInformation(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    async finishCheckout() {
        await this.page.click(this.finishButton);
    }
}

module.exports = CheckoutPage;
