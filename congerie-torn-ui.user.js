// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      4.0.0
// @description  Congerie interface redesign for Torn desktop, tablet, phone, and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.__congerieTornUI) return;
    window.__congerieTornUI = true;

    const VERSION = '4.0.0';
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => [...root.querySelectorAll(s)];
    const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
    const esc = (value) => String(value ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

    const css = `
:root {
    --cg-bg: #080b0f;
    --cg-bg-2: #0b1015;
    --cg-surface: #10161d;
    --cg-surface-2: #141c24;
    --cg-surface-3: #19232d;
    --cg-line: rgba(255,255,255,.075);
    --cg-line-2: rgba(255,255,255,.12);
    --cg-text: #f0f4f7;
    --cg-text-2: #b2bdc8;
    --cg-text-3: #788695;
    --cg-accent: #5ea8ff;
    --cg-accent-2: rgba(94,168,255,.13);
    --cg-good: #56cf91;
    --cg-warn: #e8bd62;
    --cg-bad: #ef7278;
    --cg-header: 56px;
    --cg-sidebar: 246px;
    --cg-max: 1500px;
    --cg-radius: 9px;
}

html.cg-active,
html.cg-active body {
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: var(--cg-bg) !important;
    color: var(--cg-text) !important;
    color-scheme: dark;
}

html.cg-active body {
    overflow-x: hidden !important;
    font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
    background: radial-gradient(1100px 500px at 55% -250px, rgba(69,112,153,.15), transparent 72%), linear-gradient(180deg, #0b1016 0%, #080b0f 72%) !important;
}

html.cg-active body,
html.cg-active body * { box-sizing: border-box; }
html.cg-active body * { font-family: inherit; }

html.cg-active #topHeader,
html.cg-active #header-root,
html.cg-active .header-wrapper,
html.cg-active #sidebar,
html.cg-active .sidebar,
html.cg-active .area-sidebar { display: none !important; }

#cg-app {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--cg-sidebar) minmax(0,1fr);
    grid-template-rows: var(--cg-header) minmax(0,1fr);
    grid-template-areas: "header header" "sidebar main";
}

.cg-header {
    grid-area: header;
    min-width: 0;
    height: var(--cg-header);
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 18px;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8,11,15,.96);
    border-bottom: 1px solid var(--cg-line-2);
    backdrop-filter: blur(14px);
}

.cg-brand { flex: 0 0 auto; width: 205px; display: flex; align-items: center; gap: 10px; color: var(--cg-text); text-decoration: none; }
.cg-mark { width: 31px; height: 31px; flex: 0 0 31px; display: grid; place-items: center; border: 1px solid rgba(94,168,255,.35); border-radius: 8px; background: var(--cg-accent-2); color: var(--cg-accent); font-size: 9px; font-weight: 900; letter-spacing: -.04em; }
.cg-brand-name { font-size: 12px; font-weight: 800; letter-spacing: .055em; }
.cg-brand-sub { margin-top: 3px; color: var(--cg-text-3); font-size: 7px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.cg-page-context { min-width: 0; display: flex; align-items: center; gap: 9px; }
.cg-page-kicker { color: var(--cg-text-3); font-size: 8px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.cg-page-name { max-width: 280px; overflow: hidden; color: var(--cg-text); font-size: 12px; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
.cg-header-spacer { flex: 1; min-width: 6px; }
.cg-search { width: min(330px, 27vw); height: 34px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid var(--cg-line); border-radius: 8px; background: #0c1218; color: var(--cg-text-3); }
.cg-search-icon { font-size: 13px; }
.cg-search input { width: 100%; min-width: 0; border: 0 !important; outline: 0 !important; background: transparent !important; color: var(--cg-text) !important; box-shadow: none !important; font-size: 11px !important; }
.cg-search input::placeholder { color: #5e6b78; }
.cg-header-actions { display: flex; align-items: center; gap: 4px; }
.cg-icon-btn, .cg-mobile-menu { width: 34px; height: 34px; flex: 0 0 34px; display: grid; place-items: center; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #8d9aa8; cursor: pointer; }
.cg-icon-btn:hover, .cg-mobile-menu:hover { color: #fff; background: rgba(255,255,255,.045); border-color: var(--cg-line); }
.cg-mobile-menu { display: none; }

.cg-sidebar { grid-area: sidebar; min-width: 0; min-height: 0; height: calc(100vh - var(--cg-header)); position: sticky; top: var(--cg-header); overflow-y: auto; overflow-x: hidden; padding: 12px 11px 16px; background: #0b1015; border-right: 1px solid var(--cg-line); }
.cg-player { padding: 12px; border: 1px solid var(--cg-line); border-radius: var(--cg-radius); background: linear-gradient(145deg, #151e27, #10161d); }
.cg-player-head { display: flex; align-items: center; gap: 10px; min-width: 0; }
.cg-avatar { width: 38px; height: 38px; flex: 0 0 38px; display: grid; place-items: center; overflow: hidden; border-radius: 9px; background: #22303d; color: #e5edf4; font-size: 11px; font-weight: 900; }
.cg-avatar img { width: 100%; height: 100%; object-fit: cover; }
.cg-player-info { min-width: 0; }
.cg-player-name { overflow: hidden; color: #f0f4f8; font-size: 11px; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
.cg-player-meta { margin-top: 3px; color: var(--cg-text-3); font-size: 8px; }
.cg-money { margin-left: auto; color: #d5dde5; font-size: 9px; font-weight: 750; white-space: nowrap; }
.cg-resources { display: grid; gap: 7px; margin-top: 13px; }
.cg-resource { display: grid; grid-template-columns: 42px minmax(0,1fr) auto; gap: 7px; align-items: center; color: #82909e; font-size: 8px; }
.cg-resource-track { height: 5px; overflow: hidden; border-radius: 99px; background: #25303b; }
.cg-resource-fill { width: 0; height: 100%; border-radius: inherit; background: var(--cg-accent); transition: width .18s ease; }
.cg-resource-value { min-width: 42px; color: #aeb9c4; text-align: right; font-size: 8px; }
.cg-nav-section { margin-top: 17px; }
.cg-nav-label { margin: 0 7px 7px; color: #536170; font-size: 7px; font-weight: 900; letter-spacing: .15em; text-transform: uppercase; }
.cg-nav { display: grid; gap: 2px; }
.cg-nav-item { min-height: 34px; display: flex; align-items: center; gap: 9px; padding: 0 9px; border: 1px solid transparent; border-radius: 7px; color: #95a1ae; text-decoration: none; font-size: 10px; font-weight: 650; cursor: pointer; transition: background .12s ease, color .12s ease, border-color .12s ease; }
.cg-nav-item:hover { color: #fff; background: rgba(255,255,255,.038); }
.cg-nav-item.is-active { color: #f2f6fa; background: var(--cg-accent-2); border-color: rgba(94,168,255,.14); }
.cg-nav-item.is-active::before { content: ""; width: 3px; height: 15px; margin-left: -10px; border-radius: 99px; background: var(--cg-accent); }
.cg-nav-icon { width: 18px; flex: 0 0 18px; color: #697887; text-align: center; font-size: 12px; }
.cg-nav-item.is-active .cg-nav-icon, .cg-nav-item:hover .cg-nav-icon { color: var(--cg-accent); }

.cg-main { grid-area: main; min-width: 0; width: 100%; min-height: 0; padding: 20px clamp(14px, 2.6vw, 38px) 28px; }
.cg-main-inner { width: min(100%, var(--cg-max)); min-width: 0; margin: 0 auto; }
#cg-content { width: 100%; min-width: 0; }
#cg-content > #mainContainer, #cg-content > #container, #cg-content > #mainContainerWrap { width: 100% !important; max-width: none !important; min-width: 0 !important; margin: 0 !important; padding: 0 !important; background: transparent !important; }
#cg-content img { max-width: 100%; }
#cg-content a { color: #8bc2ff; }
#cg-content a:hover { color: #c0dcfa; }

#cg-content .content-title, #cg-content .title, #cg-content .title-wrapper, #cg-content .page-title, #cg-content .box-title, #cg-content .panel-title, #cg-content .section-title, #cg-content .ttitle { color: var(--cg-text) !important; background: transparent !important; border: 0 !important; box-shadow: none !important; text-shadow: none !important; }
#cg-content table { width: 100% !important; border-collapse: separate !important; border-spacing: 0 !important; overflow: hidden; background: var(--cg-surface) !important; border: 1px solid var(--cg-line) !important; border-radius: 9px !important; }
#cg-content th { padding: 9px 11px !important; background: var(--cg-surface-2) !important; color: #cbd5de !important; border-color: var(--cg-line) !important; font-size: 9px !important; text-align: left; }
#cg-content td { padding: 9px 11px !important; background: transparent !important; color: #bec8d1 !important; border-color: var(--cg-line) !important; font-size: 10px !important; }
#cg-content tr:hover td { background: rgba(255,255,255,.018) !important; }
#cg-content input:not([type=checkbox]):not([type=radio]), #cg-content select, #cg-content textarea { min-height: 34px; max-width: 100%; padding: 7px 10px !important; background: #0b1117 !important; color: var(--cg-text) !important; border: 1px solid var(--cg-line-2) !important; border-radius: 7px !important; box-shadow: none !important; }
#cg-content textarea { min-height: 92px; }
#cg-content input:focus, #cg-content select:focus, #cg-content textarea:focus { outline: 0 !important; border-color: rgba(94,168,255,.58) !important; box-shadow: 0 0 0 3px var(--cg-accent-2) !important; }
#cg-content button, #cg-content input[type=button], #cg-content input[type=submit], #cg-content input[type=reset], #cg-content .button, #cg-content .btn { min-height: 32px; padding: 0 12px !important; border: 1px solid var(--cg-line-2) !important; border-radius: 7px !important; background: #18222c !important; color: #e8eef3 !important; box-shadow: none !important; text-shadow: none !important; }
#cg-content button:hover, #cg-content input[type=button]:hover, #cg-content input[type=submit]:hover, #cg-content .button:hover, #cg-content .btn:hover { background: #202c37 !important; border-color: rgba(255,255,255,.19) !important; }
#cg-content .green, #cg-content .success { color: var(--cg-good) !important; }
#cg-content .red, #cg-content .error { color: var(--cg-bad) !important; }
#cg-content .yellow, #cg-content .warning { color: var(--cg-warn) !important; }

.cg-pagebar { display: flex; align-items: flex-end; gap: 14px; margin: 0 0 16px; padding: 0 1px; }
.cg-pagebar-copy { min-width: 0; }
.cg-pagebar-eyebrow { margin-bottom: 5px; color: var(--cg-text-3); font-size: 8px; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
.cg-pagebar-title { color: #f2f5f8; font-size: clamp(20px, 2vw, 28px); line-height: 1.05; font-weight: 780; letter-spacing: -.025em; }
.cg-pagebar-sub { margin-top: 6px; color: var(--cg-text-3); font-size: 10px; }

.cg-mobile-drawer, .cg-mobile-bottom { display: none; }

@media (max-width: 1100px) {
    :root { --cg-sidebar: 214px; }
    .cg-brand { width: 174px; }
    .cg-search { width: min(270px, 26vw); }
}

@media (max-width: 800px) {
    :root { --cg-header: 52px; }
    #cg-app { display: block; min-height: 100dvh; }
    .cg-header { position: sticky; top: 0; padding: 0 10px; gap: 8px; }
    .cg-mobile-menu { display: grid; }
    .cg-brand { width: auto; flex: 0 0 auto; }
    .cg-brand-name { font-size: 11px; }
    .cg-brand-sub { display: none; }
    .cg-page-context { display: none; }
    .cg-search { flex: 1; width: auto; max-width: none; }
    .cg-search input { font-size: 10px !important; }
    .cg-header-actions { gap: 1px; }
    .cg-header-actions .cg-icon-btn:nth-child(n+2) { display: none; }
    .cg-sidebar { display: none !important; }
    .cg-main { padding: 14px 10px 14px; }
    .cg-pagebar { align-items: center; margin-bottom: 12px; }
    .cg-pagebar-title { font-size: 19px; }
    .cg-pagebar-sub { font-size: 9px; }
    .cg-mobile-bottom { position: sticky; bottom: 0; z-index: 90; display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 4px; min-height: 58px; padding: 5px 6px calc(5px + env(safe-area-inset-bottom)); background: rgba(8,11,15,.97); border-top: 1px solid var(--cg-line-2); backdrop-filter: blur(14px); }
    .cg-mobile-bottom button { min-width: 0; border: 1px solid transparent; border-radius: 7px; background: transparent; color: #7e8b99; cursor: pointer; font-size: 8px; font-weight: 700; }
    .cg-mobile-bottom button.is-active { color: #eef3f7; background: var(--cg-accent-2); border-color: rgba(94,168,255,.12); }
    .cg-mobile-bottom .cg-bottom-icon { display: block; margin-bottom: 3px; font-size: 14px; }
    .cg-mobile-drawer { position: fixed; inset: 0; z-index: 200; display: block; pointer-events: none; }
    .cg-mobile-drawer.is-open { pointer-events: auto; }
    .cg-drawer-scrim { position: absolute; inset: 0; background: rgba(0,0,0,.58); opacity: 0; transition: opacity .15s ease; }
    .cg-mobile-drawer.is-open .cg-drawer-scrim { opacity: 1; }
    .cg-drawer-panel { position: absolute; top: 0; bottom: 0; left: 0; width: min(320px,86vw); padding: 14px 11px; overflow: auto; transform: translateX(-102%); transition: transform .17s ease; background: #0b1015; border-right: 1px solid var(--cg-line-2); box-shadow: 20px 0 60px rgba(0,0,0,.4); }
    .cg-mobile-drawer.is-open .cg-drawer-panel { transform: translateX(0); }
    .cg-drawer-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .cg-drawer-title { color: #eef3f7; font-size: 12px; font-weight: 850; }
    .cg-drawer-close { width: 32px; height: 32px; border: 1px solid var(--cg-line); border-radius: 7px; background: #121a22; color: #a8b4bf; }
    .cg-drawer-player { margin-bottom: 13px; }
}

@media (min-width: 801px) { .cg-mobile-drawer { display: none !important; } }
@media (max-width: 430px) {
    .cg-brand-name { display: none; }
    .cg-search { min-width: 0; }
    .cg-header-actions .cg-icon-btn { display: none; }
    #cg-content table { font-size: 9px !important; }
    #cg-content th, #cg-content td { padding: 8px 8px !important; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .001ms !important; animation-duration: .001ms !important; } }
`;

    const style = document.createElement('style');
    style.id = 'cg-styles';
    style.textContent = css;
    document.documentElement.classList.add('cg-active');
    document.head.appendChild(style);

    const getMain = () => $('#mainContainer') || $('#container') || $('#mainContainerWrap');
    const getSidebar = () => $('#sidebar') || $('.sidebar') || $('.area-sidebar');

    function getOriginalLinks() {
        const sidebar = getSidebar();
        if (!sidebar) return [];
        const links = [];
        const seen = new Set();
        $$('a[href]', sidebar).forEach(a => {
            const label = text(a);
            const href = a.getAttribute('href') || '';
            if (!label || seen.has(href + '|' + label) || label.length > 34) return;
            if (/logout|log out/i.test(label)) return;
            seen.add(href + '|' + label);
            links.push({ label, href, node: a });
        });
        return links;
    }

    function iconFor(label) {
        const l = label.toLowerCase();
        if (/home|dashboard/.test(l)) return '⌂';
        if (/profile|information|player/.test(l)) return '◉';
        if (/city/.test(l)) return '⌖';
        if (/item|inventory/.test(l)) return '▦';
        if (/battle|attack|target/.test(l)) return '⚔';
        if (/market|auction|bazaar/.test(l)) return '◇';
        if (/faction/.test(l)) return '◆';
        if (/job|education/.test(l)) return '▤';
        if (/travel|airport/.test(l)) return '✈';
        if (/mission|contract/.test(l)) return '✓';
        if (/forum|newspaper|community/.test(l)) return '☷';
        if (/message|mail/.test(l)) return '✉';
        if (/friend/.test(l)) return '♙';
        if (/enemy/.test(l)) return '⚑';
        if (/setting|option/.test(l)) return '⚙';
        return '•';
    }

    function getPlayerSnapshot() {
        const sidebar = getSidebar();
        const lines = (sidebar?.innerText || '').split(/\n+/).map(v => v.trim()).filter(Boolean);
        const findAfter = (key) => {
            const index = lines.findIndex(v => v.toLowerCase() === key.toLowerCase());
            return index >= 0 ? lines[index + 1] || '' : '';
        };
        return {
            image: sidebar?.querySelector('img')?.src || '',
            name: findAfter('Name') || 'Player',
            money: findAfter('Money'),
            level: findAfter('Level'),
            energy: findAfter('Energy'),
            nerve: findAfter('Nerve'),
            happy: findAfter('Happy'),
            life: findAfter('Life')
        };
    }

    function parseCurrentPage() {
        const path = location.pathname.toLowerCase();
        const query = location.search.toLowerCase();
        const title = document.title.replace(/\s*[-|].*$/, '').trim();
        const tests = [
            [/^\/$|index.php$/.test(path) && !query, 'Home'],
            [/profile/.test(path) || /profile/.test(query), 'Profile'],
            [/city/.test(path) || /city/.test(query), 'City'],
            [/item/.test(path) || /item/.test(query), 'Items'],
            [/battle|attack|target/.test(path) || /battle|attack|target/.test(query), 'Battle'],
            [/market|bazaar|auction/.test(path) || /market|bazaar|auction/.test(query), 'Market'],
            [/faction/.test(path) || /faction/.test(query), 'Faction'],
            [/job|education/.test(path) || /job|education/.test(query), 'Job & Education'],
            [/travel|airport/.test(path) || /travel|airport/.test(query), 'Travel'],
            [/mission/.test(path) || /mission/.test(query), 'Missions'],
            [/forum/.test(path) || /forum/.test(query), 'Forums'],
            [/message|mail/.test(path) || /message|mail/.test(query), 'Messages']
        ];
        const hit = tests.find(([condition]) => condition);
        return hit?.[1] || title || 'Torn';
    }

    function playerMarkup() {
        const p = getPlayerSnapshot();
        const initial = esc((p.name || 'P').slice(0, 2).toUpperCase());
        return `<section class="cg-player"><div class="cg-player-head"><div class="cg-avatar">${p.image ? `<img src="${esc(p.image)}" alt="">` : initial}</div><div class="cg-player-info"><div class="cg-player-name">${esc(p.name)}</div><div class="cg-player-meta">${p.level ? `Level ${esc(p.level)}` : 'Player overview'}</div></div>${p.money ? `<div class="cg-money">${esc(p.money)}</div>` : ''}</div><div class="cg-resources">${resourceMarkup('Energy', p.energy)}${resourceMarkup('Nerve', p.nerve)}${resourceMarkup('Happy', p.happy)}${resourceMarkup('Life', p.life)}</div></section>`;
    }

    function resourceMarkup(label, value) {
        const numeric = (String(value || '').match(/([\d,.]+)\s*(?:\/\s*([\d,.]+))?/) || []);
        const current = parseFloat((numeric[1] || '').replace(/,/g, ''));
        const max = parseFloat((numeric[2] || '').replace(/,/g, ''));
        const pct = Number.isFinite(current) && Number.isFinite(max) && max > 0 ? Math.max(0, Math.min(100, current / max * 100)) : 0;
        return `<div class="cg-resource"><span>${label}</span><span class="cg-resource-track"><span class="cg-resource-fill" style="width:${pct}%"></span></span><span class="cg-resource-value">${esc(value || '—')}</span></div>`;
    }

    function navMarkup(items) {
        const primaryNames = ['home', 'profile', 'city', 'item', 'battle', 'market', 'faction', 'job', 'travel', 'mission', 'forum', 'message'];
        const primary = items.filter(item => primaryNames.some(n => item.label.toLowerCase().includes(n)));
        const secondary = items.filter(item => !primary.includes(item));
        const render = list => list.slice(0, 18).map(item => `<button type="button" class="cg-nav-item" data-cg-nav-index="${items.indexOf(item)}"><span class="cg-nav-icon">${iconFor(item.label)}</span><span>${esc(item.label)}</span></button>`).join('');
        return `<div class="cg-nav-section"><div class="cg-nav-label">Core</div><div class="cg-nav">${render(primary)}</div></div>${secondary.length ? `<div class="cg-nav-section"><div class="cg-nav-label">More</div><div class="cg-nav">${render(secondary)}</div></div>` : ''}`;
    }

    function makeShell() {
        if ($('#cg-app')) return $('#cg-app');
        const app = document.createElement('div');
        app.id = 'cg-app';
        app.innerHTML = `<header class="cg-header"><button class="cg-mobile-menu" type="button" aria-label="Open navigation">☰</button><a class="cg-brand" href="/" data-cg-home><span class="cg-mark">CG</span><span><span class="cg-brand-name">CONGERIE</span><span class="cg-brand-sub">Torn interface</span></span></a><div class="cg-page-context"><span class="cg-page-kicker">Current</span><span class="cg-page-name" data-cg-page-name></span></div><div class="cg-header-spacer"></div><label class="cg-search" aria-label="Search this page"><span class="cg-search-icon">⌕</span><input type="search" placeholder="Search current page" autocomplete="off" data-cg-search></label><div class="cg-header-actions"><button class="cg-icon-btn" type="button" data-cg-refresh aria-label="Refresh">↻</button><button class="cg-icon-btn" type="button" data-cg-settings aria-label="Toggle compact mode">⚙</button></div></header><aside class="cg-sidebar"><div data-cg-desktop-sidebar></div></aside><main class="cg-main"><div class="cg-main-inner"><div data-cg-pagebar></div><div id="cg-content"></div></div></main><div class="cg-mobile-drawer" data-cg-drawer><div class="cg-drawer-scrim" data-cg-close-drawer></div><aside class="cg-drawer-panel"><div class="cg-drawer-head"><span class="cg-drawer-title">Navigation</span><button class="cg-drawer-close" type="button" data-cg-close-drawer>×</button></div><div class="cg-drawer-player" data-cg-mobile-player></div><div data-cg-mobile-nav></div></aside></div><nav class="cg-mobile-bottom" aria-label="Quick navigation" data-cg-bottom></nav>`;
        document.body.insertBefore(app, document.body.firstChild);
        return app;
    }

    function buildPagebar() {
        const name = parseCurrentPage();
        const pageName = $('[data-cg-page-name]');
        const pagebar = $('[data-cg-pagebar]');
        if (pageName) pageName.textContent = name;
        if (pagebar) pagebar.innerHTML = `<div class="cg-pagebar"><div class="cg-pagebar-copy"><div class="cg-pagebar-eyebrow">Congerie interface</div><div class="cg-pagebar-title">${esc(name)}</div><div class="cg-pagebar-sub">Clean controls, useful information, less hunting.</div></div></div>`;
    }

    function wireNav(items) {
        $$('[data-cg-nav-index]').forEach(button => {
            button.addEventListener('click', () => {
                const item = items[Number(button.dataset.cgNavIndex)];
                if (!item) return;
                try { item.node?.click(); } catch (_) { if (item.href) location.href = item.href; }
                closeDrawer();
            });
        });
    }

    function closeDrawer() { $('[data-cg-drawer]')?.classList.remove('is-open'); }
    function openDrawer() { $('[data-cg-drawer]')?.classList.add('is-open'); }

    function mount() {
        const main = getMain();
        if (!main) return false;
        const shell = makeShell();
        const content = $('#cg-content');
        if (!content) return false;
        if (main !== content && main.parentElement !== content) content.appendChild(main);

        const items = getOriginalLinks();
        $('[data-cg-desktop-sidebar]').innerHTML = playerMarkup() + navMarkup(items);
        $('[data-cg-mobile-player]').innerHTML = playerMarkup();
        $('[data-cg-mobile-nav]').innerHTML = navMarkup(items);
        const quick = items.filter(i => /home|city|item|battle|market|profile/i.test(i.label)).slice(0, 5);
        $('[data-cg-bottom]').innerHTML = quick.map(item => `<button type="button" data-cg-nav-index="${items.indexOf(item)}"><span class="cg-bottom-icon">${iconFor(item.label)}</span>${esc(item.label)}</button>`).join('');
        buildPagebar();
        wireNav(items);

        shell.querySelector('[data-cg-home]')?.addEventListener('click', e => { e.preventDefault(); const home = items.find(i => /home/i.test(i.label)); if (home?.node) home.node.click(); else location.href = '/'; });
        shell.querySelector('[data-cg-refresh]')?.addEventListener('click', () => location.reload());
        shell.querySelector('.cg-mobile-menu')?.addEventListener('click', openDrawer);
        $$('[data-cg-close-drawer]').forEach(el => el.addEventListener('click', closeDrawer));
        shell.querySelector('[data-cg-search]')?.addEventListener('input', e => filterPage(e.target.value));
        shell.querySelector('[data-cg-settings]')?.addEventListener('click', () => document.documentElement.classList.toggle('cg-compact'));
        return true;
    }

    function filterPage(query) {
        const q = query.trim().toLowerCase();
        const root = $('#cg-content');
        if (!root) return;
        $$('tr, li, .item, .row, .listing, .table-row, .forum-post', root).forEach(el => { el.hidden = !!q && !text(el).toLowerCase().includes(q); });
    }

    function refreshShell() {
        if (!$('#cg-app')) return;
        const main = getMain();
        const content = $('#cg-content');
        if (main && content && main.parentElement !== content) content.appendChild(main);
        buildPagebar();
    }

    let mounted = false;
    const tryMount = () => { if (mounted) { refreshShell(); return; } mounted = mount(); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryMount, { once: true });
    else tryMount();

    const observer = new MutationObserver(() => { if (!mounted && getMain()) tryMount(); else refreshShell(); });
    observer.observe(document.body, { childList: true, subtree: true });

    let lastUrl = location.href;
    setInterval(() => { if (location.href !== lastUrl) { lastUrl = location.href; setTimeout(refreshShell, 80); } }, 250);
    window.__congerieTornUIVersion = VERSION;
})();
