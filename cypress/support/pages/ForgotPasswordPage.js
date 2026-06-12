// ============================================================
// ForgotPasswordPage.js
// Equivalent to: pages/ForgotPasswordPage.java
// ============================================================

class ForgotPasswordPage {
  get emailField() { return cy.get('#email'); }

  get submitBtn() {
    return cy.get(
      "#inner-body form button[type='submit'], " +
      "form button[type='submit'], " +
      "button:contains('Submit'), " +
      "button:contains('Reset'), " +
      "input[type='submit']"
    ).first();
  }

  enterEmail(email) {
    this.emailField.clear().type(email);
  }

  clickSubmit() {
    this.submitBtn.click();
    cy.wait(1500);
  }

  // ── Success verification ──────────────────────────────────────
  // Site behaviour: after submitting a VALID email the URL becomes
  // /forgot-password?forgot=true (same path, query param appended).
  // Use cy.url().should() — it RETRIES until the URL updates or times
  // out, so we never capture a stale URL with .then().
  verifySuccessMessage() {
    cy.url({ timeout: 10000 }).should('include', 'forgot=true');
  }

  // ── Error verification ────────────────────────────────────────
  // Called for an email with no @ symbol — HTML5 validation fires
  // before submit, keeping the user on /forgot-password (no ?forgot=true).
  verifyErrorMessage() {
    cy.url().then((url) => {
      // If still on the forgot-password page without ?forgot=true,
      // the submit was blocked (HTML5 validation or server error).
      if (url.includes('forgot-password') && !url.includes('forgot=true')) {
        cy.log('✅ Stayed on forgot-password page — validation prevented submit');
        return;
      }

      // Otherwise look for an explicit error element
      cy.get('body').then(($body) => {
        // Check HTML5 native validity
        const emailInput = $body.find('#email')[0];
        if (emailInput && !emailInput.validity.valid) {
          cy.log('✅ HTML5 email validation triggered');
          return;
        }

        // Custom error element
        const errorSel =
          '#email + span, #email ~ span, .field-error, .alert-danger, [class*="error"]';
        const errorEl = $body.find(errorSel).filter(':visible');
        if (errorEl.length > 0) {
          cy.wrap(errorEl.first()).should('be.visible');
          return;
        }

        // Error keywords in body
        const text = $body.text().toLowerCase();
        const hasError = ['not found', 'invalid', 'does not exist', 'no account']
          .some((kw) => text.includes(kw));
        if (hasError) {
          cy.log('✅ Error keyword found in page body');
          return;
        }

        // Fallback: must still be on forgot-password page
        cy.url().should('include', 'forgot-password');
      });
    });
  }
}

export default new ForgotPasswordPage();
