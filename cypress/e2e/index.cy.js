describe('Página de inicio', () => {
    beforeEach(() => {
      // Visita la página de inicio antes de cada prueba
      cy.visit('/')
    })
  
    it('El título de la página no está vacío', () => {
      // Verifica que el título de la página no esté vacío
      cy.title().should('not.be.empty');
    });
  
    it('El título de la página es correcto', () => {
      // Verifica que el título de la página sea igual a 'Home'
      cy.title().should('eq', 'Home');
    });
  });