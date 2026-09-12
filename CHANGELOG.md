# Changelog

## 3.0.0 — Full structural redesign

- Replaced the fixed overlay architecture with a real responsive application layout.
- Torn's active main content is moved into the Congerie content region instead of being covered by UI layers.
- Replaced Torn's desktop header and sidebar with Congerie's own structural navigation.
- Added a real desktop two-column layout with header, sidebar, content, and footer regions.
- Added a dedicated mobile/tablet layout with a navigation drawer and bottom navigation.
- Reworked page surfaces, tables, forms, controls, links, spacing, typography, and backgrounds as one design system.
- Removed the previous full-screen fixed shell that could cover Torn PDA controls and messages.
- Kept the redesign visual-only and avoided external network requests.
- Preserved Torn page links and active page detection.

## 2.1.0 — Responsive interface foundation

- Rebuilt the visual shell around Torn's real desktop structure.
- Added responsive desktop, tablet, phone, and Torn PDA layouts.
- Added a responsive Congerie header and mobile navigation drawer.
- Added redesigned navigation and quick-access areas.
- Added compact player status panel with live DOM-derived Energy, Nerve, Happy, and Life values.
- Added redesigned tables, forms, inputs, buttons, scrollbars, and page surfaces.
- Removed the previous generic floating UI approach.
- Kept the redesign visual-only with no external network requests.
- Added runtime handling for Torn pages that inject or update content dynamically.

## 1.0.0 — Initial release

- Added Congerie dark/glass visual theme
- Added improved form controls and tables
- Added floating Congerie UI settings
- Added compact mode
- Added accent switching
- Added persistent compact-mode preference
- Added remote update metadata
