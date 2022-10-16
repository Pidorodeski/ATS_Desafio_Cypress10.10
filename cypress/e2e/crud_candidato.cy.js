/// <reference types="cypress" />

context('Realizar teste de CRUD na tela de Candidatos', () => {
  const { faker } = require('@faker-js/faker');
  let nomeCandidato
  beforeEach(() => {
    cy.intercept('GET', '**/candidatos').as('getCandidatos')
    cy.visit('/candidato')
    cy.title().should('eq', 'Desafio ATS')
    cy.get('.po-table-no-data > .po-text-center').should('have.text','CRUD de candidatos')
    nomeCandidato = faker.lorem.words(4)
  })

  it('Cadastrar um Candidato', () => {
    cy.cadastrarCandidato(nomeCandidato)
    cy.wait('@getCandidatos')
  })

  it('Editar um candidato', () =>{
    const nomeCandidatoEdicao = faker.lorem.words(4)
    cy.cadastrarCandidato(nomeCandidato)
    cy.wait('@getCandidatos')

    cy.editarCandidato(nomeCandidato, nomeCandidatoEdicao)
    cy.wait('@getCandidatos')
  })

  it('Deletar um candidato', () =>{
    cy.cadastrarCandidato(nomeCandidato)
    cy.wait('@getCandidatos')

    cy.deletarCandidato(nomeCandidato)
    cy.wait('@getCandidatos')
  })

  it('Tenar cadastrar candidato com nome vazio', () =>{
    cy.cadastrarCandidato()
  })
})
