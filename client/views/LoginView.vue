<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <i data-lucide="bar-chart-3"></i>
        </div>
        <h1 class="login-title">Dashboard Gestão</h1>
        <p class="login-subtitle">Ferraz Piai</p>
        <span class="login-badge">Acesso exclusivo a sócios e gerentes</span>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">Usuário</label>
          <input
            id="username"
            v-model="username"
            class="form-input"
            type="text"
            autocomplete="username"
            placeholder="Digite seu usuário"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            class="form-input"
            type="password"
            autocomplete="current-password"
            placeholder="Digite sua senha"
            :disabled="loading"
          />
        </div>

        <p v-if="error" class="login-error">{{ error }}</p>

        <button class="login-btn" type="submit" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (window.lucide) lucide.createIcons()
})

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    router.push('/raio-x-financeiro')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Ubuntu', 'Segoe UI', sans-serif;
}

.login-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 16px;
  color: #ff0000;
}

.login-logo svg {
  width: 24px;
  height: 24px;
}

.login-title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px;
}

.login-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0 0 12px;
}

.login-badge {
  display: inline-block;
  font-size: 11px;
  color: #888;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 3px 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-input {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: #fff;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.form-input::placeholder {
  color: #555;
}

.form-input:focus {
  border-color: rgba(255, 0, 0, 0.4);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-error {
  font-size: 13px;
  color: #ff4444;
  margin: 0;
  padding: 10px 12px;
  background: rgba(255, 0, 0, 0.06);
  border: 1px solid rgba(255, 0, 0, 0.15);
  border-radius: 4px;
}

.login-btn {
  background: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 11px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 4px;
}

.login-btn:hover:not(:disabled) {
  background: #cc0000;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
