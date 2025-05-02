describe('Minesweeper', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the minesweeper project and view the github code example', () => {
    // Open the minesweeper project
    cy.contains('a', 'MineSweeper').click();
    cy.contains('h1', 'Mine Sweeper').should('be.visible');
  });
});
