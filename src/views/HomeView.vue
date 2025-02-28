<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import { useTaskStore } from '@/store/taskStore'

const taskStore = useTaskStore()

const filter = ref<'all' | 'active' | 'completed'>('all')
const searchQuery = ref('')
const visibleTasks = ref(15)

const filteredTasks = computed(() => {
  let tasks = taskStore.tasks

  if (filter.value === 'completed') {
    tasks = tasks.filter((task) => task.completed).reverse()
  } else if (filter.value === 'active') {
    tasks = tasks.filter((task) => !task.completed)
  }

  if (searchQuery.value.trim()) {
    tasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return tasks
})

const exportTasks = () => {
  const dataStr = JSON.stringify(taskStore.tasks, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'tasks.json'
  a.click()

  URL.revokeObjectURL(url)
}

const importTasks = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedTasks = JSON.parse(e.target?.result as string)

      if (Array.isArray(importedTasks) && importedTasks.every(task => 'id' in task && 'text' in task && 'completed' in task)) {
        taskStore.tasks = importedTasks
      } else {
        alert('Ошибка: Некорректный формат файла')
      }
    } catch {
      alert('Ошибка при загрузке JSON')
    }
  }
  reader.readAsText(file)
}

const paginatedTasks = computed(() => filteredTasks.value.slice(0, visibleTasks.value))

const loadMoreTasks = () => {
  if (visibleTasks.value < filteredTasks.value.length) {
    visibleTasks.value += 15
  }
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreTasks()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="container max-w-lg mx-auto p-6 shadow-lg rounded-lg flex flex-col gap-[10px] bg-white text-black dark:bg-[#1e1e1e] dark:text-white">
    <h1 class="text-2xl font-bold text-center">To-Do List</h1>

    <div class="flex justify-between mt-4">
      <button @click="exportTasks" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        📤 Экспорт
      </button>

      <label class="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
        📥 Импорт
        <input type="file" accept=".json" @change="importTasks" class="hidden" />
      </label>
    </div>
    <TaskInput />

    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 Поиск задач..."
      class="p-2 bg-white text-black dark:bg-[#2a2a2a] dark:text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
    />

    <TaskFilters v-model="filter" />

    <ul class="flex flex-col gap-[8px]">
      <TaskItem v-for="task in paginatedTasks" :key="task.id" :task="task" />
    </ul>

    <p v-if="paginatedTasks.length === 0" class="text-black dark:text-gray-400 text-center mt-4">❌ Задачи не найдены</p>
  </div>
</template>
