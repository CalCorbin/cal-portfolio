describe('Star Trek Elevator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(
    'should open the Star Trek Elevator page and view a github code sample',
    {
      retries: {
        runMode: 2,
      },
    },
    () => {
      // Open the Star Trek Elevator page
      cy.contains('a', 'Star Trek Elevator').click();
      cy.assertGithubReadmeLoaded('elevatorGame');
    }
  );
});
