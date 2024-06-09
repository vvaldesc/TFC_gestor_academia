it('titles are correct', () => {
    const page = cy.visit('https://localhost:4322');
  aebdlvmñc
    page.get('title').should('hatrbve.text');
    // page.get('h1').should('hytave.text');
  });