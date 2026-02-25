<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="column.align ? `text-${column.align}` : ''"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="!loading && rows.length > 0">
        <tr v-for="(row, index) in rows" :key="index">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[
              column.align ? `text-${column.align}` : '',
              column.bold ? 'font-semibold' : ''
            ]"
          >
            {{ formatCell(row, column) }}
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="loading">
        <tr>
          <td :colspan="columns.length" style="text-align: center; padding: 40px;">
            <span class="spinner spinner-lg"></span>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td :colspan="columns.length" class="empty-state">
            <div class="empty-state-text">Nenhum dado disponível</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (columns) => {
      return columns.every(
        (col) =>
          typeof col === 'object' &&
          'key' in col &&
          'label' in col
      )
    }
  },
  rows: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const formatCell = (row, column) => {
  const value = row[column.key]

  if (column.formatter && typeof column.formatter === 'function') {
    return column.formatter(value, row)
  }

  return value ?? '-'
}
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state-text {
  color: var(--text-muted);
  font-size: 14px;
}
</style>
