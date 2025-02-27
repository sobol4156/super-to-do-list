<script setup lang="ts">
const filter = defineModel<'all' | 'active' | 'completed'>()
</script>

<template>
  <div class="filter-buttons flex justify-between mb-4">
    <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
    <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Активные</button>
    <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">
      Завершенные
    </button>
  </div>
</template>

<style scoped>
.filter-buttons button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #3f3e3e;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.filter-buttons button:hover {
  background-color: #65a0e0;
}

.filter-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
