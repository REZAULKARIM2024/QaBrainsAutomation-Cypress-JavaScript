// ============================================================
// ForgotPasswordSteps.js
// Equivalent to: stepdefinitions/ForgotPasswordSteps.java
// ============================================================

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import forgotPasswordPage from '../../support/pages/ForgotPasswordPage';

Given('User is on Forgot Password page', () => {
  cy.visit('/forgot-password');
});

When('User enters registered email {string}', (email) => {
  forgotPasswordPage.enterEmail(email);
});

When('User enters unregistered email {string}', (email) => {
  forgotPasswordPage.enterEmail(email);
});

When('User clicks on Submit button', () => {
  forgotPasswordPage.clickSubmit();
});

Then('User should see success message {string}', (_expected) => {
  forgotPasswordPage.verifySuccessMessage();
});

Then('User should see error message {string}', (_expected) => {
  forgotPasswordPage.verifyErrorMessage();
});
