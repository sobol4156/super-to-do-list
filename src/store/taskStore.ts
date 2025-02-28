import { defineStore } from 'pinia'
import type { Task } from '@/types'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isDev = import.meta.env.MODE === 'development'
const API_URL = import.meta.env.VITE_API_URL

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async fetchTasks() {
      try {
        if (isDev) {
          const savedTasks = localStorage.getItem('tasks')
          this.tasks = savedTasks ? JSON.parse(savedTasks) : []
          toast.success('✅ Данные загружены из LocalStorage')
        } else {
          const response = await fetch(`${API_URL}/tasks`)
          if (!response.ok) throw new Error('Ошибка загрузки задач')
          this.tasks = await response.json()
          toast.success('✅ Данные загружены с сервера')
        }
      } catch (error) {
        console.error('Ошибка API:', error)
        toast.error('⚠️ Не удалось загрузить задачи!')
      }
    },

    async addTask(task: Omit<Task, 'id'>) {
      try {
        if (isDev) {
          const newTask: Task = { ...task, id: Date.now() }
          this.tasks = [...this.tasks, newTask]
          localStorage.setItem('tasks', JSON.stringify(this.tasks))
          toast.success('✅ Задача добавлена (LocalStorage)')
        } else {
          const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          })
          if (!response.ok) throw new Error('Ошибка при добавлении задачи')
          const newTask = await response.json()
          this.tasks = [...this.tasks, newTask]
          toast.success('✅ Задача добавлена (API)')
        }
      } catch (error) {
        console.error('Ошибка API:', error)
        toast.error('⚠️ Не удалось добавить задачу!')
      }
    },

    async removeTask(id: number) {
      try {
        if (isDev) {
          this.tasks = this.tasks.filter((task) => task.id !== id)
          localStorage.setItem('tasks', JSON.stringify(this.tasks))
          toast.info('🗑️ Задача удалена (LocalStorage)')
        } else {
          const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
          })
          if (!response.ok) throw new Error('Ошибка при удалении задачи')
          this.tasks = this.tasks.filter((task) => task.id !== id)
          toast.info('🗑️ Задача удалена (API)')
        }
      } catch (error) {
        console.error('Ошибка API:', error)
        toast.error('⚠️ Не удалось удалить задачу!')
      }
    },

    async toggleTask(id: number) {
      try {
        const taskIndex = this.tasks.findIndex((t) => t.id === id)
        if (taskIndex === -1) return

        const updatedTask = { ...this.tasks[taskIndex], completed: !this.tasks[taskIndex].completed }

        if (isDev) {
          this.tasks[taskIndex] = updatedTask
          localStorage.setItem('tasks', JSON.stringify(this.tasks))
          toast.success(updatedTask.completed ? '🎉 Задача выполнена! (LocalStorage)' : '🔄 Задача снова активна (LocalStorage)')
        } else {
          const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
          })
          if (!response.ok) throw new Error('Ошибка при обновлении задачи')

          this.tasks = this.tasks.map((task) => (task.id === id ? updatedTask : task))
          toast.success(updatedTask.completed ? '🎉 Задача выполнена! (API)' : '🔄 Задача снова активна (API)')
        }
      } catch (error) {
        console.error('Ошибка API:', error)
        toast.error('⚠️ Не удалось обновить задачу!')
      }
    },
  },

  getters: {
    activeTasks: (state) => state.tasks.filter((task) => !task.completed),
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
  },
})
