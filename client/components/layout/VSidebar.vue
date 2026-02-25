<template>
  <aside class="sidebar" :class="{ collapsed, open: !collapsed }">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <i data-lucide="bar-chart-3" class="sidebar-logo-icon"></i>
        <span>Dashboards V4</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="sidebar-nav-list">
        <li
          v-for="dashboard in dashboards"
          :key="dashboard.id"
          class="sidebar-nav-item"
        >
          <router-link
            :to="`/${dashboard.id}`"
            class="sidebar-nav-link"
            active-class="active"
          >
            <i :data-lucide="dashboard.icon" class="sidebar-nav-icon"></i>
            <span>{{ dashboard.title }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  dashboards: {
    type: Array,
    required: true
  },
  collapsed: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

const route = useRoute()

// Re-initialize Lucide icons quando a rota mudar
watch(
  () => route.path,
  () => {
    setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons()
      }
    }, 0)
  }
)
</script>
