it('titles are correct', () => {
    const page = cy.visit('https://localhost:4322');
    page.get('title').should('have.text');
    // page.get('h1').should('hytave.text');
  });