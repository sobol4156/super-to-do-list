<script setup lang="ts">
const filter = defineModel<'all' | 'active' | 'completed'>()
</script>

<template>
  <div class="filter-buttons flex justify-between mb-4">
    <button
      @click="filter = 'all'"
      :class="{ active: filter === 'all' }"
      class="cursor-pointer px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 bg-gray-200 text-black dark:bg-gray-700 dark:text-white transition"
    >
      Все
    </button>
    <button
      @click="filter = 'active'"
      :class="{ active: filter === 'active' }"
      class="cursor-pointer px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 bg-gray-200 text-black dark:bg-gray-700 dark:text-white transition"
    >
      Активные
    </button>
    <button
      @click="filter = 'completed'"
      :class="{ active: filter === 'completed' }"
      class="cursor-pointer px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 bg-gray-200 text-black dark:bg-gray-700 dark:text-white transition"
    >
      Завершенные
    </button>
  </div>
</template>

<style scoped>
.filter-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.filter-buttons button:hover {
  background-color: #65a0e0;
  color: white;
}

.dark .filter-buttons button.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.dark .filter-buttons button:hover {
  background-color: #1d4ed8;
}
</style>
