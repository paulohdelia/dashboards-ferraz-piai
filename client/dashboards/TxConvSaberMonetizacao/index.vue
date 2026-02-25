<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="main-header">
      <h1 class="main-title">Taxa de Conversão de Safra</h1>
      <div class="main-actions">
        <VRefreshButton :loading="loading" @click="handleRefresh" />
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-message">
      <i data-lucide="alert-circle"></i>
      <span>{{ error }}</span>
    </div>

    <!-- Scorecards -->
    <div class="scorecards">
      <VScorecard
        label="Total de Clientes Saber"
        :value="totalLeads"
        :formatter="formatNumber"
        :loading="loading"
        icon="users"
      />
      <VScorecard
        label="Clientes Monetizados"
        :value="totalMonetizados"
        :formatter="formatNumber"
        :loading="loading"
        icon="dollar-sign"
      />
      <VScorecard
        label="Taxa de Conversão Média"
        :value="avgConversion"
        :formatter="formatPercentage"
        :loading="loading"
        icon="trending-up"
      />
    </div>

    <!-- Safra Chart -->
    <VChartCard title="Evolução da Taxa de Conversão por Safra" :loading="loading">
      <SafraChart v-if="!loading && safraData.length > 0" :data="safraData" />
    </VChartCard>

    <!-- Tier Chart -->
    <VChartCard title="Conversão por Tier" :loading="loading">
      <template #actions>
        <VToggleGroup
          v-model="tierView"
          :options="tierViewOptions"
        />
      </template>
      <TierChart
        v-if="!loading && tierChartData"
        :data="tierChartData"
        :view="tierView"
      />
    </VChartCard>

    <!-- Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Detalhamento</h3>
        <VToggleGroup
          v-model="tableView"
          :options="tableViewOptions"
        />
      </div>
      <div class="card-body">
        <!-- Tabela Consolidada -->
        <div v-if="tableView === 'consolidated'" class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Safra</th>
                <th class="text-right">Total de Clientes Saber</th>
                <th class="text-right">Clientes Monetizados</th>
                <th class="text-right">Taxa de Conversão</th>
              </tr>
            </thead>
            <tbody v-if="!loading && data?.data?.consolidado">
              <tr v-for="row in data.data.consolidado" :key="row.safra">
                <td>{{ row.safra }}</td>
                <td class="text-right">{{ formatNumber(row.count_leads) }}</td>
                <td class="text-right">{{ formatNumber(row.count_leads_monetizados) }}</td>
                <td class="text-right">{{ formatPercentage(row.convertion_rate) }}</td>
              </tr>
            </tbody>
            <tbody v-else-if="loading">
              <tr>
                <td colspan="4" style="text-align: center; padding: 40px;">
                  <span class="spinner spinner-lg"></span>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #999;">
                  Nenhum dado disponível
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tabela Por Tier -->
        <div v-else class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Safra</th>
                <th>Tier</th>
                <th class="text-right">Total de Clientes Saber</th>
                <th class="text-right">Clientes Monetizados</th>
                <th class="text-right">Taxa de Conversão</th>
              </tr>
            </thead>
            <tbody v-if="!loading && tierTableData.length > 0">
              <tr v-for="(row, index) in tierTableData" :key="index">
                <td>{{ row.safra }}</td>
                <td>{{ row.tier }}</td>
                <td class="text-right">{{ row.total }}</td>
                <td class="text-right">{{ row.monet }}</td>
                <td class="text-right">{{ formatPercentage(row.rate) }}</td>
              </tr>
            </tbody>
            <tbody v-else-if="loading">
              <tr>
                <td colspan="5" style="text-align: center; padding: 40px;">
                  <span class="spinner spinner-lg"></span>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #999;">
                  Nenhum dado disponível
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { formatNumber, formatPercentage } from '@/composables/useFormatters'
import VScorecard from '@/components/ui/VScorecard.vue'
import VRefreshButton from '@/components/ui/VRefreshButton.vue'
import VToggleGroup from '@/components/ui/VToggleGroup.vue'
import VDataTable from '@/components/ui/VDataTable.vue'
import VChartCard from '@/components/charts/VChartCard.vue'
import SafraChart from './components/SafraChart.vue'
import TierChart from './components/TierChart.vue'
import config from './config'

// Dashboard data
const { data, loading, error, fetchData } = useDashboardData(config.id)

// Toggle states
const tierView = ref('consolidated')
const tableView = ref('consolidated')

const tierViewOptions = [
  { value: 'consolidated', label: 'Consolidado' },
  { value: 'by-safra', label: 'Por Safra' }
]

const tableViewOptions = [
  { value: 'consolidated', label: 'Consolidado' },
  { value: 'by-tier', label: 'Por Tier' }
]

// Scorecards computed
const totalLeads = computed(() => {
  if (!data.value?.data?.consolidado) return 0
  return data.value.data.consolidado.reduce((sum, item) => sum + item.count_leads, 0)
})

const totalMonetizados = computed(() => {
  if (!data.value?.data?.consolidado) return 0
  return data.value.data.consolidado.reduce((sum, item) => sum + item.count_leads_monetizados, 0)
})

const avgConversion = computed(() => {
  if (totalLeads.value === 0) return 0
  return totalMonetizados.value / totalLeads.value
})

// Safra chart data
const safraData = computed(() => {
  if (!data.value?.data?.consolidado) return []
  return data.value.data.consolidado
})

// Tier chart data
const tierChartData = computed(() => {
  if (!data.value?.data) return null
  return buildTierData(data.value)
})

// Tier table data
const tierTableData = computed(() => {
  if (!data.value?.data) return []

  const leadsSaber = data.value.data.leads_saber || []
  const leadsMonetizacao = data.value.data.leads_monetizacao || []

  // Map lead_id to tier info from saber
  const tierMap = {}
  leadsSaber.forEach(lead => {
    tierMap[lead.lead_id] = {
      tier: lead.lead_tier || 'Sem Tier',
      safra: lead.lead_created_at_safra
    }
  })

  // Group by safra + tier
  const grouped = {}

  // Count all leads from saber
  leadsSaber.forEach(lead => {
    const safra = lead.lead_created_at_safra
    const tier = lead.lead_tier || 'Sem Tier'
    const key = `${safra}|${tier}`

    if (!grouped[key]) {
      grouped[key] = { safra, tier, total: 0, monet: 0 }
    }
    grouped[key].total++
  })

  // Count monetized leads
  leadsMonetizacao.forEach(lead => {
    const info = tierMap[lead.lead_id]
    if (info) {
      const key = `${info.safra}|${info.tier}`
      if (grouped[key]) {
        grouped[key].monet++
      }
    }
  })

  // Convert to array and calculate rates
  return Object.values(grouped)
    .map(item => ({
      safra: item.safra,
      tier: item.tier,
      total: item.total,
      monet: item.monet,
      rate: item.total > 0 ? item.monet / item.total : 0
    }))
    .sort((a, b) => {
      // Sort by safra first
      const safraCompare = a.safra.localeCompare(b.safra)
      if (safraCompare !== 0) return safraCompare

      // Then by tier (Sem Tier last)
      if (a.tier === 'Sem Tier') return 1
      if (b.tier === 'Sem Tier') return -1
      return a.tier.localeCompare(b.tier)
    })
})

// Tier chart data transformation
function buildTierData(rawData) {
  const leadsSaber = rawData.data.leads_saber || []
  const leadsMonetizacao = rawData.data.leads_monetizacao || []

  const tierFromSaber = {}
  leadsSaber.forEach(lead => {
    tierFromSaber[lead.lead_id] = {
      tier: lead.lead_tier || 'Sem Tier',
      safra: lead.lead_created_at_safra
    }
  })

  const grouped = {}
  leadsSaber.forEach(lead => {
    const safra = lead.lead_created_at_safra
    const tier = lead.lead_tier || 'Sem Tier'
    const key = `${safra}|${tier}`
    if (!grouped[key]) grouped[key] = { safra, tier, total: 0, monet: 0 }
    grouped[key].total++
  })

  leadsMonetizacao.forEach(lead => {
    const saberInfo = tierFromSaber[lead.lead_id]
    if (saberInfo) {
      const key = `${saberInfo.safra}|${saberInfo.tier}`
      if (grouped[key]) grouped[key].monet++
    }
  })

  return Object.values(grouped)
}

// Handlers
const handleRefresh = () => {
  fetchData(true)
}

// Initialize
onMounted(() => {
  fetchData()
})

// Re-initialize Lucide icons when error changes
watch(error, () => {
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons()
    }
  }, 0)
})
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
  color: var(--color-danger);
  margin-bottom: var(--spacing-lg);
}

.error-message i {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
