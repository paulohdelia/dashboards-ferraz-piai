# Design System - Dashboards V4 Company

> Sistema de design visual para criacao consistente de dashboards em todos os formatos (web, TV, apresentacoes).
> Referencia visual: [Sales Monitor](https://tremborage.v4ferrazpiai.com.br/)

---

## Fundamentos

### Filosofia de Design
- **Minimalismo Funcional**: Priorizar clareza e legibilidade sobre ornamentacao
- **Alto Contraste**: Fundos escuros com destaques vibrantes para ambientes de TV e monitores
- **Hierarquia Visual Clara**: Usar tamanho, cor e peso para guiar o olhar
- **Dados em Primeiro Lugar**: O design serve os dados, nao o contrario
- **Densidade Informacional**: Maximizar informacao por tela sem sacrificar legibilidade

---

## Paleta de Cores

### Cor Primaria / Marca

```css
--color-primary: #ff0000;         /* Vermelho V4 - Destaque principal, CTAs, bordas highlight */
--color-primary-dark: #cc0000;    /* Vermelho escuro - Hover states */
```

**Uso:**
- Titulos de secao (barra lateral `::before`)
- Botoes de acao (Apply, CTAs)
- Bordas de cards em destaque (`.highlight`)
- Separadores do header
- Active states em filtros e presets
- Gradientes em barras de funil (`linear-gradient(90deg, #ff0000, #cc0000)`)

### Cores Semanticas (Status)

```css
--color-safe: #22c55e;            /* Verde - Status positivo, meta atingida */
--color-care: #fbbf24;            /* Amarelo - Atencao necessaria */
--color-danger: #ef4444;          /* Vermelho - Status critico, perdas */
--color-info: #3b82f6;            /* Azul - Informativo, categorias neutras */
```

**Aplicacoes:**
| Status | Cor | Hex | Exemplo |
|--------|-----|-----|---------|
| Positivo / Atingido | Verde | `#22c55e` | Meta batida, pace adiantado |
| Atencao / Moderado | Amarelo | `#fbbf24` | % atingimento parcial |
| Critico / Negativo | Vermelho | `#ef4444` | Pace atrasado, perdas |
| Informativo / Neutro | Azul | `#3b82f6` | Categorias, BANT 3 |

**Glow/Shadow semantico:**
```css
.status-dot.green { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
.status-dot.yellow { box-shadow: 0 0 8px rgba(251, 191, 36, 0.6); }
.status-dot.red { box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
```

### Backgrounds (Tema Escuro)

```css
--bg-body: #0d0d0d;               /* Fundo da pagina */
--bg-card: #141414;                /* Cards e containers */
--bg-inner: #1a1a1a;              /* Elementos dentro de cards (barras track, rows) */
--bg-hover: #1a1a1a;              /* Hover de linhas de tabela */
--bg-input: #0d0d0d;              /* Inputs, selects, date pickers */
--bg-toggle-active: #2a2a2a;      /* Toggle button ativo */
```

**Hierarquia:**
1. `#0d0d0d` -> Fundo da pagina e inputs
2. `#141414` -> Cards, filtros container, presets sidebar
3. `#1a1a1a` -> Elementos internos (bar tracks, alert items, inner cards)
4. `#2a2a2a` -> Toggle ativo, hover de dias no calendario

### Texto

```css
--text-high: #ffffff;              /* Titulos, KPIs, nomes, dados principais */
--text-medium: #ccc;               /* Texto de corpo, valores de celula */
--text-low: #999;                  /* Card titles, labels secundarios */
--text-muted: #888;                /* Meta labels, subtextos, timestamps, icons */
--text-lowest: #666;               /* Table headers, filter labels, captions */
```

**Hierarquia de uso:**
1. `#ffffff` — KPIs grandes, nomes de SDR, titulos de secao, monitor title
2. `#cccccc` — Texto de corpo, valores de tabela, nomes de canal
3. `#999999` — Card titles (uppercase)
4. `#888888` — Meta labels, sub-textos, calendario icons, info text
5. `#666666` — Table headers (th), filter labels, conversion sub-text

### Bordas e Divisores

```css
--border-card: #2a2a2a;            /* Borda de cards, separadores principais */
--border-row: #1f1f1f;             /* Borda entre linhas de tabela */
--border-input: #333333;           /* Borda de inputs, selects, date picker */
--border-tooltip: #333333;         /* Borda de tooltips */
```

---

## Tipografia

### Fonte Principal

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

> A referencia usa system fonts. Para novos dashboards, pode-se usar `'Montserrat', sans-serif` como alternativa corporativa:
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
> ```

### Hierarquia Tipografica

#### Header / Monitor Title
```css
font-size: 22px;
font-weight: 600-700;
letter-spacing: 1px;
color: #ffffff;
```

#### Section Title (H2)
```css
font-size: 14px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 2px;
color: #cccccc;
```
Com barra vermelha lateral `::before`:
```css
.section-title::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #ff0000;
    border-radius: 2px;
}
```

#### Card Title
```css
font-size: 14px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 1px;
color: #999999;
```

#### KPI Numbers (Numeros Grandes)
```css
font-size: 48px;                   /* Padrao */
font-size: 36px;                   /* Compacto (BANT) */
font-weight: 700-800;
line-height: 1.1;
```

#### Meta Label
```css
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
color: #888888;
```

#### Table Header (th)
```css
font-size: 10px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.5px;
color: #666666;
```

#### Table Cell (td)
```css
font-size: 12-13px;
font-weight: 400 (normal) / 500 (name) / 600 (value);
color: #cccccc;
```

#### Filter Label
```css
font-size: 10px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
color: #666666;
```

#### Badge / Caption
```css
font-size: 11px;
font-weight: 600-700;
```

#### Sub-text / Meta
```css
font-size: 11-12px;
color: #888888;
```

---

## Espacamento & Layout

### Sistema de Espacamento

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 25px;
--spacing-2xl: 30px;
```

**Valores de referencia:**
- **Body padding:** `20px`
- **Card padding:** `20px`
- **Filters container padding:** `15px 20px`
- **Gap entre cards/grid:** `15-20px`
- **Section title margin:** `30px 0 15px 0`
- **Table cell padding:** `12-14px 8px`

### Border Radius

```css
--radius-sm: 4px;                  /* Inputs, selects, badges, bar fills */
--radius-md: 6px;                  /* Cards, containers, alertas */
--radius-lg: 12px;                 /* Pace badges */
--radius-round: 50%;               /* Status dots */
--radius-bar: 5-6px;               /* Progress bars, loss bars */
```

> **Nota:** O design de referencia usa radius conservador (`4-6px`). Nao usa `16px` nem `pill/50px` em cards.

### Sombras

```css
/* Tooltips e popovers */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

/* Date popover (elevado) */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.95);
```

> **Nota:** Cards nao tem box-shadow. A separacao visual vem apenas da diferenca de background + borda.

### Grid Layouts

#### 2 Colunas Iguais
```css
.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
```

#### 2 Colunas (2:1)
```css
.grid-2-1 {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
}
```

#### KPI Grid (4 colunas)
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 15px;
```

#### KPI Grid (2x2 dentro de grid)
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 15px;
```

---

## Componentes

### Header

```css
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #2a2a2a;
}
```

**Marca V4:**
```html
<span class="v4">V4</span><span class="company">COMPANY</span>
<span class="separator">|</span>
<span class="monitor">SALES MONITOR | Titulo</span>
```

```css
.v4 { color: #ff0000; font-weight: 700; font-size: 22px; }
.company { color: #666; font-weight: 400; font-size: 22px; }
.separator { color: #ff0000; margin: 0 10px; }
.monitor { color: #fff; font-weight: 600; font-size: 22px; letter-spacing: 1px; }
```

### Section Title

```css
.section-title {
    font-size: 14px;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 30px 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #2a2a2a;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
}

.section-title::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #ff0000;
    border-radius: 2px;
}
```

### Card Padrao

```css
.card {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    padding: 20px;
}
```

### Meta Card (KPI)

```css
.meta-card {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Card em destaque */
.meta-card.highlight {
    border-color: #ff0000;
    border-width: 2px;
}
```

**Estrutura interna:**
```css
.meta-label {
    font-size: 12px;
    color: #888;
    text-transform: uppercase;
    position: absolute;
    top: 18px;
    left: 20px;
    font-weight: 600;
}

.meta-value {
    font-size: 48px;
    font-weight: 800;
    margin-top: 15px;
    line-height: 1.1;
}

.meta-sub {
    font-size: 12px;
    color: #888;
    margin-top: 8px;
}
```

**Cores de valor:**
```css
.meta-value.red { color: #ff0000; }
.meta-value.green { color: #22c55e; }
.meta-value.yellow { color: #fbbf24; }
.meta-value.white { color: #fff; }
```

**Progress bar no rodape do card:**
```css
.meta-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
}
.meta-progress-bar.green { background: #22c55e; }
.meta-progress-bar.yellow { background: #fbbf24; }
.meta-progress-bar.red { background: #ef4444; }
```

### Filtros

```css
.filters-container {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    align-items: flex-end;
    background: #141414;
    padding: 15px 20px;
    border-radius: 6px;
    border: 1px solid #2a2a2a;
}

.filter-label {
    font-size: 10px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.filter-select {
    background: #0d0d0d;
    border: 1px solid #333;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    min-width: 200px;
    height: 38px;
}

.filter-select:focus {
    outline: none;
    border-color: #ff0000;
}
```

### Toggle Group

```css
.toggle-group {
    display: flex;
    background: #0d0d0d;
    border: 1px solid #333;
    border-radius: 4px;
    overflow: hidden;
    height: 38px;
}

.toggle-btn {
    background: transparent;
    color: #888;
    border: none;
    padding: 0 15px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.toggle-btn.active {
    background: #2a2a2a;
    color: #fff;
}
```

### Badges

#### Pace Badge
```css
.pace-badge {
    display: inline-flex;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    margin-top: 8px;
    width: fit-content;
}

.pace-badge.ahead { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.pace-badge.behind { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
```

#### Status Badge
```css
.badge {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
}

.badge.green { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.badge.yellow { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
.badge.red { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.badge.blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
```

#### Status Dot
```css
.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
}

.status-dot.green { background: #22c55e; box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
.status-dot.yellow { background: #fbbf24; box-shadow: 0 0 8px rgba(251, 191, 36, 0.6); }
.status-dot.red { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6); }
```

### Botao Primario (Apply)

```css
.filter-btn.apply-btn {
    background: #ff0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 20px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
}

.filter-btn.apply-btn:hover {
    background: #cc0000;
}
```

### Tabelas

```css
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    color: #666;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.5px;
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #2a2a2a;
}

td {
    padding: 12-14px 8px;
    font-size: 12-13px;
    border-bottom: 1px solid #1f1f1f;
    color: #ccc;
}

tr:hover {
    background: #1a1a1a;
}
```

**Nomes/primeira coluna:**
```css
td:first-child {
    color: #fff;
    font-weight: 500;
}
```

### Barras Horizontais (Funil / Canais)

#### Estrutura
```html
<div class="funnel-bar-row">
    <div class="funnel-bar-label">Label</div>
    <div class="funnel-bar-track">
        <div class="funnel-bar-fill" style="width: 80%;">
            <span class="funnel-bar-value">1.234</span>
        </div>
    </div>
    <span class="funnel-bar-conversion">100%</span>
</div>
```

#### CSS
```css
.funnel-bar-track {
    flex: 1;
    height: 32px;
    background: #1a1a1a;
    border-radius: 4px;
    overflow: hidden;
}

.funnel-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff0000, #cc0000);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.5s ease;
    min-width: 35px;
}

.funnel-bar-value {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.funnel-bar-conversion {
    font-size: 13px;
    color: #fff;
    width: 55px;
    text-align: right;
    font-weight: 600;
}
```

#### Barras com cores semanticas (canais)
```css
.channel-bar-fill.high { background: #22c55e; }
.channel-bar-fill.medium { background: #3b82f6; }
.channel-bar-fill.low { background: #fbbf24; }
.channel-bar-fill.very-low { background: #ef4444; }
```

### Alertas

```css
.alert-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-radius: 6px;
    background: #1a1a1a;
}

.alert-item.critical { border-left: 3px solid #ef4444; }
.alert-item.warning { border-left: 3px solid #fbbf24; }
.alert-item.success { border-left: 3px solid #22c55e; }

.alert-count {
    font-size: 26px;
    font-weight: 700;
    min-width: 40px;
}
```

### Summary Box

```css
.summary-box {
    margin-top: 20px;
    padding: 15px;
    background: #1a1a1a;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-box .label {
    font-size: 12px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.summary-box .value {
    font-size: 20px;
    font-weight: 700;
    color: #22c55e;
}
```

### Tooltips (via `data-tooltip`)

```css
[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #1f1f1f;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    border: 1px solid #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    z-index: 1000;
}
```

---

## Visualizacoes de Dados

### Biblioteca Padrao: Chart.js

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### Paleta de Cores para Graficos

```javascript
const chartColors = {
    primary: '#ff0000',
    primaryDark: '#cc0000',
    safe: '#22c55e',
    warning: '#fbbf24',
    danger: '#ef4444',
    info: '#3b82f6',
    text: '#cccccc',
    textMuted: '#888888',
    textLowest: '#666666',
    gridLine: 'rgba(255, 255, 255, 0.05)',
    gridBorder: 'rgba(255, 255, 255, 0.05)',
};
```

### Configuracao Padrao de Graficos

```javascript
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#ccc',
                font: { size: 12, weight: 500 }
            }
        }
    },
    scales: {
        x: {
            ticks: { color: '#666' },
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            }
        },
        y: {
            beginAtZero: true,
            ticks: { color: '#666', precision: 0 },
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            }
        }
    }
};
```

### Container de Graficos

```css
.burnup-container {
    height: 220px;
    width: 100%;
}
```

---

## Animacoes & Transicoes

### Transicoes Padrao

```css
transition: all 0.2s;                 /* Hover geral */
transition: width 0.5s ease;          /* Barras de progresso */
transition: opacity 0.2s;             /* Tooltips */
transition: border-color 0.2s;        /* Inputs focus */
transition: transform 0.2s ease;      /* Expand icons */
```

### Loading States

Texto simples: `"Carregando..."` com cor `#888`

### Drilldown / Expand

```css
.expand-icon {
    display: inline-block;
    transition: transform 0.2s ease;
    font-size: 10px;
    color: #888;
    margin-right: 6px;
    width: 12px;
    text-align: center;
}

.drilldown-parent:hover .expand-icon {
    color: #fff;
}
```

---

## Responsividade

### Breakpoints

```css
@media (max-width: 1400px) {
    .grid-2,
    .grid-2-1 {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 900px) {
    .filters-container {
        flex-direction: column;
        align-items: flex-start;
    }

    body {
        padding: 15px;
    }

    .header-title .v4,
    .header-title .company {
        font-size: 20px;
    }

    .header-title .monitor {
        font-size: 18px;
    }

    .meta-value {
        font-size: 42px;
    }
}
```

---

## Iconografia

O design de referencia usa **emojis** (`📅`) e **caracteres Unicode** (`▼`, `▶`) em vez de uma biblioteca de icones.

Para novos dashboards que precisem de icones mais ricos, usar **Lucide Icons**:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

```html
<i data-lucide="refresh-cw"></i>
<i data-lucide="users"></i>
<i data-lucide="trending-up"></i>
```

---

## Date Picker (Flatpickr)

### Dependencias

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://npmcdn.com/flatpickr/dist/l10n/pt.js"></script>
```

### Override de Tema

O calendario Flatpickr deve ser sobrescrito para fundo transparente, texto claro, e selecao em vermelho:

```css
.flatpickr-calendar { background: transparent !important; box-shadow: none !important; border: none !important; }
.flatpickr-day { color: #ccc !important; border-radius: 4px !important; background: transparent !important; }
.flatpickr-day:hover { background: #2a2a2a !important; color: #fff !important; }
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange { background: #ff0000 !important; border-color: #ff0000 !important; color: #fff !important; }
.flatpickr-day.inRange { background: rgba(255, 0, 0, 0.15) !important; color: #fff !important; }
```

---

## Marca V4 Company

### Header Padrao

```html
<header class="header">
    <div class="header-title">
        <span class="v4">V4</span><span class="company">COMPANY</span>
        <span class="separator">|</span>
        <span class="monitor">NOME DO DASHBOARD</span>
    </div>
    <div class="header-date" id="currentDate"></div>
</header>
```

```css
.v4 { color: #ff0000; font-weight: 700; font-size: 22px; }
.company { color: #666; font-weight: 400; font-size: 22px; }
.separator { color: #ff0000; margin: 0 10px; }
.monitor { color: #fff; font-weight: 600; font-size: 22px; letter-spacing: 1px; }
```

---

## Checklist de Implementacao

Ao criar um novo dashboard, certifique-se de:

- [ ] Fundo da pagina `#0d0d0d`, cor de texto padrao `#ffffff`
- [ ] Cards com fundo `#141414`, borda `1px solid #2a2a2a`, radius `6px`
- [ ] Cor primaria `#ff0000` para destaques, CTAs, separadores
- [ ] Cores semanticas: verde `#22c55e`, amarelo `#fbbf24`, vermelho `#ef4444`, azul `#3b82f6`
- [ ] Section titles com barra vermelha lateral (`::before`)
- [ ] KPI numbers grandes (36-48px, weight 700-800)
- [ ] Table headers: `10px`, uppercase, `#666666`, weight 500
- [ ] Table rows: hover `#1a1a1a`, borda `#1f1f1f`
- [ ] Inputs/selects: fundo `#0d0d0d`, borda `#333`, focus borda `#ff0000`
- [ ] Badge semanticos com background rgba + cor forte
- [ ] Barras horizontais com track `#1a1a1a` e fill com gradiente ou cor semantica
- [ ] Transicoes suaves (0.2s para hover, 0.5s para barras)
- [ ] Responsivo: grid colapsa em 1 coluna em `<=1400px`
- [ ] Chart.js configurado com cores do DS (grid escuro, texto claro)
- [ ] Header com marca V4 (vermelho) + COMPANY (cinza) + separador + titulo

---

## Stack Tecnologico

### Frontend
- **Vanilla JS** (padrao para dashboards)
- **CSS puro** com custom properties

### Bibliotecas
- **Chart.js** — Graficos e visualizacoes
- **Flatpickr** — Date range picker
- **Lucide Icons** — Iconografia (opcional)

### Fontes
- System fonts (`Segoe UI` stack) como padrao
- `Montserrat` (Google Fonts) como alternativa corporativa

---

**Ultima atualizacao:** 2026-02-24
**Versao:** 2.0
**Referencia:** [Sales Monitor - tremborage.v4ferrazpiai.com.br](https://tremborage.v4ferrazpiai.com.br/)
**Status:** Aprovado para uso em producao
