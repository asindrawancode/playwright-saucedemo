// pages/LoginPage.js

const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#user-name'; // CSS selectors for the elements
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;
