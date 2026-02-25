<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card-body">
      <div v-if="loading" class="chart-loading">
        <span class="spinner spinner-lg"></span>
      </div>

      <div v-else class="chart-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.chart-wrapper {
  position: relative;
  width: 100%;
  min-height: 300px;
}

.chart-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}
</style>
