<template>
  <button
    class="btn btn-sm"
    :class="{ 'btn-primary': !loading }"
    :disabled="loading"
    @click="handleClick"
  >
    <i
      :data-lucide="loading ? 'loader-2' : 'refresh-cw'"
      :class="{ spinner: loading }"
      style="width: 16px; height: 16px;"
    ></i>
    <span>{{ loading ? 'Atualizando...' : 'Atualizar' }}</span>
  </button>
</template>

<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.loading) {
    emit('click')
  }
}

onMounted(() => {
  if (window.lucide) {
    window.lucide.createIcons()
  }
})

watch(
  () => props.loading,
  () => {
    setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons()
      }
    }, 0)
  }
)
</script>

<style scoped>
.spinner {
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
