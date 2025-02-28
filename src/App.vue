<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex justify-center gap-4 p-4 bg-[#eee] dark:bg-[#252525] ">
    <RouterLink to="/" class="text-[#000] hover:underline dark:text-white">🏠 Главная</RouterLink>
    <RouterLink to="/settings" class="text-[#000] hover:underline dark:text-white">⚙ Настройки</RouterLink>
    <RouterLink to="/about" class="text-[#000] hover:underline dark:text-white">ℹ О программе</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
