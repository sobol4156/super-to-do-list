import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTaskStore } from '@/store/taskStore'

describe('TaskItem.vue', () => {
  it('переключает статус при клике', async () => {
    const wrapper = mount(TaskItem, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: {
        task: {
          id: 1,
          text: 'Test Task',
          completed: false,
          priority: 'medium',
        },
      },
    })

    const taskStore = useTaskStore()

    await wrapper.trigger('click')
    expect(taskStore.toggleTask).toHaveBeenCalledWith(1)
  })

  it('удаляет задачу по кнопке', async () => {
    const wrapper = mount(TaskItem, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: {
        task: {
          id: 1,
          text: 'Test Task',
          completed: false,
          priority: 'high',
        },
      },
    })

    const taskStore = useTaskStore()
    const deleteButton = wrapper.find('.delete-btn')

    await deleteButton.trigger('click')
    expect(taskStore.removeTask).toHaveBeenCalledWith(1)
  })
})
