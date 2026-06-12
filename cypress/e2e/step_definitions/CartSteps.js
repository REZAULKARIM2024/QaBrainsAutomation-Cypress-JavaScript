// ============================================================
// CartSteps.js
// Equivalent to: stepdefinitions/CartSteps.java
// ============================================================

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import cartPage from '../../support/pages/CartPage';

When('User adds products to cart', () => {
  cartPage.addProductToCart(0);
});

Then('Product should appear in cart', () => {
  cartPage.verifyProductInCart();
});

When('User removes product from cart', () => {
  cartPage.removeProduct(0);
});

Then('Cart should be empty', () => {
  cartPage.verifyCartEmpty();
});
