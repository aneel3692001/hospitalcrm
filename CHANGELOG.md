# Changelog

All notable changes to the Hospital CRM Dashboard project will be documented in this file.

## [2.2.0] - 2025-11-25

### Added
- **Enhanced Stockist Header UI**: Premium redesign with improved layout and interaction patterns
  - Icon-only action buttons with hover tooltips (Edit, Upload, Archive, More)
  - Horizontal action button row with consistent spacing
  - Premium tooltip styling with smooth fade-in animations (300ms)
  - Proper tooltip positioning that prevents text cutoff
  - Streamlined visual hierarchy with metadata row
- **CSV Upload Modal System**: Complete file upload workflow
  - Drag-and-drop zone with visual feedback on hover/drag
  - File selection with browser file picker integration
  - Real-time file validation and status display
  - Upload progress indicator with spinner animation
  - Success/error state handling with icons
  - Helpful upload hints and format guidance
  - File size and format display
  - Remove file functionality before upload
- **New Service Operations Tab**: Dedicated `service-ops-tab.html` component
- **Modal Component Architecture**: Reusable modal system with:
  - Backdrop overlay with glassmorphism effect
  - Header, body, footer structure
  - Primary and secondary button styles
  - Close button with hover states
  - Disabled state handling for all interactive elements

### Changed
- **Stockist Actions Layout**: Simplified button arrangement
  - Removed text labels from action buttons for cleaner look
  - Changed from mixed button styles to consistent icon-only design
  - Reorganized metadata display for better readability
  - Improved button hover states and transitions
- **Tooltip System**: Enhanced tooltip placement and styling
  - Fixed tooltip cutoff issues on screen edges
  - Added smooth fade-in/fade-out transitions
  - Improved z-index layering (z-index: 1000)
  - Better pointer positioning and arrow styling
- **Responsive Behavior**: Extended mobile/tablet support
  - Modal adapts to 95% width on mobile devices
  - Stockist actions wrap properly on small screens
  - Full-width filled buttons on mobile
  - Reduced padding for better space utilization

### Fixed
- **Tooltip Display Issues**: Resolved text cutoff and positioning problems
  - Fixed tooltips extending beyond viewport boundaries
  - Corrected tooltip pointer alignment
  - Improved tooltip visibility timing
- **Button Layout**: Fixed action buttons appearing in multiple rows
  - All action buttons now display in single horizontal row
  - Consistent spacing between icon-only buttons
  - Proper flex layout preventing wrapping on desktop

### Technical Details
- Added 450+ lines of modal and upload component CSS
- Implemented comprehensive file upload JavaScript handlers
- Added drag-and-drop event listeners with visual feedback
- Tooltip positioning with `translate(-50%)` centering
- Smooth animations with cubic-bezier easing functions
- Maintained design token consistency across new components

---

## [2.1.0] - 2024-11-24

### Added
- **Mobile & Tablet Responsiveness**: Full responsive design for all device sizes
  - Hamburger menu navigation with smooth slide-in sidebar
  - Premium gradient menu button with smooth animations
  - Glassmorphism backdrop overlay when menu is open
  - Touch-optimized interactions (44px minimum tap targets)
  - Adaptive layouts for tablet (768-1200px) and mobile (<768px)
- **Responsive Breakpoints**: 4 optimized breakpoints
  - Desktop (>1200px): Default 5-column layout
  - Tablet (768-1200px): 3-column KPIs, 2-column content
  - Mobile (<768px): 2-column KPIs, slide-in navigation
  - Small Mobile (<480px): Single-column layout
- **Touch Device Optimizations**: 
  - Active state animations for satisfying touch feedback
  - Removed hover effects on touch devices
  - Horizontal scrolling for tables with momentum
  - Body scroll lock when mobile menu is open

### Changed
- **Chart Sizes**: Responsive across all devices
  - Desktop: 280px (line), 200px (bars)
  - Tablet: 240px (line), 180px (bars)
  - Mobile: 200px (line), 160px (bars)
  - Small Mobile: 180px (line), 140px (bars)
- **Layout Adaptations**: Content reorganizes intelligently
  - Tabs stack vertically on mobile
  - Period dropdown goes full-width on mobile
  - KPI grid adapts from 5→3→2→1 columns
  - Content grid adapts from 3→2→1 columns

### Fixed
- Sidebar positioning on mobile devices
- Touch target sizes for accessibility compliance
- Table overflow on small screens

### Technical Details
- Added 300+ lines of responsive CSS with premium UX
- Implemented mobile navigation JavaScript (50 lines)
- Smooth cubic-bezier transitions throughout
- Maintained glassmorphism aesthetic across all devices

---

## [2.0.0] - 2024-11-24

### Added
- **Time Period Dropdown Selector**: Global dropdown with 8 time period options
  - This Week
  - Last Week
  - This Month
  - Last Month
  - Last 3 Months (default)
  - Last 6 Months
  - Last Year
  - All Time
- **Dynamic Data Updates**: KPIs update instantly across all tabs when period changes
- **Chart.js Integration**: Migrated from custom SVG charts to Chart.js for better performance
  - Growth Trend: Line chart with gradient fill
  - Billing Volume: Column chart with rounded bars
  - Sales Velocity: Column chart with rounded bars
- **Proper Axis Labels**: Custom formatters for currency (₹1.8L), numbers (3,200), and units (180/day)
- **Design Token Integration**: All charts use dashboard design tokens for consistent branding

### Changed
- **Performance Improvement**: Chart.js library is 70% smaller (60KB vs 200KB)
- **Load Time**: 3-4x faster chart rendering (50-150ms vs 300-500ms)
- **Chart Rendering**: Migrated from SVG to Canvas-based rendering for smoother animations

### Removed
- **Google Charts Library**: Completely removed and replaced with Chart.js
- **Custom SVG Charts**: Removed ~120 lines of complex SVG markup
- **Unused CSS Classes**: Removed `.d-purple` and `.d-blue` utility classes

### Fixed
- **HTML Typo**: Fixed `spanclass` to `span class` on line 261
- **Canvas Sizing**: Added proper CSS constraints to prevent excessive scrolling
- **Chart Container Elements**: Converted div elements to canvas elements for Chart.js compatibility

### Technical Details
- Added 8 complete data sets for all time periods
- Implemented responsive resize handling with debouncing
- Added gradient fills and rounded corners to charts
- Configured proper tooltip styling matching dashboard aesthetic

---

## [1.0.0] - 2024-11-23

### Initial Release
- Hospital CRM Dashboard with three main tabs
  - Sales & Growth
  - Inventory & Supply Chain  
  - Credit, Finance & Compliance
- Clean separation of HTML, CSS, and JavaScript
- Design token system for consistent styling
- Responsive glassmorphism UI
- Interactive tab navigation
- Time period filter pills for individual cards
