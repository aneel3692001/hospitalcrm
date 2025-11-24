# Lupin CRM - Stockist 360 Dashboard

## 📁 File Structure

```
Lupin CRM/
├── index.html      # Clean HTML structure (semantic markup)
├── styles.css      # All styles with design tokens
├── script.js       # Interactive functionality
└── README.md       # This file
```

## 🎨 Design Tokens

The dashboard uses a comprehensive design token system referenced from `tokens.js`. All colors, spacing, typography, and other design values are defined as CSS custom properties in `styles.css`.

### Token Categories:
- **Colors**: Base, brand, semantic (success/error/warning), grays, extended palette
- **Spacing**: Consistent spacing scale (4px to 48px+)
- **Border Radius**: From sharp to fully rounded
- **Typography**: Font families, sizes,weights, line heights
- **Effects**: Shadows, transitions, focus rings

## 🚀 Usage

Simply open `index.html` in a modern web browser. The dashboard will automatically load:
1. Google Fonts (Inter)
2. `styles.css` for all styling
3. `script.js` for interactive features

## ✨ Features

### Tab Navigation
Three main sections accessible via tabs:
- **Sales & Growth**: Primary/secondary sales, growth trends, KPIs
- **Inventory & Supply Chain**: Stock health, ageing, order management
- **Credit, Finance & Compliance**: Receivables, claims, compliance status

### Interactive Elements
- Tab switching functionality
- Time period filters (pills)
- Hover effects on charts and cards
- Responsive design for mobile/tablet/desktop

## 🛠️ Code Optimization

### What Was Improved:
1. **Separation of Concerns**: HTML, CSS, and JavaScript in separate files
2. **Design Tokens**: Consistent use of CSS custom properties
3. **Semantic HTML**: Proper heading hierarchy and ARIA-friendly markup
4. **Clean Code**: Organized CSS with clear sections and comments
5. **Performance**: External stylesheets can be cached by browsers
6. **Maintainability**: Easy to update styles, logic, or content independently

### CSS Organization:
```
1. Design Tokens & CSS Variables
2. Reset & Base Styles
3. Layout
4. Components (Sidebar, Navigation, Cards, etc.)
5. Utilities
6. Responsive Design
```

### JavaScript Features:
- Tab management system
- Time period filter initialization
- Event delegation for performance
- Modular, commented code

## 🎯 Design System Benefits

Using design tokens provides:
- **Consistency**: Same values across the entire application
- **Flexibility**: Easy theme changes (just update token values)
- **Scalability**: Simple to maintain as the app grows
- **Developer Experience**: Clear naming conventions

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px (5-column KPIs, 3-column grids)
- **Tablet**: 900px - 1200px (3-column KPIs, 2-column grids)
- **Mobile**: < 900px (Single column layout, sidebar hidden)

## 🌈 Color System

Brand colors follow a scale from 25 (lightest) to 950 (darkest):
- **Primary Brand**: `--brand-500` (#066afe)
- **Success**: `--success-600` (#079455)
- **Error**: `--error-600` (#d92d20)
- **Warning**: `--warning-600` (#dc6803)

## 🔧 Customization

To customize the dashboard:

1. **Update Colors**: Modify CSS custom properties in `styles.css`:root`
2. **Change Layout**: Adjust grid templates in respective component classes
3. **Add Functionality**: Extend `script.js` with new event handlers
4. **Modify Data**: Update HTML content in `index.html`

## 📊 Chart Integration

The dashboard includes:
- Line charts with SVG paths
- Bar charts with interactive tooltips
- Progress bars with percentage indicators
- Ageing visualizations

## 🏗️ Future Enhancements

Potential improvements:
- [ ] Connect to live data API
- [ ] Add data export functionality
- [ ] Implement search functionality
- [ ] Add print stylesheet
- [ ] Create dark mode theme
- [ ] Add animation library for smoother transitions

## 📝 Browser Support

Tested and optimized for:
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)

---

**Built with clean code practices and modern web standards** ✨
