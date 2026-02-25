/**
 * API Client for fetching data from external endpoints
 * Uses dynamic import for node-fetch (ESM compatibility)
 */

// Default timeout: 5 minutes (APIs podem demorar)
const DEFAULT_TIMEOUT = 300000

/**
 * Fetch data from an external API endpoint
 * @param {string} endpoint - Full URL to fetch
 * @param {object} options - Fetch options
 * @param {number} options.timeout - Request timeout in milliseconds
 * @returns {Promise<object>} Parsed JSON response
 */
export async function fetchData(endpoint, options = {}) {
  const { timeout = DEFAULT_TIMEOUT } = options

  if (!endpoint) {
    throw new Error('API endpoint is required')
  }

  console.log(`[${new Date().toISOString()}] Fetching data from: ${endpoint}`)

  try {
    // Dynamic import of node-fetch (ESM)
    const { default: fetch } = await import('node-fetch')

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      // Perform fetch
      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Dashboards-V4/1.0'
        }
      })

      clearTimeout(timeoutId)

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Parse JSON
      const data = await response.json()

      console.log(`[${new Date().toISOString()}] Data fetched successfully (${JSON.stringify(data).length} bytes)`)

      return data
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`)
      }

      throw fetchError
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching data:`, error.message)
    throw error
  }
}

/**
 * Fetch with retry logic
 * @param {string} endpoint - Full URL to fetch
 * @param {object} options - Fetch options
 * @param {number} options.retries - Number of retry attempts (default: 0)
 * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
 * @returns {Promise<object>} Parsed JSON response
 */
export async function fetchDataWithRetry(endpoint, options = {}) {
  const { retries = 0, retryDelay = 1000, ...fetchOptions } = options

  let lastError

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[${new Date().toISOString()}] Retry attempt ${attempt}/${retries}`)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
      }

      return await fetchData(endpoint, fetchOptions)
    } catch (error) {
      lastError = error

      // Don't retry on client errors (4xx)
      if (error.message.includes('HTTP 4')) {
        throw error
      }

      if (attempt === retries) {
        throw error
      }
    }
  }

  throw lastError
}
