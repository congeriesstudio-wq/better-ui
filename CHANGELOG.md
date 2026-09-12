# Changelog

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
