describe('Minesweeper e2e tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should open the minesweeper project and view the github code example', () => {
    // Open the minesweeper project
    cy.contains('a', 'MineSweeper').invoke('removeAttr', 'target').click();

    // Verify minesweeper page loads and open the github code example
    cy.contains('h1', 'Mine Sweeper').should('be.visible');
  });
});
