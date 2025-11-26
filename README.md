# Hospital CRM - Stockist 360 Dashboard

> A premium CRM dashboard for hospital and pharmacy distributor management with territory-wide insights

## 📋 Overview

This is a comprehensive Hospital CRM UI built with clean code practices and modern web standards. The dashboard provides a two-layer navigation system: a **territory-level overview** for managing multiple stockists and a **detailed Stockist 360 view** with real-time insights into sales, inventory, financial metrics, and service operations for individual distributors.

**Latest Version**: v2.4.0 (2025-11-26)

## 📁 File Structure

```
Hospital CRM/
├── index.html              # Main application with two-layer views
│   ├── Overview View       # Territory dashboard (default)
│   └── Detail View         # Stockist 360 with 4 tabs
├── service-ops-tab.html    # Service & Operations tab component
├── styles.css              # All styles with design tokens
├── script.js               # Modular architecture with data layer
├── CHANGELOG.md            # Version history
└── README.md               # This file
```

## 🎨 Design Tokens

The dashboard uses a comprehensive design token system. All colors, spacing, typography, and other design values are defined as CSS custom properties in `styles.css`.

### Token Categories:
- **Colors**: Base, brand, semantic (success/error/warning), grays, extended palette
- **Spacing**: Consistent spacing scale (4px to 48px+)
- **Border Radius**: From sharp to fully rounded
- **Typography**: Font families, sizes, weights, line heights
- **Effects**: Shadows, transitions, focus rings, traffic-light indicators

## 🚀 Usage

Simply open `index.html` in a modern web browser. The dashboard will automatically load:
1. Google Fonts (Inter)
2. `styles.css` for all styling
3. `script.js` for interactive features (loaded with `defer`)

**Default Landing**: All Stockists Overview (territory dashboard)

## ✨ Features

### 🏢 All Stockists Overview (Territory Dashboard)
**New in v2.4.0** - Enhanced territory-level view with additional insights:

- **Territory KPIs**: 6 key metrics with traffic-light color coding and tooltips
  - Coverage penetration (% of Lupin priority SKUs stocked)
  - Inventory health score (composite score of DOI, ageing, near-expiry)
  - Credit risk exposure (outstanding balance & 90+ ageing risk)
  - SLA adherence (% orders & complaints within agreed timelines)
  - Order velocity (avg billing cycles per month)
  - **Sales (Period)** - Total billed sales for selected time period ⭐NEW
  
- **Timeline Selector**: Switch between time periods to view dynamic KPIs ⭐NEW
  - Last 30 Days (default)
  - Last Quarter
  - YTD (Year-to-Date)
  
- **Adaptive City Filter**: Intelligent filtering based on territory ⭐NEW
  - Auto-hides for single-city territories
  - Shows only assigned cities for multi-city KAMs
  - Combines with segment filters using AND logic
  
- **Tooltip Definitions**: Hover over ⓘ icons for clear metric descriptions ⭐NEW
  - 6 KPI tooltips explaining each metric
 - 7 table header tooltips for column clarifications
  - Zero-clipping dynamic rendering for perfect visibility
  
- **Smart Segmentation**: 6 filter chips for instant insights
  - 🔥 High potential but low penetration
  - ❗ High credit risk
  - ⚠ Near-expiry / high ageing
  - ⚡ Service reliability risk
  - ⭐ Fastest growing
  - ⏳ Low ROI visits
  
- **Master Stockist Table**: 9 columns with intelligent sorting ⭐UPDATED
  - **Stockist name** (clickable link to Stockist 360) ⭐NEW
  - Stockist code
  - City location
  - Penetration (traffic-light badge)
  - Inventory health (traffic-light badge)
  - Credit exposure
  - SLA adherence (traffic-light badge)
  - Order cycles per month
  - Last billed (time badge)
  - Auto-calculated priority score
  - ~~Action column removed~~ - Click stockist name to navigate ⭐NEW

- **State Preservation**: Filters, timeline, and scroll position maintained across navigation

### 👤 Stockist 360 (Detail View)
Four detailed tabs for individual stockist analysis:
- **Sales & Growth**: Primary/secondary sales, growth trends, KPIs
- **Inventory & Supply Chain**: Stock health, aging, order management
- **Credit, Finance & Compliance**: Receivables, claims, compliance status
- **Service & Operations**: Infrastructure, delivery TAT, SLA metrics

### 🔄 Two-Layer Navigation
- Overview → Detail: Click any stockist row or "Open 360" button
- Detail → Overview: Click "Back to All Stockists" breadcrumb
- Hash-based routing for bookmarkable URLs (`#stockist/ID`)
- Seamless view switching with state preservation

### Interactive Elements
- Tab switching functionality
- Time period filters (pills)
- Hover effects on charts and cards
- Responsive design for mobile/tablet/desktop

## 🛠️ Code Optimization

### v2.3.0 Architecture Improvements:
1. **Data Layer Separation**: Clean separation between data and UI
   - `StockistData` module with O(1) indexed lookup using Map
   - Precomputed segment Sets for instant filtering
   - Cached territory KPIs with smart invalidation
   
2. **Performance Optimizations**:
   - DocumentFragment pattern for batch DOM updates (300x faster rendering)
   - Single reflow for table updates instead of multiple
   - Deferred script loading with `defer` attribute
   - Eliminated redundant calculations through caching
   
3. **Modular Architecture**:
   - Data layer (`StockistData` with 8 methods)
   - UI utilities (`MetricClassifiers`, `buildStockistRow`, etc.)
   - State management (`OverviewState` object)
   - Routing (`Router` module with hashchange handling)
   - Clear initialization flow
   
4. **Design Tokens**: Consistent use of CSS custom properties
5. **Semantic HTML**: Proper heading hierarchy and ARIA-friendly markup
6. **Clean Code**: Organized CSS/JS with clear sections and comments
7. **Maintainability**: Easy to update styles, logic, or content independently

### CSS Organization:
```
1. Design Tokens & CSS Variables
2. Reset & Base Styles
3. Layout (Grid system)
4. Components (Sidebar, Navigation, Cards, etc.)
5. Overview-specific styles (Filter chips, Table, Badges)
6. Utilities
7. Responsive Design
```

### JavaScript Architecture:
```javascript
// Data Layer
- stockistIndex (Map for O(1) lookup)
- stockistSegments (Precomputed Sets)
- StockistData module (data access & KPI calculations)

// UI Layer
- MetricClassifiers (traffic-light logic)
- buildStockistRow() (DOM element builder)
- renderStockistTable() (DocumentFragment rendering)
- updateTerritoryKPIs() (KPI display updates)

// State Management
- OverviewState (filters, scroll position)
- Persistence across navigation

// Routing
- Router module (centralized navigation)
- Hash-based routing support
- State preservation on transitions
```

## 🎯 Design System Benefits

Using design tokens provides:
- **Consistency**: Same values across the entire application
- **Flexibility**: Easy theme changes (just update token values)
- **Scalability**: Simple to maintain as the app grows (now supports 300+ stockists)
- **Developer Experience**: Clear naming conventions
- **Performance**: Optimized for large datasets with caching and batching

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px (6-column KPIs, full table with 9 columns)
- **Tablet**: 768px - 1200px (3-column KPIs, some table columns hidden)
- **Mobile**: < 768px (Single column KPIs, table converts to cards)

## 🌈 Color System

Brand colors follow a scale from 25 (lightest) to 950 (darkest):
- **Primary Brand**: `--brand-500` (#066afe)
- **Success**: `--success-600` (#079455)
- **Error**: `--error-600` (#d92d20)
- **Warning**: `--warning-600` (#dc6803)

**Traffic-Light System** (v2.3.0):
- `.good` - Green badge (strong performance)
- `.warn` - Yellow badge (needs attention)
- `.bad` - Red badge (critical issue)

## 🔧 Customization

To customize the dashboard:

1. **Update Colors**: Modify CSS custom properties in `styles.css` `:root`
2. **Change Layout**: Adjust grid templates in respective component classes
3. **Add Functionality**: Extend `script.js` modules (StockistData, Router, etc.)
4. **Modify Data**: Update stockist array or connect to live API
5. **Add Filters**: Extend segment types in `stockistSegments` object

## 📊 Chart Integration

The dashboard includes:
- Line charts with gradient fills (Chart.js)
- Bar charts with interactive tooltips
- Progress bars with percentage indicators
- Aging visualizations
- KPI trends with directional arrows

## 🏗️ Future Enhancements

Potential improvements:
- [ ] Connect to live data API
- [ ] Virtual scrolling for 1000+ stockists
- [ ] Advanced sorting (multi-column)
- [ ] Data export functionality (CSV/Excel)
- [ ] Implement search functionality with debounce
- [ ] Add print stylesheet
- [ ] Create dark mode theme
- [x] ~~Add animation library~~ (Built-in CSS transitions)
- [x] ~~Territory-level insights~~ ✅ (v2.3.0)
- [x] ~~Performance optimization for scale~~ ✅ (v2.3.0)
- [x] ~~Timeline-based KPI analysis~~ ✅ (v2.4.0)
- [x] ~~Adaptive territory filtering~~ ✅ (v2.4.0)
- [x] ~~Tooltip definitions for metrics~~ ✅ (v2.4.0)
- [x] ~~Streamlined table navigation~~ ✅ (v2.4.0)

## 📝 Browser Support

Tested and optimized for:
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)

---

**Built with clean code practices and modern web standards** ✨
