describe('Furbot e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the furbot project and view the github code example', () => {
    // Open the furbot project
    cy.contains('a', 'Furbot: The Discord Bot')
      .invoke('removeAttr', 'target')
      .click();

    // Verify the github readme page loads for furbot
    cy.origin('https://github.com', () => {
      cy.get('div[id="repository-container-header"]').should('be.visible');
      cy.contains('a', 'furbot').should('be.visible');
    });
  });
});
