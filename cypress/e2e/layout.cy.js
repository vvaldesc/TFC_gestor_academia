const cookieValue = {
  sessionState: 2,
  sessionInfo: {
    OAuth: { user: {
      id: 1,
      name: 'Víctor',
      email: 'victorvaldescobos@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocKzfoTnzs-nio7LCynxeRM-_zVyswLSKkOOgStQ3fhxKbgzizZl1Q=s96-c',
    }, expires: '2024-07-18T18:33:37.885Z' },
    profile: {
      id: 1,
      name: 'Víctor',
      surname: 'Valdés Cobos',
      email: 'victorvaldescobos@gmail.com',
      phone_number: '123459789',
      address: '123 Main St',
      city: 'New York',
      bornDate: '1990-01-01T00:00:00.000Z',
      created_at: '2024-06-08T23:11:00.000Z',
      updated_at: '2024-06-08T23:11:00.000Z',
      username: 'johndoedd',
      image: '',
      active: true
    },
    role: 'Clients',
    profilePhotoSrc: 'https://lh3.googleusercontent.com/a/ACg8ocKzfoTnzs-nio7LCynxeRM-_zVyswLSKkOOgStQ3fhxKbgzizZl1Q=s96-c'
  }
};

const APP_SELECTOR = '#App';
const HEADER_SELECTOR = 'header';
const FOOTER_SELECTOR = 'footer';
const PROFILETHUMB_SELECTOR = '#profileThumb_header';

describe('Layout', () => {
  beforeEach(() => {
    // Visita la página inicial antes de cada prueba
    cy.visit('/')
    cy.setCookie('sessionInfoState', JSON.stringify(cookieValue));
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

it('Profilephoto src is set', () => {
  // Verifica que el atributo src del elemento img del encabezado exista
  cy.visit('/')
  cy.setCookie('sessionInfoState', JSON.stringify(cookieValue));
  cy.visit('/')
  cy.intercept('GET', 'https://lh3.googleusercontent.com/a/ACg8ocKzfoTnzs-nio7LCynxeRM-_zVyswLSKkOOgStQ3fhxKbgzizZl1Q=s96-c').as('getProfilePhoto');
  cy.wait('@getProfilePhoto');
  cy.get('#profileThumb_header')
    .should('have.attr', 'srcset')
    .and('be.a', 'image');
});