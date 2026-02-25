<template>
  <VLineChart
    :labels="labels"
    :data="values"
    label="Taxa de Conversão (%)"
    color="#ff0000"
    :gradient="true"
    :options="chartOptions"
  />
</template>

<script setup>
import { computed } from 'vue'
import VLineChart from '@/components/charts/VLineChart.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const labels = computed(() => {
  return props.data.map(item => item.safra)
})

const values = computed(() => {
  return props.data.map(item => item.convertion_rate * 100)
})

const chartOptions = computed(() => ({
  plugins: {
    tooltip: {
      callbacks: {
        title: (items) => {
          return 'Safra ' + items[0].label
        },
        label: (context) => {
          return 'Conversão: ' + context.parsed.y.toFixed(2) + '%'
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => value.toFixed(1) + '%'
      }
    }
  }
}))
</script>
