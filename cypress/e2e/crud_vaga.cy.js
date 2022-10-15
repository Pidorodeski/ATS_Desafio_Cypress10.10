/// <reference types="cypress" />

context('Realizar teste de CRUD na tela de Vagas', () => {
  const faker = require('faker')
  let nomeVaga
  beforeEach(() => {
    cy.intercept('GET', '**/vagas').as('getVagas')
    cy.visit('/vagas')
    cy.title().should('eq', 'Desafio ATS')
    cy.get('.po-table-no-data > .po-text-center').should('have.text','CRUD de vagas')
    nomeVaga = faker.lorem.words(4)
  })

  it('Cadastrar uma Vaga', () => {
    cy.cadastrarVaga(nomeVaga)
    cy.wait('@getVagas')
  })

  it('Editar uma Vaga', () =>{
    const nomeVagaEdicao = faker.lorem.words(4)
    cy.cadastrarVaga(nomeVaga)
    cy.wait('@getVagas')

    cy.editarVaga(nomeVaga, nomeVagaEdicao)
    cy.wait('@getVagas')
  })

  it('Deletar uma Vaga', () =>{
    cy.cadastrarVaga(nomeVaga)
    cy.wait('@getVagas')

    cy.deletarVaga(nomeVaga)
    cy.wait('@getVagas')
  })
})
