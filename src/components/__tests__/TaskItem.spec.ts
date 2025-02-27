import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TaskItem from '@/components/TaskItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTaskStore } from '@/store/taskStore'

describe('TaskItem.vue', () => {
  it('переключает статус при клике', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const taskStore = useTaskStore()

    taskStore.tasks.push({ id: 1, text: 'Тестовая задача', priority: 'medium', completed: false })

    const wrapper = mount(TaskItem, { 
      props: { task: taskStore.tasks[0] },
      global: { plugins: [pinia] }
    })

    await wrapper.trigger('click')

    expect(taskStore.tasks[0].completed).toBe(true)
  })

  it('удаляет задачу по кнопке', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const taskStore = useTaskStore()

    taskStore.tasks.push({ id: 1, text: 'Удаляемая', priority: 'high', completed: false })

    const wrapper = mount(TaskItem, { 
      props: { task: taskStore.tasks[0] },
      global: { plugins: [pinia] }
    })

    const deleteButton = wrapper.find('button')
    await deleteButton.trigger('click')

    expect(taskStore.tasks).toHaveLength(0)
  })
})

