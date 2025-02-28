<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="max-w-lg mx-auto p-6 shadow-lg rounded-lg text-center bg-white text-black dark:bg-[#1e1e1e] dark:text-white">
    <h1 class="text-2xl font-bold">{{ t('about') }}</h1>
    <p class="mt-2">{{ t('about_description') }}</p>
    <p>{{ t('about_tech') }}</p>
    <p>{{ t('about_author') }}: <strong>Alex Sobol</strong></p>
    <p>{{ t('about_version') }}: 1.0.0</p>
  </div>
</template>
