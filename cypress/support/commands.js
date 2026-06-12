// ============================================================
// Custom Cypress Commands
// ============================================================

/**
 * Login command — reusable across step definitions
 * Equivalent to: LoginPage.login() in Java
 */
Cypress.Commands.add('login', (email, password) => {
  cy.url().then((url) => {
    if (!url.includes('login') && !url.includes('sign-in')) {
      cy.get('body').then(($body) => {
        const loginLink = $body.find(
          "a:contains('Login'), a:contains('Sign In'), a:contains('Log In')"
        );
        if (loginLink.length > 0 && loginLink.first().is(':visible')) {
          cy.wrap(loginLink.first()).click();
        } else {
          cy.visit('/login');
        }
      });
    }
  });

  cy.get("#email, input[type='email'], input[name='email']")
    .first()
    .clear()
    .type(email);
  cy.get("#password, input[type='password']").first().clear().type(password);
  cy.get("button[type='submit'], button:contains('Login'), button:contains('Sign In')")
    .first()
    .click();
});
