<template>
  <div class="scorecard">
    <i
      v-if="icon"
      :data-lucide="icon"
      class="scorecard-icon"
    ></i>

    <div class="scorecard-label">{{ label }}</div>

    <div v-if="loading" class="scorecard-value">
      <span class="spinner"></span>
    </div>

    <div v-else class="scorecard-value">
      {{ formattedValue }}
    </div>

    <div v-if="trend" class="scorecard-trend" :class="trendClass">
      <i :data-lucide="trendIcon"></i>
      <span>{{ trend }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  formatter: {
    type: Function,
    default: (val) => val
  },
  trend: {
    type: String,
    default: null
  },
  trendDirection: {
    type: String,
    default: 'neutral', // 'up', 'down', 'neutral'
    validator: (val) => ['up', 'down', 'neutral'].includes(val)
  }
})

const formattedValue = computed(() => {
  return props.formatter(props.value)
})

const trendClass = computed(() => {
  return `trend-${props.trendDirection}`
})

const trendIcon = computed(() => {
  if (props.trendDirection === 'up') return 'trending-up'
  if (props.trendDirection === 'down') return 'trending-down'
  return 'minus'
})

onMounted(() => {
  if (window.lucide) {
    window.lucide.createIcons()
  }
})
</script>

<style scoped>
.scorecard-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-top: 4px;
}

.scorecard-trend i {
  width: 14px;
  height: 14px;
}

.trend-up {
  color: var(--color-safe);
}

.trend-down {
  color: var(--color-danger);
}

.trend-neutral {
  color: var(--text-muted);
}
</style>
