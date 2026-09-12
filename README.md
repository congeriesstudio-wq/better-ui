# Congerie for Torn

Congerie is a visual client UI layer for Torn. It is designed around a modular, Vencord-inspired architecture: Torn remains responsible for game behavior while Congerie controls presentation, navigation, layout, density and themes.

## Install in Torn PDA / userscript manager

Use the remote userscript URL:

`https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js`

The script includes `@updateURL` and `@downloadURL` so future releases can update through the userscript manager.

## Current release

**11.0.0 — Congerie Core rebuild**

## Design goals

- One coherent UI instead of layered Torn + overlay navigation
- Sidebar-first desktop navigation and drawer-first mobile navigation
- Compact status information for Energy, Nerve, Happy and Life
- Dark, dense, readable panels inspired by Torn's information-heavy interface
- Responsive layouts for desktop, tablet, phone and Torn PDA
- Page-aware presentation for Home, City, Items, Market, Battle, Travel, Gym, Faction, Profile, Messages, Forums, Jobs, Education and Missions
- Settings for navigation, status bar, page enhancements, compact mode, motion and accent
- No gameplay automation
- No simulated clicks or combat decisions
- No external/non-API Torn requests
- No reparenting of Torn's core page containers

## Architecture direction

Congerie is being developed as a UI platform rather than a single CSS theme. The long-term structure is:

```text
Congerie Core
├── lifecycle / route detection
├── navigation
├── status HUD
├── settings / persistence
├── theme + density system
└── page plugin registry

Page plugins
├── Home
├── City
├── Items
├── Market
├── Battle
├── Travel
├── Gym
├── Faction
├── Profile
├── Messages
├── Forums
├── Jobs
├── Education
└── Missions
```

The current userscript is the distributable build. Page-specific adapters are intentionally being added incrementally so Torn's native functionality is preserved while each screen is redesigned around its real content.

## Reference research

The redesign uses Torn's current information hierarchy and community screenshots as references rather than inventing a generic dashboard. In particular, the research phase reviewed the City map, Item Market categories and filters, Travel Agency destination lists, player profile sections, Education progress cards, Gym training controls and combat layouts.

See `docs/UI_REFERENCE.md` for the page-by-page design targets.
