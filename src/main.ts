import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // This now resolves to src/router/index.ts
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')