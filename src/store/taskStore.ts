import { defineStore } from 'pinia'
import type { Task } from '@/types'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[],
  }),

  actions: {
    addTask(task: Task) {
      if (!task.text.trim()) return
      this.tasks.unshift(task)
      this.saveTasks()
      toast.success('✅ Задача добавлена!')
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.saveTasks()
      toast.error('🗑️ Задача удалена')
    },

    toggleTask(id: number) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
        this.tasks = this.tasks.filter((t) => t.id !== id)
        this.tasks.push(task)

        if (task.completed) {
          toast.success('🎉 Задача выполнена!')
        } else {
          toast.warning('🔄 Задача снова активна')
        }
      }
      this.saveTasks()
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  },

  getters: {
    activeTasks: state => state.tasks.filter(task => !task.completed),
    completedTasks: state => state.tasks.filter(task => task.completed),
  }
})
