# Trading Bot Dashboard Design Guidelines

## Design Approach

**Selected Approach**: Design System-Based with Financial Dashboard Patterns  
**Justification**: Trading dashboards require maximum clarity, real-time data legibility, and professional credibility. Using established patterns from financial interfaces (Bloomberg Terminal, TradingView, Robinhood) ensures users can quickly interpret critical information.

**Core Principles**:
- Information clarity over decoration
- Instant status recognition through color coding
- Professional, trustworthy aesthetic
- Seamless real-time updates without visual disruption

---

## Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif (highly legible for numbers/data)
- Monospace (for prices/values): 'JetBrains Mono', 'Roboto Mono', monospace

**Hierarchy**:
- Page Title: 2rem (32px), weight 700
- Section Headers: 1.25rem (20px), weight 600
- Data Labels: 0.875rem (14px), weight 500, uppercase, letter-spacing 0.05em
- Primary Values: 1.75rem (28px), weight 700, monospace
- Secondary Values: 1rem (16px), weight 600, monospace
- Body Text: 0.9375rem (15px), weight 400
- Tiny Labels: 0.75rem (12px), weight 500

---

## Layout System

**Spacing Units**: Tailwind scale focused on 2, 3, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: p-2, p-3, p-4 (cards, badges, small elements)
- Standard spacing: p-6, p-8 (card bodies, sections)
- Generous spacing: p-12, p-16, p-20 (major page sections)

**Grid Structure**:
- 12-column responsive grid
- Stats cards: 4-column grid on desktop (col-span-3), 2-column tablet, 1-column mobile
- Main content: 8-column left (dashboard area), 4-column right (indicators/history)
- Container max-width: 1920px (handles wide trading monitors)

**Card Design**:
- Subtle glass-morphism effect (backdrop-blur-sm)
- 1px border with low opacity
- 12px border radius
- Consistent 20-24px internal padding
- 2-4px elevation shadow

---

## Component Library

### Navigation & Controls
- **Top Bar**: Fixed header with logo, bot status, and control buttons
- **Bot Controls**: Prominent start/stop buttons with icon + text, 8px border radius
- **Status Badges**: Pill-shaped (fully rounded), 8px vertical padding, bold uppercase text

### Data Display Cards
- **Stat Cards**: Large numerical value centered, label above, supporting text below
- **Position Card**: Horizontal layout with icon, direction badge, prices, and countdown
- **Indicator Cards**: Vertical stack of SAR timeframes with aligned badges on right
- **Signal Badge**: Extra large, centered, with pulsing glow animation when active

### Trade History
- **List Items**: Alternating subtle background, 12px padding, 1px bottom separator
- **Trade Cards**: Compact horizontal layout - timestamp, direction icon, amount, result badge
- **Scrollable Container**: Max height 400px, custom styled scrollbar (4px wide)

### Real-time Elements
- **Countdown Timer**: Large monospace font, warning color when < 30s
- **Price Display**: Monospace font, green/red text based on profit/loss direction
- **SAR Indicators**: Color-coded badges with left border accent (4px solid)

### Interactive States
- **Buttons**: Slight scale on hover (transform: scale(1.02)), deeper shadow
- **Cards**: Lift on hover (2px translateY), increased shadow
- **Toggle States**: Clear on/off colors (green active, gray inactive)

---

## Visual Treatment Specifications

**Depth & Layering**:
- Page background: Deep gradient (darkest at edges)
- Cards: Slightly lighter with transparency
- Elevated elements: Subtle glow/shadow
- Overlays: High blur with dark background

**Borders & Dividers**:
- Card borders: 1px solid with 20% opacity accent color
- Section dividers: 1px solid with 10% opacity
- Active element borders: 2-4px solid accent color

**Icons**:
- Library: Heroicons (outline style for buttons, solid for status indicators)
- Size: 20px for buttons, 24px for status, 16px for inline
- Placement: Leading position for buttons, aligned with labels for stats

**Animations**:
- Pulse effect for active signals (2s infinite)
- Glow animation for confluence signals (1.5s ease-in-out alternate)
- Smooth transitions: 300ms ease for hovers, 150ms for state changes
- Countdown timer: Color shift animation as time decreases
- No page load animations - instant data visibility

**Responsive Behavior**:
- Desktop (1280px+): 4-column stat grid, side-by-side panels
- Tablet (768-1279px): 2-column stats, single column panels
- Mobile (<768px): All single column, reduced padding (16px → 12px)
- Touch targets: Minimum 44px height for all interactive elements

---

## Data Visualization Patterns

**Status Indicators**:
- Win/Loss: Green vs Red with distinct icons (↑ ↓)
- SAR Direction: Green LONG / Red SHORT badges
- Signal Confluence: Large central badge with animated glow when all align
- Connection Status: Small dot indicator (green connected, red disconnected)

**Numerical Displays**:
- Balance: Large, prominent, with currency symbol
- Percentages: Win rate with 1 decimal precision
- Prices: 2 decimal places for currency, 6 for crypto amounts
- Time: Monospace countdown format (MM:SS)

**Trade History**:
- Direction icons: ↗ (CALL) ↘ (PUT) 
- Result badges: WIN (green), LOSS (red), compact size
- Timestamp: Relative time for recent (2m ago), absolute for older
- Horizontal alignment: Icon | Direction | Amount | Result

---

## Critical Dashboard-Specific Patterns

**Real-time Updates**:
- Data refreshes without layout shifts
- Smooth number transitions (animated count-up/down)
- Flashing highlight on value change (200ms pulse)

**Critical Information Hierarchy**:
1. Bot status & controls (always visible in header)
2. Current balance & win rate (top priority stats)
3. Active position countdown (if exists)
4. SAR confluence signals (decision-making data)
5. Trade history (reference data)

**Error & Warning States**:
- Disconnected: Red banner at top
- Low balance: Yellow warning badge
- Failed trade: Red toast notification
- Cooldown period: Gray overlay on trade button with countdown

This design creates a professional, high-performance trading dashboard that prioritizes information clarity and real-time decision-making while maintaining visual polish and trustworthiness.