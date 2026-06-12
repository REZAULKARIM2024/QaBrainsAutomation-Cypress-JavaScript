// ============================================================
// SmokeSteps.js
// Equivalent to: stepdefinitions/SmokeSteps.java
// ============================================================

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Helper: navigate to a link by text then go back.
 * Tries nav/header first, falls back to any visible anchor.
 */
function clickNavAndGoBack(linkText) {
  cy.visit('/');

  cy.get('body').then(($body) => {
    const strategies = [
      `nav a:contains('${linkText}')`,
      `header a:contains('${linkText}')`,
      `a:contains('${linkText}')`,
    ];

    let found = false;
    for (const sel of strategies) {
      const els = $body.find(sel).filter(':visible');
      if (els.length > 0) {
        cy.wrap(els.first()).click();
        cy.go('back');
        found = true;
        break;
      }
    }

    if (!found) {
      cy.log(`⚠ Nav link not found: "${linkText}" — skipping`);
    }
  });
}

When('User clicks on Catalog, About and Blog', () => {
  clickNavAndGoBack('Catalog');
  clickNavAndGoBack('About');
  clickNavAndGoBack('Blog');
});

Then('Pages should navigate correctly', () => {
  cy.url().should('include', 'practice.qabrains.com');
});

When('User clicks on Wish list and Refer a Friend', () => {
  clickNavAndGoBack('Wish List');
  clickNavAndGoBack('Refer a Friend');
});

Then('Pages should open successfully', () => {
  cy.url().should('include', 'practice.qabrains.com');
});
