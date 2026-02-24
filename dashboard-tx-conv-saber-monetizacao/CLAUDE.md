# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dashboard de Conversão de Safra — a single-page dashboard that displays agricultural crop conversion metrics (leads, monetized leads, conversion rates) fetched from an external N8N webhook API, with server-side file-based caching.

## Tech Stack

- **Backend:** Node.js + Express + node-fetch (ESM import)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no frameworks)
- **Cache:** File-based JSON (`cache.json`) with 30-minute TTL
- **UI Language:** Portuguese (pt-BR)

## Commands

```bash
npm start        # Start production server (node server.js)
npm run dev      # Start dev server with auto-reload (nodemon)
```

Server runs on `http://localhost:3000` (configurable via PORT env var).

## Environment

Requires `.env` with:
- `API_ENDPOINT` (required) — N8N webhook URL for fetching conversion data
- `PORT` (optional, default: 3000)

See `.env.example` for template.

## Architecture

```
Browser (index.html + script.js)
  → GET /api/data?_t=timestamp[&refresh=true]
    → server.js reads cache.json
      → If cache valid (<30min) and no refresh=true → return cached data
      → If cache expired, missing, or refresh=true → fetch from API_ENDPOINT, save to cache.json, return fresh data
```

**server.js** — Express server with two endpoints:
- `GET /api/data` — Main data endpoint with caching logic. Query param `refresh=true` bypasses cache.
- `GET /api/cache/status` — Returns cache metadata (age, validity, expiry).

**script.js** — Client-side rendering:
- `getData(forceRefresh)` — Fetches from `/api/data`, adds `&refresh=true` when force-refreshing
- `renderScorecards()` / `renderChart()` / `renderTable()` — Render dashboard components
- `forceRefresh()` — Called by the "Atualizar" button, triggers `getData(true)`
- `init()` is called on `DOMContentLoaded` via arrow function wrapper (important: must NOT pass the Event object as argument)

**cache.json** — Runtime cache (git-ignored). Structure: `{ data: {ApiResponse}, timestamp: unixMs }`

## Design System

See `design-system.md` for color palette, typography, and component specs. Key colors:
- Primary: Laranja V4 `#E14D2A`
- Accent Red: `#E62E2E`

## Gotchas

- `node-fetch` v3 is ESM-only, so it's imported via dynamic `await import('node-fetch')` inside the route handler
- Browser caching is disabled on `/api/data` via `Cache-Control: no-store` headers and `fetch(url, { cache: 'no-store' })` on the client
- `express.static(__dirname)` serves all files in the project root — `cache.json` and `.env` are in `.gitignore` but still accessible via HTTP if they exist
- The `index.html` references `script.js?v=N` for cache-busting — bump the version when changing `script.js`
