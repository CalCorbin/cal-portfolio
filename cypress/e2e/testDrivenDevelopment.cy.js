describe('Test Driven Development', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the Test Driven Development page and view a github code sample', () => {
    // Open the Test Driven Development page
    cy.contains('a', 'Test Driven Development').click();

    // Verify the Test Driven Development github code example loads
    cy.assertGithubCodeExampleLoaded();
  });
});
