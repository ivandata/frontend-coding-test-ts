import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import App from './App.vue'
import initializeRouter from './router'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(Toast)
app.use(pinia)
initializeRouter(app)

app.mount('#app')
