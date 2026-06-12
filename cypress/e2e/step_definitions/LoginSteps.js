// ============================================================
// LoginSteps.js
// Equivalent to: stepdefinitions/LoginSteps.java
// ============================================================

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../support/pages/LoginPage';

When('User enters valid username and password', () => {
  loginPage.login('qa_testers@qabrains.com', 'Password123');
});

When('User enters invalid username and password', () => {
  loginPage.login('wrong@test.com', 'wrongpass');
});

Then('User should be logged in successfully', () => {
  loginPage.verifyLoginSuccessful();
});

Then('Error message should be displayed', () => {
  loginPage.verifyErrorDisplayed();
});
