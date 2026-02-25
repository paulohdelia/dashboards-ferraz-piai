<template>
  <div class="app-layout">
    <VSidebar
      :dashboards="dashboards"
      :collapsed="sidebarCollapsed"
      @toggle="toggleSidebar"
    />

    <div
      class="sidebar-overlay"
      :class="{ visible: !sidebarCollapsed && isMobile }"
      @click="toggleSidebar"
    ></div>

    <button
      class="sidebar-toggle"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
    >
      <i :data-lucide="sidebarCollapsed ? 'menu' : 'x'"></i>
    </button>

    <main class="main-content" :class="{ expanded: sidebarCollapsed }">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import VSidebar from './VSidebar.vue'

defineProps({
  dashboards: {
    type: Array,
    required: true
  }
})

const sidebarCollapsed = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
