import './assets/main.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import App from './App.vue'
import router from './router'
import i18n from './lang/i18n'

const app = createApp(App)
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 1000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: 'Vue-Toastification__fade',
};

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast, options);

app.mount('#app')
