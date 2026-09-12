# Congerie for Torn

A Vencord-inspired, visual-only client layer for Torn. Congerie changes presentation, navigation, density, and theming while leaving Torn's underlying functionality native.

## Install

Userscript URL:

`https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js`

For Torn PDA: **Settings → Advanced Browser Settings → Manage Scripts → +**.

For desktop/mobile browsers, install the URL with a compatible userscript manager.

## v10 architecture

- Congerie Core: lifecycle, routing, settings, persistence
- Better Navigation: desktop sidebar + mobile drawer
- Resource HUD: Energy, Nerve, Happy, Life when available
- Page Enhancements: tables, forms, controls, overflow handling
- Settings: sidebar, HUD, enhancements, compact mode, animations, accent
- Responsive shell: desktop, tablet, narrow mobile, and PDA-sized layouts
- Route-safe behavior: does not reparent Torn's main containers

## Design rules

Congerie is a UI layer, not a gameplay bot. It does not automate attacks, trades, travel, or other gameplay actions. Native Torn links, forms, buttons, and page behavior remain responsible for actions.

## Development direction

The project is intentionally structured around a Core + plugin model so future features can be added as independent UI modules instead of turning the userscript into one large page rewrite.

## Version

**10.0.0**
