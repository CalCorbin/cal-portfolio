describe('Cat Chat', () => {
  beforeEach(() => cy.visit('/'));

  it('should open the Cat Chat project and view the github code example', () => {
    // Click on the Cat Chat project
    cy.contains('a', 'Cat Chat').invoke('removeAttr', 'target').click();

    // Verify the Cat Chat project loads and open the github code example
    cy.contains('h1', 'Cat Chat').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for Cat Chat on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });
});
