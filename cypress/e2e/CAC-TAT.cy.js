describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  }),
    it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock();
    cy.get('#firstName').click().type('Flávia');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('fla.costa@gmail.com');

    const textoLongo = Cypress._.repeat('Digitei o elogio', 20);
    cy.get('#open-text-area').type(textoLongo, { delay: 0 });
    cy.contains('.button', 'Enviar').click();

    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
    // .should('contain.text','Mensagem enviada com sucesso.', seria outra opção
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock();
    cy.get('#firstName').type('Flávia');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('fla.costa@');
    cy.get('#open-text-area').type('Digitei o elogio');
    cy.contains('.button', 'Enviar').click();

    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it('campo telefone continua vazio se digitar algo não numérico', () => {
    cy.get('#phone').type('flafla');
    cy.get('#phone').should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock();
    cy.get('#firstName').type('Flávia');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('fla.costa@');
    cy.get('#open-text-area').type('Digitei o elogio');
    cy.get('#phone-checkbox').check();
    cy.contains('.button', 'Enviar').click();

    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('campoNome');
    cy.get('@campoNome').type('Flávia');
    cy.get('@campoNome').should('have.value', 'Flávia');
    cy.get('@campoNome').clear();
    cy.get('@campoNome').should('have.value', '');
    cy.get('#lastName').type('Costa');
    cy.get('#lastName').should('have.value', 'Costa');
    cy.get('#lastName').clear();
    cy.get('#lastName').should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock();
    cy.contains('.button', 'Enviar').click();

    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  });

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmitParam(
      'Marcos',
      'Silva',
      'email@marcos.com',
      'elogio',
    );

    cy.get('.success').should('be.visible');
  });

  it('envia o formulário com comando customizado e objeto', () => {
    cy.clock();
    const data = {
      nome: 'Maria',
      sobrenome: 'Abrão',
      email: 'maria@maria.com',
      elogio: 'elogiei',
    };
    cy.fillMandatoryFieldsAndSubmitObjeto(data);
    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  });

  it('envia o formulário com comando customizado e padrão', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitPadrao({ nome: 'João' });

    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((radio) => {
      cy.wrap(radio).check().should('be.checked');
    });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    //primeira opção:
    // cy.get('#email-checkbox').check();
    // cy.get('#phone-checkbox').check();

    //segunda opeção:
    // cy.get('input[type="checkbox"]').as('checkboxes').check();

    // cy.get('@checkboxes').each((checkbox) => {
    //   cy.wrap(checkbox).should('be.checked');
    // });

    // cy.get('@checkboxes').last().uncheck();
    // cy.get('@checkboxes').last().should('not.be.checked');

    //terceira opção - mais adequada:
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json');
    cy.get('input[type="file"]').should((input) => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {
      action: 'drag-drop',
    });
    cy.get('input[type="file"]').should((input) => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivo');
    cy.get('#file-upload')
      .selectFile('@arquivo')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click();

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  });

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  });

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'teste preenchendo com invoke')
      .should('have.value', 'teste preenchendo com invoke');
  });

  it('faz uma requisição HTTP', () => {
    cy.request(
      'GET',
      'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',
    )
      // .then((response) => {
      //   expect(response.status).to.eq(200);
      //   expect(response.statusText).to.eq('OK');
      //   // expect(response.body).to.have.text('CAC TAT');
      //   expect(response.body).to.include('CAC TAT');
      // });
      //outra opção:
      .as('getRequest')
      .its('status')
      .should('be.equal', 200);

    cy.get('@getRequest').its('statusText').should('be.equal', 'OK');
    cy.get('@getRequest').its('body').should('include', 'CAC TAT');
  });
});
