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
  const PROFILETHUMB_SELECTOR = '#profileThumb_registro';

describe('Perfil', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.setCookie('sessionInfoState', JSON.stringify(cookieValue));
        cy.visit('/perfil')
    });

    it('should have main thumbnail', () => {
        cy.get(PROFILETHUMB_SELECTOR).should('exist').and('be.visible');
    });
});