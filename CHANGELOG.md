# Changelog

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

### Stability
- Keeps Torn's native links, forms and actions as the source of truth.
- Avoids gameplay automation.
- Keeps the mobile layout separate from the desktop sidebar layout.

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
