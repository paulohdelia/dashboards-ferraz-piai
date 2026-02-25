# Implementation Plan: Centralized Dashboard Architecture

## Overview

Transform the dashboard monorepo from independent applications to a centralized SPA with shared infrastructure using **Vue 3 + Vite + Pinia**.

**Estimated Duration:** 5-8 days
**Team Profile:** High experience with frameworks, comfortable with build steps, scaling to 15+ dashboards

---

## Phase 1: Foundation & Setup (1-2 days)

### 1.1 Project Structure
- [ ] Create `client/` directory for Vue 3 application
- [ ] Create `server/` directory for Express backend
- [ ] Create `config/` directory for dashboard registry
- [ ] Create `dashboards-data/` directory for caches

### 1.2 Package Management
- [ ] Initialize root `package.json` with workspace config
- [ ] Install Vue 3 dependencies: `vue@3`, `vue-router@4`, `pinia@2`
- [ ] Install Vite: `vite@5`, `@vitejs/plugin-vue`
- [ ] Install backend dependencies: `express`, `dotenv`, `node-fetch@3`
- [ ] Install dev dependencies: `nodemon`
- [ ] Configure scripts in package.json:
  - `dev`: Run Vite dev server + Express API concurrently
  - `build`: Build production assets
  - `preview`: Preview production build

### 1.3 Vite Configuration
- [ ] Create `vite.config.js` at root
- [ ] Configure Vue plugin
- [ ] Configure proxy: `/api` → `http://localhost:3000`
- [ ] Set build output directory: `dist/client`
- [ ] Configure aliases: `@` → `./client`

### 1.4 Express Server Setup
- [ ] Create `server/index.js` with basic Express setup
- [ ] Add dotenv config loading
- [ ] Configure static serving (production mode)
- [ ] Add health check endpoint: `GET /health`
- [ ] Setup logging (console with timestamps)

### 1.5 Environment Configuration
- [ ] Update `.env` with centralized API endpoints
- [ ] Create `.env.example` template
- [ ] Update `.gitignore` for new structure (node_modules, dist, cache.json files)

---

## Phase 2: Backend Infrastructure (1-2 days)

### 2.1 Cache Manager
- [ ] Create `server/lib/cache-manager.js`
- [ ] Implement `getCachedData(dashboardId)` function
  - Read from `dashboards-data/{dashboardId}/cache.json`
  - Check if cache age < 30 minutes
  - Return cached data or null
- [ ] Implement `setCachedData(dashboardId, data)` function
  - Create directory if not exists
  - Write data with timestamp to cache.json
  - Log cache operations
- [ ] Add error handling for file operations

### 2.2 API Client
- [ ] Create `server/lib/api-client.js`
- [ ] Implement `fetch(endpoint)` function
  - Dynamic import of node-fetch (ESM)
  - Error handling for HTTP errors
  - Timeout configuration
  - Response validation
- [ ] Add retry logic for transient failures (optional)

### 2.3 API Routes
- [ ] Create `server/routes/api.js`
- [ ] Implement `GET /api/data/:dashboardId` endpoint
  - Load dashboard config from registry
  - Check `refresh` query parameter
  - Use cache-manager to get/set data
  - Call external API via api-client if cache miss
  - Return JSON with `fromCache` flag
- [ ] Implement `GET /api/cache/status/:dashboardId` endpoint
  - Return cache age, validity, expiry time
- [ ] Add error handling middleware (500 responses)

### 2.4 Dashboard Registry
- [ ] Create `config/dashboards.json` file
- [ ] Define schema: `[{ id, title, icon, componentPath, apiEndpoint, cacheTTL }]`
- [ ] Add entry for existing dashboard (tx-conv-saber-monetizacao)
- [ ] Add validation in server (check if dashboard exists)

---

## Phase 3: Design System Components (1-2 days)

### 3.1 CSS Foundation
- [ ] Create `client/styles/design-system.css`
- [ ] Extract CSS custom properties from design-system.md:
  - Colors (primary, backgrounds, text, semantic)
  - Typography (font family, sizes, weights)
  - Spacing (margins, paddings)
  - Borders (radius, colors)
- [ ] Create `client/styles/layout.css` for sidebar + main layout
- [ ] Create `client/styles/components.css` for global component styles

### 3.2 Layout Components
- [ ] Create `client/components/layout/VLayout.vue`
  - Wrapper with sidebar + main content area
  - Props: `collapsed` (sidebar state)
  - Slot for main content
- [ ] Create `client/components/layout/VSidebar.vue`
  - Load dashboards from config/dashboards.json
  - Render navigation menu with icons (Lucide)
  - Active state based on current route
  - Emit collapse event for responsive toggle
  - Props: `dashboards` (array), `collapsed` (boolean)

### 3.3 UI Components
- [ ] Create `client/components/ui/VScorecard.vue`
  - Props: `label`, `value`, `icon`, `loading`, `trend`
  - Show spinner when loading
  - Display Lucide icon
  - Format value (optional formatter prop)
- [ ] Create `client/components/ui/VRefreshButton.vue`
  - Props: `loading`
  - Emit `click` event
  - Show spinner icon when loading
  - Disable button during loading
- [ ] Create `client/components/ui/VToggleGroup.vue`
  - Props: `options` (array), `modelValue` (v-model)
  - Emit `update:modelValue` on click
  - Active state styling (design system red)
- [ ] Create `client/components/ui/VDataTable.vue`
  - Props: `columns` (array with key, label, formatter), `rows` (data)
  - Support custom formatters per column
  - Loading state (skeleton or spinner)
  - Scrollable wrapper for overflow

### 3.4 Chart Components
- [ ] Create `client/components/charts/VChartCard.vue`
  - Wrapper for Chart.js canvas
  - Props: `title`, `loading`
  - Slot for header actions (refresh button)
  - Manage canvas element lifecycle
- [ ] Create `client/components/charts/VLineChart.vue`
  - Props: `data`, `labels`, `color`, `gradient`
  - Preset config with design system styling
  - Destroy Chart.js instance on unmount
  - Use composable for default config
- [ ] Create `client/components/charts/VBarChart.vue`
  - Props: `data`, `labels`, `colors`, `stacked`, `datalabels`
  - Preset config with design system styling
  - Support chartjs-plugin-datalabels
  - Destroy instance on unmount

### 3.5 Composables
- [ ] Create `client/composables/useDashboardData.js`
  - Accept `dashboardId` parameter
  - Return `{ data, loading, error, fetchData(forceRefresh) }`
  - Use Pinia store internally
- [ ] Create `client/composables/useFormatters.js`
  - Export `formatPercentage(value)` → "45.60%"
  - Export `formatDateTime(isoString)` → "24/02/2026 18:07"
  - Export `formatNumber(value)` → "1.234"
- [ ] Create `client/composables/useChartDefaults.js`
  - Export default Chart.js config (colors, grid, tooltips)
  - Load design system CSS variables
  - Return reusable config objects

---

## Phase 4: Vue Application Core (1 day)

### 4.1 Vue App Setup
- [ ] Create `client/index.html` as Vite entry point
  - Load Google Fonts (Montserrat)
  - Add Lucide Icons script (CDN)
  - Add Chart.js + chartjs-plugin-datalabels (CDN)
  - Link design-system.css
- [ ] Create `client/main.js`
  - Initialize Vue app
  - Register Vue Router
  - Register Pinia store
  - Mount to `#app`
- [ ] Create `client/App.vue`
  - Use VLayout component
  - Render VSidebar with dashboards from config
  - Render `<router-view />` in main content area

### 4.2 Vue Router
- [ ] Create `client/router/index.js`
- [ ] Configure router with `createWebHistory()`
- [ ] Add redirect: `/` → `/tx-conv-saber-monetizacao`
- [ ] Auto-generate routes from `config/dashboards.json`:
  - Path: `/{dashboard.id}`
  - Component: lazy-loaded `import('../dashboards/{componentPath}/index.vue')`
  - Meta: `{ title: dashboard.title }`
- [ ] Add 404 route for unknown paths

### 4.3 Pinia Store
- [ ] Create `client/stores/dashboardData.js`
- [ ] Define `useDashboardStore` with:
  - State: `dataCache` (object keyed by dashboardId)
  - Action: `fetchData(dashboardId, forceRefresh)`
    - Fetch from `/api/data/:dashboardId?refresh=${forceRefresh}`
    - Store in dataCache with timestamp
    - Handle errors
  - Getter: `getData(dashboardId)` → return cached data or null
- [ ] Create `client/stores/navigation.js` (optional)
  - State: `sidebarCollapsed` (boolean)
  - Action: `toggleSidebar()`

---

## Phase 5: Migrate Existing Dashboard (2-3 days)

### 5.1 Dashboard Structure
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/` folder
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/components/` subfolder
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/config.js`
  - Export: `{ id, title, icon, apiEndpoint }`

### 5.2 Dashboard Main Component
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/index.vue`
- [ ] Setup script section:
  - Import composables: `useDashboardData`, `useFormatters`
  - Import components: `VScorecard`, `VRefreshButton`, chart components
  - Load dashboard config
  - Call `fetchData()` on mounted
- [ ] Create template structure:
  - Header with title + refresh button
  - Scorecards section (total leads, monetized, avg conversion)
  - Chart section with line+area chart
  - Tier chart section with toggle
  - Table section with toggle
- [ ] Add scoped styles for dashboard-specific layout

### 5.3 Convert Scorecards Logic
- [ ] Extract `renderScorecards()` logic from old script.js
- [ ] Calculate totals from `data.data.consolidado` array
- [ ] Use `VScorecard` component 3 times (total leads, monetized, avg conversion)
- [ ] Pass computed values as props
- [ ] Show loading state via `VScorecard :loading="loading"`

### 5.4 Convert Safra Chart
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/components/SafraChart.vue`
- [ ] Extract `renderChart()` logic from old script.js
- [ ] Use `VLineChart` component with:
  - Labels: safra periods from data
  - Data: conversion rates as percentages
  - Gradient fill: red (#ff0000 → transparent)
- [ ] Manage Chart.js instance lifecycle (destroy on unmount)
- [ ] Add custom tooltip formatting

### 5.5 Convert Tier Chart
- [ ] Create `client/dashboards/TxConvSaberMonetizacao/components/TierChart.vue`
- [ ] Extract `renderTierChart*()` logic from old script.js
- [ ] Implement toggle state: `consolidated` vs `by-safra`
- [ ] Use `VToggleGroup` component
- [ ] Use `VBarChart` component with:
  - Consolidated view: bars per tier (all safras combined)
  - By-safra view: grouped bars (safras on X, tiers as datasets)
- [ ] Add chartjs-plugin-datalabels for data labels
- [ ] Manage Chart.js instance lifecycle

### 5.6 Convert Table
- [ ] Extract `renderTable()` and `renderTableByTier()` logic
- [ ] Use `VDataTable` component
- [ ] Implement toggle state: `consolidated` vs `by-tier`
- [ ] Use `VToggleGroup` component
- [ ] Define columns with formatters:
  - Safra: plain text
  - Total leads: number formatter
  - Monetized: number formatter
  - Conversion rate: percentage formatter
- [ ] Pass computed rows based on toggle state

### 5.7 Data Transformation
- [ ] Migrate `buildTierData()` helper function
- [ ] Transform API response shape:
  - `data.data.consolidado` → chart/table data
  - `data.data.leads_saber` → tier breakdown
  - `data.data.leads_monetizacao` → monetization data
- [ ] Create computed properties for transformed data
- [ ] Handle loading and error states

### 5.8 Style Migration
- [ ] Extract global styles to `client/styles/design-system.css`
- [ ] Convert dashboard-specific styles to scoped CSS in `.vue` files
- [ ] Verify design system compliance:
  - Colors (primary red, backgrounds, text)
  - Typography (Montserrat, font sizes)
  - Spacing (consistent margins/paddings)
  - Border radius (4-6px)
- [ ] Test responsive layout (mobile sidebar collapse)

---

## Phase 6: Integration & Validation (1 day)

### 6.1 Development Server
- [ ] Configure concurrently to run Vite + Express in parallel
- [ ] Update `npm run dev` script:
  - Start Express on port 3000
  - Start Vite dev server on port 5173 (proxies /api to 3000)
- [ ] Test hot reload works (< 100ms update on .vue file change)

### 6.2 Dashboard Registry
- [ ] Update `config/dashboards.json` with migrated dashboard entry:
  ```json
  {
    "id": "tx-conv-saber-monetizacao",
    "title": "Taxa de Conversão de Safra",
    "icon": "trending-up",
    "componentPath": "TxConvSaberMonetizacao",
    "apiEndpoint": "${API_ENDPOINT_SAFRA}",
    "cacheTTL": 1800000
  }
  ```
- [ ] Load registry in server routes
- [ ] Load registry in Vue router for auto-route generation
- [ ] Load registry in VSidebar for menu generation

### 6.3 Cache Migration
- [ ] Move existing `cache.json` to `dashboards-data/tx-conv-saber-monetizacao/cache.json`
- [ ] Verify cache reads work with new structure
- [ ] Test cache write on data refresh
- [ ] Verify 30-minute TTL logic
- [ ] Test `?refresh=true` bypasses cache

### 6.4 Visual Validation
- [ ] Load dashboard in browser: `http://localhost:5173/tx-conv-saber-monetizacao`
- [ ] Compare side-by-side with old dashboard
- [ ] Verify scorecards show correct values
- [ ] Verify SafraChart renders with correct data + gradient
- [ ] Verify TierChart renders both views (consolidated + by-safra)
- [ ] Verify table renders both views (consolidated + by-tier)
- [ ] Verify toggles work (update charts/table on click)
- [ ] Verify refresh button shows loading state and fetches fresh data
- [ ] Verify sidebar shows dashboard with active state
- [ ] Test mobile responsiveness (sidebar collapse)

### 6.5 Functional Testing
- [ ] Test initial load uses cache (check console: `fromCache: true`)
- [ ] Test cache expiry after 30 minutes
- [ ] Test refresh button bypasses cache
- [ ] Test error handling (disconnect API, verify error message)
- [ ] Test loading states (skeleton/spinner during fetch)
- [ ] Test browser back/forward navigation
- [ ] Test direct URL access (refresh page on dashboard route)

### 6.6 Performance Check
- [ ] Measure bundle size: `npm run build` → check dist/ size
  - Target: < 200KB gzipped for initial load
  - Verify dashboard code is lazy-loaded (separate chunk)
- [ ] Measure hot reload speed (< 100ms expected with Vite)
- [ ] Verify Chart.js instances are destroyed (no memory leaks)
- [ ] Check network tab: API calls cached properly

---

## Phase 7: Documentation & Cleanup (1 day)

### 7.1 Project Documentation
- [ ] Update root `CLAUDE.md` with new architecture
  - Describe new structure (client/, server/, config/)
  - Document how to run project (`npm run dev`)
  - Explain dashboard registration process
- [ ] Create `client/README.md` for frontend
  - List available components in design system
  - Document composables usage
  - Explain Vue Router and Pinia store patterns
- [ ] Create `server/README.md` for backend
  - Document API endpoints
  - Explain cache-manager usage
  - Describe API proxy pattern

### 7.2 Dashboard Creation Guide
- [ ] Create `docs/creating-new-dashboard.md`
- [ ] Document 5-step process:
  1. Create folder structure
  2. Create config.js with metadata
  3. Create index.vue with template
  4. Register in config/dashboards.json
  5. Add API endpoint to .env
- [ ] Provide code templates for common patterns
- [ ] Estimate time: 5-10 minutes per dashboard

### 7.3 Code Cleanup
- [ ] Remove old dashboard files (move to `_old/` for backup)
- [ ] Update `.gitignore`:
  - Ignore `_old/` directory
  - Ignore `dashboards-data/*/cache.json`
  - Ignore `dist/`
- [ ] Remove unused dependencies from old package.json
- [ ] Clean up console.log statements (replace with proper logging)

### 7.4 Build Configuration
- [ ] Create production build: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Verify static assets are served correctly
- [ ] Verify API routes work in production mode
- [ ] Document deployment process in README

---

## Phase 8: Template for Future Dashboards (Optional, 1 day)

### 8.1 Dashboard Template Files
- [ ] Create `templates/dashboard-template/` directory
- [ ] Create template `index.vue` with placeholders:
  - `{{DASHBOARD_ID}}`, `{{DASHBOARD_TITLE}}`
  - Example scorecards, chart, table structure
- [ ] Create template `config.js` with placeholders
- [ ] Create template `components/` folder with example component

### 8.2 CLI Generator (Optional)
- [ ] Create `scripts/create-dashboard.js` script
- [ ] Accept arguments: `--id`, `--title`, `--icon`, `--api`
- [ ] Read template files
- [ ] Replace placeholders with provided values
- [ ] Write to `client/dashboards/{id}/`
- [ ] Create cache directory: `dashboards-data/{id}/`
- [ ] Update `config/dashboards.json` automatically
- [ ] Usage: `npm run create-dashboard -- --id=novo --title="Novo Dashboard" --icon=bar-chart --api=$API_ENDPOINT_NOVO`

### 8.3 Onboarding Documentation
- [ ] Create video/gif demo of creating new dashboard
- [ ] Document common patterns (fetching data, rendering charts)
- [ ] Provide troubleshooting guide (common errors)
- [ ] Create component gallery page (optional, shows all design system components)

---

## Post-Implementation Tasks

### Monitoring & Optimization
- [ ] Monitor bundle size after adding more dashboards
- [ ] Consider switching to Redis cache if file I/O becomes bottleneck (> 10 dashboards)
- [ ] Profile Chart.js rendering performance if slow with large datasets
- [ ] Consider CDN for static assets (fonts, icons, Chart.js)

### Future Enhancements (Optional)
- [ ] TypeScript migration (gradual, start with composables)
- [ ] Add Vitest for unit tests (if needed later)
- [ ] Add E2E tests with Playwright (if needed later)
- [ ] Implement CI/CD pipeline (GitHub Actions)
- [ ] Add error tracking (Sentry)
- [ ] Add observability (structured logging, metrics)

---

## Rollback Plan

If critical issues arise:

1. **Immediate Rollback:**
   - [ ] Restore old dashboard from `_old/` directory
   - [ ] Revert git commits to before migration
   - [ ] Restart old server: `cd dashboard-tx-conv-saber-monetizacao && npm start`

2. **Partial Rollback:**
   - [ ] Keep new infrastructure but disable specific dashboard
   - [ ] Fix issues in isolated branch
   - [ ] Merge after validation

3. **Incremental Approach:**
   - [ ] Run old and new dashboards in parallel (different ports)
   - [ ] Gradually migrate traffic
   - [ ] Deprecate old after validation period

---

## Success Criteria

- [x] New dashboard can be created in < 10 minutes
- [x] Hot reload works in < 100ms
- [x] Bundle size < 200KB gzipped
- [x] All migrated dashboard features work identically to old version
- [x] Design system components are reusable across dashboards
- [x] Cache system functions correctly (30-min TTL)
- [x] Sidebar navigation works with active state
- [x] Documentation is clear and comprehensive

---

## Key Files to Modify/Create

| Path | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Root package with Vue, Vite, Express deps |
| `vite.config.js` | Create | Vite config with Vue plugin and API proxy |
| `server/index.js` | Create | Express server with API routes |
| `server/lib/cache-manager.js` | Create | File-based cache utilities |
| `server/routes/api.js` | Create | API endpoints for dashboard data |
| `client/main.js` | Create | Vue app initialization |
| `client/App.vue` | Create | Root component with layout |
| `client/router/index.js` | Create | Vue Router configuration |
| `client/stores/dashboardData.js` | Create | Pinia store for data fetching |
| `client/components/layout/VSidebar.vue` | Create | Navigation sidebar component |
| `client/components/ui/VScorecard.vue` | Create | KPI card component |
| `client/components/charts/VLineChart.vue` | Create | Line+area chart preset |
| `client/dashboards/TxConvSaberMonetizacao/index.vue` | Create | Migrated dashboard component |
| `config/dashboards.json` | Create | Dashboard registry |
| `dashboard-tx-conv-saber-monetizacao/*` | Move | Move to `_old/` as backup |
| `CLAUDE.md` | Update | Document new architecture |

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1: Foundation | 1-2 days | Project structure, Vite config, Express setup |
| Phase 2: Backend | 1-2 days | Cache manager, API routes, dashboard registry |
| Phase 3: Design System | 1-2 days | CSS foundation, layout components, UI components |
| Phase 4: Vue Core | 1 day | Router, Pinia store, app initialization |
| Phase 5: Migration | 2-3 days | Convert existing dashboard to Vue components |
| Phase 6: Integration | 1 day | Testing, validation, cache migration |
| Phase 7: Documentation | 1 day | Update docs, cleanup, build config |
| Phase 8: Template (Optional) | 1 day | CLI generator, dashboard template |

**Total Estimated Time:** 5-8 days (excluding optional Phase 8)

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Vue 3 learning curve | Medium | Team already has high experience with frameworks |
| Migration breaks existing dashboard | High | Keep old version running in parallel, validate thoroughly |
| Build failures in production | Medium | Test production build locally before deploy |
| Performance issues with 15+ dashboards | Medium | Monitor bundle size, implement code-splitting, consider Redis cache |
| File-based cache doesn't scale | Low | Adequate for current needs, migrate to Redis if issues arise |

---

## Notes

- Unit and E2E testing excluded per user request (can be added later if needed)
- TypeScript is optional and can be migrated gradually
- Focus on getting MVP working, then iterate and improve
- Keep documentation updated as architecture evolves
