import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Dashboard Data Store
 * Manages data fetching and caching for all dashboards
 */
export const useDashboardStore = defineStore('dashboardData', () => {
  // State
  const dataCache = ref({})
  const loadingStates = ref({})
  const errorStates = ref({})

  /**
   * Get data for a specific dashboard
   * @param {string} dashboardId - Dashboard identifier
   * @returns {object|null} Cached data or null
   */
  const getData = computed(() => (dashboardId) => {
    return dataCache.value[dashboardId]?.data || null
  })

  /**
   * Check if dashboard is loading
   * @param {string} dashboardId - Dashboard identifier
   * @returns {boolean}
   */
  const isLoading = computed(() => (dashboardId) => {
    return loadingStates.value[dashboardId] || false
  })

  /**
   * Get error for a specific dashboard
   * @param {string} dashboardId - Dashboard identifier
   * @returns {string|null} Error message or null
   */
  const getError = computed(() => (dashboardId) => {
    return errorStates.value[dashboardId] || null
  })

  /**
   * Check if data is from cache
   * @param {string} dashboardId - Dashboard identifier
   * @returns {boolean}
   */
  const isFromCache = computed(() => (dashboardId) => {
    return dataCache.value[dashboardId]?.fromCache || false
  })

  /**
   * Fetch data for a dashboard
   * @param {string} dashboardId - Dashboard identifier
   * @param {boolean} forceRefresh - Bypass cache
   * @returns {Promise<object>} Dashboard data
   */
  async function fetchData(dashboardId, forceRefresh = false) {
    // Set loading state
    loadingStates.value[dashboardId] = true
    errorStates.value[dashboardId] = null

    try {
      const url = `/api/data/${dashboardId}${forceRefresh ? '?refresh=true' : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Erro ao buscar dados')
      }

      const result = await response.json()

      // Cache the data
      dataCache.value[dashboardId] = {
        data: result.data,
        fromCache: result.fromCache,
        timestamp: result.timestamp,
        fetchedAt: Date.now()
      }

      console.log(
        `[Store] Dados carregados para ${dashboardId}`,
        `(cache: ${result.fromCache})`
      )

      return result.data
    } catch (error) {
      errorStates.value[dashboardId] = error.message
      console.error(`[Store] Erro ao buscar dados para ${dashboardId}:`, error)
      throw error
    } finally {
      loadingStates.value[dashboardId] = false
    }
  }

  /**
   * Clear cache for a specific dashboard
   * @param {string} dashboardId - Dashboard identifier
   */
  function clearCache(dashboardId) {
    if (dashboardId) {
      delete dataCache.value[dashboardId]
      delete errorStates.value[dashboardId]
      console.log(`[Store] Cache limpo para ${dashboardId}`)
    } else {
      // Clear all cache
      dataCache.value = {}
      errorStates.value = {}
      console.log('[Store] Todos os caches limpos')
    }
  }

  /**
   * Get cache metadata
   * @param {string} dashboardId - Dashboard identifier
   * @returns {object|null} Cache metadata
   */
  function getCacheMetadata(dashboardId) {
    const cache = dataCache.value[dashboardId]
    if (!cache) return null

    const age = Date.now() - cache.fetchedAt
    const ageMinutes = Math.floor(age / 60000)

    return {
      fromCache: cache.fromCache,
      timestamp: cache.timestamp,
      fetchedAt: cache.fetchedAt,
      age,
      ageMinutes
    }
  }

  return {
    // State
    dataCache,
    loadingStates,
    errorStates,

    // Getters
    getData,
    isLoading,
    getError,
    isFromCache,

    // Actions
    fetchData,
    clearCache,
    getCacheMetadata
  }
})
