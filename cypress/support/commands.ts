// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

// Custom command for asserting Github code example loaded
Cypress.Commands.add('assertGithubCodeExampleLoaded', () => {
  cy.origin('https://github.com', () => {
    cy.get('div[data-testid="blob-size"]').should('be.visible');
  });
});

// Custom command for asserting Github README loaded
Cypress.Commands.add('assertGithubReadmeLoaded', (title: string) => {
  cy.origin('https://github.com', { args: { title } }, ({ title }) => {
    cy.get('div[id="repository-container-header"]').should('be.visible');
    cy.contains('a', title).should('be.visible');
  });
});
