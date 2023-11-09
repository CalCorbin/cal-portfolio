describe('Portfolio Site', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(`should visit the portfolio landing page at ${
    Cypress.config().baseUrl
  }`, () => {
    cy.contains('div', 'cal corbin');
  });
});
