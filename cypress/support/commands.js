Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Flavia');
  cy.get('#lastName').type('Fiorot');
  cy.get('#email').type('fla@gg.com');
  cy.get('#open-text-area').type('Elogio');
  cy.contains('.button', 'Enviar').click();
});

Cypress.Commands.add(
  'fillMandatoryFieldsAndSubmitParam',
  (nome, sobrenome, email, elogio) => {
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    cy.get('#open-text-area').type(elogio);
    cy.contains('.button', 'Enviar').click();
  },
);

//um objeto como parâmetro:
Cypress.Commands.add('fillMandatoryFieldsAndSubmitObjeto', (data) => {
  cy.get('#firstName').type(data.nome);
  cy.get('#lastName').type(data.sobrenome);
  cy.get('#email').type(data.email);
  cy.get('#open-text-area').type(data.elogio);
  cy.contains('.button', 'Enviar').click();
});

//usando valores padrão
Cypress.Commands.add('fillMandatoryFieldsAndSubmitPadrao', (data = {}) => {
  const defaults = {
    nome: 'Ana',
    sobrenome: 'Souza',
    email: 'ana.souza@test.com',
    elogio: 'Excelente atendimento!',
  };

  const formData = { ...defaults, ...data };

  cy.get('#firstName').type(formData.nome);
  cy.get('#lastName').type(formData.sobrenome);
  cy.get('#email').type(formData.email);
  cy.get('#open-text-area').type(formData.elogio);
  cy.contains('.button', 'Enviar').click();
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
