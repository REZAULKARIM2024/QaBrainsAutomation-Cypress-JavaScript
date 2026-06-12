// ============================================================
// Cypress Global Support File
// Equivalent to: hooks/Hooks.java + stepdefinitions/Hooks.java
// ============================================================

import './commands';

// Global beforeEach: reset session state and navigate to the app.
//
// WHY clearCookies + clearLocalStorage:
//   Cypress shares the browser session across scenarios in the same
//   spec file. Without clearing, a successful login in Scenario 1
//   leaves a session cookie that Scenario 2 inherits. When Scenario 2
//   then tries to visit /login, the server redirects the already-
//   logged-in user back to the dashboard — so the #email field is
//   never found and the test fails.
//   Clearing state before each scenario gives every test a clean slate.
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
});
