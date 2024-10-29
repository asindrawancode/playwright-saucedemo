// utils/authHelper.js
const LoginPage = require('../pages/LoginPage');

async function login(page, username, password) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(process.env.BASE_URL);
    await loginPage.login(username, password);
}

module.exports = { login };