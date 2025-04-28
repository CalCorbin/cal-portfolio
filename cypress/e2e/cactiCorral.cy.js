describe('Cacti Corral', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(
    'should open the Cacti Corral page and view a github code sample',
    {
      retries: {
        runMode: 2,
      },
    },
    () => {
      // Open the Cacti Corral page
      cy.contains('a', 'Cacti Corral').click();

      // Verify the Cacti Corral github code example loads
      cy.assertGithubReadmeLoaded('cacti-corral');
    }
  );
});
