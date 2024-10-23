describe('HexClock', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should visit the HexClock project and view the github code example', () => {
    // Open the HexClock project
    cy.contains('a', 'HexClock').click();

    // Verify the HexClock page loads and open the github code example
    cy.contains('h1', 'HexClock').should('be.visible');
    cy.findByRole('link', { name: 'View the code for HexClock on GitHub' })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });

  it('should open the HexClock project, then navigate back to the home page', () => {
    // Open the HexClock project
    cy.contains('a', 'HexClock').click();

    // Verify the HexClock page loads and navigate back to the home page
    cy.contains('h1', 'HexClock').should('be.visible');
    cy.contains('button', 'Back').click();

    // Verify the home page loads
    cy.contains('div', 'cal corbin').should('be.visible');
  });
});
