import { session1cookie } from "../consts";

describe('Registro', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.setCookie('sessionInfoState', JSON.stringify(session1cookie));
        cy.visit('/perfil')
    });

    it("Rellena y envía el formulario", () => {
      // Verifica que el formulario existe
      cy.get("form").should("exist").and("be.visible");

      // Rellena los campos del formulario
      // Rellena los campos del formulario

      cy.get('input[id="name"]').should("exist").clear().type("Victor Hugo");

      cy.get('input[id="surname"]')
        .should("exist")
        .clear()
        .type("Apellido De Prueba");

      cy.get('input[id="phone_number"]').should("exist").type("616587195");

      cy.get('input[id="address"]')
        .should("exist")
        .type("Talavera de la reina");

      cy.get('input[id="city"]').should("exist").type("Ciudad de prueba");

      cy.get('input[id="username"]')
        .should("exist")
        .clear()
        .type("videoclubtala0102");

      cy.get('input[id="bornDate"]').should("exist").type("1990-01-01");

      // Envía el formulario
      cy.get('button[type="submit"]').click();
      cy.get('input[id="name"]').type("Victor Hugo");
      cy.get('button[type="submit"]').click();

      cy.intercept('POST', 'http://localhost:4321/api/clients/clients').as('postClients');

      cy.wait('@postClients').then(({ response }) => {
        if (response.statusCode === 500) {
          throw new Error(`Error 500 en la solicitud POST a /api/clients/clients. Respuesta: ${JSON.stringify(response.body)}`);
        }
      
        cy.log(`Respuesta del servidor POST a /api/clients/clients: ${JSON.stringify(response.body)}`);
      });
      
        cy.request('DELETE', `${Cypress.env('hostApi')}/api/clients/email/${session1cookie.sessionInfo.OAuth.user.email}`).then((response) => {
          cy.log(JSON.stringify(response.body));
        });


      //Borrar el usuario creado
      // cy.request('POST', 'https', { clave: 'valor' }).then((response) => {
      //     // haz algo con response.body o response.status
      // })
    });


});