<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const newTask = ref('')
const priority = ref<'low' | 'medium' | 'high'>('low')
const emit = defineEmits(['add-task'])

const addTask = () => {
  if (!newTask.value.trim()) return
  emit('add-task', { text: newTask.value, priority: priority.value })
  newTask.value = ''
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTask()
  }
}
</script>

<template>
  <div class="task-form flex gap-2">
    <input
      v-model="newTask"
      placeholder="Добавить задачу..."
      class="p-2 border rounded-md flex-1 bg-[#121212] text-white outline-none"
      @keypress="handleKeyPress"
    />

    <select v-model="priority" class="p-2 border rounded-md bg-[#121212] text-white cursor-pointer">
      <option value="low">🔵 Низкий</option>
      <option value="medium">🟡 Средний</option>
      <option value="high">🔴 Высокий</option>
    </select>

    <button
      @click="addTask"
      class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition"
    >
      ➕
    </button>
  </div>
</template>

<style>
@media (max-width: 567px) {
  .task-form {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
