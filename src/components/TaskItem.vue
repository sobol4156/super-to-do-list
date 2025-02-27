<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  task: { id: number; text: string; priority: 'low' | 'medium' | 'high'; completed: boolean }
}>()

const emit = defineEmits(['toggle-task', 'remove-task'])

const priorityColor = computed(() => {
  return {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }[props.task.priority]
})
</script>

<template>
  <li
    @click="emit('toggle-task', task.id)"
    class="task-item flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer select-none transition-all bg-[#1e1e1e] hover:bg-[#292929]"
    :class="{'opacity-50': task.completed}"
  >
    <div class="flex items-center gap-3">
      <span :class="['w-3 h-3 rounded-full', priorityColor]"></span>
      <span :class="{ 'line-through text-gray-400': task.completed }">
        {{ task.text }}
      </span>
    </div>

    <button
      @click.stop="emit('remove-task', task.id)"
      class="delete-btn cursor-pointer bg-[#454545] text-white px-2 py-1 rounded-md hover:bg-[#463f3f] transition"
    >
      ❌
    </button>
  </li>
</template>
