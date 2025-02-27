import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TaskInput from '@/components/TaskInput.vue'

describe('TaskInput.vue', () => {
  it('добавляет задачу при нажатии на кнопку', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('Новая задача')
    await button.trigger('click')

    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')?.[0]).toEqual([{ text: 'Новая задача', priority: 'low' }])
  })

  it('не добавляет пустую задачу', async () => {
    const wrapper = mount(TaskInput)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted('add-task')).toBeFalsy()
  })
})
