describe('Chicago Art', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the Chicago Art page and view a github code sample', () => {
    // Open the Chicago Art page
    cy.contains('a', 'Chicago Art Institute Explorer').click();

    // Verify the Chicago Art page loads and open the github code example
    cy.contains('h1', 'Chicago Art Institute Explorer').should('be.visible');

    // TODO - Add back github link assertion once refactor of Chicago Art is complete
    // cy.findByRole('link', {
    //   name: 'View the code for Chicago Art Institute Explorer on GitHub',
    // })
    //   .invoke('removeAttr', 'target')
    //   .click();
    // cy.assertGithubCodeExampleLoaded();

    // Click input and enter text
    cy.get('input').type('still life');
    cy.get('button').click();
    cy.get('img[alt="A work made of oil on canvas."]').should('be.visible');
  });
});
