<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import { useTaskStore } from '@/store/taskStore'

const taskStore = useTaskStore()

const filter = ref<'all' | 'active' | 'completed'>('all')

const filteredTasks = computed(() => {
  if (filter.value === 'completed')
    return taskStore.tasks.filter((task) => task.completed).reverse()
  if (filter.value === 'active') return taskStore.tasks.filter((task) => !task.completed)
  return taskStore.tasks
})
</script>

<template>
  <div
    class="container max-w-lg mx-auto p-6 bg-[#1e1e1e] shadow-lg rounded-lg flex flex-col gap-[10px]"
  >
    <h1 class="text-2xl font-bold text-center">To-Do List</h1>

    <TaskInput />

    <TaskFilters v-model="filter" />

    <ul class="flex flex-col gap-[8px]">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<style scoped></style>
