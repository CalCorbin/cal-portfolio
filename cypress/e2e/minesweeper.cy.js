describe('Minesweeper', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the minesweeper project and view the github code example', () => {
    // Open the minesweeper project
    cy.contains('a', 'MineSweeper').click();

    // Verify minesweeper page loads and open the github code example
    cy.contains('h1', 'Mine Sweeper').should('be.visible');
    cy.findByRole('link', { name: 'View the code for Mine Sweeper on GitHub' })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });

  it('should open the minesweeper project, then go back to the home page', () => {
    // Open the minesweeper project
    cy.contains('a', 'MineSweeper').click();

    // Verify minesweeper page loads and go back to the home page
    cy.contains('h1', 'Mine Sweeper').should('be.visible');

    // Go back to the home page
    cy.contains('button', 'Back').click();

    // Verify home page loads
    cy.contains('div', 'cal corbin').should('be.visible');
  });
});
