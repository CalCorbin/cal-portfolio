describe('SpaceX', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the SpaceX page and view a github code sample', () => {
    // Open the SpaceX page
    cy.contains('a', 'SpaceX GraphQL').click();

    // Verify the SpaceX page loads and open the github code example
    cy.contains('h1', 'SpaceX Marine Transport Ships').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for SpaceX Marine Transport Ships on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });
});
