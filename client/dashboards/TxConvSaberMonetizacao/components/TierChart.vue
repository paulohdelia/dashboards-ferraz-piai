<template>
  <VBarChart
    :labels="chartLabels"
    :datasets="chartDatasets"
    :stacked="false"
    :datalabels="true"
    :options="chartOptions"
    :horizontal="props.view === 'consolidated'"
  />
</template>

<script setup>
import { computed } from 'vue'
import VBarChart from '@/components/charts/VBarChart.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  view: {
    type: String,
    default: 'consolidated',
    validator: (val) => ['consolidated', 'by-safra'].includes(val)
  }
})

// Get unique tiers and safras
const tiers = computed(() => {
  const tierSet = new Set(props.data.map(item => item.tier))
  const tiersArray = Array.from(tierSet).sort()
  // Move "Sem Tier" to the end
  return tiersArray.filter(t => t !== 'Sem Tier').concat(tiersArray.filter(t => t === 'Sem Tier'))
})

const safras = computed(() => {
  const safraSet = new Set(props.data.map(item => item.safra))
  return Array.from(safraSet).sort()
})

// Chart labels
const chartLabels = computed(() => {
  if (props.view === 'consolidated') {
    // Usar labels ordenados do dataset
    const dataset = chartDatasets.value[0]
    return dataset?._labels || tiers.value
  }
  return safras.value
})

// Chart datasets
const chartDatasets = computed(() => {
  // Paleta padrão do design system (sem azul)
  const standardColors = [
    '#22c55e', // Verde
    '#f59e0b', // Laranja
    '#fbbf24', // Amarelo
    '#ef4444', // Vermelho
    '#a855f7', // Roxo
    '#84cc16', // Verde-limão
    '#f43f5e', // Rosa
    '#6b7280'  // Cinza (Sem Tier)
  ]

  if (props.view === 'consolidated') {
    // Consolidado: um dataset com todos os tiers, agregando todas as safras
    const consolidated = {}

    props.data.forEach(item => {
      if (!consolidated[item.tier]) {
        consolidated[item.tier] = { total: 0, monet: 0 }
      }
      consolidated[item.tier].total += item.total
      consolidated[item.tier].monet += item.monet
    })

    // Criar array com tier e taxa de conversão
    const tierData = tiers.value.map(tier => {
      const data = consolidated[tier]
      const rate = (data && data.total > 0) ? (data.monet / data.total) * 100 : 0
      return { tier, rate }
    })

    // Ordenar por taxa de conversão (maior para menor)
    tierData.sort((a, b) => b.rate - a.rate)

    const sortedLabels = tierData.map(item => item.tier)
    const sortedValues = tierData.map(item => item.rate.toFixed(2))
    const sortedColors = tierData.map((item, index) =>
      item.tier === 'Sem Tier' ? '#6b7280' : standardColors[index % standardColors.length]
    )

    return [
      {
        label: 'Taxa de Conversão (%)',
        data: sortedValues,
        backgroundColor: sortedColors,
        _labels: sortedLabels // Armazenar labels ordenados
      }
    ]
  }

  // By-safra: múltiplos datasets, um por tier
  return tiers.value.map((tier, index) => {
    const values = safras.value.map(safra => {
      const item = props.data.find(d => d.safra === safra && d.tier === tier)
      if (!item || item.total === 0) return 0
      return ((item.monet / item.total) * 100).toFixed(2)
    })

    // Usar cor padrão ou cinza para "Sem Tier"
    const color = tier === 'Sem Tier' ? '#6b7280' : standardColors[index % standardColors.length]

    return {
      label: tier,
      data: values,
      backgroundColor: color
    }
  })
})

const chartOptions = computed(() => {
  const baseOptions = {
    plugins: {
      legend: {
        display: props.view === 'by-safra'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            const value = props.view === 'consolidated' ? context.parsed.x : context.parsed.y
            return `${label}: ${value}%`
          }
        }
      },
      datalabels: {
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => {
          return value > 0 ? `${value}%` : ''
        }
      }
    }
  }

  if (props.view === 'consolidated') {
    // Barras horizontais: X é o valor (%), Y é a categoria
    baseOptions.scales = {
      x: {
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  } else {
    // Barras verticais: Y é o valor (%)
    baseOptions.scales = {
      y: {
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  }

  return baseOptions
})
</script>
