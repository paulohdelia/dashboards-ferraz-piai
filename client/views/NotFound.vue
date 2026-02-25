<template>
  <div class="not-found">
    <div class="not-found-content">
      <i data-lucide="alert-circle" class="not-found-icon"></i>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-text">Página não encontrada</p>
      <p class="not-found-description">
        O dashboard que você procura não existe ou foi removido.
      </p>
      <router-link to="/" class="btn btn-primary">
        <i data-lucide="home"></i>
        <span>Voltar para o início</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (window.lucide) {
    window.lucide.createIcons()
  }
})
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: var(--spacing-2xl);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.not-found-icon {
  width: 80px;
  height: 80px;
  color: var(--color-danger);
  margin: 0 auto var(--spacing-lg);
}

.not-found-title {
  font-size: 72px;
  font-weight: var(--font-weight-extrabold);
  color: var(--text-high);
  margin-bottom: var(--spacing-sm);
  line-height: 1;
}

.not-found-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-medium);
  margin-bottom: var(--spacing-md);
}

.not-found-description {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

.btn {
  display: inline-flex;
}
</style>
