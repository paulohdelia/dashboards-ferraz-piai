import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)

  async function check() {
    try {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      authenticated.value = data.authenticated
    } catch {
      authenticated.value = false
    }
  }

  async function login(username, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erro ao fazer login')
    authenticated.value = true
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    authenticated.value = false
  }

  return { authenticated, check, login, logout }
})
