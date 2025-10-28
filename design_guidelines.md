# Design Guidelines: Cyclist Group Ride Connection Platform

## Design Approach

**Selected Approach:** Hybrid - Design System Foundation with Activity Platform References

Drawing inspiration from Strava's data density and community focus, combined with Komoot's ride discovery patterns, while using Material Design principles for component structure and interaction patterns. This creates a functional, information-rich experience optimized for quick ride discovery and community engagement.

**Key Design Principles:**
- Information clarity over decoration
- Quick scanning and decision-making
- Geographic context always visible
- Community trust through transparency

---

## Typography System

**Font Stack:** JetBrains Mono (primary monospace font via Google Fonts CDN)

**Hierarchy:**
- **Headings:** 
  - H1: 2.5rem (40px), font-weight 700, tracking tight
  - H2: 2rem (32px), font-weight 700
  - H3: 1.5rem (24px), font-weight 600
  - H4: 1.25rem (20px), font-weight 600
- **Body Text:** 1rem (16px), font-weight 400, line-height 1.6
- **Small Text/Metadata:** 0.875rem (14px), font-weight 400
- **Labels/Buttons:** 0.875rem (14px), font-weight 600, uppercase tracking-wide
- **Monospace Data:** All numerical data (pace, distance, elevation) in tabular format for easy scanning

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-16
- Card spacing: p-6
- Form field spacing: space-y-4
- Grid gaps: gap-4 to gap-6

**Grid Structure:**
- Desktop: 12-column grid with max-w-7xl container
- Content areas: 8-column main + 4-column sidebar for filters
- Card grids: 3 columns (lg), 2 columns (md), 1 column (sm)

**Page Layouts:**
1. **Dashboard/Home:** Two-column (filter sidebar + ride feed)
2. **Ride Detail:** Single column, max-w-4xl with sticky action bar
3. **Map View:** Full-width map with overlay controls and slide-out ride cards
4. **Profile:** Single column with tabbed sections

---

## Component Library

### Navigation
- **Top Navigation Bar:** Fixed, h-16, with logo left, search center, user menu right
- **Mobile Navigation:** Bottom tab bar (h-16) with 4 primary actions: Discover, Map, My Rides, Profile
- **Secondary Navigation:** Horizontal tab navigation for view switching (List/Map/Calendar)

### Cards & Lists
- **Ride Card (List View):**
  - Compact design with h-32
  - Left section: Ride type badge + title
  - Center: Key stats (date, time, distance, pace, difficulty)
  - Right: Participant avatars (stacked) + Join button
  - Includes visual difficulty indicator (border-l-4 with thickness variation)

- **Ride Card (Map Popup):**
  - Minimal h-24 card with essential info
  - Quick action button overlaid
  - Click expands to full detail view

- **User Card:**
  - Horizontal layout with avatar, name, club affiliation
  - Ride stats summary (rides completed, average pace)
  - Preference tags as pills

### Forms & Inputs
- **Text Inputs:** h-12, rounded-lg, border-2
- **Select Dropdowns:** h-12, custom styled with down arrow icon
- **Checkboxes/Radio:** Custom styled, 1.25rem size
- **Multi-select Tags:** Pill-based with close icons
- **Date/Time Picker:** Calendar popup with time selector
- **Range Sliders:** For pace, distance, difficulty ranges with dual handles

### Filters & Search
- **Filter Panel:** Sticky sidebar (w-80) with collapsible sections
  - Ride Type (checkbox group)
  - Date Range (calendar picker)
  - Distance/Pace Range (dual-handle sliders)
  - Difficulty Level (button group)
  - Available Days (day selector grid)
- **Active Filter Pills:** Display above results with clear-all option

### Map Components
- **Interactive Map:** Leaflet.js integration, full-viewport height
- **Map Markers:** Custom styled with ride type icons
- **Cluster Markers:** Numbered circles for multiple rides in same area
- **Geolocation Control:** FAB in bottom-right for "Center on Me"
- **Radius Visualizer:** Semi-transparent circle showing search radius

### Action Elements
- **Primary Button:** h-12, rounded-lg, font-weight 600
- **Secondary Button:** h-12, rounded-lg, border-2
- **Icon Button:** w-10 h-10, rounded-full
- **Floating Action Button (FAB):** w-14 h-14, rounded-full, shadow-lg for "Create Ride"
- **Blurred Background Buttons:** When overlaying images/maps, apply backdrop-blur-md with semi-transparent background

### Data Display
- **Stats Grid:** 4-column grid showing user/ride metrics
- **Activity Feed:** Timeline-style with left border indicators
- **Participant List:** Avatar grid with hover tooltips
- **Comment Thread:** Nested replies with indentation, avatar left-aligned

### Status & Badges
- **Ride Type Badge:** Small pill with icon (MTB/Road/Gravel)
- **Difficulty Badge:** Text label with visual indicator (border accent)
- **Status Indicator:** Dot notation (Upcoming/Ongoing/Completed)
- **Club Badge:** Shield-style icon with club name

### Modals & Overlays
- **Ride Detail Modal:** Slide-in from right (w-full md:w-2/3 lg:w-1/2)
- **Create Ride Form:** Full-screen overlay on mobile, centered modal on desktop (max-w-2xl)
- **Image Lightbox:** Full-screen with navigation controls
- **Confirmation Dialogs:** Centered, max-w-md

---

## Iconography

**Icon Library:** Heroicons (outline style for most, solid for active states)

**Key Icons:**
- Navigation: Home, Map, Calendar, User
- Ride Types: Bicycle variants for MTB/Road/Gravel
- Actions: Plus, Filter, Search, Location, Share
- Status: Check, Clock, X-mark
- Social: Heart, Comment, Users

---

## Animation & Interactions

**Minimal Animation Strategy:**
- Card hover: Slight lift (translateY -2px) with shadow increase
- Button hover: Subtle scale (0.98)
- Transitions: 150ms ease-in-out for most interactions
- Map animations: Smooth pan/zoom via Leaflet defaults
- Modal entry: Slide-in (translateX) 300ms
- Loading states: Skeleton screens (no spinners)

**No hover/active states for blurred buttons** - rely on underlying button component

---

## Responsive Breakpoints

- **Mobile:** < 768px - Single column, bottom navigation
- **Tablet:** 768px - 1024px - Reduced filter sidebar, 2-column grids
- **Desktop:** > 1024px - Full sidebar, 3-column grids, split views

---

## Accessibility

- Minimum touch target: 44x44px
- Focus indicators: 2px offset ring on all interactive elements
- ARIA labels on icon-only buttons
- Semantic HTML structure throughout
- Alt text for all ride/user images
- Keyboard navigation for all primary flows
- Screen reader announcements for dynamic content updates

---

## Images

**Hero Section:** No large hero image - this is a utility app. Lead with ride discovery immediately.

**Profile Images:**
- User avatars: Circular, 40x40px (small), 80x80px (profile page)
- Ride location thumbnails: 16:9 aspect ratio, used in ride cards

**Image Placement:**
- Ride detail pages: Featured location photo at top (aspect-ratio-16/9)
- User profiles: Avatar with optional cover photo
- Club pages: Club logo/badge prominently displayed

All images should be optimized and use modern formats (WebP with fallbacks).