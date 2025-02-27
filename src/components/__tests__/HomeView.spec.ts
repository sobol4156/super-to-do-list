import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'

describe('HomeView.vue', () => {
  it('добавляет новую задачу', async () => {
    const wrapper = mount(HomeView)
    const taskInput = wrapper.findComponent(TaskInput)

    await taskInput.vm.$emit('add-task', { text: 'Тест', priority: 'low' })

    expect(wrapper.text()).toContain('Тест')
  })

  it('удаляет задачу', () => {
    const wrapper = mount(HomeView)
    const taskInput = wrapper.findComponent(TaskInput)

    taskInput.vm.$emit('add-task', { text: 'Удаляемая', priority: 'high' })

    const taskItem = wrapper.findComponent(TaskItem)
    taskItem.vm.$emit('remove-task', 1)

    expect(wrapper.text()).not.toContain('Удаляемая')
  })
})
