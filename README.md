# 🧠 QaBrains Cypress Automation

![Cypress](https://img.shields.io/badge/Cypress-15.16.0-04C38E?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-16%20Passing-brightgreen?style=for-the-badge)

End-to-end test automation suite for [practice.qabrains.com](https://practice.qabrains.com) built with **Cypress**, **JavaScript**, and **Cucumber BDD**. Covers login, registration, cart, logout, forgot password, smoke tests, and regression tests — using the **Page Object Model (POM)** design pattern.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Coverage](#-test-coverage)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Reports](#-reports)
- [Author](#-author)

---

## ✨ Features

- ✅ BDD-style tests written in plain English (Gherkin)
- ✅ 16 test scenarios across 7 feature files
- ✅ Page Object Model (POM) design pattern
- ✅ Tag-based test execution (`@smoke`, `@regression`)
- ✅ Cucumber HTML & JSON reports
- ✅ Screenshot on test failure
- ✅ Cross-browser support (Chrome, Firefox, Edge)
- ✅ Headless CI/CD ready
- ✅ Converted from Playwright + Java to Cypress + JavaScript

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io/) | 15.16.0 | Test framework |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | ES6+ | Language |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | 20.1.2 | BDD / Gherkin support |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) | 2.2.2 | Fast bundler |
| [multiple-cucumber-html-reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) | 3.10.0 | Cucumber HTML reports |
| [esbuild](https://esbuild.github.io/) | 0.20.2 | Bundler |

---

## 📁 Project Structure

```
QaBrainsCypress/
│
├── cypress/
│   ├── e2e/
│   │   ├── features/                    # BDD Feature files (Gherkin)
│   │   │   ├── Login.feature
│   │   │   ├── Registration.feature
│   │   │   ├── CartCheckout.feature
│   │   │   ├── Logout.feature
│   │   │   ├── ForgotPassword.feature
│   │   │   ├── SmokeTests.feature
│   │   │   └── RegressionTests.feature
│   │   │
│   │   └── step_definitions/            # Step implementation files
│   │       ├── CommonSteps.js
│   │       ├── LoginSteps.js
│   │       ├── RegistrationSteps.js
│   │       ├── CartSteps.js
│   │       ├── LogoutSteps.js
│   │       ├── ForgotPasswordSteps.js
│   │       ├── SmokeSteps.js
│   │       └── RegressionSteps.js
│   │
│   ├── support/
│   │   ├── e2e.js                       # Global hooks
│   │   ├── commands.js                  # Custom Cypress commands
│   │   └── pages/                       # Page Object Model classes
│   │       ├── HomePage.js
│   │       ├── LoginPage.js
│   │       ├── RegistrationPage.js
│   │       ├── CartPage.js
│   │       ├── LogoutPage.js
│   │       ├── ForgotPasswordPage.js
│   │       └── SearchPage.js
│   │
│   ├── fixtures/
│   │   └── config.json                  # Test data & configuration
│   │
│   └── reports/                         # Generated test reports
│       ├── html/                        # Multiple Cucumber HTML report
│       ├── cucumber-json/               # Cucumber JSON output
│       └── cucumber-html/               # Cucumber HTML report
│
├── cypress.config.js                    # Cypress configuration
├── package.json                         # Dependencies & npm scripts
└── reporter.js                          # Report generation script
```

---

## 🧪 Test Coverage

### Feature 1 — Login (`Login.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke @regression | Login with valid credentials | ✅ Pass |
| @regression | Login with invalid credentials | ✅ Pass |

### Feature 2 — Registration (`Registration.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke @regression | Successful registration with valid email | ✅ Pass |
| @regression | Registration fails with invalid email | ✅ Pass |

### Feature 3 — Cart & Checkout (`CartCheckout.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke @regression | Add product to cart | ✅ Pass |
| @smoke @regression | Remove product from cart | ✅ Pass |

### Feature 4 — Logout (`Logout.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke @regression | Logged in user can logout | ✅ Pass |

### Feature 5 — Forgot Password (`ForgotPassword.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke @regression | Registered user can reset password | ✅ Pass |
| @regression | Unregistered user cannot reset password | ✅ Pass |

### Feature 6 — Smoke Tests (`SmokeTests.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @smoke | S-01 Verify Home page loads | ✅ Pass |
| @smoke | S-02 Verify navigation links | ✅ Pass |
| @smoke | S-03 Verify wishlist and refer a friend | ✅ Pass |

### Feature 7 — Regression Tests (`RegressionTests.feature`)
| Tag | Scenario | Status |
|-----|----------|--------|
| @regression | R-01 Add multiple products to cart | ✅ Pass |
| @regression | R-02 Update product quantity | ✅ Pass |
| @regression | R-03 Search invalid item | ✅ Pass |

**Total: 16 scenarios — 16 ✅ Pass — 0 ❌ Fail**

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [npm](https://www.npmjs.com/) v8.0.0 or higher
- Google Chrome (recommended)

---

## 🚀 Installation

**1. Clone the repository**
```bash
git clone https://github.com/REZAULKARIM2024/QaBrainsCypress.git
cd QaBrainsCypress
```

**2. Install dependencies**
```bash
npm install
```

**3. Install Cypress binary**
```bash
npx cypress install
```

---

## ▶️ Running Tests

### Open Cypress UI (interactive)
```bash
npm run open
```

### Run all tests (headless)
```bash
npm test
```

### Run only Smoke tests
```bash
npm run test:smoke
```

### Run only Regression tests
```bash
npm run test:regression
```

### Run with headed browser
```bash
npm run test:headed
```

### Run and generate report
```bash
npm run test:report
```

---

## 📊 Reports

After running `npm run test:report`, reports are generated in `cypress/reports/`:

| Report | Location | Description |
|--------|----------|-------------|
| Cucumber HTML | `cypress/reports/html/index.html` | Visual report with charts |
| Cucumber JSON | `cypress/reports/cucumber-json/` | Raw JSON data |
| Simple HTML | `cypress/reports/cucumber-html/cucumber-report.html` | Simple HTML report |

Open the HTML report in your browser:
```bash
start cypress/reports/html/index.html       # Windows
open cypress/reports/html/index.html        # Mac/Linux
```

---

## 👤 Author

**Rezaul Karim**
- GitHub: [@REZAULKARIM2024](https://github.com/REZAULKARIM2024)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
