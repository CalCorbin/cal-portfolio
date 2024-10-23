describe('Chicago Art', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the Chicago Art page and view a github code sample', () => {
    // Open the Chicago Art page
    cy.contains('a', 'Art Institute of Chicago Search').click();

    // Verify the Chicago Art page loads and open the github code example
    cy.contains('h1', 'Art Search').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for Art Search on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });

  it('should open the Chicago Art page, then navigate back to the home page', () => {
    // Open the Chicago Art page
    cy.contains('a', 'Art Institute of Chicago Search').click();

    // Verify the Chicago Art page loads and navigate back to the home page
    cy.contains('h1', 'Art Search').should('be.visible');
    cy.contains('button', 'Back').click();

    // Verify the home page loads
    cy.contains('div', 'cal corbin').should('be.visible');
  });
});
