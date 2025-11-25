/**
 * Lupin CRM - Stockist 360 Dashboard
 * Interactive functionality with Chart.js integration
 */

/* ========================================
   CHART.JS INITIALIZATION
   ======================================== */

// Design tokens extracted from CSS variables
const chartColors = {
    primary: '#066afe',      // --brand-500
    secondary: '#7a5af8',    // --purple-500
    success: '#17b26a',      // --success-500
    error: '#f04438',        // --error-500
    warning: '#f79009',      // --warning-500
    textMain: '#101828',     // --gray-900
    textMuted: '#667085',    // --gray-500
    gridLine: '#e4e7ec',     // --gray-200
    background: '#ffffff'    // --color-white
};

// Store chart instances for updates
let salesTrendChart = null;
let billingVolumeChart = null;
let salesVelocityChart = null;

/**
 * Base chart configuration with design tokens
 */
const baseChartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: chartColors.textMain,
            titleColor: chartColors.background,
            bodyColor: chartColors.background,
            titleFont: {
                family: 'Inter',
                size: 13,
                weight: '600'
            },
            bodyFont: {
                family: 'Inter',
                size: 12
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: false
        }
    },
    scales: {
        x: {
            ticks: {
                font: {
                    family: 'Inter',
                    size: 11
                },
                color: chartColors.textMuted
            },
            grid: {
                color: chartColors.gridLine,
                drawBorder: false
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    family: 'Inter',
                    size: 11
                },
                color: chartColors.textMuted
            },
            grid: {
                color: chartColors.gridLine,
                drawBorder: false
            }
        }
    }
};

/**
 * Draw Sales Trend Line Chart with Area Fill
 */
function drawSalesTrendChart() {
    const ctx = document.getElementById('sales-trend-chart');
    if (!ctx) return;

    // Create gradient for area fill
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, chartColors.primary + '40'); // 25% opacity
    gradient.addColorStop(1, chartColors.primary + '00'); // 0% opacity

    const config = {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Sales (₹ Lacs)',
                data: [1.8, 2.2, 2.1, 2.6, 2.8, 3.0],
                borderColor: chartColors.primary,
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: chartColors.background,
                pointBorderColor: chartColors.primary,
                pointBorderWidth: 2,
                pointHoverBackgroundColor: chartColors.primary,
                pointHoverBorderColor: chartColors.background,
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            ...baseChartConfig,
            scales: {
                ...baseChartConfig.scales,
                y: {
                    ...baseChartConfig.scales.y,
                    ticks: {
                        ...baseChartConfig.scales.y.ticks,
                        callback: (value) => '₹' + value + 'L'
                    }
                }
            }
        }
    };

    // Destroy existing chart if it exists
    if (salesTrendChart) {
        salesTrendChart.destroy();
    }

    salesTrendChart = new Chart(ctx, config);
}

/**
 * Draw Billing Volume Column Chart
 */
function drawBillingVolumeChart() {
    const ctx = document.getElementById('billing-volume-chart');
    if (!ctx) return;

    const config = {
        type: 'bar',
        data: {
            labels: ['AB-FLO', 'Lupicet', 'Aciloc', 'Gluconorm', 'Others'],
            datasets: [{
                label: 'Units',
                data: [3200, 7500, 4200, 5800, 2100],
                backgroundColor: chartColors.secondary,
                borderColor: chartColors.secondary,
                borderWidth: 0,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            ...baseChartConfig,
            scales: {
                ...baseChartConfig.scales,
                y: {
                    ...baseChartConfig.scales.y,
                    ticks: {
                        ...baseChartConfig.scales.y.ticks,
                        callback: (value) => value.toLocaleString()
                    }
                }
            }
        }
    };

    // Destroy existing chart if it exists
    if (billingVolumeChart) {
        billingVolumeChart.destroy();
    }

    billingVolumeChart = new Chart(ctx, config);
}

/**
 * Draw Sales Velocity Column Chart
 */
function drawSalesVelocityChart() {
    const ctx = document.getElementById('sales-velocity-chart');
    if (!ctx) return;

    const config = {
        type: 'bar',
        data: {
            labels: ['WK1', 'WK2', 'WK3', 'WK4'],
            datasets: [{
                label: 'Units/Day',
                data: [180, 220, 195, 265],
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 0,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            ...baseChartConfig,
            scales: {
                ...baseChartConfig.scales,
                y: {
                    ...baseChartConfig.scales.y,
                    ticks: {
                        ...baseChartConfig.scales.y.ticks,
                        callback: (value) => value + '/day'
                    }
                }
            }
        }
    };

    // Destroy existing chart if it exists
    if (salesVelocityChart) {
        salesVelocityChart.destroy();
    }

    salesVelocityChart = new Chart(ctx, config);
}

/**
 * Initialize all Chart.js charts
 */
function initializeChartJS() {
    // Wait for Chart.js to be loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Set global defaults
    Chart.defaults.font.family = 'Inter';

    // Draw all charts
    drawSalesTrendChart();
    drawBillingVolumeChart();
    drawSalesVelocityChart();

    console.log('✓ Chart.js initialized');
}

// Handle window resize for responsive charts
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (salesTrendChart) salesTrendChart.resize();
        if (billingVolumeChart) billingVolumeChart.resize();
        if (salesVelocityChart) salesVelocityChart.resize();
    }, 250); // Debounce resize events
});

/* ========================================
   TAB MANAGEMENT
   ======================================== */

// Tab management
const tabs = {
    sales: document.getElementById('tab-sales'),
    inventory: document.getElementById('tab-inventory'),
    credit: document.getElementById('tab-credit'),
    service: document.getElementById('tab-service')
};

const tabButtons = {
    sales: document.getElementById('tab-btn-sales'),
    inventory: document.getElementById('tab-btn-inventory'),
    credit: document.getElementById('tab-btn-credit'),
    service: document.getElementById('tab-btn-service')
};

/**
 * Switch between dashboard tabs
 * @param {string} tabName - Name of the tab to switch to (sales, inventory, credit)
 */
function switchTab(tabName) {
    // Hide all tabs and deactivate all buttons
    Object.values(tabs).forEach(tab => tab.classList.add('hidden'));
    Object.values(tabButtons).forEach(btn => btn.classList.remove('active'));

    // Show target tab and activate its button
    if (tabs[tabName] && tabButtons[tabName]) {
        tabs[tabName].classList.remove('hidden');
        tabButtons[tabName].classList.add('active');
    }
}

/**
 * Initialize time period filter pills
 * Adds click handlers to toggle active state
 */
function initializeTimePills() {
    document.querySelectorAll('.time-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            // Find parent container and deactivate siblings
            const parent = this.parentElement;
            parent.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));

            // Activate clicked pill
            this.classList.add('active');

            // Optional: Add data loading logic here
            // const period = this.textContent.trim();
            // loadDataForPeriod(period);
        });
    });
}

/**
 * Initialize the dashboard when DOM is ready
 */
function initializeDashboard() {
    initializeTimePills();

    // Set default tab (sales)
    if (tabs.sales) {
        tabs.sales.classList.remove('hidden');
    }

    console.log('✓ Lupin CRM Dashboard initialized');
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}


// Make switchTab function globally available
window.switchTab = switchTab;

/* ========================================
   TIME PERIOD DATA MANAGEMENT
   ======================================== */

// Data sets for different time periods
const dataByPeriod = {
    'this-week': {
        sales: {
            mtd: '₹ 0.75 L', mtdTrend: '↑ 8%',
            ytd: '₹ 22.50 L', ytdTrend: '↑ 9%',
            achievement: '78%', achievementGap: '₹ 21,000',
            secondary: '₹ 0.71 L', secondaryTrend: '↑ 3%',
            service: '82', serviceTrend: '↑ 1 pts'
        },
        inventory: {
            stockValue: '₹ 48.5 L', stockTrend: '+13%',
            doi: '47 Days', doiTrend: '+12 days',
            variance: '+19%', varianceNote: '3/7 Brands High',
            fillRate: '93%', fillRateTrend: '+3 pts',
            otif: '87%', otifTrend: '-8 pts'
        },
        credit: {
            outstanding: '₹ 48.2 L', outstandingTrend: '+2%',
            overdue: '₹ 12.8 L', overdueTrend: '+0.5 L',
            dso: '42 Days', dsoTrend: '+1 day',
            claims: '₹ 2.1 L', claimsTrend: '+4%',
            gst: 'Compliant', gstNote: 'Returns filed'
        }
    },
    'last-week': {
        sales: {
            mtd: '₹ 0.68 L', mtdTrend: '↑ 5%',
            ytd: '₹ 22.43 L', ytdTrend: '↑ 8%',
            achievement: '73%', achievementGap: '₹ 25,000',
            secondary: '₹ 0.65 L', secondaryTrend: '↑ 2%',
            service: '81', serviceTrend: '↑ 1 pts'
        },
        inventory: {
            stockValue: '₹ 47.8 L', stockTrend: '+11%',
            doi: '46 Days', doiTrend: '+11 days',
            variance: '+17%', varianceNote: '3/7 Brands High',
            fillRate: '92%', fillRateTrend: '+2 pts',
            otif: '86%', otifTrend: '-9 pts'
        },
        credit: {
            outstanding: '₹ 47.5 L', outstandingTrend: '+1%',
            overdue: '₹ 12.5 L', overdueTrend: '+0.3 L',
            dso: '41 Days', dsoTrend: 'stable',
            claims: '₹ 2.0 L', claimsTrend: '+2%',
            gst: 'Compliant', gstNote: 'Returns filed'
        }
    },
    'this-month': {
        sales: {
            mtd: '₹ 3.00 L', mtdTrend: '↑ 12%',
            ytd: '₹ 25.00 L', ytdTrend: '↑ 10%',
            achievement: '82%', achievementGap: '₹ 65,000',
            secondary: '₹ 2.85 L', secondaryTrend: '↑ 5%',
            service: '80', serviceTrend: '↑ 2 pts'
        },
        inventory: {
            stockValue: '₹ 48.2 L', stockTrend: '+12%',
            doi: '46 Days', doiTrend: '+11 days',
            variance: '+18%', varianceNote: '3/7 Brands High',
            fillRate: '94%', fillRateTrend: '+4 pts',
            otif: '88%', otifTrend: '-7 pts'
        },
        credit: {
            outstanding: '₹ 48.2 L', outstandingTrend: '+3%',
            overdue: '₹ 13.2 L', overdueTrend: '+0.8 L',
            dso: '42 Days', dsoTrend: '+2 days',
            claims: '₹ 2.2 L', claimsTrend: '+5%',
            gst: 'Compliant', gstNote: 'Returns filed'
        }
    },
    'last-month': {
        sales: {
            mtd: '₹ 2.68 L', mtdTrend: '↑ 7%',
            ytd: '₹ 22.00 L', ytdTrend: '↑ 8%',
            achievement: '74%', achievementGap: '₹ 95,000',
            secondary: '₹ 2.55 L', secondaryTrend: '↑ 3%',
            service: '78', serviceTrend: '↑ 1 pts'
        },
        inventory: {
            stockValue: '₹ 43.0 L', stockTrend: '+8%',
            doi: '42 Days', doiTrend: '+7 days',
            variance: '+15%', varianceNote: '2/7 Brands High',
            fillRate: '91%', fillRateTrend: '+1 pts',
            otif: '90%', otifTrend: '-5 pts'
        },
        credit: {
            outstanding: '₹ 46.8 L', outstandingTrend: '+2%',
            overdue: '₹ 12.4 L', overdueTrend: '+0.5 L',
            dso: '40 Days', dsoTrend: '+1 day',
            claims: '₹ 2.1 L', claimsTrend: '+3%',
            gst: 'Compliant', gstNote: 'Returns filed'
        }
    },
    'last-3-months': {
        sales: {
            mtd: '₹ 3.00 L', mtdTrend: '↑ 12%',
            ytd: '₹ 22.00 L', ytdTrend: '↑ 8%',
            achievement: '82%', achievementGap: '₹ 65,000',
            secondary: '₹ 2.85 L', secondaryTrend: '↑ 5%',
            service: '80', serviceTrend: '↑ 2 pts'
        },
        inventory: {
            stockValue: '₹ 48.2 L', stockTrend: '+12%',
            doi: '46 Days', doiTrend: '+11 days',
            variance: '+18%', varianceNote: '3/7 Brands High',
            fillRate: '94%', fillRateTrend: '+4 pts',
            otif: '88%', otifTrend: '-7 pts'
        },
        credit: {
            outstanding: '₹ 48.2 L', outstandingTrend: '+3%',
            overdue: '₹ 13.2 L', overdueTrend: '+0.8 L',
            dso: '42 Days', dsoTrend: '+2 days',
            claims: '₹ 2.2 L', claimsTrend: '+5%',
            gst: 'Compliant', gstNote: 'Returns filed'
        }
    },
    'last-6-months': {
        sales: {
            mtd: '₹ 3.20 L', mtdTrend: '↑ 15%',
            ytd: '₹ 16.80 L', ytdTrend: '↑ 11%',
            achievement: '85%', achievementGap: '₹ 56,000',
            secondary: '₹ 3.05 L', secondaryTrend: '↑ 8%',
            service: '82', serviceTrend: '↑ 3 pts'
        },
        inventory: {
            stockValue: '₹ 46.5 L', stockTrend: '+10%',
            doi: '44 Days', doiTrend: '+9 days',
            variance: '+16%', varianceNote: '3/7 Brands High',
            fillRate: '95%', fillRateTrend: '+5 pts',
            otif: '90%', otifTrend: '-5 pts'
        },
        credit: {
            outstanding: '₹ 45.8 L', outstandingTrend: '+1%',
            overdue: '₹ 11.5 L', overdueTrend: '+0.3 L',
            dso: '39 Days', dsoTrend: 'stable',
            claims: '₹ 1.9 L', claimsTrend: '+2%',
            gst: 'Compliant', gstNote: 'All returns filed'
        }
    },
    'last-year': {
        sales: {
            mtd: '₹ 3.45 L', mtdTrend: '↑ 18%',
            ytd: '₹ 35.20 L', ytdTrend: '↑ 14%',
            achievement: '89%', achievementGap: '₹ 42,000',
            secondary: '₹ 3.28 L', secondaryTrend: '↑ 12%',
            service: '85', serviceTrend: '↑ 5 pts'
        },
        inventory: {
            stockValue: '₹ 44.2 L', stockTrend: '+7%',
            doi: '40 Days', doiTrend: '+5 days',
            variance: '+12%', varianceNote: '2/7 Brands High',
            fillRate: '96%', fillRateTrend: '+6 pts',
            otif: '92%', otifTrend: '-3 pts'
        },
        credit: {
            outstanding: '₹ 43.5 L', outstandingTrend: 'stable',
            overdue: '₹ 10.2 L', overdueTrend: '-0.2 L',
            dso: '37 Days', dsoTrend: '-1 day',
            claims: '₹ 1.6 L', claimsTrend: '-2%',
            gst: 'Compliant', gstNote: 'All returns filed'
        }
    },
    'all': {
        sales: {
            mtd: '₹ 3.68 L', mtdTrend: '↑ 22%',
            ytd: '₹ 125.40 L', ytdTrend: '↑ 16%',
            achievement: '92%', achievementGap: '₹ 32,000',
            secondary: '₹ 3.50 L', secondaryTrend: '↑ 15%',
            service: '87', serviceTrend: '↑ 7 pts'
        },
        inventory: {
            stockValue: '₹ 42.8 L', stockTrend: '+5%',
            doi: '38 Days', doiTrend: '+3 days',
            variance: '+10%', varianceNote: '2/7 Brands High',
            fillRate: '97%', fillRateTrend: '+7 pts',
            otif: '94%', otifTrend: '-1 pts'
        },
        credit: {
            outstanding: '₹ 41.2 L', outstandingTrend: '-1%',
            overdue: '₹ 9.5 L', overdueTrend: '-0.5 L',
            dso: '35 Days', dsoTrend: '-2 days',
            claims: '₹ 1.4 L', claimsTrend: '-5%',
            gst: 'Compliant', gstNote: 'All historical returns filed'
        }
    }
};

/**
 * Update Sales tab KPIs
 */
function updateSalesKPIs(data) {
    const salesKPIs = document.querySelectorAll('#tab-sales .kpi-strip .kpi-card');

    if (salesKPIs[0]) {
        salesKPIs[0].querySelector('.kpi-value').textContent = data.mtd;
        salesKPIs[0].querySelector('.trend').textContent = data.mtdTrend;
    }
    if (salesKPIs[1]) {
        salesKPIs[1].querySelector('.kpi-value').textContent = data.ytd;
        salesKPIs[1].querySelector('.trend').textContent = data.ytdTrend;
    }
    if (salesKPIs[2]) {
        salesKPIs[2].querySelector('.kpi-value').textContent = data.achievement;
        const gapText = salesKPIs[2].querySelector('div:last-child .kpi-sub');
        if (gapText) gapText.textContent = `Gap: ${data.achievementGap}`;
    }
    if (salesKPIs[3]) {
        salesKPIs[3].querySelector('.kpi-value').textContent = data.secondary;
        salesKPIs[3].querySelector('.trend').textContent = data.secondaryTrend;
    }
    if (salesKPIs[4]) {
        salesKPIs[4].querySelector('.kpi-value').textContent = data.service;
        salesKPIs[4].querySelector('.trend').textContent = data.serviceTrend;
    }
}

/**
 * Update Inventory tab KPIs
 */
function updateInventoryKPIs(data) {
    const inventoryKPIs = document.querySelectorAll('#tab-inventory .kpi-strip .kpi-card');

    if (inventoryKPIs[0]) {
        inventoryKPIs[0].querySelector('.kpi-value').textContent = data.stockValue;
        inventoryKPIs[0].querySelector('.trend').textContent = data.stockTrend;
    }
    if (inventoryKPIs[1]) {
        inventoryKPIs[1].querySelector('.kpi-value').textContent = data.doi;
        inventoryKPIs[1].querySelector('.trend').textContent = data.doiTrend;
    }
    if (inventoryKPIs[2]) {
        inventoryKPIs[2].querySelector('.kpi-value').textContent = data.variance;
        const varianceNote = inventoryKPIs[2].querySelector('div:last-child .kpi-sub');
        if (varianceNote) varianceNote.textContent = data.varianceNote;
    }
    if (inventoryKPIs[3]) {
        inventoryKPIs[3].querySelector('.kpi-value').textContent = data.fillRate;
        inventoryKPIs[3].querySelector('.trend').textContent = data.fillRateTrend;
    }
    if (inventoryKPIs[4]) {
        inventoryKPIs[4].querySelector('.kpi-value').textContent = data.otif;
        inventoryKPIs[4].querySelector('.trend').textContent = data.otifTrend;
    }
}

/**
 * Update Credit tab KPIs
 */
function updateCreditKPIs(data) {
    const creditKPIs = document.querySelectorAll('#tab-credit .kpi-strip .kpi-card');

    if (creditKPIs[0]) {
        creditKPIs[0].querySelector('.kpi-value').textContent = data.outstanding;
        creditKPIs[0].querySelector('.trend').textContent = data.outstandingTrend;
    }
    if (creditKPIs[1]) {
        creditKPIs[1].querySelector('.kpi-value').textContent = data.overdue;
        creditKPIs[1].querySelector('.trend').textContent = data.overdueTrend;
    }
    if (creditKPIs[2]) {
        creditKPIs[2].querySelector('.kpi-value').textContent = data.dso;
        creditKPIs[2].querySelector('.trend').textContent = data.dsoTrend;
    }
    if (creditKPIs[3]) {
        creditKPIs[3].querySelector('.kpi-value').textContent = data.claims;
        creditKPIs[3].querySelector('.trend').textContent = data.claimsTrend;
    }
    if (creditKPIs[4]) {
        creditKPIs[4].querySelector('.kpi-value').textContent = data.gst;
        const gstNote = creditKPIs[4].querySelector('.kpi-sub');
        if (gstNote) gstNote.textContent = data.gstNote;
    }
}

/**
 * Update all dashboard data based on selected time period
 */
function updateDashboardData(period) {
    const data = dataByPeriod[period];

    if (!data) {
        console.error('No data found for period:', period);
        return;
    }

    // Update all tabs
    updateSalesKPIs(data.sales);
    updateInventoryKPIs(data.inventory);
    updateCreditKPIs(data.credit);

    console.log(`✓ Dashboard updated for period: ${period}`);
}

/**
 * Initialize time period dropdown
 */
function initializeTimePeriodDropdown() {
    const dropdown = document.getElementById('time-period-select');

    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            updateDashboardData(e.target.value);
        });

        console.log('✓ Time period dropdown initialized');
    }
}

/**
 * Initialize mobile navigation
 */
function initializeMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!menuBtn || !sidebar || !overlay) return;

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        const isActive = sidebar.classList.contains('active');

        menuBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        overlay.style.display = isActive ? 'none' : 'block';

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    });

    // Close on overlay click
    overlay.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close on navigation link click (mobile only)
    if (window.innerWidth < 768) {
        document.querySelectorAll('.sidebar a, .sidebar .nav-item').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
    }

    console.log('✓ Mobile navigation initialized');
}

/**
 * Initialize the dashboard when DOM is ready
 */
function initializeDashboard() {
    initializeTimePills();
    initializeTimePeriodDropdown();
    initializeChartJS();
    initializeMobileNav();
    initializeUpload(); // Initialize upload functionality

    // Set default tab (sales)
    if (tabs.sales) {
        tabs.sales.classList.remove('hidden');
    }

    console.log('✓ Lupin CRM Dashboard initialized');
}


/* ========================================
   STOCK STATEMENT UPLOAD
   ======================================== */

let selectedFile = null;
let uploadState = 'idle'; // idle, uploading, success, error

/**
 * Open upload modal
 */
function openUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

/**
 * Close upload modal
 */
function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    resetUploadModal();
}

/**
 * Reset modal to idle state
 */
function resetUploadModal() {
    selectedFile = null;
    uploadState = 'idle';

    // Hide all state-specific elements
    document.getElementById('file-details').classList.add('hidden');
    document.getElementById('upload-progress').classList.add('hidden');
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');

    // Show/hide buttons
    document.getElementById('upload-btn').classList.remove('hidden');
    document.getElementById('upload-btn').disabled = true;
    document.getElementById('view-inventory-btn').classList.add('hidden');
    document.getElementById('upload-another-btn').classList.add('hidden');
    document.getElementById('retry-btn').classList.add('hidden');

    // Reset drop zone
    document.getElementById('drop-zone').classList.remove('hidden');
    document.getElementById('file-input').value = '';
}

/**
 * Initialize drag & drop
 */
function initializeUpload() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (!dropZone || !fileInput) return;

    // Click to browse
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // File selected via input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Drag events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    console.log('✓ Upload functionality initialized');
}

/**
 * Handle file selection
 */
function handleFileSelect(file) {
    if (!file) return;

    // Validate file type
    const validTypes = ['.xlsx', '.xls', '.csv', '.pdf'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(fileExt)) {
        showFileError('Unsupported file type. Please use XLSX, XLS, CSV, or PDF.');
        return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        showFileError('File too large. Maximum size is 10MB.');
        return;
    }

    selectedFile = file;
    showFileDetails(file);
}

/**
 * Show file details
 */
function showFileDetails(file) {
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = formatFileSize(file.size);

    const status = document.getElementById('file-status');
    status.textContent = '✓ Ready to upload';
    status.className = 'file-status ready';

    document.getElementById('file-details').classList.remove('hidden');
    document.getElementById('upload-btn').disabled = false;
}

/**
 * Show file error
 */
function showFileError(message) {
    const fileName = selectedFile ? selectedFile.name : 'Unknown file';
    document.getElementById('file-name').textContent = fileName;
    document.getElementById('file-size').textContent = '';

    const status = document.getElementById('file-status');
    status.textContent = '✗ ' + message;
    status.className = 'file-status error';

    document.getElementById('file-details').classList.remove('hidden');
    document.getElementById('upload-btn').disabled = true;
}

/**
 * Remove selected file
 */
function removeFile() {
    selectedFile = null;
    document.getElementById('file-details').classList.add('hidden');
    document.getElementById('upload-btn').disabled = true;
    document.getElementById('file-input').value = '';
}

/**
 * Upload file and process
 */
async function uploadFile() {
    if (!selectedFile) return;

    uploadState = 'uploading';

    // Hide file details and upload button
    document.getElementById('file-details').classList.add('hidden');
    document.getElementById('drop-zone').classList.add('hidden');
    document.getElementById('upload-btn').classList.add('hidden');

    // Show progress
    document.getElementById('upload-progress').classList.remove('hidden');
    document.getElementById('progress-text').textContent = 'Uploading stock statement...';

    // Lock modal
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.btn-secondary');
    closeBtn.disabled = true;
    cancelBtn.disabled = true;

    try {
        // Simulate API call - Phase 1: Upload
        await simulateUpload();

        // Update progress text
        document.getElementById('progress-text').textContent = 'Processing and updating inventory metrics...';

        // Simulate API call - Phase 2: Process
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        uploadState = 'success';
        showSuccess();
        refreshInventoryMetrics();

    } catch (error) {
        uploadState = 'error';
        showError(error.message);
    }

    // Unlock modal
    closeBtn.disabled = false;
    cancelBtn.disabled = false;
}

/**
 * Simulate upload (mock API)
 */
function simulateUpload() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 90% success rate for demo
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('The server is temporarily unavailable. Please retry.'));
            }
        }, 2000);
    });
}

/**
 * Show success state
 */
function showSuccess() {
    document.getElementById('upload-progress').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');

    // Hide cancel, show action buttons
    document.querySelector('.btn-secondary').classList.add('hidden');
    document.getElementById('view-inventory-btn').classList.remove('hidden');
    document.getElementById('upload-another-btn').classList.remove('hidden');
}

/**
 * Show error state
 */
function showError(message) {
    document.getElementById('upload-progress').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('error-subtitle').textContent = message;

    // Show retry and change file option
    document.getElementById('retry-btn').classList.remove('hidden');
    document.getElementById('drop-zone').classList.remove('hidden');

    // Hide upload button
    document.getElementById('upload-btn').classList.add('hidden');
}

/**
 * Retry upload
 */
function retryUpload() {
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('retry-btn').classList.add('hidden');
    document.getElementById('drop-zone').classList.add('hidden');

    if (selectedFile) {
        uploadFile();
    }
}

/**
 * View updated inventory
 */
function viewUpdatedInventory() {
    closeUploadModal();
    switchTab('inventory');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Refresh inventory metrics with new data
 */
function refreshInventoryMetrics() {
    // Mock updated data from successful upload
    const updatedData = {
        currentStockValue: '₹ 18.50 L',
        currentStockUnits: '12,450',
        daysOfInventory: '42 days',
        normDays: '45 days',
        overUnderPercent: '-6.7%',
        nearExpiryExposure: '₹ 1.2 L',
        nearExpiryPercent: '6.5%',
        lastUpdated: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    console.log('✓ Inventory metrics refreshed:', updatedData);

    // Note: In a real implementation, this would update the actual KPI values
    // in the Inventory & Supply Chain tab using the API response data
}

/**
 * Utility: Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Download template
 */
function downloadTemplate() {
    // In real implementation, this would trigger actual template download
    alert('Lupin stock statement template download would start here.\n\nTemplate includes columns:\n• SKU code\n• SKU name\n• Batch no.\n• Expiry date\n• Closing stock qty\n• MRP\n• PTR');
}

/**
 * Get directions
 */
function getDirections() {
    // In real implementation, this would open maps or directions
    alert('Get directions functionality would be triggered here.');
}

/**
 * Contact stockist
 */
function contactStockist() {
    // In real implementation, this would open contact dialog or make a call
    alert('Contact stockist functionality would be triggered here.');
}
