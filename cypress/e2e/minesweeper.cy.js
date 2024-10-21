describe('Minesweeper e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the minesweeper project and view the github code example', () => {
    // Open the minesweeper project
    cy.contains('a', 'MineSweeper').invoke('removeAttr', 'target').click();

    // Verify minesweeper page loads and open the github code example
    cy.contains('h1', 'Mine Sweeper').should('be.visible');
    cy.findByRole('link', { name: 'View the code for Mine Sweeper on GitHub' })
      .invoke('removeAttr', 'target')
      .click();

    // Verify the github code example page loads
    cy.origin('https://github.com', () => {
      cy.get('div[data-testid="blob-size"]').should('be.visible');
    });
  });
});
