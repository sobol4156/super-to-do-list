describe('To-Do App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Добавляет новую задачу', () => {
    cy.get('[data-testid="task-input"]').type('Купить молоко')

    cy.get(`[data-testid="add-task__btn"]`).should('exist').should('be.visible').click()

    cy.contains('Купить молоко').should('exist')
  })

  it('Переключает статус задачи', () => {
    cy.get('[data-testid="task-input"]').type('Сделать зарядку')
    cy.get(`[data-testid="add-task__btn"]`).should('exist').should('be.visible').click()

    cy.contains('Сделать зарядку').click()
    cy.contains('Сделать зарядку').should('have.class', 'line-through')
  })

  it('Удаляет задачу', () => {
    cy.get('[data-testid="task-input"]').type('Купить хлеб')

    cy.get(`[data-testid="add-task__btn"]`)
      .should('exist')
      .should('be.visible')
      .click()

    cy.contains('Купить хлеб').should('exist')

    cy.contains('Купить хлеб')
      .should('exist')
      .closest('li')
      .find('.delete-btn')
      .should('exist')
      .should('be.visible')
      .click()

    cy.contains('Купить хлеб').should('not.exist')
  })


  it('Задачи сохраняются после перезагрузки', () => {
    cy.get('[data-testid="task-input"]').type('Выучить Cypress')
    cy.get(`[data-testid="add-task__btn"]`).should('exist').should('be.visible').click()

    cy.reload()

    cy.contains('Выучить Cypress').should('exist')
  })
})
