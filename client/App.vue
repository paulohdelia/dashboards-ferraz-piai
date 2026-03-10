<template>
  <template v-if="route.name !== 'login'">
    <VLayout :dashboards="dashboards">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </VLayout>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import VLayout from './components/layout/VLayout.vue'

const route = useRoute()
const dashboards = ref([])

const loadDashboards = async () => {
  try {
    const response = await fetch('/api/dashboards')
    if (!response.ok) return
    const data = await response.json()
    dashboards.value = data.dashboards
  } catch (error) {
    console.error('Error loading dashboards:', error)
  }
}

// Carrega dashboards ao sair do login (usuário autenticado)
watch(
  () => route.name,
  (name) => {
    if (name !== 'login' && dashboards.value.length === 0) {
      loadDashboards()
    }
  }
)
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
