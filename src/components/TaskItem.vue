<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { Task } from '@/types'

const props = defineProps<{
  task: Task
}>()

const taskStore = useTaskStore()

const priorityColor = computed(() => {
  return {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  }[props.task.priority]
})
</script>

<template>
  <li
    @click="taskStore.toggleTask(task.id)"
    class="task-item flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer select-none transition-all bg-white text-black dark:text-white hover:bg-[#eee] dark:bg-[#1e1e1e] dark:hover:bg-[#292929]"
    :class="{ 'opacity-50': task.completed }"
  >
    <div class="flex items-center gap-3">
      <span :class="['w-3 h-3 rounded-full', priorityColor]"></span>
      <span :class="{ 'line-through text-gray-400': task.completed }">
        {{ task.text }}
      </span>
    </div>

    <button
      data-testid="delete-btn"
      @click.stop="taskStore.removeTask(task.id)"
      class="delete-btn cursor-pointer px-2 py-1 rounded-md text-black bg-[#dddbdb] hover:bg-[#c7c5c5] dark:hover:bg-[#463f3f] dark:bg-[#454545] dark:text-white transition"
    >
      ❌
    </button>
  </li>
</template>
