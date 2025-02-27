import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TaskInput from '@/components/TaskInput.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTaskStore } from '@/store/taskStore'

describe('TaskInput.vue', () => {
  it('добавляет задачу при нажатии на кнопку', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const taskStore = useTaskStore()

    const wrapper = mount(TaskInput, { global: { plugins: [pinia] } })
    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('Новая задача')
    await button.trigger('click')

    expect(taskStore.tasks).toHaveLength(1)
    expect(taskStore.tasks[0]).toMatchObject({ text: 'Новая задача', priority: 'low', completed: false })
  })
})
