describe('Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-15');
  });

  it('should open the Tic Tac Toe page and view a github code sample', () => {
    // Open the Tic Tac Toe page
    cy.contains('a', 'Tic Tac Toe').invoke('removeAttr', 'target').click();

    // Verify the Tic Tac Toe page loads and open the github code example
    cy.contains('h1', 'Tic Tac Toe').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for Tic Tac Toe on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });
});
