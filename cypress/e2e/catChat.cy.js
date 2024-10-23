describe('Cat Chat', () => {
  beforeEach(() => cy.visit('/'));

  it('should open the Cat Chat project and view the github code example', () => {
    // Click on the Cat Chat project
    cy.contains('a', 'Cat Chat').click();

    // Verify the Cat Chat project loads and open the github code example
    cy.contains('h1', 'Cat Chat').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for Cat Chat on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });

  it('should open the Cat Chat project, then navigate back to the home page', () => {
    // Click on the Cat Chat project
    cy.contains('a', 'Cat Chat').click();

    // Verify the Cat Chat project loads and navigate back to the home page
    cy.contains('h1', 'Cat Chat').should('be.visible');
    cy.contains('button', 'Back').click();

    // Verify the home page loads
    cy.contains('div', 'cal corbin').should('be.visible');
  });
});
