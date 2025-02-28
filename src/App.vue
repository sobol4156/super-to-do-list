<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex justify-center gap-4 p-4 bg-[#252525]">
    <RouterLink to="/" class="text-white hover:underline">🏠 Главная</RouterLink>
    <RouterLink to="/settings" class="text-white hover:underline">⚙ Настройки</RouterLink>
    <RouterLink to="/about" class="text-white hover:underline">ℹ О программе</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
