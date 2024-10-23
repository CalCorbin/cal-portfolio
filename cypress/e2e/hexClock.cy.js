describe('HexClock', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should visit the HexClock project and view the github code example', () => {
    // Open the HexClock project
    cy.contains('a', 'HexClock').invoke('removeAttr', 'target').click();

    // Verify the HexClock page loads and open the github code example
    cy.contains('h1', 'HexClock').should('be.visible');
    cy.findByRole('link', { name: 'View the code for HexClock on GitHub' })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });
});