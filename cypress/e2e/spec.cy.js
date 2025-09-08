describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
  }),
  // Mes tests
  it('can create new user', () => {

    // Arrange (config)
    cy.visit('http://localhost:8000/user/register')
    const message = "Le compte : test@test.com a été ajouté en BDD";

    // Act (scénario)
    cy.get('[name="firstname"]').type('Johan')
    cy.get('[name="lastname"]').type('Fievet')
    cy.get('[name="email"]').type('test@test.com')
    cy.get('[name="password"]').type('1234')
    cy.get('[name="submit"]').click()

    // Assert (résultat attendu)
    cy.get('.error').contains(message)
  })
})