// Configurações
const API_ENDPOINT = '/api/data';

// Instância do gráfico Chart.js
let safraChartInstance = null;

// Função para mostrar loading
function showLoading() {
    document.getElementById('totalLeads').innerHTML = '<div class="spinner"></div>';
    document.getElementById('totalMonetizados').innerHTML = '<div class="spinner"></div>';
    document.getElementById('avgConversion').innerHTML = '<div class="spinner"></div>';
    document.getElementById('safraChartWrapper').innerHTML = '<div class="loading-message">Carregando dados...</div>';
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
        let loadingTimeout = null;

        if (forceRefresh) {
            showLoading();
        } else {
            loadingTimeout = setTimeout(() => showLoading(), 300);
        }

        const timestamp = new Date().getTime();
        let url = `${API_ENDPOINT}?_t=${timestamp}`;

        if (forceRefresh) {
            url += `&refresh=true`;
        }

        const response = await fetch(url, { cache: 'no-store' });

        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error('Servidor retornou dados em formato inesperado');
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
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

// Função para renderizar gráfico de linha com área (Chart.js)
function renderChart(data) {
    const safraData = data.data;
    const wrapper = document.getElementById('safraChartWrapper');

    // Destruir instância anterior se existir
    if (safraChartInstance) {
        safraChartInstance.destroy();
        safraChartInstance = null;
    }

    // Recriar o canvas (necessário após showLoading substituir innerHTML)
    wrapper.innerHTML = '<canvas id="safraChart"></canvas>';
    const ctx = document.getElementById('safraChart').getContext('2d');

    const labels = safraData.map(item => item.safra);
    const values = safraData.map(item => item.convertion_rate * 100);

    // Gradiente de preenchimento
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.3)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    safraChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taxa de Conversão (%)',
                data: values,
                borderColor: '#ff0000',
                borderWidth: 2.5,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff0000',
                pointBorderColor: '#0d0d0d',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#ff0000',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    titleColor: '#ffffff',
                    bodyColor: '#cccccc',
                    borderColor: '#333333',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        family: "'Montserrat', sans-serif",
                        size: 13,
                        weight: 600,
                    },
                    bodyFont: {
                        family: "'Montserrat', sans-serif",
                        size: 12,
                    },
                    displayColors: false,
                    callbacks: {
                        title: function(items) {
                            return 'Safra ' + items[0].label;
                        },
                        label: function(context) {
                            return 'Conversão: ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#666666',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 11,
                            weight: 500,
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)',
                        drawBorder: false,
                    },
                    border: {
                        color: 'rgba(255, 255, 255, 0.05)',
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666666',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 11,
                        },
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)',
                        drawBorder: false,
                    },
                    border: {
                        color: 'rgba(255, 255, 255, 0.05)',
                    }
                }
            }
        }
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

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Inicializar dashboard
async function init(forceRefresh = false) {
    try {
        const data = await getData(forceRefresh);
        renderDashboard(data);
    } catch (error) {
        const errorMessage = error.message || 'Erro desconhecido';

        document.getElementById('totalLeads').textContent = '-';
        document.getElementById('totalMonetizados').textContent = '-';
        document.getElementById('avgConversion').textContent = '-';
        document.getElementById('safraChartWrapper').innerHTML = `
            <div class="loading-message" style="color: #ef4444;">
                Erro ao carregar dados
            </div>
        `;
        document.getElementById('tableBody').innerHTML = `
            <tr>
                <td colspan="4" class="loading" style="color: #ef4444;">
                    Erro ao carregar dados: ${errorMessage}
                    <br><br>
                    <small>Verifique o console (F12) para mais detalhes</small>
                    <br><br>
                    <button onclick="forceRefresh()"
                            style="padding: 8px 20px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; font-family: 'Montserrat', sans-serif; font-weight: 700; text-transform: uppercase; font-size: 12px;">
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
    btn.innerHTML = '<i data-lucide="loader" style="width:14px;height:14px;"></i> Atualizando...';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    try {
        const data = await getData(true);
        renderDashboard(data);
    } catch (error) {
        alert('Erro ao atualizar. Verifique sua conexão e tente novamente.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', () => init());
