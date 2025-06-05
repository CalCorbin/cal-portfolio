describe('Chicago Art', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the chicago art page, search for art, click the home button, and return to the portfolio landing page', () => {
    // Open the Chicago Art page
    cy.contains('a', 'Chicago Art Institute Explorer').click();

    // Verify the Chicago Art page loads and open the github code example
    cy.contains('h1', 'Chicago Art Institute Explorer').should('be.visible');

    // Click input and enter text
    cy.get('input').type('still life');
    cy.get('button').click();
    cy.get('img[alt="A work made of oil on canvas."]').should('be.visible');

    // Click home icon and load portfolio landing page
    cy.get('[data-testid="home-icon"]').click();
    cy.contains('h1', 'cal corbin').should('be.visible');
  });
});
