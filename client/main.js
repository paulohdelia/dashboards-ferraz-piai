import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Create Vue app
const app = createApp(App)

// Register Pinia store
const pinia = createPinia()
app.use(pinia)

// Register Vue Router
app.use(router)

// Mount app
app.mount('#app')

// Disable Chart.js datalabels plugin globally (use only when explicitly enabled)
if (window.Chart && window.ChartDataLabels) {
  window.Chart.defaults.plugins.datalabels = false
}

// Initialize Lucide icons after mount
setTimeout(() => {
  if (window.lucide) {
    window.lucide.createIcons()
  }
}, 0)

console.log('[Dashboards V4] App initialized')
