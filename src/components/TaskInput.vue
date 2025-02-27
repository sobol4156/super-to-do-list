<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const newTask = ref('')
const emit = defineEmits(['add-task'])

const addTask = () => {
  if (!newTask.value.trim()) return
  emit('add-task', newTask.value)
  newTask.value = ''
}
</script>

<template>
  <div class="input-group flex gap-2 mb-4">
    <input v-model="newTask" placeholder="Добавить задачу..." class="input flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300" />
    <button @click="addTask" class="btn bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">➕</button>
  </div>
</template>

<style scoped>

</style>
