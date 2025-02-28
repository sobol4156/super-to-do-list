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
  <div class="container max-w-lg mx-auto p-6 bg-[#1e1e1e] shadow-lg rounded-lg flex flex-col gap-[10px]">
    <h1 class="text-2xl font-bold text-center">To-Do List</h1>

    <TaskInput />

    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 Поиск задач..."
      class="p-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
    />

    <TaskFilters v-model="filter" />

    <ul class="flex flex-col gap-[8px]">
      <TaskItem v-for="task in paginatedTasks" :key="task.id" :task="task" />
    </ul>

    <p v-if="paginatedTasks.length === 0" class="text-gray-400 text-center mt-4">❌ Задачи не найдены</p>
  </div>
</template>
