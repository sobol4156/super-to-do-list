describe('To-Do App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Добавляет новую задачу', () => {
    cy.get('input').type('Купить молоко')
    cy.get('button').contains('➕').click()

    cy.contains('Купить молоко').should('exist')
  })

  it('Переключает статус задачи', () => {
    cy.get('input').type('Сделать зарядку')
    cy.get('button').contains('➕').click()

    // Кликаем на задачу, чтобы переключить статус
    cy.contains('Сделать зарядку').click()
    cy.contains('Сделать зарядку').should('have.class', 'line-through')
  })

  it('Удаляет задачу', () => {
    cy.get('input').type('Купить хлеб')
    cy.get('button').contains('➕').click()

    // Нажимаем кнопку удаления
    cy.contains('Купить хлеб')
      .parent()
      .find('button.delete-btn')
      .click()

    // Проверяем, что задача удалена
    cy.contains('Купить хлеб').should('not.exist')
  })

  it('Задачи сохраняются после перезагрузки', () => {
    cy.get('input').type('Выучить Cypress')
    cy.get('button').contains('➕').click()

    cy.reload() // Перезагружаем страницу

    // Проверяем, что задача осталась
    cy.contains('Выучить Cypress').should('exist')
  })
})
