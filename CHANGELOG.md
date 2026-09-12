# Changelog

## 12.0.0 — PDA-first stability rebuild

### Changed
- Rebuilt the userscript around Torn PDA as the primary runtime target.
- Removed the old native-header hiding behavior that could collide with PDA's page structure.
- Kept Torn's core containers in place; Congerie never reparents them.
- Added a defensive lifecycle that waits for `document.body`, tolerates Torn DOM updates, and reapplies presentation after route changes.
- Added route-aware navigation state updates without recreating the whole UI on every navigation.
- Kept the desktop sidebar and PDA/mobile drawer as the only Congerie navigation systems.
- Kept the compact status strip separate from Torn's native controls.
- Added safer page-class cleanup so previous-page styling does not leak after navigation.
- Preserved Torn's native links, forms, buttons and page behavior as the source of truth.

### Stability
- No gameplay automation.
- No simulated clicks.
- No core-container reparenting.
- No external network requests.
- No dependency on Tampermonkey/GM APIs.
- Uses only DOM/CSS/localStorage features available to Torn PDA userscripts.
- Syntax checked with Node before publishing.

## 11.0.0 — Congerie Core rebuild

### Changed
- Reframed the project as a modular Torn UI client layer rather than a generic CSS overlay.
- Rebuilt navigation around one sidebar on desktop and one drawer on mobile/PDA.
- Removed the previous stacked quick-navigation/command-bar design direction.
- Reworked the header and status bar into a single visual hierarchy.
- Added page-aware metadata for Home, City, Items, Market, Battle, Travel, Gym, Faction, Profile, Messages, Forums, Jobs, Education and Missions.
- Added persistent Congerie settings for navigation, status bar, page enhancements, compact mode, motion and accent.
- Preserved Torn's core containers instead of moving them into a replacement shell.
- Added a page-by-page UI reference board based on Torn documentation and community screenshots.

## 10.0.0 — Congerie Core

### Changed
- Introduced the Vencord-inspired Congerie Core concept.
- Added modular navigation, settings, status HUD and responsive styling.

## 9.0.0

### Changed
- Replaced the cluttered mobile shell with a cleaner sidebar/drawer direction.

## 5.0.2

### Fixed
- Fixed mobile and Torn PDA page loading by removing the desktop shell/reparenting logic from narrow layouts.
- Mobile and PDA no longer hide Torn's native header/sidebar or add a fixed bottom navigation layer.
- Desktop keeps the Congerie redesigned shell.

### Stability
- Added an explicit mobile/PDA safety gate before any DOM manipulation.
- Prevented the desktop MutationObserver and route polling from running on mobile/PDA.

## 5.0.1

### Fixed
- Reduced selector collisions with Torn's native header and sidebar.
- Made the main content container selection more conservative.
- Scoped the redesigned content styles to the Congerie content area.
- Added safer responsive behavior for desktop, tablet, phone, and Torn PDA.
