import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import '@/assets/css/aside.css'
import '@/assets/css/nav.css'
import '@/assets/css/section.css'
import '@/assets/css/style.css'

import mitt from 'mitt'
export const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(router).mount('#app')
