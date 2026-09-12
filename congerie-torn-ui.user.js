// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      3.0.0
// @description  Full responsive visual redesign for Torn desktop, tablet, phone, and Torn PDA.
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

    const VERSION = '3.0.0';
    const qs = (s, root = document) => root.querySelector(s);
    const qsa = (s, root = document) => [...root.querySelectorAll(s)];

    const css = `
:root {
    --cg-bg: #090d12;
    --cg-bg-soft: #0d131a;
    --cg-panel: #111820;
    --cg-panel-raised: #151e27;
    --cg-panel-hover: #19232d;
    --cg-line: rgba(255,255,255,.075);
    --cg-line-strong: rgba(255,255,255,.13);
    --cg-text: #edf2f7;
    --cg-text-soft: #aab5c0;
    --cg-muted: #707d8b;
    --cg-blue: #5da7ff;
    --cg-blue-soft: rgba(93,167,255,.12);
    --cg-green: #57c98a;
    --cg-red: #ed6b73;
    --cg-yellow: #e5bd63;
    --cg-header: 58px;
    --cg-sidebar: 238px;
    --cg-radius: 10px;
    --cg-content: 1380px;
}

html,
body {
    margin: 0 !important;
    padding: 0 !important;
    min-width: 0 !important;
    background: var(--cg-bg) !important;
    color: var(--cg-text) !important;
    color-scheme: dark;
}

body {
    overflow-x: hidden !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
    background:
        radial-gradient(900px 500px at 50% -220px, rgba(70,115,160,.14), transparent 72%),
        linear-gradient(180deg, #0b1016 0%, #090d12 100%) !important;
}

body,
body * {
    box-sizing: border-box;
}

body * {
    font-family: inherit !important;
}

/* Remove Torn's chrome. The actual page content stays alive and is moved into our layout. */
#topHeader,
#header-root,
.header-wrapper,
#sidebar,
.sidebar,
.area-sidebar {
    display: none !important;
}

/* Our shell is structural, not a fixed overlay. */
#cg-app {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--cg-sidebar) minmax(0, 1fr);
    grid-template-rows: var(--cg-header) minmax(0, 1fr) auto;
    grid-template-areas:
        "header header"
        "sidebar main"
        "sidebar footer";
    background: transparent;
}

.cg-header {
    grid-area: header;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 20px;
    background: rgba(9,13,18,.97);
    border-bottom: 1px solid var(--cg-line-strong);
    position: sticky;
    top: 0;
    z-index: 20;
}

.cg-brand {
    width: 198px;
    flex: 0 0 198px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--cg-text);
    text-decoration: none;
}

.cg-mark {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(93,167,255,.34);
    border-radius: 8px;
    background: var(--cg-blue-soft);
    color: var(--cg-blue);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: -.03em;
}

.cg-brand-text strong {
    display: block;
    font-size: 13px;
    line-height: 1;
    letter-spacing: .04em;
}

.cg-brand-text span {
    display: block;
    margin-top: 4px;
    color: var(--cg-muted);
    font-size: 8px;
    line-height: 1;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.cg-header-search {
    width: min(390px, 34vw);
    height: 34px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 11px;
    border: 1px solid var(--cg-line);
    border-radius: 8px;
    background: #0d131a;
    color: var(--cg-muted);
    font-size: 11px;
}

.cg-header-spacer { flex: 1; }

.cg-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.cg-header-actions button,
.cg-mobile-menu {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #8996a4;
    cursor: pointer;
}

.cg-header-actions button:hover,
.cg-mobile-menu:hover {
    color: #fff;
    background: rgba(255,255,255,.055);
    border-color: var(--cg-line);
}

.cg-mobile-menu { display: none; }

.cg-sidebar {
    grid-area: sidebar;
    min-width: 0;
    padding: 14px 12px 18px;
    background: rgba(12,18,24,.98);
    border-right: 1px solid var(--cg-line);
    overflow: auto;
    position: sticky;
    top: var(--cg-header);
    height: calc(100vh - var(--cg-header));
}

.cg-player-card {
    padding: 13px;
    border: 1px solid var(--cg-line);
    border-radius: var(--cg-radius);
    background: linear-gradient(145deg, #151e27, #111820);
}

.cg-player-top {
    display: flex;
    align-items: center;
    gap: 10px;
}

.cg-player-avatar {
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 9px;
    background: #22303d;
    color: #dfe9f2;
    font-size: 12px;
    font-weight: 800;
}

.cg-player-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cg-player-name { font-size: 12px; font-weight: 750; color: #f0f4f8; }
.cg-player-meta { margin-top: 3px; font-size: 9px; color: var(--cg-muted); }

.cg-stat-list {
    display: grid;
    gap: 8px;
    margin-top: 13px;
}

.cg-stat {
    display: grid;
    grid-template-columns: 43px minmax(0,1fr) auto;
    align-items: center;
    gap: 7px;
    color: #8996a4;
    font-size: 9px;
}

.cg-stat-value { min-width: 42px; text-align: right; color: #aeb9c4; font-size: 8px; }
.cg-stat-track { height: 5px; overflow: hidden; border-radius: 99px; background: #26313c; }
.cg-stat-fill { display: block; width: 0; height: 100%; border-radius: inherit; background: var(--cg-blue); transition: width .2s ease; }

.cg-nav-label {
    margin: 18px 7px 7px;
    color: #586675;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: .13em;
    text-transform: uppercase;
}

.cg-nav { display: grid; gap: 2px; }

.cg-nav a {
    min-height: 34px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 9px;
    border: 1px solid transparent;
    border-radius: 7px;
    color: #96a2af;
    text-decoration: none;
    font-size: 10px;
    font-weight: 650;
    transition: background .12s ease, color .12s ease, border-color .12s ease;
}

.cg-nav a:hover { color: #fff; background: rgba(255,255,255,.04); }
.cg-nav a.active { color: #f3f7fa; background: var(--cg-blue-soft); border-color: rgba(93,167,255,.13); }
.cg-nav a.active::before { content: ""; width: 3px; height: 15px; margin-left: -10px; border-radius: 99px; background: var(--cg-blue); }
.cg-nav-icon { width: 18px; text-align: center; color: #687687; font-size: 13px; }
.cg-nav a.active .cg-nav-icon, .cg-nav a:hover .cg-nav-icon { color: var(--cg-blue); }

.cg-main {
    grid-area: main;
    min-width: 0;
    width: 100%;
    padding: 22px clamp(16px, 3vw, 38px) 28px;
}

#cg-content {
    width: min(100%, var(--cg-content));
    margin: 0 auto;
    min-width: 0;
}

/* Torn's existing content is now the page body inside our layout, not an overlay target. */
#cg-content > #mainContainer,
#cg-content > #container,
#cg-content > #mainContainerWrap {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
}

#cg-content img { max-width: 100%; }
#cg-content a { color: #83bcf8; }
#cg-content a:hover { color: #b8d9fa; }

/* Remove Torn's old chrome surfaces while preserving its controls/content. */
#cg-content .content-title,
#cg-content .title,
#cg-content .title-wrapper,
#cg-content .page-title,
#cg-content .box-title,
#cg-content .panel-title,
#cg-content .section-title {
    color: #eef3f7 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
}

#cg-content table {
    width: 100%;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    background: var(--cg-panel) !important;
    border: 1px solid var(--cg-line) !important;
    border-radius: 10px !important;
    overflow: hidden;
}

#cg-content th {
    padding: 10px 12px !important;
    background: var(--cg-panel-raised) !important;
    color: #cbd5de !important;
    border-color: var(--cg-line) !important;
    font-size: 10px !important;
    text-align: left;
}

#cg-content td {
    padding: 9px 12px !important;
    border-color: var(--cg-line) !important;
    color: #c1cad3 !important;
    background: transparent !important;
    font-size: 11px !important;
}

#cg-content tr:hover td { background: rgba(255,255,255,.018) !important; }

#cg-content input:not([type=checkbox]):not([type=radio]),
#cg-content select,
#cg-content textarea {
    min-height: 34px;
    max-width: 100%;
    padding: 7px 10px !important;
    background: #0c131a !important;
    color: var(--cg-text) !important;
    border: 1px solid var(--cg-line-strong) !important;
    border-radius: 7px !important;
    box-shadow: none !important;
}

#cg-content textarea { min-height: 90px; }
#cg-content input:focus, #cg-content select:focus, #cg-content textarea:focus { outline: none !important; border-color: rgba(93,167,255,.55) !important; box-shadow: 0 0 0 3px var(--cg-blue-soft) !important; }

#cg-content button,
#cg-content input[type=button],
#cg-content input[type=submit],
#cg-content input[type=reset],
#cg-content .button,
#cg-content .btn {
    min-height: 32px;
    padding: 0 12px !important;
    border: 1px solid var(--cg-line-strong) !important;
    border-radius: 7px !important;
    background: #18222c !important;
    color: #e6edf3 !important;
    box-shadow: none !important;
    text-shadow: none !important;
}

#cg-content button:hover,
#cg-content input[type=button]:hover,
#cg-content input[type=submit]:hover,
#cg-content .button:hover,
#cg-content .btn:hover { background: #202d39 !important; border-color: rgba(255,255,255,.2) !important; }

#cg-content .green, #cg-content .success { color: var(--cg-green) !important; }
#cg-content .red, #cg-content .error { color: var(--cg-red) !important; }
#cg-content .yellow, #cg-content .warning { color: var(--cg-yellow) !important; }

.cg-footer {
    grid-area: footer;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: #0a0f14;
    border-top: 1px solid var(--cg-line);
    overflow-x: auto;
}

.cg-footer a {
    min-width: 96px;
    height: 36px;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 10px;
    border: 1px solid var(--cg-line);
    border-radius: 7px;
    background: #131c24;
    color: #aab5c0;
    text-decoration: none;
    font-size: 9px;
    font-weight: 650;
}

.cg-footer a:hover { background: #19232d; color: #fff; }
.cg-footer-icon { color: #718092; font-size: 13px; }

.cg-drawer-backdrop {
    display: none;
}

@media (max-width: 980px) {
    :root { --cg-header: 52px; }

    #cg-app {
        min-height: 100dvh;
        display: grid;
        grid-template-columns: minmax(0,1fr);
        grid-template-rows: var(--cg-header) minmax(0,1fr) auto;
        grid-template-areas: "header" "main" "footer";
    }

    .cg-header {
        padding: 0 12px;
        gap: 9px;
        position: sticky;
        top: 0;
    }

    .cg-mobile-menu { display: grid; order: -1; }
    .cg-brand { width: auto; min-width: 0; flex: 0 0 auto; }
    .cg-brand-text span { display: none; }
    .cg-header-search { display: none; }
    .cg-header-actions button:nth-child(2) { display: none; }

    .cg-sidebar {
        position: fixed;
        z-index: 60;
        left: 0;
        top: var(--cg-header);
        bottom: 0;
        width: min(290px, 86vw);
        height: auto;
        transform: translateX(-105%);
        transition: transform .18s ease;
        box-shadow: 22px 0 50px rgba(0,0,0,.45);
    }

    #cg-app.cg-drawer-open .cg-sidebar { transform: translateX(0); }

    .cg-drawer-backdrop {
        position: fixed;
        z-index: 55;
        inset: var(--cg-header) 0 0;
        background: rgba(0,0,0,.48);
    }

    #cg-app.cg-drawer-open .cg-drawer-backdrop { display: block; }

    .cg-main { padding: 14px 10px 18px; }
    .cg-footer { padding: 7px 7px calc(7px + env(safe-area-inset-bottom)); }
    .cg-footer a { min-width: 74px; height: 39px; flex-direction: column; gap: 2px; font-size: 8px; }
    .cg-footer-icon { font-size: 14px; }
}

@media (max-width: 560px) {
    .cg-header { padding: 0 8px; }
    .cg-mark { width: 29px; height: 29px; }
    .cg-brand-text strong { font-size: 12px; }
    .cg-main { padding: 10px 7px 15px; }

    #cg-content table { display: block; overflow-x: auto; }
    #cg-content td, #cg-content th { padding: 8px 9px !important; }

    #cg-content input:not([type=checkbox]):not([type=radio]),
    #cg-content select,
    #cg-content textarea { width: 100%; }

    #cg-content button,
    #cg-content input[type=button],
    #cg-content input[type=submit],
    #cg-content input[type=reset],
    #cg-content .button,
    #cg-content .btn { min-height: 36px; }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
}
`;

    const style = document.createElement('style');
    style.id = 'cg-ui-v3-style';
    style.textContent = css;
    document.head.appendChild(style);

    const nav = [
        ['⌂', 'Home', '/'],
        ['◉', 'Profile', '/profiles.php'],
        ['⌁', 'City', '/city.php'],
        ['⚔', 'Battle', '/loader.php?sid=attack'],
        ['▣', 'Items', '/item.php'],
        ['◈', 'Market', '/market.php'],
        ['⚑', 'Faction', '/factions.php'],
        ['◆', 'Job', '/joblist.php'],
        ['✦', 'Education', '/education.php'],
        ['✈', 'Travel', '/travelagency.php'],
        ['▤', 'Forums', '/forums.php'],
        ['✉', 'Messages', '/messages.php']
    ];

    const quick = [
        ['⌁', 'Hospital', '/hospitalview.php'],
        ['▣', 'Jail', '/jailview.php'],
        ['♟', 'Missions', '/missions.php'],
        ['★', 'Hall of Fame', '/hof.php'],
        ['◒', 'Casino', '/casino.php'],
        ['⚙', 'Preferences', '/preferences.php']
    ];

    const bottom = [
        ['⌂', 'Home', '/'],
        ['⌁', 'City', '/city.php'],
        ['▣', 'Items', '/item.php'],
        ['⚔', 'Battle', '/loader.php?sid=attack'],
        ['✉', 'Messages', '/messages.php']
    ];

    const makeLink = ([icon, label, href]) => {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = `<span class="cg-nav-icon">${icon}</span><span>${label}</span>`;
        return a;
    };

    const makeFooterLink = ([icon, label, href]) => {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = `<span class="cg-footer-icon">${icon}</span><span>${label}</span>`;
        return a;
    };

    function findMainContent() {
        return qs('#mainContainer') || qs('#container') || qs('#mainContainerWrap');
    }

    const mainContent = findMainContent();

    if (!mainContent || !document.body) {
        document.documentElement.dataset.congerieTornUiFailed = VERSION;
        return;
    }

    const app = document.createElement('div');
    app.id = 'cg-app';
    app.innerHTML = `
        <header class="cg-header">
            <button class="cg-mobile-menu" type="button" aria-label="Open navigation">☰</button>
            <a class="cg-brand" href="/" aria-label="Home">
                <span class="cg-mark">CG</span>
                <span class="cg-brand-text"><strong>CONGERIE</strong><span>Torn interface</span></span>
            </a>
            <div class="cg-header-search">⌕ <span>Search Torn</span></div>
            <div class="cg-header-spacer"></div>
            <div class="cg-header-actions">
                <button type="button" aria-label="Notifications">●</button>
                <button type="button" aria-label="Messages">◎</button>
                <button type="button" aria-label="Settings">⚙</button>
            </div>
        </header>
        <aside class="cg-sidebar">
            <section class="cg-player-card">
                <div class="cg-player-top">
                    <div class="cg-player-avatar">U</div>
                    <div>
                        <div class="cg-player-name">Player</div>
                        <div class="cg-player-meta">Level — · Online</div>
                    </div>
                </div>
                <div class="cg-stat-list">
                    ${['energy','nerve','happy','life'].map(k => `
                        <div class="cg-stat">
                            <span>${k[0].toUpperCase()+k.slice(1)}</span>
                            <i class="cg-stat-track"><b class="cg-stat-fill" data-fill="${k}"></b></i>
                            <span class="cg-stat-value" data-value="${k}">—</span>
                        </div>`).join('')}
                </div>
            </section>
            <div class="cg-nav-label">Navigation</div>
            <nav class="cg-nav" data-nav></nav>
            <div class="cg-nav-label">Quick access</div>
            <nav class="cg-nav" data-quick></nav>
        </aside>
        <div class="cg-drawer-backdrop" aria-hidden="true"></div>
        <main class="cg-main"><div id="cg-content"></div></main>
        <nav class="cg-footer" data-footer></nav>
    `;

    const contentHost = qs('#cg-content', app);
    contentHost.appendChild(mainContent);

    nav.forEach(item => qs('[data-nav]', app).appendChild(makeLink(item)));
    quick.forEach(item => qs('[data-quick]', app).appendChild(makeLink(item)));
    bottom.forEach(item => qs('[data-footer]', app).appendChild(makeFooterLink(item)));

    document.body.appendChild(app);

    function currentPath() {
        return location.pathname + location.search;
    }

    function markActive() {
        const path = currentPath();
        qsa('.cg-nav a, .cg-footer a', app).forEach(a => {
            const href = a.getAttribute('href') || '';
            const url = new URL(href, location.origin);
            const active = url.pathname === location.pathname &&
                (url.pathname !== '/loader.php' || url.search === location.search);
            a.classList.toggle('active', active);
        });
    }

    function pageText() {
        return (mainContent.innerText || '').replace(/\s+/g, ' ').trim();
    }

    function syncPlayer() {
        const text = pageText();
        const name = text.match(/Name:\s*([^\n]+?)\s+Money:/i);
        const level = text.match(/Level:\s*(\d+)/i);
        const money = text.match(/Money:\s*\$?([\d,]+)/i);

        if (name) qs('.cg-player-name', app).textContent = name[1].trim();
        if (level) qs('.cg-player-meta', app).textContent = `Level ${level[1]} · ${money ? '$' + money[1] : 'Online'}`;

        const stats = [
            ['energy', /Energy:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['nerve', /Nerve:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['happy', /Happy:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['life', /Life:\s*([\d,]+)\s*\/\s*([\d,]+)/i]
        ];

        stats.forEach(([key, re]) => {
            const match = text.match(re);
            if (!match) return;
            const current = Number(match[1].replace(/,/g, ''));
            const max = Number(match[2].replace(/,/g, ''));
            const percent = max ? Math.max(0, Math.min(100, current / max * 100)) : 0;
            const value = qs(`[data-value="${key}"]`, app);
            const fill = qs(`[data-fill="${key}"]`, app);
            if (value) value.textContent = `${match[1]}/${match[2]}`;
            if (fill) fill.style.width = `${percent}%`;
        });

        const image = qs('img[src*="user"], img[src*="avatar"], .avatar img, .profile img', mainContent);
        if (image) {
            const avatar = qs('.cg-player-avatar', app);
            avatar.innerHTML = '';
            const clone = image.cloneNode(true);
            avatar.appendChild(clone);
        }
    }

    function closeDrawer() {
        app.classList.remove('cg-drawer-open');
    }

    qs('.cg-mobile-menu', app).addEventListener('click', () => app.classList.toggle('cg-drawer-open'));
    qs('.cg-drawer-backdrop', app).addEventListener('click', closeDrawer);
    qsa('.cg-sidebar a', app).forEach(a => a.addEventListener('click', closeDrawer));

    let lastUrl = location.href;
    let scheduled = false;

    function refresh() {
        scheduled = false;
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            closeDrawer();
        }
        markActive();
        syncPlayer();
    }

    function scheduleRefresh() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(refresh);
    }

    markActive();
    syncPlayer();

    new MutationObserver(scheduleRefresh).observe(mainContent, {
        childList: true,
        subtree: true,
        characterData: true
    });

    setInterval(() => {
        if (location.href !== lastUrl) refresh();
    }, 800);
})();
