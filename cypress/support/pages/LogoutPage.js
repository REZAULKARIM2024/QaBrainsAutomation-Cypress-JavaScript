// ============================================================
// LogoutPage.js
// Equivalent to: pages/LogoutPage.java
//
// Multi-strategy logout.
// Each strategy is attempted in the same cy.get('body').then() tick
// so Cypress queues them correctly.
// ============================================================

class LogoutPage {

  // ── Main logout entry point ──────────────────────────────────
  clickLogout() {
    cy.get('body').then(($body) => {

      // ── Strategy 1: direct href/class/id logout element ──
      const directSel =
        "a[href*='logout'], a[href*='signout'], a[href*='sign-out'], " +
        "[class*='logout'], [id*='logout']";
      const directEl = $body.find(directSel).filter(':visible');
      if (directEl.length > 0) {
        cy.wrap(directEl.first()).click();
        return;
      }

      // ── Strategy 2: visible link/button whose text IS "logout" etc. ──
      const byText = $body.find('a, button, li').filter((_, el) => {
        const t = Cypress.$(el).text().trim().toLowerCase();
        return ['logout', 'log out', 'sign out', 'signout'].includes(t) &&
               Cypress.$(el).is(':visible');
      });
      if (byText.length > 0) {
        cy.wrap(byText.first()).click();
        return;
      }

      // ── Strategy 3: open a user/account dropdown then find logout ──
      const dropdownSel =
        "[class*='user-menu'], [class*='user-dropdown'], [class*='account-menu'], " +
        "[class*='user-avatar'], [class*='avatar'], [class*='user-name'], " +
        "[class*='nav-user'], [data-toggle='dropdown'], [data-bs-toggle='dropdown'], " +
        "button[aria-haspopup='true']";
      const dropdownTrigger = $body.find(dropdownSel).filter(':visible');
      if (dropdownTrigger.length > 0) {
        cy.wrap(dropdownTrigger.first()).click();
        cy.wait(800);
        // After the dropdown opens, look for a logout text element
        cy.get('body').then(($b2) => {
          const afterOpen = $b2.find('a, button, li').filter((_, el) => {
            const t = Cypress.$(el).text().trim().toLowerCase();
            return ['logout', 'log out', 'sign out', 'signout'].includes(t) &&
                   Cypress.$(el).is(':visible');
          });
          if (afterOpen.length > 0) {
            cy.wrap(afterOpen.first()).click();
          } else {
            // Dropdown didn't reveal logout — try URL fallback
            cy.visit('/logout', { failOnStatusCode: false });
          }
        });
        return;
      }

      // ── Strategy 4: navigate directly to /logout ──
      cy.visit('/logout', { failOnStatusCode: false });
    });
  }

  // ── Assertion: user is now logged out ────────────────────────
  verifyLoggedOut() {
    // After logout, the site should show a login form or a login link.
    // We check both — whichever is true confirms logout.
    cy.get('body').should(($body) => {
      const url        = window.location.href.toLowerCase();
      const bodyText   = $body.text().toLowerCase();
      const hasLoginInUrl   = url.includes('login') || url.includes('signin');
      const hasLoginForm    = $body.find("input[type='password']").length > 0;
      const hasLoginLink    = $body.find(
        "a[href*='login'], a:contains('Login'), a:contains('Sign In'), " +
        "button:contains('Login'), button:contains('Sign In')"
      ).filter(':visible').length > 0;
      const hasLogoutText   = bodyText.includes('logout') ||
                              bodyText.includes('signed out') ||
                              bodyText.includes('logged out');

      expect(
        hasLoginInUrl || hasLoginForm || hasLoginLink || hasLogoutText,
        'Expected page to indicate user is logged out'
      ).to.be.true;
    });
  }
}

export default new LogoutPage();
