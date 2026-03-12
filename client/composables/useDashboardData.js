import { ref, computed } from 'vue'

/**
 * Composable for fetching and managing dashboard data
 * @param {string} dashboardId - Dashboard identifier
 * @returns {object} - { data, loading, error, fetchData, fromCache }
 */
export function useDashboardData(dashboardId) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const fromCache = ref(false)

  /**
   * Fetch dashboard data
   * @param {boolean} forceRefresh - Bypass cache
   * @param {object} params - Extra query params forwarded to the backend/API
   */
  const fetchData = async (forceRefresh = false, params = {}) => {
    loading.value = true
    error.value = null

    try {
      const query = new URLSearchParams({ ...(forceRefresh ? { refresh: 'true' } : {}), ...params })
      const qs = query.toString()
      const url = `/api/data/${dashboardId}${qs ? `?${qs}` : ''}`
      const response = await fetch(url)

      if (response.status === 401) {
        window.location.href = '/login'
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Erro ao buscar dados')
      }

      const result = await response.json()
      data.value = result.data
      fromCache.value = result.fromCache

      console.log(`[${new Date().toISOString()}] Dados carregados para ${dashboardId} (cache: ${result.fromCache})`)
    } catch (err) {
      error.value = err.message
      console.error(`[${new Date().toISOString()}] Erro ao buscar dados:`, err)
    } finally {
      loading.value = false
    }
  }

  const hasData = computed(() => data.value !== null)

  return {
    data,
    loading,
    error,
    fetchData,
    fromCache,
    hasData
  }
}
