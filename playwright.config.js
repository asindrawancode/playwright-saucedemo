// playwright.config.js

require('dotenv').config();  // Ensure environment variables are loaded

module.exports = {
    reporter: [
        ['dot'],                // Default dot reporter for quick console output
        ['allure-playwright'],  // Add Allure Playwright reporter
    ],
    use: {
        browserName: process.env.BROWSER || 'chromium',  // Default to Chromium if not specified
        headless: process.env.HEADLESS === 'false',  // Evaluate the HEADLESS env variable
         launchOptions: {
             slowMo: 500, // Slows down by 500ms per operation
         },
        screenshot: 'only-on-failure', // Take screenshots on failure by default
    },
};
