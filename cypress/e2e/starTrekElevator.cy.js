describe('Star Trek Elevator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the Star Trek Elevator page and view a github code sample', () => {
    // Open the Star Trek Elevator page
    cy.contains('a', 'Star Trek Elevator')
      .invoke('removeAttr', 'target')
      .click();

    // Verify the Star Trek Elevator github code example loads
    cy.assertGithubReadmeLoaded('elevatorGame');
  });
});
