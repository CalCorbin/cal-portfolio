describe('HexClock', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should visit the HexClock project and view the github code example', () => {
    // Open the HexClock project
    cy.contains('a', 'HexClock').click();
    cy.contains('h1', 'HexClock').should('be.visible');
  });
});
