/// <reference types="cypress" />

context('Realizar teste de CRUD na tla de Candidatos', () => {
  const faker = require('faker')
  let nomeCandiato
  beforeEach(() => {
    cy.intercept('GET', '**/candidatos').as('getCandidatos')
    cy.visit('/candidato')
    nomeCandiato = faker.lorem.words(4)
  })

  it('Cadastrar um novo Canidato', () => {
    cy.cadastrarCandidato(nomeCandiato)
    cy.wait('@getCandidatos')
  })

  it('Editar um candidato', () =>{
    cy.cadastrarCandidato(nomeCandiato)
    cy.wait('@getCandidatos')
  })
})
