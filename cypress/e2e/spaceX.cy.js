describe('SpaceX', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(
    'should open the SpaceX page and view a github code sample',
    {
      retries: {
        runMode: 2,
      },
    },
    () => {
      // Open the SpaceX page
      cy.contains('a', 'SpaceX GraphQL').click();
      cy.contains('h1', 'SpaceX Marine Transport Ships').should('be.visible');
    }
  );
});
