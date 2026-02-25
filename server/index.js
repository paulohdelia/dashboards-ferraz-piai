import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import apiRoutes from './routes/api.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
app.use(express.json())

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.url}`)
  next()
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  })
})

// API routes
app.use('/api', apiRoutes)

// Serve static files in production
if (NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist', 'client')
  app.use(express.static(distPath))

  // Serve index.html for all non-API routes (SPA fallback)
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString()
  console.error(`[${timestamp}] Error:`, err.message)
  console.error(err.stack)

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
      timestamp
    }
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on http://localhost:${PORT}`)
  console.log(`[${new Date().toISOString()}] Environment: ${NODE_ENV}`)
})
