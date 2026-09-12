# Congerie UI reference board

This document records the visual and information references used for the Congerie redesign. The goal is not to copy Torn's interface; it is to understand what information each screen actually needs so the redesign stays useful to serious players and understandable to new players.

## Global direction

- Keep Torn's gritty, information-dense character instead of turning it into a generic SaaS dashboard.
- Use charcoal surfaces, restrained borders, strong typography hierarchy and small amounts of accent color.
- Prefer compact rows and cards over oversized glass panels.
- Keep primary actions close to the information they affect.
- Avoid duplicate headers, duplicate navigation, floating controls that cover content, and decorative UI that does not improve scanning.
- On mobile, use one top bar + one drawer. Do not stack a second navigation row underneath it.

## Home

Reference: Torn home screenshots show a persistent player-information column, resource values, navigation areas, battle stats, general information, job information and recent activity.

Congerie target:
- A compact status strip at the top.
- A clear overview with the most actionable information first.
- Battle stats and personal information as compact panels.
- Recent attacks/events as a scan-friendly feed.
- Keep important values visible without forcing a long horizontal desktop layout on mobile.

## City

Reference: Torn's current City is a graphical map and acts as the main gateway to many areas. The official Torn Wiki describes the RESPO map as the foundation for city interaction, item finds and territory activity.

Congerie target:
- Preserve the actual map and Torn's clickable locations.
- Reframe surrounding controls into a compact command area.
- Do not cover map controls with a fixed Congerie layer.
- On mobile, prioritize map usability and provide a clean location/action drawer.

## Items

Reference: Torn item information is organized into Equipment, Useful Supplies, General Shopping and other categories. Item screenshots and Bazaar references show image + name + price/stock style information.

Congerie target:
- Category switching should be obvious.
- Item rows should keep image, name, quantity/value and primary action together.
- Use a two-column card grid only where the screen is wide enough.
- On narrow mobile screens, use dense list rows.
- Never make the player open a decorative card just to reach an existing Torn action.

## Market

Reference: Torn's Item Market has many categories and detailed filters including price, damage, accuracy and bonus filters.

Congerie target:
- Filters become a clear, collapsible control bar.
- Results prioritize item name, image, price and useful comparison data.
- Keep sorting and filtering accessible with one thumb on mobile.
- Preserve Torn's existing forms and actions.

## Battle

Reference: Torn combat is a dense two-sided interface with player/enemy status, health, combat actions and a chronological battle log. Community screenshots show that the battle log is one of the most important information areas.

Congerie target:
- Opponent/player state stays visually dominant.
- Attack controls remain obvious and close to the combat state.
- The battle log becomes a readable timeline rather than a wall of tiny text.
- Never interfere with Torn's combat controls or automate a choice.

## Travel

Reference: Travel Agency screenshots show flight method tabs, destination rows, country flags, city names, flight duration and cost. Torn's current Travel documentation also describes travel inventory and additional travel interactions while abroad.

Congerie target:
- Travel method selection becomes a segmented control.
- Destinations become compact, tappable rows with flag, country/city, duration and cost.
- Current travel state gets a strong status card.
- Travel inventory gets a dedicated section when present.
- Avoid duplicating Torn's page title or stacking a second header over the travel controls.

## Profile

Reference: Torn profiles contain User Information, Basic Information, Actions, Status, Medals, Personal Information and Competition Status.

Congerie target:
- Player identity and current status at the top.
- Actions grouped together instead of scattered icons.
- Basic/personal information in readable key-value rows.
- Medals remain visual but compact.
- Profile signature/content remains untouched and readable.

## Faction

Reference: Faction screens can contain faction identity, membership, respect/war information, chains and active assaults.

Congerie target:
- Faction identity + current war state first.
- War/chain timers get strong visual priority.
- Member lists use compact status rows.
- Large banners should not consume the majority of a mobile viewport.

## Gym

Reference: Gym screenshots show four battle-stat training choices, energy cost, current training state and gym selection.

Congerie target:
- Four stats remain the primary controls.
- Energy cost and current value should be immediately visible.
- Training buttons should be thumb-friendly.
- Gym selection should not push the actual training controls below the fold unnecessarily.

## Education

Reference: Education screenshots show course cards with imagery, progress bars and completed/total counts.

Congerie target:
- Keep course imagery recognizable.
- Progress is the primary secondary datum.
- Completed courses should be visually distinct but not hidden.
- On mobile, course cards become a single-column list with a compact progress treatment.

## Messages / Forums

Congerie target:
- Treat these as communication interfaces, not generic cards.
- Conversations/threads should prioritize title, sender/author, time and unread state.
- Keep reply/search/navigation controls easy to reach.
- Preserve Torn's actual thread and message actions.

## Jobs / Missions

Congerie target:
- Make progression state and actionable objectives obvious.
- Use compact status rows and progress indicators.
- Avoid decorative cards that push the next actionable objective far down the screen.

## Mobile rules

The mobile build is intentionally not a scaled-down desktop layout.

At narrow widths:
- One fixed top bar.
- One slide-out navigation drawer.
- Optional compact status strip.
- No duplicate quick-nav row.
- No fixed bottom navigation layer.
- No duplicate Torn page heading when Torn already supplies one.
- No reparenting of Torn's core containers.
- Existing Torn controls remain the source of truth for actions.

## Sources reviewed

- Torn City Wiki — City
- Torn City Wiki — Item Market
- Torn City Wiki — Travel
- Torn City Wiki — Profiles
- Community Torn screenshots for Home, Travel, Bazaar, Battle, Profile, Faction, Education and Gym
- Torn's current official site and mobile companion references
