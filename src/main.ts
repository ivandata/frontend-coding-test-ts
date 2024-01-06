import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import initializeRouter from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
initializeRouter(app)

app.mount('#app')
