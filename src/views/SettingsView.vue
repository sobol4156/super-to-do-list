<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const theme = ref<'light' | 'dark'>(
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light',
)
const language = ref<'ru' | 'en'>((localStorage.getItem('language') as 'ru' | 'en') || 'ru')

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  localStorage.setItem('theme', theme.value)
}

watch(theme, applyTheme)

onMounted(applyTheme)
</script>

<template>
  <div
    class="max-w-lg mx-auto p-6 shadow-lg rounded-lg flex flex-col gap-4 bg-white text-[#000] dark:bg-[#1e1e1e] dark:text-white"
  >
    <h1 class="text-2xl font-bold text-center">⚙ Настройки</h1>

    <label class="flex gap-2 items-center">
      <span>🎨 Тема:</span>
      <select v-model="theme" class="p-2 border rounded-md dark:bg-[#1e1e1e]">
        <option value="dark">🌙 Тёмная</option>
        <option value="light">☀ Светлая</option>
      </select>
    </label>

    <label class="flex gap-2 items-center">
      <span>🌍 Язык:</span>
      <select v-model="language" class="p-2 border rounded-md dark:bg-[#1e1e1e]">
        <option value="ru">🇷🇺 Русский</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </label>
  </div>
</template>
