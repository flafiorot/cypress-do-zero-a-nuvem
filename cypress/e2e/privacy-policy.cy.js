describe('Página de política de privacidade', () => {
  beforeEach(() => {
    cy.visit('../src/privacy.html');
  });

  it.only('testa a página da política de privacidade de forma independente', () => {
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
    cy.get('#white-background > :nth-child(5)').should(
      'have.text',
      'Talking About Testing',
    );
    cy.contains('p', 'Talking About Testing').should('be.visible');

    cy.get('p').last().should('have.text', 'Talking About Testing');
  });
});
