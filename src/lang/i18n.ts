import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    //App
    home: '🏠 Home',
    settings: '⚙ Settings',
    about: 'ℹ About',
    //SettingsView
    theme: '🎨 Theme:',
    language: '🌍 Language:',
    dark: '🌙 Dark',
    light: '☀ Light',
    russian: '🇷🇺 Russian',
    english: '🇬🇧 English',
    // HomeView
    todo_list: 'To-Do List',
    export: '📤 Export',
    import: '📥 Import',
    search_placeholder: '🔍 Search tasks...',
    no_tasks: '❌ No tasks found',
    error: {
      invalid_json: 'Error: Invalid JSON format',
      import_failed: 'Error loading JSON file',
    },
    // AboutView
    about_description: '📌 Simple To-Do application on Vue 3.',
    about_tech: '🛠 Powered by Pinia and Vue Router.',
    about_author: '💡 Author',
    about_version: '📅 Version',
    //Components
    components: {
      task_filter: {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
      },
      task_input: {
        placeholder: 'Add a task...',
        priority: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
        },
      },
    },
  },
  ru: {
    //App
    home: '🏠 Главная',
    settings: '⚙ Настройки',
    about: 'ℹ О программе',
    //SettingsView
    theme: '🎨 Тема:',
    language: '🌍 Язык:',
    dark: '🌙 Тёмная',
    light: '☀ Светлая',
    russian: '🇷🇺 Русский',
    english: '🇬🇧 Английский',
    // HomeView
    todo_list: 'Список задач',
    export: '📤 Экспорт',
    import: '📥 Импорт',
    search_placeholder: '🔍 Поиск задач...',
    no_tasks: '❌ Задачи не найдены',
    error: {
      invalid_json: 'Ошибка: Некорректный формат JSON',
      import_failed: 'Ошибка при загрузке JSON',
    },
    // AboutView
    about_description: '📌 Простое To-Do приложение на Vue 3.',
    about_tech: '🛠 Использует Pinia и Vue Router.',
    about_author: '💡 Автор',
    about_version: '📅 Версия',
    //Components
    components: {
      task_filter: {
        all: 'Все',
        active: 'Активные',
        completed: 'Завершенные',
      },
      task_input: {
        placeholder: 'Добавить задачу...',
        priority: {
          low: 'Низкий',
          medium: 'Средний',
          high: 'Высокий',
        },
      },
    },
  },
}

const defaultLang = localStorage.getItem('language') || 'ru'

const i18n = createI18n({
  locale: defaultLang,
  fallbackLocale: 'ru',
  messages,
})

export default i18n
