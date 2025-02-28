<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
const language = ref<'ru' | 'en'>('ru')
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-[#1e1e1e] shadow-lg rounded-lg flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-center">⚙ Настройки</h1>

    <label class="flex gap-2 items-center">
      <span>🎨 Тема:</span>
      <select v-model="theme" class="p-2 bg-gray-800 text-white rounded-md">
        <option value="dark">🌙 Тёмная</option>
        <option value="light">☀ Светлая</option>
      </select>
    </label>

    <label class="flex gap-2 items-center">
      <span>🌍 Язык:</span>
      <select v-model="language" class="p-2 bg-gray-800 text-white rounded-md">
        <option value="ru">🇷🇺 Русский</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </label>

  </div>
</template>
