<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  task: { id: number; text: string; completed: boolean }
}>()

const emit = defineEmits(['toggle-task', 'remove-task'])
</script>

<template>
  <li class="task-item flex items-center justify-between p-2 bg-[#121212] rounded-md mb-2">
    <input type="checkbox" :checked="task.completed" @change="emit('toggle-task', task.id)" />
    <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.text }}</span>
    <button @click="emit('remove-task', task.id)" class="delete-btn cursor-pointer bg-[#454545] text-white px-2 py-1 rounded-md hover:bg-[#463f3f] transition">❌</button>
  </li>
</template>

<style scoped>

</style>
