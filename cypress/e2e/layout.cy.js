import { session2cookie } from "../consts";


const APP_SELECTOR = '#App';
const HEADER_SELECTOR = 'header';
const FOOTER_SELECTOR = 'footer';
const PROFILETHUMB_SELECTOR = '#profileThumb_header';

describe('Layout', () => {
  beforeEach(() => {
    // Visita la página inicial antes de cada prueba
    cy.visit('/')
    cy.setCookie('sessionInfoState', JSON.stringify(session2cookie));
    cy.visit('/')
  })

  it('Los títulos no están vacíos', () => {
    // Verifica que el título de la página no esté vacío
    cy.title().should('not.be.empty');
  });
  
  it('Main container is in DOM', () => {
    // Verifica que el contenedor principal exista y sea visible
    cy.get(APP_SELECTOR).should('exist').and('be.visible');
  });

  it('Header set', () => {
    // Verifica que el encabezado exista
    cy.get(HEADER_SELECTOR).should('exist').and('be.visible');
  })

  it('Footer set', () => {
    // Verifica que el pie de página exista
    cy.get(FOOTER_SELECTOR).should('exist').and('be.visible')
  })

  it('Profilephoto exists', () => {
    // Verifica que la imagen exista
    cy.get('#profileThumb_header')
      .should('be.visible')
  })
})