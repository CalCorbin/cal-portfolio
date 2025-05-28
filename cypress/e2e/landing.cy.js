describe(
  'Landing Page',
  {
    retries: {
      runMode: 2,
    },
  },
  () => {
    beforeEach(() => {
      cy.visit('/');

      // Load the page
      cy.findByText('cal corbin').should('be.visible');
    });

    it('should go to landing page and open the LinkedIn link', () => {
      // Click on the LinkedIn link
      cy.get('a[href="https://www.linkedin.com/in/calcorbin/"]').click();

      // Verify the LinkedIn link opens
      cy.origin('https://www.linkedin.com/in/calcorbin/', () => {
        cy.on('uncaught:exception', (e) => {
          if (e.message.includes('Things went bad')) {
            // we expected this error, so let's ignore it
            // and let the test continue
            return false;
          }
        });
      });
    });

    it('should go to landing page and open the GitHub link', () => {
      // Click on the GitHub link
      cy.get('a[href="https://github.com/CalCorbin"]').click();

      // Verify the GitHub link opens
      cy.origin('https://github.com', () => {
        cy.contains("When I'm not coding").should('be.visible');
      });
    });
  }
);
