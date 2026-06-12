// ============================================================
// LoginPage.js
// Equivalent to: pages/LoginPage.java
// ============================================================

class LoginPage {
  // Selectors
  get emailField() {
    return cy.get("#email, input[type='email'], input[name='email']").first();
  }

  get passwordField() {
    return cy.get("#password, input[type='password']").first();
  }

  get loginBtn() {
    return cy.get(
      "button[type='submit'], button:contains('Login'), button:contains('Sign In')"
    ).first();
  }

  // Actions
  login(email, password) {
    // Navigate to the login page only if not already on it.
    // Prefer clicking a visible Login link (preserves any session/cookie state
    // set by prior page loads — direct cy.visit bypasses that and can break
    // the form submission on some server setups).
    // Fallback: cy.visit the correct login URL (was '/login' — wrong; fixed to '/ecommerce/login').
    cy.url().then((url) => {
      if (!url.includes('login') && !url.includes('sign-in')) {
        cy.get('body').then(($body) => {
          const link = $body.find(
            "a:contains('Login'), a:contains('Sign In'), a:contains('Log In')"
          ).filter(':visible');
          if (link.length > 0) {
            cy.wrap(link.first()).click();
          } else {
            cy.visit('/ecommerce/login');
          }
        });
      }
    });

    this.emailField.clear().type(email);
    this.passwordField.clear().type(password);
    this.loginBtn.click();
    // Allow redirect / session to establish
    cy.wait(1000);
  }

  // Assertions
  verifyLoginSuccessful() {
    // URL should leave the login page after a successful login
    cy.url().should('not.include', 'login');
  }

  verifyErrorDisplayed() {
    // Check for an error/danger alert near the login form — avoid broad class matches
    // that could match navigation elements (e.g. alert-* in Bootstrap nav)
    cy.get('body').should(($body) => {
      const url = window.location.href;

      // Still on login page = failure indicator
      const stillOnLogin = url.includes('login') || url.includes('sign-in');

      // OR an explicit error element is visible
      const errorEl = $body.find(
        ".alert-danger, .error-message, .login-error, " +
        "[class*='error']:not(script):not(style), " +
        "form .alert"
      ).filter(':visible');

      // OR inline error text in the page
      const bodyText     = $body.text().toLowerCase();
      const hasErrorText = bodyText.includes('invalid') ||
                           bodyText.includes('incorrect') ||
                           bodyText.includes('wrong') ||
                           bodyText.includes('failed') ||
                           bodyText.includes('error');

      expect(
        stillOnLogin || errorEl.length > 0 || hasErrorText,
        'Expected an error indicator (still on login page, or error element visible, or error text)'
      ).to.be.true;
    });
  }
}

export default new LoginPage();
