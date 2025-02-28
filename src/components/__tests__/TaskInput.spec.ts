import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskInput from '@/components/TaskInput.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTaskStore } from '@/store/taskStore'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      'components.task_input.placeholder': 'Enter task',
      'components.task_input.priority.low': 'Low',
      'components.task_input.priority.medium': 'Medium',
      'components.task_input.priority.high': 'High',
    },
  },
})

describe('TaskInput.vue', () => {
  it('добавляет задачу при нажатии на кнопку', async () => {
    const wrapper = mount(TaskInput, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), i18n],
      },
    })

    const taskStore = useTaskStore()
    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('Новая задача')
    await button.trigger('click')

    expect(taskStore.addTask).toHaveBeenCalled()
  })

  it('не добавляет задачу, если поле пустое', async () => {
    const wrapper = mount(TaskInput, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), i18n],
      },
    })

    const taskStore = useTaskStore()
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(taskStore.addTask).not.toHaveBeenCalled()
  })
})
