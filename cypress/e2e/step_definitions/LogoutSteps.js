// ============================================================
// LogoutSteps.js
// Equivalent to: stepdefinitions/LogoutSteps.java
// ============================================================

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../support/pages/LoginPage';
import logoutPage from '../../support/pages/LogoutPage';

Given('User is logged in', () => {
  loginPage.login('qa_testers@qabrains.com', 'Password123');
  loginPage.verifyLoginSuccessful();
});

When('User clicks on logout button', () => {
  logoutPage.clickLogout();
});

Then('User should be logged out successfully', () => {
  logoutPage.verifyLoggedOut();
});
