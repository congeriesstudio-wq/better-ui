// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      5.0.1
// @description  Complete responsive interface redesign for Torn desktop, tablet, phone, and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.__congerieTornUIv5) return;
    window.__congerieTornUIv5 = true;

    const VERSION = '5.0.1';
    const SELECTORS = {
        main: ['#mainContainer', '#mainContainerWrap', '#container'],
        header: ['#topHeader', '#header-root', '.header-wrapper'],
        sidebar: ['#sidebar', '.area-sidebar']
    };

    const first = (selectors, root = document) => {
        for (const selector of selectors) {
            const node = root.querySelector(selector);
            if (node) return node;
        }
        return null;
    };

    const all = (selectors, root = document) => {
        const seen = new Set();
        const out = [];
        for (const selector of selectors) {
            root.querySelectorAll(selector).forEach(node => {
                if (!seen.has(node)) {
                    seen.add(node);
                    out.push(node);
                }
            });
        }
        return out;
    };

    const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim();

    const escapeHtml = value => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const css = `
:root {
    --cg-bg: #080b0f;
    --cg-bg-elevated: #0d1218;
    --cg-panel: #111820;
    --cg-panel-2: #151e27;
    --cg-panel-3: #19232d;
    --cg-border: rgba(255,255,255,.075);
    --cg-border-strong: rgba(255,255,255,.13);
    --cg-text: #edf2f6;
    --cg-text-2: #b4bec8;
    --cg-text-3: #788695;
    --cg-accent: #5ea8ff;
    --cg-accent-soft: rgba(94,168,255,.12);
    --cg-good: #58cf92;
    --cg-warn: #e6bd63;
    --cg-bad: #ef7279;
    --cg-header: 56px;
    --cg-sidebar: 244px;
    --cg-radius: 9px;
}

html.cg-v5,
html.cg-v5 body {
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: var(--cg-bg) !important;
    color: var(--cg-text) !important;
    color-scheme: dark;
}

html.cg-v5 body {
    overflow-x: hidden !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
    background:
        radial-gradient(1000px 450px at 55% -220px, rgba(70,112,150,.14), transparent 72%),
        linear-gradient(180deg, #0b1016 0%, #080b0f 74%) !important;
}

#cg-app-v5,
#cg-app-v5 * { box-sizing: border-box; }

#cg-app-v5 {
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--cg-sidebar) minmax(0,1fr);
    grid-template-rows: var(--cg-header) minmax(0,1fr);
    grid-template-areas: "header header" "sidebar main";
}

.cg5-header {
    grid-area: header;
    min-width: 0;
    height: var(--cg-header);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    position: sticky;
    top: 0;
    z-index: 500;
    background: rgba(8,11,15,.97);
    border-bottom: 1px solid var(--cg-border-strong);
    backdrop-filter: blur(12px);
}

.cg5-menu {
    display: none;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #a7b2bd;
    cursor: pointer;
}

.cg5-menu:hover { background: rgba(255,255,255,.05); color: #fff; }

.cg5-brand {
    width: 190px;
    flex: 0 0 190px;
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--cg-text);
    text-decoration: none;
}

.cg5-mark {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    flex: 0 0 31px;
    border: 1px solid rgba(94,168,255,.32);
    border-radius: 8px;
    background: var(--cg-accent-soft);
    color: var(--cg-accent);
    font-size: 9px;
    font-weight: 900;
}

.cg5-brand strong { font-size: 12px; letter-spacing: .05em; }
.cg5-brand small { display: block; margin-top: 3px; color: var(--cg-text-3); font-size: 7px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.cg5-title { min-width: 0; overflow: hidden; color: #c8d1da; font-size: 11px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
.cg5-spacer { flex: 1; min-width: 8px; }
.cg5-search { width: min(310px, 28vw); height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 10px; border: 1px solid var(--cg-border); border-radius: 8px; background: #0c1218; color: var(--cg-text-3); }
.cg5-search input { width: 100%; min-width: 0; border: 0 !important; outline: 0 !important; background: transparent !important; color: var(--cg-text) !important; box-shadow: none !important; font-size: 11px !important; }
.cg5-search input::placeholder { color: #596675; }
.cg5-header-actions { display: flex; align-items: center; gap: 3px; }
.cg5-icon { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #8996a4; cursor: pointer; }
.cg5-icon:hover { color: #fff; background: rgba(255,255,255,.045); border-color: var(--cg-border); }

.cg5-sidebar { grid-area: sidebar; min-width: 0; min-height: 0; height: calc(100vh - var(--cg-header)); position: sticky; top: var(--cg-header); overflow: auto; padding: 12px 10px 18px; background: #0b1015; border-right: 1px solid var(--cg-border); }
.cg5-player { padding: 12px; border: 1px solid var(--cg-border); border-radius: var(--cg-radius); background: linear-gradient(145deg, #151e27, #10161d); }
.cg5-player-head { display: flex; align-items: center; gap: 9px; min-width: 0; }
.cg5-avatar { width: 38px; height: 38px; flex: 0 0 38px; display: grid; place-items: center; overflow: hidden; border-radius: 9px; background: #23313e; color: #e9f0f5; font-size: 11px; font-weight: 900; }
.cg5-avatar img { width: 100%; height: 100%; object-fit: cover; }
.cg5-player-copy { min-width: 0; }
.cg5-player-name { overflow: hidden; color: #f0f4f7; font-size: 11px; font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
.cg5-player-meta { margin-top: 3px; color: var(--cg-text-3); font-size: 8px; }
.cg5-money { margin-left: auto; color: #d5dde5; font-size: 8px; font-weight: 750; white-space: nowrap; }
.cg5-resources { display: grid; gap: 7px; margin-top: 12px; }
.cg5-resource { display: grid; grid-template-columns: 39px minmax(0,1fr) auto; gap: 7px; align-items: center; color: #81909e; font-size: 8px; }
.cg5-resource-track { height: 5px; overflow: hidden; border-radius: 99px; background: #26313c; }
.cg5-resource-fill { width: 0; height: 100%; border-radius: inherit; background: var(--cg-accent); }
.cg5-resource-value { min-width: 42px; color: #aeb9c4; text-align: right; font-size: 8px; }
.cg5-nav-section { margin-top: 17px; }
.cg5-nav-label { margin: 0 7px 7px; color: #536170; font-size: 7px; font-weight: 900; letter-spacing: .15em; text-transform: uppercase; }
.cg5-nav { display: grid; gap: 2px; }
.cg5-nav a { min-height: 34px; display: flex; align-items: center; gap: 9px; padding: 0 9px; border: 1px solid transparent; border-radius: 7px; color: #95a1ae; text-decoration: none; font-size: 10px; font-weight: 650; }
.cg5-nav a:hover { color: #fff; background: rgba(255,255,255,.04); }
.cg5-nav a.active { color: #f3f7fa; background: var(--cg-accent-soft); border-color: rgba(94,168,255,.14); }
.cg5-nav a.active::before { content: ""; width: 3px; height: 15px; margin-left: -10px; border-radius: 99px; background: var(--cg-accent); }
.cg5-nav-icon { width: 18px; flex: 0 0 18px; color: #6c7987; text-align: center; font-size: 12px; }
.cg5-nav a:hover .cg5-nav-icon, .cg5-nav a.active .cg5-nav-icon { color: var(--cg-accent); }

.cg5-main { grid-area: main; min-width: 0; min-height: 0; padding: 20px clamp(14px, 2.5vw, 36px) 28px; }
.cg5-content { width: min(100%, 1500px); min-width: 0; margin: 0 auto; }
.cg5-pagebar { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 15px; }
.cg5-pagebar small { display: block; margin-bottom: 5px; color: var(--cg-text-3); font-size: 8px; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
.cg5-pagebar h1 { margin: 0; color: #f2f5f8; font-size: clamp(20px, 2vw, 27px); line-height: 1.05; font-weight: 780; letter-spacing: -.025em; }
.cg5-pagebar p { margin: 6px 0 0; color: var(--cg-text-3); font-size: 10px; }

.cg5-mobile-drawer { display: none; position: fixed; inset: var(--cg-header) 0 0 0; z-index: 490; background: rgba(0,0,0,.54); }
.cg5-mobile-panel { width: min(300px, 86vw); height: 100%; overflow: auto; padding: 12px; background: #0b1015; border-right: 1px solid var(--cg-border-strong); }
.cg5-mobile-drawer.open { display: block; }
.cg5-bottom { display: none; }

html.cg-v5 #cg-content-v5 { width: 100%; min-width: 0; }
html.cg-v5 #cg-content-v5 > #mainContainer,
html.cg-v5 #cg-content-v5 > #mainContainerWrap,
html.cg-v5 #cg-content-v5 > #container { width: 100% !important; max-width: none !important; min-width: 0 !important; margin: 0 !important; padding: 0 !important; background: transparent !important; }
html.cg-v5 #cg-content-v5 img { max-width: 100%; }
html.cg-v5 #cg-content-v5 a { color: #8bc2ff; }
html.cg-v5 #cg-content-v5 a:hover { color: #c0dcfa; }
html.cg-v5 #cg-content-v5 table { width: 100% !important; max-width: 100%; border-collapse: separate !important; border-spacing: 0 !important; overflow: hidden; background: var(--cg-panel) !important; border: 1px solid var(--cg-border) !important; border-radius: 9px !important; }
html.cg-v5 #cg-content-v5 th { padding: 9px 11px !important; background: var(--cg-panel-2) !important; color: #cbd5de !important; border-color: var(--cg-border) !important; font-size: 9px !important; text-align: left; }
html.cg-v5 #cg-content-v5 td { padding: 9px 11px !important; background: transparent !important; color: #bec8d1 !important; border-color: var(--cg-border) !important; font-size: 10px !important; }
html.cg-v5 #cg-content-v5 tr:hover td { background: rgba(255,255,255,.018) !important; }
html.cg-v5 #cg-content-v5 input:not([type=checkbox]):not([type=radio]),
html.cg-v5 #cg-content-v5 select,
html.cg-v5 #cg-content-v5 textarea { min-height: 34px; max-width: 100%; padding: 7px 10px !important; background: #0b1117 !important; color: var(--cg-text) !important; border: 1px solid var(--cg-border-strong) !important; border-radius: 7px !important; box-shadow: none !important; }
html.cg-v5 #cg-content-v5 textarea { min-height: 92px; }
html.cg-v5 #cg-content-v5 input:focus, html.cg-v5 #cg-content-v5 select:focus, html.cg-v5 #cg-content-v5 textarea:focus { outline: 0 !important; border-color: rgba(94,168,255,.58) !important; box-shadow: 0 0 0 3px var(--cg-accent-soft) !important; }
html.cg-v5 #cg-content-v5 button,
html.cg-v5 #cg-content-v5 input[type=button],
html.cg-v5 #cg-content-v5 input[type=submit],
html.cg-v5 #cg-content-v5 input[type=reset],
html.cg-v5 #cg-content-v5 .button,
html.cg-v5 #cg-content-v5 .btn { min-height: 32px; padding: 0 12px !important; border: 1px solid var(--cg-border-strong) !important; border-radius: 7px !important; background: #18222c !important; color: #e8eef3 !important; box-shadow: none !important; text-shadow: none !important; }
html.cg-v5 #cg-content-v5 button:hover,
html.cg-v5 #cg-content-v5 input[type=button]:hover,
html.cg-v5 #cg-content-v5 input[type=submit]:hover,
html.cg-v5 #cg-content-v5 .button:hover,
html.cg-v5 #cg-content-v5 .btn:hover { background: #202c37 !important; border-color: rgba(255,255,255,.19) !important; }

@media (max-width: 1050px) {
    :root { --cg-sidebar: 215px; }
    .cg5-brand { width: 170px; flex-basis: 170px; }
    .cg5-search { width: min(260px, 25vw); }
}

@media (max-width: 800px) {
    :root { --cg-header: 52px; }
    #cg-app-v5 { display: block; min-height: 100dvh; }
    .cg5-header { position: sticky; top: 0; padding: 0 9px; }
    .cg5-menu { display: block; }
    .cg5-brand { width: auto; flex-basis: auto; }
    .cg5-brand small, .cg5-title, .cg5-search { display: none; }
    .cg5-sidebar { display: none; }
    .cg5-main { padding: 14px 10px calc(70px + env(safe-area-inset-bottom)); }
    .cg5-pagebar { margin-bottom: 12px; }
    .cg5-pagebar h1 { font-size: 21px; }
    .cg5-pagebar p { font-size: 9px; }
    .cg5-bottom { position: fixed; left: 0; right: 0; bottom: 0; z-index: 480; display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 3px; padding: 6px 6px calc(6px + env(safe-area-inset-bottom)); background: rgba(8,11,15,.98); border-top: 1px solid var(--cg-border-strong); }
    .cg5-bottom a { min-width: 0; height: 46px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; border-radius: 7px; color: #7f8d9b; text-decoration: none; font-size: 8px; font-weight: 700; }
    .cg5-bottom a.active { color: #f1f5f8; background: var(--cg-accent-soft); }
    .cg5-bottom span:first-child { font-size: 15px; line-height: 1; }
    .cg5-content { width: 100%; }
    html.cg-v5 #cg-content-v5 table { display: block; overflow-x: auto; }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
}
`;

    function injectStyle() {
        if (document.getElementById('cg-v5-style')) return;
        const style = document.createElement('style');
        style.id = 'cg-v5-style';
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    function getHeader() { return first(SELECTORS.header); }
    function getSidebar() { return first(SELECTORS.sidebar); }

    function getMain() {
        const mainContainer = document.querySelector('#mainContainer');
        if (mainContainer) return mainContainer;
        const wrapped = document.querySelector('#mainContainerWrap');
        if (wrapped) return wrapped;
        const generic = document.querySelector('#container');
        if (!generic) return null;
        const header = getHeader();
        const sidebar = getSidebar();
        if (generic === document.body || generic.contains(header) || generic.contains(sidebar)) return null;
        return generic;
    }

    function getPageName() {
        const path = location.pathname.toLowerCase();
        const map = [
            ['/index.php', 'Dashboard'], ['/profile.php', 'Profile'], ['/city.php', 'City'],
            ['/items.php', 'Items'], ['/market.php', 'Market'], ['/factions.php', 'Faction'],
            ['/joblist.php', 'Jobs'], ['/education.php', 'Education'], ['/travelagency.php', 'Travel'],
            ['/forums.php', 'Forums'], ['/messages.php', 'Messages'], ['/missions.php', 'Missions']
        ];
        const match = map.find(([needle]) => path.includes(needle));
        if (match) return match[1];
        return cleanText(document.title.replace(/\s*-\s*Torn.*$/i, '')) || 'Torn';
    }

    function iconFor(label) {
        const key = label.toLowerCase();
        if (key.includes('home') || key.includes('dashboard')) return '⌂';
        if (key.includes('profile')) return '●';
        if (key.includes('city')) return '⌖';
        if (key.includes('item')) return '▦';
        if (key.includes('battle') || key.includes('attack')) return '⚔';
        if (key.includes('market')) return '◇';
        if (key.includes('faction')) return '◆';
        if (key.includes('job')) return '▤';
        if (key.includes('education')) return '□';
        if (key.includes('travel')) return '✈';
        if (key.includes('mission')) return '✓';
        if (key.includes('forum')) return '☷';
        if (key.includes('message')) return '✉';
        if (key.includes('hospital')) return '+';
        if (key.includes('jail')) return '▥';
        return '•';
    }

    function normalizeHref(anchor) {
        const href = anchor?.getAttribute('href');
        if (!href) return '#';
        if (href.startsWith('#') || href.startsWith('javascript:')) return href;
        try { return new URL(href, location.href).href; } catch { return href; }
    }

    function collectNavLinks() {
        const sidebar = getSidebar();
        if (!sidebar) return [];
        const seen = new Set();
        const links = [];
        sidebar.querySelectorAll('a[href]').forEach(anchor => {
            const label = cleanText(anchor.textContent);
            const href = normalizeHref(anchor);
            if (!label || href === '#' || seen.has(href) || label.length > 42) return;
            seen.add(href);
            links.push({ label, href });
        });
        const preferred = ['home','profile','city','items','battle','market','faction','job','education','travel','missions','forums','messages'];
        const score = item => {
            const index = preferred.findIndex(name => item.label.toLowerCase().includes(name));
            return index === -1 ? 100 : index;
        };
        links.sort((a,b) => score(a) - score(b));
        return links;
    }

    function makeNav(links) {
        const wrap = document.createElement('div');
        wrap.className = 'cg5-nav';
        links.forEach(item => {
            const a = document.createElement('a');
            a.href = item.href;
            a.dataset.cgLabel = item.label.toLowerCase();
            a.innerHTML = `<span class="cg5-nav-icon">${escapeHtml(iconFor(item.label))}</span><span>${escapeHtml(item.label)}</span>`;
            wrap.appendChild(a);
        });
        return wrap;
    }

    function getPlayerData() {
        const sidebar = getSidebar();
        const result = { name: 'Player', level: '', money: '', image: '', stats: [] };
        if (!sidebar) return result;
        const raw = sidebar.innerText || '';
        const lines = raw.split(/\n+/).map(cleanText).filter(Boolean);
        const findValue = label => {
            const index = lines.findIndex(line => line.toLowerCase() === label.toLowerCase());
            return index >= 0 ? lines[index + 1] || '' : '';
        };
        result.name = findValue('Name') || 'Player';
        result.level = findValue('Level');
        result.money = findValue('Money');
        const image = sidebar.querySelector('img');
        if (image?.src) result.image = image.src;
        ['Energy','Nerve','Happy','Life'].forEach(label => {
            const value = findValue(label);
            if (value) result.stats.push({ label, value });
        });
        return result;
    }

    function createShell() {
        const existing = document.getElementById('cg-app-v5');
        if (existing) return existing;

        const app = document.createElement('div');
        app.id = 'cg-app-v5';

        const header = document.createElement('header');
        header.className = 'cg5-header';
        header.innerHTML = `
            <button class="cg5-menu" type="button" aria-label="Open navigation">☰</button>
            <a class="cg5-brand" href="/">
                <span class="cg5-mark">CG</span>
                <span><strong>CONGERIE</strong><small>Torn interface</small></span>
            </a>
            <div class="cg5-title" data-cg-title></div>
            <div class="cg5-spacer"></div>
            <label class="cg5-search" aria-label="Filter navigation"><span>⌕</span><input type="search" placeholder="Filter navigation" autocomplete="off"></label>
            <div class="cg5-header-actions"><button class="cg5-icon" type="button" data-cg-action="reload" aria-label="Reload">↻</button></div>
        `;

        const sidebar = document.createElement('aside');
        sidebar.className = 'cg5-sidebar';
        const main = document.createElement('main');
        main.className = 'cg5-main';
        const content = document.createElement('div');
        content.className = 'cg5-content';
        content.id = 'cg-content-v5';
        main.appendChild(content);

        const drawer = document.createElement('div');
        drawer.className = 'cg5-mobile-drawer';
        drawer.innerHTML = '<div class="cg5-mobile-panel"></div>';

        const bottom = document.createElement('nav');
        bottom.className = 'cg5-bottom';

        app.append(header, sidebar, main);
        document.body.prepend(app);
        document.body.append(drawer, bottom);

        header.querySelector('[data-cg-action="reload"]').addEventListener('click', () => location.reload());
        header.querySelector('.cg5-menu').addEventListener('click', () => drawer.classList.toggle('open'));
        drawer.addEventListener('click', event => { if (event.target === drawer) drawer.classList.remove('open'); });
        header.querySelector('.cg5-search input').addEventListener('input', event => {
            const query = event.target.value.trim().toLowerCase();
            document.querySelectorAll('#cg-app-v5 .cg5-nav a').forEach(link => {
                link.hidden = Boolean(query) && !link.dataset.cgLabel.includes(query);
            });
        });
        window.addEventListener('resize', () => { if (window.innerWidth > 800) drawer.classList.remove('open'); }, { passive: true });
        return app;
    }

    function renderNavigation() {
        const host = document.querySelector('.cg5-sidebar');
        const mobile = document.querySelector('.cg5-mobile-panel');
        if (!host || !mobile) return;
        const data = getPlayerData();
        const avatar = data.image ? `<img src="${escapeHtml(data.image)}" alt="">` : escapeHtml((data.name || 'P').slice(0,2).toUpperCase());
        const stats = data.stats.map(stat => `<div class="cg5-resource"><span>${escapeHtml(stat.label)}</span><span class="cg5-resource-track"><span class="cg5-resource-fill"></span></span><span class="cg5-resource-value">${escapeHtml(stat.value)}</span></div>`).join('');
        const playerHtml = `<section class="cg5-player"><div class="cg5-player-head"><div class="cg5-avatar">${avatar}</div><div class="cg5-player-copy"><div class="cg5-player-name">${escapeHtml(data.name)}</div><div class="cg5-player-meta">${escapeHtml(data.level ? `Level ${data.level}` : 'Torn player')}</div></div>${data.money ? `<span class="cg5-money">${escapeHtml(data.money)}</span>` : ''}</div>${stats ? `<div class="cg5-resources">${stats}</div>` : ''}</section>`;
        const links = collectNavLinks();

        host.innerHTML = playerHtml;
        const desktopNav = document.createElement('section');
        desktopNav.className = 'cg5-nav-section';
        desktopNav.innerHTML = '<div class="cg5-nav-label">Navigation</div>';
        desktopNav.appendChild(makeNav(links));
        host.appendChild(desktopNav);

        mobile.innerHTML = playerHtml;
        const mobileNav = document.createElement('section');
        mobileNav.className = 'cg5-nav-section';
        mobileNav.innerHTML = '<div class="cg5-nav-label">Navigation</div>';
        mobileNav.appendChild(makeNav(links));
        mobile.appendChild(mobileNav);

        const bottom = document.querySelector('.cg5-bottom');
        bottom.replaceChildren();
        links.filter(item => /home|city|item|battle|profile/i.test(item.label)).slice(0,5).forEach(item => {
            const a = document.createElement('a');
            a.href = item.href;
            a.dataset.cgLabel = item.label.toLowerCase();
            a.innerHTML = `<span>${escapeHtml(iconFor(item.label))}</span><span>${escapeHtml(item.label)}</span>`;
            bottom.appendChild(a);
        });
    }

    function moveMainIntoShell() {
        const content = document.getElementById('cg-content-v5');
        const main = getMain();
        if (!content || !main) return false;
        if (main === content || content.contains(main)) return true;
        content.replaceChildren(main);
        return true;
    }

    function updateActiveNavigation() {
        const current = location.href.split('#')[0].replace(/\/+$/, '');
        document.querySelectorAll('#cg-app-v5 a[href]').forEach(link => {
            const href = link.href.split('#')[0].replace(/\/+$/, '');
            link.classList.toggle('active', href === current);
        });
    }

    function updatePagebar() {
        const content = document.getElementById('cg-content-v5');
        if (!content) return;
        let bar = content.querySelector(':scope > .cg5-pagebar');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'cg5-pagebar';
            content.prepend(bar);
        }
        const title = getPageName();
        bar.innerHTML = `<div><small>Torn / Congerie</small><h1>${escapeHtml(title)}</h1><p>Clean controls. Faster navigation. Your Torn page, redesigned.</p></div>`;
        const titleNode = document.querySelector('[data-cg-title]');
        if (titleNode) titleNode.textContent = title;
    }

    function hideNativeChrome() {
        all(SELECTORS.header).forEach(node => {
            if (!node.closest('#cg-app-v5')) node.style.setProperty('display', 'none', 'important');
        });
        all(SELECTORS.sidebar).forEach(node => {
            if (!node.closest('#cg-app-v5')) node.style.setProperty('display', 'none', 'important');
        });
    }

    function apply() {
        if (!document.body) return;
        const main = getMain();
        if (!main) return;
        injectStyle();
        document.documentElement.classList.add('cg-v5');
        createShell();
        if (!moveMainIntoShell()) return;
        renderNavigation();
        updatePagebar();
        updateActiveNavigation();
        hideNativeChrome();
    }

    let scheduled = false;
    const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            try { apply(); } catch (error) { console.error('[Congerie UI]', error); }
        });
    };

    function start() {
        injectStyle();
        apply();
        const observer = new MutationObserver(mutations => {
            const relevant = mutations.some(mutation => mutation.type === 'childList' && [...mutation.addedNodes].some(node => node.nodeType === 1 && !node.closest?.('#cg-app-v5')));
            if (relevant) schedule();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        let lastUrl = location.href;
        setInterval(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                schedule();
            }
        }, 500);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
