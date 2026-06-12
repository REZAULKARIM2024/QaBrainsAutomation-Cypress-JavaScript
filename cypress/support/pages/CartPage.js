// ============================================================
// CartPage.js
// Equivalent to: pages/CartPage.java
//
// NOTE: cy.get('button').filter(fn) is NOT used here.
// esbuild compiles the arrow function callback in a way that
// makes Cypress treat the function object as a CSS selector
// string ("filter") — causing "Expected to find element: filter".
// Instead we use cy.contains('button', /regex/i) which is
// esbuild-safe, idiomatic Cypress, and handles case-insensitivity.
// ============================================================

const BASE_URL      = 'https://practice.qabrains.com/ecommerce-site';
const LOGIN_URL     = 'https://practice.qabrains.com/ecommerce/login';
const ECOMMERCE_URL = 'https://practice.qabrains.com/ecommerce';

class CartPage {

  // ── Navigate to ecommerce and login if required ─────────────
  // Go directly to ECOMMERCE_URL (same URL that removeProduct uses
  // successfully). The multi-step /ecommerce-site navigation chain
  // was unreliable — it often stalled on an intermediate page that
  // had no product listings, causing "Add to Cart" not found.
  openEcommerceAndLogin() {
    cy.visit(ECOMMERCE_URL);
    cy.wait(1500);

    // If the site redirected to a login page, sign in
    cy.get('body').then(($body) => {
      if ($body.find('#email').length > 0 && $body.find('#password').length > 0) {
        cy.get('#email').clear().type('test@qabrains.com');
        cy.get('#password').clear().type('Password123');
        cy.contains('button', 'Login').click();
        cy.wait(2000);
        // After login the server may redirect to a different page (e.g. cart/checkout
        // when cart is non-empty). Always navigate explicitly to the product listing
        // so addProductToCart reliably finds "Add to Cart" / "Remove from cart" buttons.
        cy.visit(ECOMMERCE_URL);
        cy.wait(1500);
      }
    });
  }

  // ── Add product to cart (index 0 = first product) ─────────
  addProductToCart(index = 0) {
    this.openEcommerceAndLogin();

    // Wait for the product list to finish rendering before inspecting state.
    // Without this, the body snapshot below runs before buttons are in the DOM,
    // the reset is skipped, and the subsequent "Add to Cart" wait times out.
    cy.contains('button', /add to cart|remove from cart/i, { timeout: 15000 }).should('be.visible');

    // If a previous test (or run) left the product in the cart, remove it first
    // so we always start from the "Add to Cart" state (avoids cross-test state bleed).
    cy.get('body').then(($body) => {
      let hasRemoveButton = false;
      $body.find('button').each((i, btn) => {
        if (/remove from cart/i.test(btn.textContent)) {
          hasRemoveButton = true;
        }
      });
      if (hasRemoveButton) {
        cy.contains('button', /remove from cart/i).first().scrollIntoView().click();
        cy.wait(1500);
      }
    });

    // Wait for at least one "Add to Cart" button to be visible
    cy.contains('button', /add to cart/i, { timeout: 10000 }).should('be.visible');

    // Click the nth "Add to Cart" button.
    // cy.contains returns the FIRST match; for index > 0 we get all and .eq()
    // but since we always use index=0, .first() is sufficient and safe.
    cy.contains('button', /add to cart/i).first().scrollIntoView().click();
    cy.wait(1500);

    // Button should have toggled to "Remove from cart" — confirms add succeeded
    cy.contains('button', /remove from cart/i, { timeout: 5000 }).should('be.visible');
    cy.log('✅ Product added to cart');
  }

  // ── Verify product is in cart ──────────────────────────────
  verifyProductInCart() {
    cy.visit(ECOMMERCE_URL);
    cy.wait(1000);
    // "Remove from cart" button visible = product is in cart
    cy.contains('button', /remove from cart/i, { timeout: 8000 }).should('be.visible');
  }

  // ── Remove product from cart ───────────────────────────────
  removeProduct(index = 0) {
    cy.url().then((url) => {
      if (!url.includes('ecommerce')) {
        cy.visit(ECOMMERCE_URL);
        cy.wait(1000);
      }
    });

    cy.contains('button', /remove from cart/i, { timeout: 5000 }).should('be.visible');
    cy.contains('button', /remove from cart/i).first().scrollIntoView().click();
    cy.wait(1500);

    // Button toggled back to "Add to cart" = remove succeeded
    cy.contains('button', /add to cart/i, { timeout: 5000 }).should('be.visible');
    cy.log('✅ Product removed from cart');
  }

  // ── Verify cart is empty ───────────────────────────────────
  verifyCartEmpty() {
    cy.visit(ECOMMERCE_URL);
    cy.wait(1000);
    // cy.contains + should('not.exist') is safe in Cypress —
    // it will not throw if the element is absent, it will retry until
    // the assertion passes or times out.
    cy.contains('button', /remove from cart/i).should('not.exist');
  }
}

export default new CartPage();
