/// <reference types="cypress" />

context('Realizar teste de CRUD na tela de Curriculo', () => {
  const faker = require('faker')
  let nomeCandidato
  beforeEach(() => {
    nomeCandidato = faker.lorem.words(4)
  })

  it.only('Cadastrar um Curriculo', () => {
    cy.intercept('GET', '**/candidatos').as('getCandidatos')
    cy.visit('/candidato')
    cy.title().should('eq', 'Desafio ATS')
    cy.cadastrarCandidato(nomeCandidato)
    cy.wait('@getCandidatos')

    cy.intercept('GET', '**/curriculo').as('getCurriculos')
    cy.visit('/curriculo')
    cy.title().should('eq', 'Desafio ATS')
    cy.cadastrarCurriculo(nomeCandidato)
    cy.wait('@getCurriculos')
  })

  it('Editar um Curriculo', () =>{

  })

  it('Deletar um Curriculo', () =>{

  })
})
