import { promises as fs } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Default cache TTL: 30 minutes in milliseconds
const DEFAULT_CACHE_TTL = 30 * 60 * 1000

/**
 * Get the cache file path for a dashboard
 * @param {string} dashboardId - Dashboard identifier
 * @returns {string} Absolute path to cache file
 */
function getCachePath(dashboardId) {
  return join(__dirname, '..', '..', 'dashboards-data', dashboardId, 'cache.json')
}

/**
 * Get cached data for a dashboard
 * @param {string} dashboardId - Dashboard identifier
 * @param {number} ttl - Cache TTL in milliseconds (default: 30 minutes)
 * @returns {Promise<object|null>} Cached data or null if invalid/missing
 */
export async function getCachedData(dashboardId, ttl = DEFAULT_CACHE_TTL) {
  const cachePath = getCachePath(dashboardId)

  try {
    // Read cache file
    const cacheContent = await fs.readFile(cachePath, 'utf-8')
    const cache = JSON.parse(cacheContent)

    // Check if cache has required fields
    if (!cache.timestamp || !cache.data) {
      console.log(`[${new Date().toISOString()}] Cache inválido para ${dashboardId} (campos faltando)`)
      return null
    }

    // Check cache age
    const cacheAge = Date.now() - cache.timestamp
    const isValid = cacheAge < ttl

    if (isValid) {
      const ageMinutes = Math.floor(cacheAge / 60000)
      console.log(`[${new Date().toISOString()}] Cache HIT para ${dashboardId} (idade: ${ageMinutes}min)`)
      return cache.data
    } else {
      const ageMinutes = Math.floor(cacheAge / 60000)
      console.log(`[${new Date().toISOString()}] Cache EXPIRED para ${dashboardId} (idade: ${ageMinutes}min)`)
      return null
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`[${new Date().toISOString()}] Cache MISS para ${dashboardId} (arquivo não existe)`)
    } else {
      console.error(`[${new Date().toISOString()}] Erro ao ler cache para ${dashboardId}:`, error.message)
    }
    return null
  }
}

/**
 * Set cached data for a dashboard
 * @param {string} dashboardId - Dashboard identifier
 * @param {object} data - Data to cache
 * @returns {Promise<void>}
 */
export async function setCachedData(dashboardId, data) {
  const cachePath = getCachePath(dashboardId)
  const cacheDir = dirname(cachePath)

  try {
    // Create directory if it doesn't exist
    await fs.mkdir(cacheDir, { recursive: true })

    // Prepare cache object
    const cache = {
      timestamp: Date.now(),
      data
    }

    // Write cache file
    await fs.writeFile(cachePath, JSON.stringify(cache, null, 2), 'utf-8')

    console.log(`[${new Date().toISOString()}] Cache WRITE para ${dashboardId}`)
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro ao escrever cache para ${dashboardId}:`, error.message)
    throw error
  }
}

/**
 * Get cache status for a dashboard
 * @param {string} dashboardId - Dashboard identifier
 * @param {number} ttl - Cache TTL in milliseconds (default: 30 minutes)
 * @returns {Promise<object>} Cache status information
 */
export async function getCacheStatus(dashboardId, ttl = DEFAULT_CACHE_TTL) {
  const cachePath = getCachePath(dashboardId)

  try {
    const cacheContent = await fs.readFile(cachePath, 'utf-8')
    const cache = JSON.parse(cacheContent)

    if (!cache.timestamp) {
      return {
        exists: true,
        valid: false,
        reason: 'Invalid cache format'
      }
    }

    const cacheAge = Date.now() - cache.timestamp
    const isValid = cacheAge < ttl
    const expiresIn = ttl - cacheAge

    return {
      exists: true,
      valid: isValid,
      timestamp: cache.timestamp,
      age: cacheAge,
      ageMinutes: Math.floor(cacheAge / 60000),
      expiresIn: isValid ? expiresIn : 0,
      expiresInMinutes: isValid ? Math.floor(expiresIn / 60000) : 0
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        exists: false,
        valid: false,
        reason: 'Cache file not found'
      }
    }

    return {
      exists: false,
      valid: false,
      reason: error.message
    }
  }
}
