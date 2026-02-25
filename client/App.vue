<template>
  <VLayout :dashboards="dashboards">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </VLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VLayout from './components/layout/VLayout.vue'

const dashboards = ref([])

// Load dashboards from API
const loadDashboards = async () => {
  try {
    const response = await fetch('/api/dashboards')
    const data = await response.json()
    dashboards.value = data.dashboards
  } catch (error) {
    console.error('Error loading dashboards:', error)
  }
}

onMounted(() => {
  loadDashboards()
})
</script>

<style>
/* Fade transition for route changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
