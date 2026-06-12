// ============================================================
// CommonSteps.js
// Equivalent to: stepdefinitions/CommonSteps.java
// ============================================================

import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('User launches the application', () => {
  cy.url().should('include', 'practice.qabrains.com');
});

Then('Home page should load successfully', () => {
  cy.url().should('include', 'practice.qabrains.com');
  cy.get('header').should('be.visible');
});

Given('User is on homepage', () => {
  cy.url().then((url) => {
    if (!url.includes('practice.qabrains.com') || url.includes('login') || url.includes('registration')) {
      cy.visit('/');
    }
  });
  cy.url().should('include', 'practice.qabrains.com');
});

Then('Products should be added successfully', () => {
  // "Remove from cart" button visible = at least one product is in the cart
  cy.contains('button', /remove from cart/i).should('be.visible');
});
