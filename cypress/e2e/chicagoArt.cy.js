describe('Chicago Art', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the Chicago Art page and view a github code sample', () => {
    // Open the Chicago Art page
    cy.contains('a', 'Chicago Art Institute Explorer').click();

    // Verify the Chicago Art page loads and open the github code example
    cy.contains('h1', 'Chicago Art Institute Explorer').should('be.visible');
    cy.findByRole('link', {
      name: 'View the code for Chicago Art Institute Explorer on GitHub',
    })
      .invoke('removeAttr', 'target')
      .click();
    cy.assertGithubCodeExampleLoaded();
  });
});
