import { session2cookie } from "../consts";
  
const PROFILETHUMB_SELECTOR = '#profileThumb_registro';

describe('Perfil', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.setCookie('sessionInfoState', JSON.stringify(session2cookie));
        cy.visit('/perfil')
    });

    it('should have main thumbnail', () => {
        cy.get(PROFILETHUMB_SELECTOR).should('exist').and('be.visible');
    });
});