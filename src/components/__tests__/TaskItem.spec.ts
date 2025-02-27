import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types'

describe('TaskItem.vue', () => {
  const task: Task = { id: 1, text: 'Тестовая задача', priority: 'medium', completed: false }

  it('отображает текст задачи', () => {
    const wrapper = mount(TaskItem, { props: { task } })
    expect(wrapper.text()).toContain('Тестовая задача')
  })

  it('переключает статус при клике', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    await wrapper.trigger('click')

    expect(wrapper.emitted('toggle-task')).toBeTruthy()
    expect(wrapper.emitted('toggle-task')?.[0]).toEqual([1])
  })

  it('удаляет задачу по кнопке', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    const deleteButton = wrapper.find('button')

    await deleteButton.trigger('click')

    expect(wrapper.emitted('remove-task')).toBeTruthy()
    expect(wrapper.emitted('remove-task')?.[0]).toEqual([1])
  })
})
