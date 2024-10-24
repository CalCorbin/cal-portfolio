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
});
