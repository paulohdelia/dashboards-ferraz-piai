# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Dashboards V4** - Aplicação SPA centralizada de dashboards da V4 Company. Construída com Vue 3 + Vite + Express, com sistema de cache inteligente e componentes reutilizáveis. UI em português (pt-BR).

## Arquitetura

**Stack:**
- Frontend: Vue 3 + Vite + Vue Router + Pinia
- Backend: Express.js + Node-Fetch
- Build: Vite (HMR < 100ms)
- Cache: File-based (5 minutos)

## Estrutura

```
dashboards-v4/
├── design-system.md           # Design system V4 (fonte Ubuntu, paleta sem azul)
├── .claude/commands/          # Comandos customizados (/commit, /create-feature)
├── client/                    # Frontend Vue 3
│   ├── index.html             # Entry point HTML
│   ├── main.js                # Vue app initialization
│   ├── App.vue                # Root component
│   ├── router/                # Vue Router (auto-generated routes)
│   ├── stores/                # Pinia stores
│   ├── components/            # Componentes reutilizáveis
│   │   ├── layout/            # VLayout, VSidebar
│   │   ├── ui/                # VScorecard, VDataTable, VToggleGroup, VRefreshButton
│   │   └── charts/            # VBarChart, VLineChart, VChartCard
│   ├── composables/           # useDashboardData, useFormatters, useChartDefaults
│   ├── styles/                # CSS do design system
│   ├── views/                 # NotFound
│   └── dashboards/            # Dashboards específicos
│       └── TxConvSaberMonetizacao/
│           ├── index.vue      # Componente principal
│           ├── config.js      # Metadata do dashboard
│           └── components/    # Componentes internos (SafraChart, TierChart)
├── server/                    # Backend Express
│   ├── index.js               # Server principal
│   ├── lib/                   # Utilitários
│   │   ├── api-client.js      # HTTP client (timeout 5min)
│   │   └── cache-manager.js   # File-based cache
│   └── routes/
│       └── api.js             # API routes (/api/dashboards, /api/data/:id)
├── config/
│   └── dashboards.json        # Registry de dashboards
├── dashboards-data/           # Cache por dashboard (gitignored)
│   └── {dashboardId}/
│       └── cache.json
├── package.json               # Dependencies root
└── vite.config.js             # Vite config (proxy, build)
```

## Comandos

**Desenvolvimento:**
```bash
npm install          # Instalar dependências
npm run dev          # Rodar Vite (5173) + Express (3001) em paralelo
npm run build        # Build de produção
npm run preview      # Preview do build
npm start            # Servidor de produção
```

**URLs:**
- Frontend (dev): `http://localhost:5173`
- Backend API: `http://localhost:3001`
- Dashboard: `http://localhost:5173/tx-conv-saber-monetizacao`

## Design System

Ver **`design-system.md`** para especificação completa. Principais diretrizes:

- **Fonte:** Ubuntu (Google Fonts), fallback Segoe UI
- **Primary color:** `#ff0000` (vermelho V4)
- **Backgrounds:** `#0d0d0d` (body) → `#141414` (cards) → `#1a1a1a` (inner)
- **Text hierarchy:** `#fff` → `#ccc` → `#999` → `#888` → `#666`
- **Paleta de gráficos (SEM azul):** Verde, Laranja, Amarelo, Vermelho, Roxo, Verde-limão, Rosa, Cinza
- **Border-radius:** 4-6px (conservador)
- **Charts:** Chart.js com grid escuro (`rgba(255,255,255,0.03)`)
- **Referência visual:** https://tremborage.v4ferrazpiai.com.br/

## Padrões Comuns

**Cache:**
- File-based, TTL 5 minutos (300.000ms)
- Armazenado em `dashboards-data/{dashboardId}/cache.json`
- `?refresh=true` bypassa cache
- Gerenciado por `server/lib/cache-manager.js`

**API Proxy:**
- Express proxia APIs externas (N8N webhooks)
- Endpoints em `.env` (`API_ENDPOINT_*`)
- Timeout: 5 minutos (APIs podem demorar)
- Client: `server/lib/api-client.js`

**Componentes Vue:**
- Props tipados, validators quando necessário
- Computed para dados derivados
- Watch para side effects
- Destroy Chart.js instances em `onBeforeUnmount`

**Icons & Charts:**
- Lucide Icons (CDN) - `lucide.createIcons()` após render
- Chart.js + chartjs-plugin-datalabels (CDN)
- Sempre destroy instances anteriores

## Criar Novo Dashboard

**Tempo estimado:** 5-10 minutos

1. **Criar estrutura:**
   ```bash
   mkdir -p client/dashboards/NomeDashboard/components
   ```

2. **Criar `config.js`:**
   ```js
   export default {
     id: 'nome-dashboard',
     title: 'Título do Dashboard',
     icon: 'bar-chart', // Lucide icon name
     description: 'Descrição breve'
   }
   ```

3. **Criar `index.vue`:**
   - Importar composables: `useDashboardData`, `useFormatters`
   - Importar componentes: `VScorecard`, `VDataTable`, etc.
   - Template com scorecards, gráficos, tabelas

4. **Registrar em `config/dashboards.json`:**
   ```json
   {
     "id": "nome-dashboard",
     "title": "Título do Dashboard",
     "icon": "bar-chart",
     "componentPath": "NomeDashboard",
     "apiEndpoint": "API_ENDPOINT_NOME",
     "cacheTTL": 300000
   }
   ```

5. **Adicionar endpoint no `.env`:**
   ```
   API_ENDPOINT_NOME=https://sua-api.com/endpoint
   ```

6. **Testar:**
   - O router auto-gera a rota: `/nome-dashboard`
   - Sidebar auto-adiciona o menu
   - Cache auto-criado em `dashboards-data/nome-dashboard/`

## Git Conventions

- Conventional Commits em português, lowercase, single-line (~50 chars)
- Prefixes: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`, `perf:`
- Co-authored footer quando usar Claude
- Sem `--no-verify`

## Gotchas

- **Vite HMR:** Funciona para Vue/CSS, mas mudanças em `dashboards.json` requerem restart
- **Chart.js instances:** Sempre destroy em `onBeforeUnmount` para evitar memory leaks
- **node-fetch v3:** ESM-only, usar dynamic import: `await import('node-fetch')`
- **Computed deps:** Vue não tracka `array.length`, usar spread `[...array]` se necessário
- **Cache TTL:** 5min padrão, ajustar por dashboard se necessário
- **API timeout:** 5min padrão (APIs podem demorar), ajustar em `api-client.js` se necessário
