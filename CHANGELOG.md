# Changelog

## 5.0.1 — Stability pass

- Narrowed Torn chrome selectors to avoid accidentally hiding unrelated page headers or sidebars.
- Added safer fallback handling for Torn's generic `#container` wrapper.
- Prevented the redesign from mounting when the real page container cannot be identified safely.
- Kept the Congerie shell structural instead of using a fixed overlay over Torn content.
- Preserved responsive desktop, tablet, phone, and Torn PDA layouts.
- Kept navigation and page actions tied to Torn's existing links and controls.

## 5.0.0 — Rebuild for stability

- Rebuilt the shell around a real moved page-content container instead of a visual overlay.
- Added a dedicated Congerie desktop shell with player rail, navigation, content region, and page context.
- Added a separate mobile/PDA navigation drawer and bottom navigation.
- Added safer DOM-derived player information and navigation generation.
- Added route-aware page context and active navigation states.
- Reduced global CSS interference by scoping redesigned controls to the Congerie content region.
- Added responsive table handling and narrow-screen safeguards.
- Added mutation handling for Torn's dynamically updated pages.

## 4.0.0 — Congerie UI rebuild

- Rebuilt the userscript around a structural Congerie application shell instead of an overlay/theme layer.
- Replaced Torn's visible desktop chrome with Congerie navigation while keeping the live Torn page as the functional content source.
- Added a compact, information-dense player/resource rail for serious players.
- Added clearer navigation grouping and route-aware page context.
- Added dedicated mobile/PDA navigation with a drawer and compact bottom quick navigation.
- Added responsive layouts for desktop, tablet, phone, and narrow PDA screens.
- Normalized common Torn tables, forms, inputs, buttons, links, headings, and status colors into one design system.
- Added safer DOM mounting and route-change handling for Torn pages that update dynamically.
- Avoided external requests and gameplay automation; the redesign remains presentation-focused.
- Added reduced-motion support and narrow-screen safeguards.

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
