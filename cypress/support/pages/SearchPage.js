// ============================================================
// SearchPage.js
// Equivalent to: pages/SearchPage.java
// ============================================================

class SearchPage {
  get searchBox() { return cy.get('#small-searchterms'); }
  get searchBtn() { return cy.get("input[value='Search']"); }

  searchItem(item) {
    this.searchBox.clear().type(item);
    this.searchBtn.click();
  }
}

export default new SearchPage();
