<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskFilters from '@/components/TaskFilters.vue'

interface Task {
  id: number
  text: string
  completed: boolean
}

const tasks: Ref<Task[]> = ref(JSON.parse(localStorage.getItem('tasks') || '[]') as Task[])

const addTask = (taskText: string) => {
  if (!taskText.trim()) return
  tasks.value.push({ id: Date.now(), text: taskText, completed: false })
}

const removeTask = (id: number) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.completed = !task.completed
}

const filter: Ref<'all' | 'active' | 'completed'> = ref('all')
const filteredTasks = computed(() => {
  if (filter.value === 'completed') return tasks.value.filter((task) => task.completed)
  if (filter.value === 'active') return tasks.value.filter((task) => !task.completed)
  return tasks.value
})

watch(tasks, (newTasks) => localStorage.setItem('tasks', JSON.stringify(newTasks)), { deep: true })
</script>

<template>
  <div class="container max-w-lg mx-auto p-6 bg-[#1e1e1e] shadow-lg rounded-lg flex flex-col gap-[10px]">
    <h1 class="text-2xl font-bold text-center">To-Do List</h1>

    <TaskInput @add-task="addTask" />

    <TaskFilters v-model="filter" />

    <ul class="flex flex-col gap-[8px]">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTask"
        @remove-task="removeTask"
      />
    </ul>
  </div>
</template>

<style scoped>

</style>
