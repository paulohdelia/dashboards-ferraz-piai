# Dashboards V4

> Sistema centralizado de dashboards da V4 Company construído com Vue 3 + Vite + Express

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com/)

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Editar .env com suas API keys

# Rodar em desenvolvimento
npm run dev

# Acessar
open http://localhost:5173
```

## 📋 Sobre o Projeto

Aplicação SPA centralizada que consolida todos os dashboards da V4 Company em uma única plataforma. Construída com arquitetura moderna, hot reload instantâneo e componentes reutilizáveis.

### ✨ Features

- ⚡ **Hot Reload < 100ms** - Vite proporciona feedback instantâneo
- 🎨 **Design System Consistente** - Fonte Ubuntu, paleta padronizada
- 📦 **Componentes Reutilizáveis** - VScorecard, VDataTable, VBarChart, etc.
- 🔄 **Cache Inteligente** - File-based com TTL de 5 minutos
- 🚦 **Router Automático** - Rotas geradas do registry de dashboards
- 📊 **Chart.js Integrado** - Gráficos com design system aplicado
- 🌐 **API Proxy** - Express proxia N8N webhooks (evita CORS)

### 🏗️ Stack Técnica

**Frontend:**
- Vue 3 (Composition API)
- Vue Router 4 (rotas automáticas)
- Pinia 2 (state management)
- Vite 5 (build tool)

**Backend:**
- Express.js 4
- Node-Fetch 3 (HTTP client)
- File-based cache (JSON)

**UI/UX:**
- Chart.js 4 + Datalabels plugin
- Lucide Icons
- Design System V4 (Ubuntu font)

## 📁 Estrutura do Projeto

```
dashboards-v4/
├── client/                    # Frontend Vue 3
│   ├── components/            # Componentes reutilizáveis
│   │   ├── layout/            # VLayout, VSidebar
│   │   ├── ui/                # VScorecard, VDataTable, VToggleGroup
│   │   └── charts/            # VBarChart, VLineChart, VChartCard
│   ├── composables/           # Lógica reutilizável
│   ├── dashboards/            # Dashboards específicos
│   ├── router/                # Vue Router config
│   ├── stores/                # Pinia stores
│   └── styles/                # CSS do design system
├── server/                    # Backend Express
│   ├── lib/                   # Utilitários (cache, API client)
│   └── routes/                # API routes
├── config/
│   └── dashboards.json        # Registry de dashboards
├── dashboards-data/           # Cache por dashboard
├── design-system.md           # Especificação do design system
└── package.json
```

## 🎯 Dashboards Disponíveis

| Dashboard | Rota | Descrição |
|-----------|------|-----------|
| Taxa de Conversão Safra | `/tx-conv-saber-monetizacao` | Análise de conversão Saber → Monetização |

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento (Vite + Express em paralelo)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Servidor de produção
npm start

# Servidor backend apenas
npm run server:dev

# Vite dev server apenas
npm run client:dev
```

## 📊 Criar Novo Dashboard

**Tempo: ~5-10 minutos**

### 1. Criar estrutura de arquivos

```bash
mkdir -p client/dashboards/MeuDashboard/components
```

### 2. Criar `config.js`

```javascript
// client/dashboards/MeuDashboard/config.js
export default {
  id: 'meu-dashboard',
  title: 'Meu Dashboard',
  icon: 'bar-chart', // Lucide icon
  description: 'Descrição do dashboard'
}
```

### 3. Criar `index.vue`

```vue
<template>
  <div class="dashboard-container">
    <!-- Scorecards -->
    <div class="scorecards">
      <VScorecard
        label="Total"
        :value="total"
        :formatter="formatNumber"
        icon="users"
      />
    </div>

    <!-- Gráfico -->
    <VChartCard title="Evolução">
      <VLineChart :data="chartData" :labels="chartLabels" />
    </VChartCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { formatNumber } from '@/composables/useFormatters'
import VScorecard from '@/components/ui/VScorecard.vue'
import VChartCard from '@/components/charts/VChartCard.vue'
import VLineChart from '@/components/charts/VLineChart.vue'
import config from './config'

const { data, loading, fetchData } = useDashboardData(config.id)

const total = computed(() => data.value?.total || 0)
const chartData = computed(() => data.value?.series || [])
const chartLabels = computed(() => data.value?.labels || [])

onMounted(() => fetchData())
</script>
```

### 4. Registrar no `config/dashboards.json`

```json
{
  "id": "meu-dashboard",
  "title": "Meu Dashboard",
  "icon": "bar-chart",
  "componentPath": "MeuDashboard",
  "apiEndpoint": "API_ENDPOINT_MEU_DASHBOARD",
  "cacheTTL": 300000
}
```

### 5. Adicionar endpoint no `.env`

```bash
API_ENDPOINT_MEU_DASHBOARD=https://sua-api.com/endpoint
```

### 6. Acessar

```
http://localhost:5173/meu-dashboard
```

A rota é criada automaticamente pelo router! ✨

## 🎨 Design System

O projeto segue o **Design System V4** com as seguintes diretrizes:

### Cores

- **Primária:** `#ff0000` (Vermelho V4)
- **Backgrounds:** `#0d0d0d` → `#141414` → `#1a1a1a`
- **Texto:** `#ffffff` → `#cccccc` → `#999999` → `#888888` → `#666666`

### Paleta de Gráficos (sem azul)

1. `#22c55e` - Verde
2. `#f59e0b` - Laranja
3. `#fbbf24` - Amarelo
4. `#ef4444` - Vermelho
5. `#a855f7` - Roxo
6. `#84cc16` - Verde-limão
7. `#f43f5e` - Rosa
8. `#6b7280` - Cinza (Neutro)

### Fonte

**Ubuntu** (Google Fonts), fallback para Segoe UI

Ver [`design-system.md`](./design-system.md) para especificação completa.

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# .env
PORT=3001                      # Porta do Express
NODE_ENV=development           # development | production

# API Endpoints (adicionar conforme dashboards)
API_ENDPOINT_CONV_SABER_MONETIZACAO=https://...
API_ENDPOINT_MEU_DASHBOARD=https://...
```

### Cache

- **Localização:** `dashboards-data/{dashboardId}/cache.json`
- **TTL padrão:** 5 minutos (300.000ms)
- **Bypass:** `?refresh=true` na URL

### API Timeout

- **Padrão:** 5 minutos (APIs podem demorar)
- **Configurável em:** `server/lib/api-client.js`

## 📚 Componentes Disponíveis

### Layout
- `VLayout` - Container principal com sidebar
- `VSidebar` - Menu lateral com navegação

### UI
- `VScorecard` - Card de KPI com ícone
- `VDataTable` - Tabela responsiva com formatters
- `VToggleGroup` - Botões de toggle (consolidado/por tier)
- `VRefreshButton` - Botão de refresh com loading

### Charts
- `VChartCard` - Container de gráfico com título
- `VBarChart` - Gráfico de barras (vertical/horizontal)
- `VLineChart` - Gráfico de linha com área

### Composables
- `useDashboardData(id)` - Fetch e cache de dados
- `useFormatters` - Formatadores (número, porcentagem, moeda)
- `useChartDefaults` - Configurações padrão do Chart.js

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

Build gerado em `dist/client/`

### Rodar em Produção

```bash
NODE_ENV=production npm start
```

O Express serve os arquivos estáticos de `dist/client/` e as rotas de API.

## 📝 Git Conventions

Usar **Conventional Commits** em português:

```bash
feat: adicionar novo dashboard de vendas
fix: corrigir cache sempre forçando refresh
chore: atualizar dependências do vue
style: aplicar design system v2
refactor: simplificar lógica do tier chart
```

## 🤝 Contribuindo

1. Criar branch: `git checkout -b feat/novo-dashboard`
2. Fazer mudanças seguindo o design system
3. Commitar: `git commit -m "feat: adicionar dashboard x"`
4. Push: `git push origin feat/novo-dashboard`
5. Abrir PR

## 📄 Licença

Propriedade da **V4 Company** - Uso interno apenas.

---

**Desenvolvido com ❤️ usando Vue 3 + Vite**
