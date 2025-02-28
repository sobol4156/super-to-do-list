# 📝 To-Do List App

![image](https://github.com/user-attachments/assets/4088a259-3b9b-4e44-8a2a-7861419d01b3)

## 🚀 Описание проекта
To-Do List — это веб-приложение для управления задачами, разработанное на **Vue 3** с использованием **Pinia** для управления состоянием и **Vue Router** для маршрутизации. Приложение поддерживает локальное хранилище в режиме разработки и API в продакшене.

---

## 📦 Используемые технологии

| Технология | Версия | Описание |
|------------|--------|----------|
| **Vue 3** | `^3.5.13` | Фреймворк для построения UI |
| **Pinia** | `^3.0.1` | Управление состоянием |
| **Vue Router** | `^4.5.0` | Маршрутизация |
| **Vue I18n** | `^11.1.1` | Локализация |
| **Vue Toastification** | `^2.0.0-rc.5` | Уведомления |
| **TailwindCSS** | `^4.0.9` | Стилизация UI |
| **Vite** | `^6.1.0` | Быстрая сборка и Dev-сервер |
| **Cypress** | `^14.0.3` | End-to-End тестирование |
| **Vitest** | `^3.0.7` | Unit-тестирование |

---

## 📂 Структура проекта
```
📦 to-do-app
├── 📂 src
│   ├── 📂 components     # UI-компоненты
│   ├── 📂 views          # Основные страницы
│   ├── 📂 store          # Pinia-хранилище
│   ├── 📂 router         # Vue Router маршруты
│   ├── 📂 i18n           # Локализация
│   ├── 📂 assets         # Стили и изображения
│   ├── main.ts           # Точка входа
│   ├── App.vue           # Корневой компонент
├── 📂 cypress            # E2E-тесты
├── 📂 tests              # Unit-тесты
├── vite.config.ts        # Конфигурация Vite
├── cypress.config.ts     # Конфигурация Cypress
├── tsconfig.json         # Конфигурация TypeScript
├── package.json          # Зависимости проекта
└── README.md             # Этот файл
```

---

## ⚡ Инструкция по запуску

### 1️⃣ Установка зависимостей
```sh
npm install
```

### 2️⃣ Запуск в режиме разработки
```sh
npm run dev
```
Приложение будет доступно по адресу: **http://localhost:5173/**

### 3️⃣ Сборка для продакшена
```sh
npm run build
```

### 4️⃣ Предпросмотр продакшн-версии
```sh
npm run preview
```

---

## 🏗️ Архитектурные решения и подходы к реализации

### 📌 **Архитектура приложения**
Приложение построено по **SPA (Single Page Application) архитектуре** и использует:
- **Компонентный подход** (Vue 3 + Composition API)
- **Pinia** для централизованного управления состоянием
- **Vue Router** для маршрутизации
- **Vue I18n** для локализации
- **TailwindCSS** для стилизации

### 📌 **Управление состоянием**
- Используется **Pinia**, так как она **реактивнее и проще Vuex**
- Разделение стора на **модули** для масштабируемости
- **Данные загружаются из API в продакшене** и **из localStorage в режиме разработки**

### 📌 **Маршрутизация**
- Используется **Vue Router** с **Lazy Loading** для загрузки страниц по мере необходимости
- Поддерживаются **динамические маршруты**
- **Обработчики ошибок** на случай неверного URL

### 📌 **Тестирование**
- **Unit-тесты (Vitest)** для компонентов и стора
- **E2E-тесты (Cypress)** для проверки пользовательских сценариев
- Используются **моки API** для тестирования работы с сервером

---

## 🧪 Тестирование

### 🔹 Запуск unit-тестов (Vitest)
```sh
npm run test:unit
```

### 🔹 Запуск End-to-End тестов (Cypress)
```sh
npm run test:e2e
```

_Если тесты не запускаются, убедитесь, что сервер работает:_
```sh
npm run preview
```

---

## 📜 Лицензия
Этот проект распространяется под лицензией **MIT**.

