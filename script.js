/**
 * Lupin CRM - Stockist 360 Dashboard
 * Interactive functionality for tab switching and time period filters
 */

// Tab management
const tabs = {
    sales: document.getElementById('tab-sales'),
    inventory: document.getElementById('tab-inventory'),
    credit: document.getElementById('tab-credit')
};

const tabButtons = {
    sales: document.getElementById('tab-btn-sales'),
    inventory: document.getElementById('tab-btn-inventory'),
    credit: document.getElementById('tab-btn-credit')
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
