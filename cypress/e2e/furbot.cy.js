describe('Furbot', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it(
    'should open the furbot project and view the github code example',
    {
      retries: {
        runMode: 2,
      },
    },
    () => {
      // Open the furbot project
      cy.contains('a', 'Furbot: The Discord Bot').click();

      // Verify the github readme page loads for furbot
      cy.assertGithubReadmeLoaded('furbot');
    }
  );
});
