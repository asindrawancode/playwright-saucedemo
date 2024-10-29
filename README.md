# Playwright Test Suite

This project is an automated testing suite using [Playwright](https://playwright.dev/), a Node.js library to automate Chromium, Firefox, and WebKit browsers.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Configuration](#configuration)
- [Generating Reports](#generating-reports)
- [Additional Resources](#additional-resources)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/asindrawancode/playwright-saucedemo.git
   cd playwright-saucedemo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

## Project Structure

```plaintext
repository-name/
├── tests/                   # Test files
│   ├── example.spec.js
├── pages/                   # Page object models
│   ├── LoginPage.js
│   └── InventoryPage.js
├── utils/                   # Utility functions
│   └── authHelper.js
├── .gitignore
├── playwright.config.js     # Playwright configuration
├── package.json
└── README.md                # Documentation
```

## Running Tests

### Run all tests:

```bash
npx playwright test
```

### Run tests with a specific tag:

```bash
npx playwright test --grep @smoke
```

### Run a specific test file:

```bash
npx playwright test tests/example.spec.js
```

### Debug mode:

```bash
PWDEBUG=1 npx playwright test
```

## Writing Tests

Create new test files in the `tests/` directory. Use the [Page Object Model](https://playwright.dev/docs/pom) by creating page files in the `pages/` directory to encapsulate and manage page interactions.

Example test structure:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });
});
```

## Configuration

Configure Playwright options in `playwright.config.js`:

- **Browsers**: Set browser options like `chromium`, `firefox`, or `webkit`.
- **Headless mode**: Toggle headless mode with the `headless` option.
- **Timeouts**: Adjust default timeouts.

Example configuration:

```javascript
module.exports = {
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
  },
};
```

## Generating Reports

This project uses the [Allure Playwright](https://github.com/allure-framework/allure-playwright) reporter to generate test results.

### Generate and view Allure reports:

1. **Run tests to collect results:**

   ```bash
   npx playwright test
   ```

2. **Generate report:**

   ```bash
   allure generate allure-results --clean -o allure-report
   ```

3. **Open report:**

   ```bash
   allure open allure-report
   ```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Documentation](https://docs.qameta.io/allure/)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)