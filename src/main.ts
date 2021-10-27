import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/aside.css'
import '@/assets/css/nav.css'
import '@/assets/css/section.css'
import '@/assets/css/style.css'

createApp(App).use(store).use(router).mount('#app')
