// Configurações
const API_ENDPOINT = '/api/data'; // Usar servidor local Node.js

// Função para mostrar loading
function showLoading() {
    document.getElementById('totalLeads').innerHTML = '<div class="spinner"></div>';
    document.getElementById('totalMonetizados').innerHTML = '<div class="spinner"></div>';
    document.getElementById('avgConversion').innerHTML = '<div class="spinner"></div>';
    document.getElementById('safraChart').innerHTML = '<div class="loading-message">Carregando dados... Isso pode levar até 1 minuto.</div>';
    document.getElementById('tableBody').innerHTML = `
        <tr>
            <td colspan="4" class="loading">
                <div class="spinner"></div>
                <div>Carregando dados... Por favor, aguarde.</div>
            </td>
        </tr>
    `;
}

// Função para buscar dados do servidor Node.js (que gerencia o cache)
async function getData(forceRefresh = false) {
    try {
        console.log('🌐 Buscando dados do servidor...');

        // Configurar timeout para mostrar loading apenas se demorar
        let loadingTimeout = null;
        let loadingShown = false;

        // Se for refresh forçado, mostrar loading imediatamente
        if (forceRefresh) {
            showLoading();
            loadingShown = true;
        } else {
            // Caso contrário, mostrar loading apenas se demorar mais de 300ms
            loadingTimeout = setTimeout(() => {
                showLoading();
                loadingShown = true;
            }, 300);
        }

        // Adicionar cache-buster para evitar cache do navegador
        const timestamp = new Date().getTime();
        let url = `${API_ENDPOINT}?_t=${timestamp}`;

        // Adicionar query parameter se for refresh forçado
        if (forceRefresh) {
            url += `&refresh=true`;
        }

        const response = await fetch(url, { cache: 'no-store' });

        // Limpar timeout se a resposta foi rápida
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Verificar se veio do cache ou da API
        if (data.fromCache) {
            console.log(`✅ Dados do cache (${data.cacheAge}) - carregamento instantâneo`);
        } else {
            console.log('📦 Dados atualizados da API externa');
        }

        // Validar estrutura dos dados
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error('❌ Estrutura de dados inválida:', data);
            throw new Error('Servidor retornou dados em formato inesperado');
        }

        return data;
    } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);
        throw error;
    }
}

// Função para formatar data
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para formatar porcentagem
function formatPercentage(value) {
    return `${(value * 100).toFixed(2)}%`;
}

// Função para renderizar scorecards
function renderScorecards(data) {
    const safraData = data.data;

    const totalLeads = safraData.reduce((sum, item) => sum + item.count_leads, 0);
    const totalMonetizados = safraData.reduce((sum, item) => sum + item.count_leads_monetizados, 0);
    const avgConversion = totalLeads > 0 ? totalMonetizados / totalLeads : 0;

    document.getElementById('totalLeads').textContent = totalLeads.toLocaleString('pt-BR');
    document.getElementById('totalMonetizados').textContent = totalMonetizados.toLocaleString('pt-BR');
    document.getElementById('avgConversion').textContent = formatPercentage(avgConversion);
}

// Função para renderizar gráfico de barras
function renderChart(data) {
    const safraData = data.data;
    const chartContainer = document.getElementById('safraChart');

    chartContainer.innerHTML = '';

    // Encontrar o valor máximo para escala
    const maxRate = Math.max(...safraData.map(item => item.convertion_rate));

    safraData.forEach(item => {
        const barContainer = document.createElement('div');
        barContainer.className = 'chart-bar';

        const height = maxRate > 0 ? (item.convertion_rate / maxRate) * 250 : 0;

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;

        const barValue = document.createElement('div');
        barValue.className = 'bar-value';
        barValue.textContent = formatPercentage(item.convertion_rate);

        const barLabel = document.createElement('div');
        barLabel.className = 'bar-label';
        barLabel.textContent = item.safra;

        bar.appendChild(barValue);
        barContainer.appendChild(bar);
        barContainer.appendChild(barLabel);
        chartContainer.appendChild(barContainer);
    });
}

// Função para renderizar tabela
function renderTable(data) {
    const safraData = data.data;
    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';

    safraData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.safra}</td>
            <td>${item.count_leads.toLocaleString('pt-BR')}</td>
            <td>${item.count_leads_monetizados.toLocaleString('pt-BR')}</td>
            <td class="conversion-rate">${formatPercentage(item.convertion_rate)}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Função para atualizar timestamp
function updateTimestamp(data) {
    const timeString = data.time;
    document.getElementById('lastUpdate').textContent = formatDateTime(timeString);
}

// Função principal para renderizar dashboard
function renderDashboard(data) {
    renderScorecards(data);
    renderChart(data);
    renderTable(data);
    updateTimestamp(data);
}

// Inicializar dashboard
async function init(forceRefresh = false) {
    console.log('🚀 Inicializando dashboard...');

    try {
        const data = await getData(forceRefresh);

        console.log('✅ Dados obtidos com sucesso!');

        renderDashboard(data);
    } catch (error) {
        console.error('❌ Erro ao inicializar dashboard:', error);

        const errorMessage = error.message || 'Erro desconhecido';

        document.getElementById('totalLeads').textContent = '-';
        document.getElementById('totalMonetizados').textContent = '-';
        document.getElementById('avgConversion').textContent = '-';
        document.getElementById('safraChart').innerHTML = `
            <div class="loading-message" style="color: #e74c3c;">
                ⚠️ Erro ao carregar dados
            </div>
        `;
        document.getElementById('tableBody').innerHTML = `
            <tr>
                <td colspan="4" class="loading" style="color: #e74c3c;">
                    ⚠️ Erro ao carregar dados: ${errorMessage}
                    <br><br>
                    <small>Verifique o console (F12) para mais detalhes</small>
                    <br><br>
                    <button onclick="forceRefresh()"
                            style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                        Tentar Novamente
                    </button>
                </td>
            </tr>
        `;
    }
}

// Função para forçar refresh (chamada pelo botão)
async function forceRefresh() {
    const btn = document.getElementById('refreshBtn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '⏳ Atualizando...';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';

    try {
        console.log('🔄 Atualização forçada pelo usuário');

        const data = await getData(true);
        renderDashboard(data);

        console.log('✅ Atualização concluída!');
    } catch (error) {
        console.error('❌ Erro ao atualizar:', error);
        alert('Erro ao atualizar. Verifique sua conexão e tente novamente.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    }
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', () => init());
