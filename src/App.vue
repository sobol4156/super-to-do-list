<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'

const { t } = useI18n()

const theme = ref<'light' | 'dark'>(
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light',
)
const applyTheme = () => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  localStorage.setItem('theme', theme.value)
}
onMounted(() => {
  applyTheme()
})
</script>

<template>
  <nav class="flex justify-center gap-4 p-4 bg-[#eee] dark:bg-[#252525]">
    <RouterLink to="/" class="text-[#000] hover:underline dark:text-white">
      {{ t('home') }}
    </RouterLink>
    <RouterLink to="/settings" class="text-[#000] hover:underline dark:text-white">
      {{ t('settings') }}
    </RouterLink>
    <RouterLink to="/about" class="text-[#000] hover:underline dark:text-white">
      {{ t('about') }}
    </RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
