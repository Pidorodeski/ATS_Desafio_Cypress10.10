// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
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

Cypress.Commands.add('cadastrarCandidato', (nome) =>{
  cy.intercept('POST','**/candidatos').as('postCandidato')
  cy.get('#criar_novo_candidato').click()
  cy.contains('div', 'Cadastrar novo Candidato').should('be.visible')
  cy.get('.po-input').type(nome)
  cy.contains('span', 'Salvar').click()
  cy.contains('.po-table-column', nome).should('be.exist')
  cy.wait('@postCandidato').its('response.statusCode').should('eq', 201)
})

Cypress.Commands.add('editarCandidato', (nome, nomeEdicao) =>{
  cy.intercept('PUT', '**/candidatos/**').as('putCandidato')
  cy.get('#swal2-title').should('not.be.exist')
  cy.get('.po-table-group-row')
    .contains('tr', nome)
    .scrollTo('bottom',{ensureScrollable: false})
    .find('.po-table-column-actions')
    .click()
  cy.get('.po-popup-container > :nth-child(1)').click()
  cy.get('.po-input').clear().type(nomeEdicao)
  cy.contains('span', 'Salvar').click()
  cy.contains('.po-table-column', nomeEdicao).should('be.exist')
  cy.wait('@putCandidato').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('deletarCandidato', (nome) =>{
  cy.intercept('DELETE', '**/candidatos/***').as('deleteCandidato')
  cy.get('#swal2-title').should('not.be.exist')
  cy.get('.po-table-group-row')
    .contains('tr', nome)
    .scrollTo('bottom',{ensureScrollable: false})
    .find('.po-table-column-actions')
    .click()
  cy.get('.po-popup-container > :nth-child(2)').click()
  cy.get('#swal2-title').should('contain', 'Gostaria de deletar Candidato?')
  cy.contains('button', 'Deletar').click()
  cy.contains('.po-table-column', nome).should('not.be.exist')
  cy.wait('@deleteCandidato').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('cadastrarVaga', (vaga) =>{
  cy.intercept('POST','**/vagas').as('postVaga')
  cy.get('#criar_nova_vaga').click()
  cy.contains('div', 'Cadastrar nova vaga').should('be.visible')
  cy.get('.po-input').type(vaga)
  cy.contains('span', 'Salvar').click()
  cy.contains('.po-table-column', vaga).should('be.exist')
  cy.wait('@postVaga').its('response.statusCode').should('eq', 201)
})

Cypress.Commands.add('editarVaga', (vaga, vagaEdicao) =>{
  cy.intercept('PUT', '**/vagas/**').as('putVaga')
  cy.get('#swal2-title').should('not.be.exist')
  cy.get('.po-table-group-row')
    .contains('tr', vaga)
    .scrollTo('bottom',{ensureScrollable: false})
    .find('.po-table-column-actions')
    .click()
  cy.get('.po-popup-container > :nth-child(1)').click()
  cy.get('.po-input').clear().type(vagaEdicao)
  cy.contains('span', 'Salvar').click()
  cy.contains('.po-table-column', vagaEdicao).should('be.exist')
  cy.wait('@putVaga').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('deletarVaga', (vaga) =>{
  cy.intercept('DELETE', '**/vagas/***').as('deleteVaga')
  cy.get('#swal2-title').should('not.be.exist')
  cy.get('.po-table-group-row')
    .contains('tr', vaga)
    .scrollTo('bottom',{ensureScrollable: false})
    .find('.po-table-column-actions')
    .click()
  cy.get('.po-popup-container > :nth-child(2)').click()
  cy.get('#swal2-title').should('contain', 'Gostaria de deletar Vaga?')
  cy.contains('button', 'Deletar').click()
  cy.contains('.po-table-column', vaga).should('not.be.exist')
  cy.wait('@deleteVaga').its('response.statusCode').should('eq', 200)
})