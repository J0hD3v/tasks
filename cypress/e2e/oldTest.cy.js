describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
  }),

  // TEST : CREATION USER 
  xit('can create new user', () => {

    // Arrange (config)
    cy.visit('http://localhost:8000/user/register')
    const message = "Le compte : test5@test.com a été ajouté en BDD";
    // Act (scénario)
    cy.get('[name="firstname"]').type('Firstname-test-5')
    cy.get('[name="lastname"]').type('Lastlane-test-5')
    cy.get('[name="email"]').type('test5@test.com')
    cy.get('[name="password"]').type('1234')
    cy.get('[name="submit"]').click()
    // Assert (résultat attendu)
    cy.get('.error').contains(message)
  })

  // TEST : UTILISATEUR EXISTANT
  it('cannot create already existing user', () => {
    // Arrange (config)
    cy.visit('http://localhost:8000/user/register')
    const message = "Le compte existe déja";
    // Act (scénario)
    cy.get('[name="firstname"]').type('Firstname-test-2')
    cy.get('[name="lastname"]').type('Lastlane-test-2')
    cy.get('[name="email"]').type('test2@test.com')
    cy.get('[name="password"]').type('1234')
    cy.get('[name="submit"]').click()
    // Assert (résultat attendu)
    cy.get('.error').contains(message)
  })

  // TEST : CONNEXION UTILISATEUR
  it('can login user', () => {
    // Arrange (config)
    cy.visit('http://localhost:8000/user/login')
    // Act (scénario)
    cy.get('[name="email"]').type('test@test.com')
    cy.get('[name="password"]').type('1234')
    cy.get('[name="submit"]').click()
    // Assert (résultat attendu)
    cy.get(':nth-child(5) > .secondary').should('exist')
  })

  // TEST : ECHEC CONNEXION UTILISATEUR - FORMULAIRE INCOMPLET
  it('cannot login if form empty or partially empty', () => {
    // Arrange (config)
    cy.visit('http://localhost:8000/user/login')
    const message = "Veuillez remplir les champs";
    // Act (scénario)
    cy.get('[name="email"]').type('test@test.com')
    cy.get('[name="submit"]').click()
    // Assert (résultat attendu)
    cy.get('.error').contains(message)
  })

  // TEST : ECHEC CONNEXION UTILISATEUR - IDENTIFIANTS INCORRECTS
  it('cannot login if incorrects email or password', () => {
    // Arrange (config)
    cy.visit('http://localhost:8000/user/login')
    const message = "Les informations de connexion ne sont pas correctes";
    // Act (scénario)
    cy.get('[name="email"]').type('test@test.com')
    cy.get('[name="password"]').type('0000')
    cy.get('[name="submit"]').click()
    // Assert (résultat attendu)
    cy.get('.error').contains(message)
  })
})