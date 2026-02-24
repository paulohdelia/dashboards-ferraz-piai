# Design System - Dashboards V4 Company

> Sistema de design visual para criação consistente de dashboards em todos os formatos (web, TV, apresentações)

---

## 📐 Fundamentos

### Filosofia de Design
- **Minimalismo Funcional**: Priorizar clareza e legibilidade sobre ornamentação
- **Alto Contraste**: Fundos escuros com destaques vibrantes para ambientes de TV e monitores
- **Hierarquia Visual Clara**: Usar tamanho, cor e peso para guiar o olhar
- **Dados em Primeiro Lugar**: O design serve os dados, não o contrário

---

## 🎨 Paleta de Cores

### Cores Primárias

```css
--color-primary: #E14D2A;      /* Laranja V4 - Destaque principal */
--color-primary-alt: #E62E2E;  /* Vermelho alternativo - Alertas e CTAs */
```

**Uso:**
- Títulos principais e destaques
- Bordas de elementos importantes
- CTAs e botões de ação
- Gráficos e visualizações principais

### Backgrounds (Tema Escuro)

```css
--bg-default: #000000;         /* Preto puro - Background principal */
--bg-surface: #121212;         /* Preto suave - Superfícies secundárias */
--bg-card: #1A1A1A;            /* Cinza escuro - Cards e containers */
--bg-card-hover: #222222;      /* Cinza hover - Estados interativos */
--bg-secondary: #262626;       /* Cinza médio - Tiles e áreas destacadas */
```

**Hierarquia:**
- `#000000` → Fundo da página
- `#1A1A1A` → Cards principais
- `#262626` → Elementos dentro de cards
- `#222222` → Estados hover

### Backgrounds (Tema Claro)

```css
--bg-light-default: #F3F4F6;  /* Gray-100 - Background principal */
--bg-light-card: #FFFFFF;      /* Branco - Cards */
```

**Uso:** Dashboards administrativos e relatórios para impressão

### Cores Semânticas (Status)

```css
--color-safe: #4ADE80;         /* Verde - Status positivo */
--color-care: #FACC15;         /* Amarelo - Atenção necessária */
--color-danger: #EF4444;       /* Vermelho - Status crítico */
--color-critical: #94A3B8;     /* Cinza azulado - Status inativo/bloqueado */
```

**Aplicações:**
| Status | Cor | Exemplo |
|--------|-----|---------|
| Excelente (≤7 dias) | Verde | `#4ADE80` |
| Atenção (8-15 dias) | Amarelo | `#FACC15` |
| Preocupante (16-30 dias) | Vermelho | `#EF4444` |
| Crítico (>30 dias) | Cinza | `#94A3B8` |

### Texto

```css
--text-high: #FFFFFF;          /* Branco - Títulos e dados principais */
--text-medium: #B3B3B3;        /* Cinza médio - Textos secundários */
--text-medium-alt: #A1A1AA;    /* Cinza alternativo - Labels */
--text-low: #808080;           /* Cinza escuro - Metadados e captions */
--text-lowest: #71717A;        /* Cinza mais escuro - Informações terciárias */
```

**Hierarquia de Contraste:**
1. **High**: KPIs, números grandes, títulos principais
2. **Medium**: Descrições, labels, subtítulos
3. **Low**: Timestamps, metadados, footers

### Bordas e Divisores

```css
--border-subtle: rgba(255, 255, 255, 0.03);   /* Borda sutil - Cards */
--border-divider: #333333;                     /* Divisor padrão - Separadores */
--border-hover: rgba(255, 255, 255, 0.05);    /* Borda hover - Estados interativos */
```

---

## 🔤 Tipografia

### Fonte Principal

```css
font-family: 'Montserrat', sans-serif;
```

**Pesos disponíveis:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Fonte Alternativa (Dashboards Web Leves)

```css
font-family: 'Inter', sans-serif;
```

**Uso:** Interfaces web que precisam de leveza e legibilidade em textos longos

### Hierarquia Tipográfica

#### Títulos Principais (H1)

```css
font-size: 64px;               /* Slides de apresentação */
font-size: 24pt;               /* Slides compactos */
font-size: 20px;               /* Dashboards web */
font-weight: 800;              /* ExtraBold */
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-high);
line-height: 1.1 - 1.2;
```

**Uso:** Títulos de páginas, slides principais

#### Títulos de Seção (H2)

```css
font-size: 18pt;               /* Slides */
font-size: 14px;               /* Dashboards web */
font-weight: 600;              /* SemiBold */
text-transform: capitalize / uppercase;
color: var(--color-primary);   /* Ou --text-medium */
letter-spacing: 0.05em;
margin-bottom: 16px;
```

**Uso:** Cabeçalhos de cards, seções de conteúdo

#### Títulos de Card (H3)

```css
font-size: 20px;
font-weight: 600;
color: var(--text-high);
margin-bottom: 8px;
```

#### Texto Corpo (Body Text)

```css
font-size: 18px;               /* Slides e apresentações */
font-size: 14px;               /* Dashboards web */
font-weight: 400;              /* Regular */
color: var(--text-medium);
line-height: 1.5;
```

#### Caption / Metadados

```css
font-size: 14px;               /* Pequeno */
font-size: 11px;               /* Micro (badges) */
font-weight: 300;              /* Light */
color: var(--text-low);
text-transform: uppercase;
letter-spacing: 1px - 2px;
```

**Uso:** Timestamps, marcas confidenciais, badges

#### KPI Numbers (Números Grandes)

```css
font-size: 64px;               /* Números de impacto */
font-size: 48px;               /* Médio */
font-size: 32px;               /* Compacto */
font-weight: 800;              /* ExtraBold */
color: var(--color-primary) ou var(--color-safe);
line-height: 1;
```

**Uso:** Métricas principais, health scores, totalizadores

---

## 📏 Espaçamento & Layout

### Sistema de Espaçamento

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 40px;
--spacing-3xl: 64px;
```

**Grid Margin:** `40px` (slides de apresentação)
**Card Padding:** `24px` (padrão)
**Gap padrão:** `24px` (entre cards)

### Border Radius

```css
--radius-sm: 4px;              /* Elementos pequenos, slides */
--radius-md: 12px;             /* Cards médios, botões */
--radius-lg: 16px;             /* Cards principais */
--radius-pill: 50px / 100px;   /* Badges, pills */
```

### Sombras

```css
/* Cards principais */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

/* Cards em tema claro */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Hover - tema claro */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Grid Layouts

#### Layout de Dashboard (2 colunas)

```css
.dashboard-grid {
    display: grid;
    grid-template-columns: 320px 1fr;  /* Sidebar + Conteúdo */
    gap: 24px;
    height: 100vh;
}
```

#### Layout de KPIs (4 colunas)

```css
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}
```

#### Layout de Tiles (3 colunas)

```css
.tiled-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

#### Layout Two-Column (Apresentações)

```css
.two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
}
```

### Dimensões de Slides

**Formato Padrão (16:9):**
- **Largura:** 1280px
- **Altura:** 720px
- **Padding:** 40px

**Formato 4K (se necessário):**
- **Largura:** 1920px
- **Altura:** 1080px

---

## 🧩 Componentes

### Cards

#### Card Padrão (Tema Escuro)

```css
.card {
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-subtle);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    padding: var(--spacing-lg);
}
```

#### Card com Hover

```css
.card:hover {
    background-color: var(--bg-card-hover);
    border-color: var(--border-hover);
    transform: translateX(4px);  /* Movimento sutil */
    transition: all 0.2s ease;
}
```

### Status Badges

```css
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: var(--radius-pill);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border: 1px solid;
}

/* Variações */
.badge-safe {
    background: rgba(74, 222, 128, 0.1);
    color: #4ADE80;
    border-color: rgba(74, 222, 128, 0.2);
}

.badge-warning {
    background: rgba(250, 204, 21, 0.1);
    color: #FACC15;
    border-color: rgba(250, 204, 21, 0.2);
}

.badge-danger {
    background: rgba(239, 68, 68, 0.1);
    color: #EF4444;
    border-color: rgba(239, 68, 68, 0.2);
}

.badge-critical {
    background: rgba(0, 0, 0, 0.8);
    color: #FFFFFF;
    border-color: #000000;
}
```

### Botões

#### Botão Primário

```css
.btn-primary {
    background-color: var(--color-primary);
    color: #FFFFFF;
    border: none;
    padding: 16px 24px;
    border-radius: var(--radius-pill);
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(225, 77, 42, 0.4);
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background-color: #B30000;
    transform: translateY(-2px);
}
```

#### Botão Secundário / Ghost

```css
.btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-medium);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
}
```

### Inputs & Forms

```css
input[type="text"],
input[type="search"],
select {
    background: var(--bg-card);
    border: 1px solid var(--border-divider);
    color: var(--text-high);
    padding: 10px 16px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-family: var(--font-main);
    transition: all 0.2s;
}

input:focus,
select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(225, 77, 42, 0.1);
}

/* Com ícone à esquerda */
.input-with-icon {
    position: relative;
}

.input-with-icon input {
    padding-left: 40px;
}

.input-with-icon i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-low);
}
```

### Listas

```css
/* Lista customizada com bullets coloridos */
ul.custom-list {
    list-style: none;
}

ul.custom-list li {
    margin-bottom: 16px;
    position: relative;
    padding-left: 24px;
}

ul.custom-list li::before {
    content: "•";
    color: var(--color-primary);
    font-weight: bold;
    font-size: 24px;
    position: absolute;
    left: 0;
    top: -5px;
}
```

### Tabelas

```css
table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: rgba(255, 255, 255, 0.02);
}

th {
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-low);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border-divider);
}

td {
    padding: 16px;
    border-bottom: 1px solid var(--border-subtle);
    color: var(--text-medium);
    font-size: 14px;
}

tr:hover {
    background-color: var(--bg-card-hover);
    transition: background-color 0.2s;
}
```

### Tiles (Grid Items)

```css
.tile {
    background-color: var(--bg-secondary);
    padding: 24px;
    border-radius: var(--radius-sm);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid var(--border-divider);
}

.tile .icon {
    font-size: 32px;
    color: var(--color-primary);
    margin-bottom: 16px;
}

.tile h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-high);
    margin-bottom: 8px;
}

.tile p {
    font-size: 14px;
    color: var(--text-medium);
    line-height: 1.5;
}
```

---

## 📊 Visualizações de Dados

### Biblioteca Padrão: Chart.js

**CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### Paleta de Cores para Gráficos

```javascript
const chartColors = {
    primary: 'rgb(225, 77, 42)',        // Laranja V4
    safe: 'rgb(74, 222, 128)',          // Verde
    warning: 'rgb(250, 204, 21)',       // Amarelo
    danger: 'rgb(239, 68, 68)',         // Vermelho
    neutral: 'rgb(148, 163, 184)',      // Cinza azulado

    // Com alpha (transparência)
    primaryAlpha: 'rgba(225, 77, 42, 0.6)',
    safeAlpha: 'rgba(74, 222, 128, 0.6)',
    warningAlpha: 'rgba(250, 204, 21, 0.6)',
};
```

### Configuração Padrão de Gráficos

```javascript
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#B3B3B3',      // text-medium
                font: {
                    family: 'Montserrat',
                    size: 12,
                    weight: 500
                }
            }
        }
    },
    scales: {
        x: {
            ticks: { color: '#71717A' },  // text-lowest
            grid: {
                color: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: '#71717A',
                precision: 0
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            }
        }
    }
};
```

### Tipos de Gráfico Recomendados

| Tipo | Uso | Cores |
|------|-----|-------|
| **Line Chart** | Tendências ao longo do tempo | Verde com preenchimento suave |
| **Bar Chart** | Comparações entre categorias | Azul primário com bordas |
| **Horizontal Bar** | Performance por pessoa/conta | Azul gradiente |
| **Doughnut** | Distribuição percentual | Paleta semântica (verde/amarelo/vermelho) |
| **Área** | Volume acumulado | Preenchimento com transparência |

---

## 🎯 Iconografia

### Biblioteca Padrão: Lucide Icons

**CDN:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
```

**Inicialização:**
```javascript
lucide.createIcons();
```

### Tamanhos de Ícones

```css
/* Ícones em botões e inline */
.icon-sm { width: 16px; height: 16px; }

/* Ícones em cards e títulos */
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }

/* Ícones decorativos grandes */
.icon-xl { width: 32px; height: 32px; }
.icon-2xl { width: 48px; height: 48px; }
```

### Ícones Comuns

| Contexto | Ícone | Código |
|----------|-------|--------|
| Dashboard | `layout-dashboard` | `<i data-lucide="layout-dashboard"></i>` |
| Atualizar | `refresh-cw` | `<i data-lucide="refresh-cw"></i>` |
| Busca | `search` | `<i data-lucide="search"></i>` |
| Alerta | `alert-triangle` | `<i data-lucide="alert-triangle"></i>` |
| Sucesso | `check-circle` | `<i data-lucide="check-circle"></i>` |
| Atenção | `alert-circle` | `<i data-lucide="alert-circle"></i>` |
| Crítico | `skull` | `<i data-lucide="skull"></i>` |
| Tempo | `clock` | `<i data-lucide="clock"></i>` |
| Lista | `list` | `<i data-lucide="list"></i>` |
| Gráfico | `bar-chart-3` | `<i data-lucide="bar-chart-3"></i>` |
| PDF Export | `file-pdf` | `<i data-lucide="file-pdf"></i>` |
| Bug/Debug | `bug` | `<i data-lucide="bug"></i>` |

---

## 🎬 Animações & Transições

### Transições Padrão

```css
/* Hover suave */
transition: all 0.2s ease;

/* Entrada de conteúdo */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.3s ease-in-out;
}
```

### Loading Spinner

```css
.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

### Slide Transitions (Apresentações)

```css
.slide {
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
}

.slide.active {
    opacity: 1;
}
```

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Adaptações de Grid

```css
/* Mobile: 1 coluna */
.kpi-grid {
    grid-template-columns: 1fr;
}

/* Tablet: 2 colunas */
@media (min-width: 768px) {
    .kpi-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 4 colunas */
@media (min-width: 1024px) {
    .kpi-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## 🔧 Utilitários CSS

### Loading Overlay

```css
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
```

### Scrollbar Customizado

```css
/* Webkit (Chrome, Safari, Edge) */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-surface);
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Firefox */
* {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) var(--bg-surface);
}
```

---

## 📋 Layouts de Apresentação

### 1. Title Slide (Capa)

**Estrutura:**
- Border-left: 8px solid var(--color-primary)
- Tag pequena no topo
- Título gigante (64px)
- Subtítulo (24px) em cor primária
- Descrição curta

### 2. Two-Column (Texto + Imagem)

**Grid:** `1fr 1fr` com `gap: 40px`
- Esquerda: Conteúdo textual
- Direita: Imagem ou gráfico

### 3. Tiled Content (3 Colunas)

**Grid:** `repeat(3, 1fr)` com `gap: 20px`
- Ícone colorido no topo
- Título médio
- Texto descritivo

### 4. Bleed Image Layout

**Grid:** `repeat(2, minmax(0, 1fr))`
- 50% conteúdo textual (padding: 60px)
- 50% imagem sangrada (height: 720px, object-fit: cover)

### 5. KPI Numbers (Números Destacados)

- Container com `justify-content: space-around`
- Números grandes (64px, bold, cor primária)
- Labels pequenos abaixo (16px, uppercase)

---

## 🎨 Marca V4 Company

### Logo (CSS)

```html
<div class="v4-brand">
    <span class="part-white">V4</span>
    <span class="part-orange">Company</span>
</div>
```

```css
.v4-brand {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 26px;
    letter-spacing: -0.04em;
    line-height: 1;
    display: flex;
    align-items: baseline;
}

.v4-brand .part-white {
    color: #FFFFFF;
    margin-right: 2px;
}

.v4-brand .part-orange {
    color: var(--color-primary);
}
```

### Marca Confidencial

```html
<div class="confidential-mark">CONFIDENCIAL</div>
```

```css
.confidential-mark {
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 10pt;
    color: #4D4D4D;
    text-transform: uppercase;
    letter-spacing: 2px;
}
```

---

## ✅ Checklist de Implementação

Ao criar um novo dashboard, certifique-se de:

- [ ] Usar fonte Montserrat (pesos 400-900)
- [ ] Aplicar paleta de cores escuras (#000000, #1A1A1A, #262626)
- [ ] Usar cor primária (#E14D2A ou #E62E2E) para destaques
- [ ] Implementar cores semânticas (verde/amarelo/vermelho/cinza)
- [ ] Usar border-radius consistente (4px, 12px ou 16px)
- [ ] Aplicar espaçamento do sistema (8px, 16px, 24px, 40px)
- [ ] Incluir Lucide Icons para iconografia
- [ ] Configurar Chart.js com paleta padrão
- [ ] Implementar loading states e spinners
- [ ] Adicionar transições suaves (0.2s ease)
- [ ] Testar contraste de texto (WCAG AA no mínimo)
- [ ] Validar em resolução 1280x720 (TV) e 1920x1080 (4K)
- [ ] Incluir marca "CONFIDENCIAL" se aplicável
- [ ] Implementar scrollbars customizados
- [ ] Testar estados hover e interativos

---

## 📦 Stack Tecnológico

### Frontend
- **React 18** (opcional, para dashboards dinâmicos)
- **Vanilla JS** (para dashboards estáticos)
- **Tailwind CSS** (tema claro) ou **CSS Custom Properties** (tema escuro)

### Bibliotecas Essenciais
- **Chart.js** - Gráficos e visualizações
- **Lucide Icons** - Iconografia
- **PapaParse** - Parse de CSV (se necessário)
- **html2canvas** - Screenshots e exports de imagem

### Fontes
- **Google Fonts** - Montserrat / Inter

---

## 🚀 Exemplos de Uso

### Dashboard Escuro (Tema Principal)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard V4</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        :root {
            --color-primary: #E14D2A;
            --bg-default: #000000;
            --bg-card: #1A1A1A;
            --text-high: #FFFFFF;
            --text-medium: #B3B3B3;
            --radius-lg: 16px;
            --spacing-lg: 24px;
        }

        body {
            background-color: var(--bg-default);
            color: var(--text-high);
            font-family: 'Montserrat', sans-serif;
            padding: var(--spacing-lg);
        }

        .card {
            background-color: var(--bg-card);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Dashboard V4</h1>
        <p>Conteúdo aqui</p>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
```

---

## 📞 Contato & Suporte

Para dúvidas sobre implementação deste design system:
- **Time:** V4 Company Dev Team
- **Documentação:** Este arquivo (`design-system.md`)
- **Referências:** Veja os dashboards existentes na pasta `/dashboard-office`

---

**Última atualização:** 2026-02-24
**Versão:** 1.0
**Status:** ✅ Aprovado para uso em produção
