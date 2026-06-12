// ============================================================
// RegistrationSteps.js
// Equivalent to: stepdefinitions/RegistrationSteps.java
// ============================================================

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import registrationPage from '../../support/pages/RegistrationPage';

When('User navigates to registration page', () => {
  registrationPage.openRegistrationPage();
});

When('User enters valid registration details with email {string}', (email) => {
  registrationPage.enterRegistrationDetails(
    'Rezaul Karim',
    'United States',
    'Engineer',
    email,
    'Password123',
    'Password123'
  );
});

When('User enters registration details with email {string}', (email) => {
  registrationPage.enterRegistrationDetails(
    'Rezaul Karim',
    'United States',
    'Engineer',
    email,
    'Password123',
    'Password123'
  );
});

When('User clicks on register button', () => {
  registrationPage.clickRegister();
});

Then('User should be registered successfully', () => {
  registrationPage.verifyRegistrationSuccessful();
});

Then('Email validation error message should be displayed', () => {
  registrationPage.verifyEmailValidationError();
});
