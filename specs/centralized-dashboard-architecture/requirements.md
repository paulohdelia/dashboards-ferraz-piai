# Requirements: Centralized Dashboard Architecture

## Problem Statement

**Current State:**
- Each dashboard is fully independent with duplicated infrastructure
- 16MB per dashboard (15MB node_modules × N dashboards = bloat)
- No centralized navigation between dashboards
- Creating new dashboards requires duplicating entire setup
- No shared component library (design system documented but not implemented)
- Manual setup and inconsistent patterns

**Pain Points:**
- Dependency duplication across dashboards
- Fragmented maintenance (bug fixes needed in N places)
- Visual inconsistencies without shared components
- Time waste recreating common patterns
- Projected 240MB+ of node_modules with 15+ dashboards

## Business Goals

1. **Scale to 15+ dashboards** within 6-12 months
2. **Reduce time to create new dashboard** from hours to 5-10 minutes
3. **Centralize design system** for visual consistency
4. **Improve developer experience** with modern tooling
5. **Reduce maintenance burden** through shared infrastructure

## Functional Requirements

### FR1: Centralized Infrastructure
- Single Express server handling all dashboards
- Shared node_modules (one installation)
- Centralized caching system (file-based, per-dashboard)
- Unified API proxy pattern for external webhooks

### FR2: Navigation System
- Left sidebar menu showing all available dashboards
- Active state indication for current dashboard
- Auto-populate menu from configuration file
- Responsive collapse/expand for mobile

### FR3: Shared Component Library
- Reusable UI components following design system v2
- Scorecard (KPI cards)
- Chart wrappers (line, bar, area charts)
- Data tables with sorting
- Loading states and error handling
- Toggle groups for view switching

### FR4: Dashboard Structure
- Dashboard folders contain only view logic and cache
- Dashboard metadata in config file (title, icon, API endpoint)
- Easy registration of new dashboards (5-10 min process)
- Dashboard-specific components isolated in own folder

### FR5: Design System Implementation
- CSS custom properties for design tokens
- Component library enforcing visual consistency
- Colors: primary red #ff0000, dark theme backgrounds
- Typography: Montserrat font, consistent sizing
- Spacing, borders, radius following documented specs

### FR6: Data Management
- File-based caching with 30-minute TTL per dashboard
- Cache bypass via refresh parameter
- Independent cache per dashboard
- API proxy to external N8N webhooks

## Non-Functional Requirements

### NFR1: Developer Experience
- **Hot reload** < 100ms (Vite HMR)
- Instant feedback during development
- Clear error messages and debugging tools
- Documentation for adding new dashboards

### NFR2: Performance
- Initial bundle size < 200KB (gzipped)
- Code-splitting per dashboard
- Lazy-loading of dashboard routes
- Cache responses to minimize API calls

### NFR3: Maintainability
- Clear separation of concerns (shared vs specific)
- Composable patterns for logic reuse
- Consistent code style and conventions
- Self-documenting code structure

### NFR4: Scalability
- Architecture supports 15+ dashboards without degradation
- File-based cache scales adequately (migrate to Redis if needed)
- Build time remains reasonable (< 30s for production)

## Technical Constraints

### TC1: Stack Decision
**Chosen:** Vue 3 + Vite + Pinia

**Rationale:**
- Team has high experience with frameworks (React/Vue)
- Priority: velocity of development
- Comfortable with build steps
- Scale target: 15+ dashboards

**Benefits:**
- Excellent DX (Vite HMR, Vue DevTools)
- Strong componentization (Vue SFC)
- TypeScript-ready (optional migration path)
- Rich ecosystem (Router, Pinia, VueUse)

### TC2: Backend
- Node.js + Express (continuity with current setup)
- File-based caching (simple, adequate for current scale)
- Dynamic import of node-fetch v3 (ESM compatibility)

### TC3: Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- No IE11 support required
- Portuguese (pt-BR) as UI language

## User Stories

### US1: Developer Creates New Dashboard
**As a** developer
**I want to** create a new dashboard in 5-10 minutes
**So that** I can quickly add new data visualizations

**Acceptance Criteria:**
- [ ] Create dashboard folder with template structure
- [ ] Add config entry with title, icon, API endpoint
- [ ] Register in dashboards.json
- [ ] Hot reload shows new dashboard in sidebar immediately
- [ ] Dashboard renders with shared components (scorecards, charts)

### US2: User Navigates Between Dashboards
**As a** end user
**I want to** navigate between dashboards using a sidebar menu
**So that** I can access all data visualizations in one place

**Acceptance Criteria:**
- [ ] Sidebar shows all available dashboards
- [ ] Active dashboard is visually highlighted
- [ ] Clicking dashboard updates route and content
- [ ] Browser back/forward buttons work correctly
- [ ] Mobile: sidebar collapses/expands responsively

### US3: Developer Reuses Design System Components
**As a** developer
**I want to** use pre-built components for common UI patterns
**So that** I don't reinvent the wheel and maintain consistency

**Acceptance Criteria:**
- [ ] Import VScorecard, VChartCard, VDataTable from shared library
- [ ] Components follow design system v2 specs
- [ ] Scoped CSS prevents style conflicts
- [ ] Components accept props for customization
- [ ] Components have loading states built-in

### US4: User Sees Real-Time Data with Caching
**As a** end user
**I want to** see dashboard data with minimal loading time
**So that** I can quickly analyze metrics

**Acceptance Criteria:**
- [ ] Initial load uses cached data (if < 30min old)
- [ ] Cache indicator shows data age
- [ ] Refresh button bypasses cache
- [ ] Loading states shown during data fetch
- [ ] Error handling for failed API calls

## Success Metrics

1. **Time to add new dashboard**: < 10 minutes (currently ~1 hour)
2. **Bundle size**: < 200KB initial load (dashboard-specific code lazy-loaded)
3. **Hot reload speed**: < 100ms (Vite HMR)
4. **Node modules size**: 15MB total (currently 15MB × N dashboards)
5. **Developer satisfaction**: 4.5+ / 5 in survey after migration

## Out of Scope (for initial implementation)

- TypeScript migration (can be added later)
- Unit/E2E testing (excluded per user request)
- SSR / SEO optimization (not needed for internal dashboards)
- Redis caching (file-based sufficient for now)
- CI/CD pipeline (manual deployment acceptable initially)
- User authentication (assume internal network / VPN)

## Migration Strategy

1. **Parallel implementation**: Build new architecture without breaking existing dashboard
2. **Validation phase**: Compare old vs new side-by-side
3. **Gradual migration**: Move existing dashboard to new structure
4. **Deprecation**: Archive old structure after validation
5. **Incremental addition**: Add new dashboards using new template

## Dependencies

- **Frontend**: Vue 3, Vue Router, Pinia, Vite, Chart.js, Lucide Icons
- **Backend**: Express, dotenv, node-fetch v3
- **Dev Tools**: nodemon (backend), Vite dev server (frontend)

## References

- Current dashboard: `/Users/paulohdelia/Public/www/dashboards-v4/dashboard-tx-conv-saber-monetizacao/`
- Design system: `/Users/paulohdelia/Public/www/dashboards-v4/design-system.md`
- Project guidance: `/Users/paulohdelia/Public/www/dashboards-v4/CLAUDE.md`
