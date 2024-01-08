import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import initializeRouter from './router'
import 'vue-toastification/dist/index.css'
import 'vue-final-modal/style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
const vfm = createVfm()
app.use(vfm)
app.use(Toast)
app.use(pinia)
initializeRouter(app)

app.mount('#app')
