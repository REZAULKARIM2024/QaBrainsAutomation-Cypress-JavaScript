// ============================================================
// HomePage.js
// Equivalent to: pages/HomePage.java
// ============================================================

class HomePage {
  get homeHeader()    { return cy.get('header'); }
  get catalogLink()   { return cy.get("a[href*='catalog']"); }
  get aboutLink()     { return cy.get("a[href*='about']"); }
  get blogLink()      { return cy.get("a[href*='blog']"); }
  get wishListLink()  { return cy.get("a[href*='wishlist']"); }
  get referFriendLink() { return cy.get("a[href*='refer']"); }
  get searchBox()     { return cy.get("[name='q']"); }
  get searchButton()  { return cy.get("button[type='submit']"); }
  get noResultMessage() {
    return cy.contains(/No results|no products/i);
  }

  // Actions
  clickCatalog()      { this.catalogLink.click(); }
  clickAbout()        { this.aboutLink.click(); }
  clickBlog()         { this.blogLink.click(); }
  clickWishList()     { this.wishListLink.click(); }
  clickReferFriend()  { this.referFriendLink.click(); }
  enterSearchText(text) { this.searchBox.clear().type(text); }
  clickSearchButton() { this.searchButton.click(); }

  // Assertions
  verifyHomePageDisplayed() {
    this.homeHeader.should('be.visible');
  }

  verifyNoResultDisplayed() {
    this.noResultMessage.should('be.visible');
  }
}

export default new HomePage();
