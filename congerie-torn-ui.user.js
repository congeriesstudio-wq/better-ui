// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      2.1.1
// @description  Responsive visual redesign for Torn on desktop, tablet, phone, and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (document.documentElement.dataset.congerieBetterUi) return;
    document.documentElement.dataset.congerieBetterUi = '1';

    const css = `
:root {
    --cg-bg: #0b1016;
    --cg-panel: #121a23;
    --cg-panel-2: #17212c;
    --cg-border: rgba(255,255,255,.075);
    --cg-border-strong: rgba(255,255,255,.13);
    --cg-text: #edf3f8;
    --cg-muted: #7e8b99;
    --cg-accent: #5da7ff;
    --cg-accent-soft: rgba(93,167,255,.12);
    --cg-top: 54px;
    --cg-side: 226px;
    --cg-bottom: 56px;
}

html,
body {
    background: var(--cg-bg) !important;
    color: var(--cg-text) !important;
    color-scheme: dark;
}

body {
    background: radial-gradient(900px 420px at 50% -180px, rgba(80,130,185,.12), transparent 70%), #0b1016 !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
}

body * {
    font-family: inherit !important;
}

/* Desktop shell only. Never replace Torn's mobile/PDA chrome. */
@media (min-width: 981px) {
    #topHeader {
        display: none !important;
    }

    #sidebar,
    .sidebar,
    .area-sidebar {
        display: none !important;
    }

    #mainContainer,
    #container,
    #mainContainerWrap {
        box-sizing: border-box !important;
        max-width: none !important;
        width: auto !important;
        margin-left: var(--cg-side) !important;
        margin-right: 0 !important;
        padding-top: var(--cg-top) !important;
        padding-bottom: var(--cg-bottom) !important;
        background: transparent !important;
    }
}

/* Shared content polish. These do not change page geometry on mobile. */
#mainContainer table,
#container table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    border: 1px solid var(--cg-border) !important;
    border-radius: 10px !important;
    background: var(--cg-panel) !important;
    overflow: hidden !important;
}

#mainContainer th,
#container th {
    background: var(--cg-panel-2) !important;
    color: #c8d2dc !important;
}

#mainContainer td,
#mainContainer th,
#container td,
#container th {
    border-color: var(--cg-border) !important;
}

#mainContainer tr:hover,
#container tr:hover {
    background: rgba(255,255,255,.018) !important;
}

button,
input[type=button],
input[type=submit],
input[type=reset],
select,
textarea,
input:not([type=checkbox]):not([type=radio]) {
    font: inherit !important;
    border-radius: 7px !important;
}

input:not([type=checkbox]):not([type=radio]),
textarea,
select {
    background: #0d141c !important;
    color: var(--cg-text) !important;
    border: 1px solid var(--cg-border-strong) !important;
    box-shadow: none !important;
}

input:not([type=checkbox]):not([type=radio]):focus,
textarea:focus,
select:focus {
    outline: none !important;
    border-color: rgba(93,167,255,.55) !important;
    box-shadow: 0 0 0 3px var(--cg-accent-soft) !important;
}

/* Custom desktop shell. */
#cg-shell {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
}

#cg-shell * {
    box-sizing: border-box;
}

.cg-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--cg-top);
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 18px;
    background: rgba(10,15,21,.98);
    border-bottom: 1px solid var(--cg-border-strong);
    box-shadow: 0 8px 30px rgba(0,0,0,.22);
    pointer-events: auto;
}

.cg-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 190px;
    color: #f5f8fb;
    text-decoration: none;
}

.cg-logo {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(93,167,255,.35);
    border-radius: 8px;
    background: var(--cg-accent-soft);
    color: var(--cg-accent);
    font-size: 11px;
    font-weight: 900;
}

.cg-brand strong {
    display: block;
    font-size: 13px;
    letter-spacing: .01em;
}

.cg-brand small {
    display: block;
    margin-top: 1px;
    color: #667483;
    font-size: 9px;
}

.cg-search {
    width: min(350px,35vw);
    height: 34px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 11px;
    border: 1px solid var(--cg-border);
    border-radius: 8px;
    background: #0d141b;
    color: #6f7d8c;
    font-size: 11px;
}

.cg-grow {
    flex: 1;
}

.cg-actions {
    display: flex;
    gap: 5px;
}

.cg-actions button,
.cg-menu {
    width: 34px;
    height: 34px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #8997a6;
    cursor: pointer;
}

.cg-actions button:hover,
.cg-menu:hover {
    background: rgba(255,255,255,.05);
    color: #fff;
}

.cg-menu {
    display: none;
}

.cg-side {
    position: fixed;
    left: 0;
    top: var(--cg-top);
    bottom: var(--cg-bottom);
    width: var(--cg-side);
    padding: 12px;
    overflow: auto;
    background: rgba(13,19,26,.98);
    border-right: 1px solid var(--cg-border);
    pointer-events: auto;
}

.cg-player {
    padding: 13px;
    margin-bottom: 11px;
    border: 1px solid var(--cg-border);
    border-radius: 10px;
    background: linear-gradient(160deg,#151e27,#111820);
}

.cg-player-head {
    display: flex;
    align-items: center;
    gap: 10px;
}

.cg-avatar {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    flex: 0 0 36px;
    overflow: hidden;
    border-radius: 9px;
    background: #202d3a;
    color: #dce8f4;
    font-weight: 800;
}

.cg-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cg-name {
    color: #eef4f9;
    font-size: 12px;
    font-weight: 750;
}

.cg-meta {
    margin-top: 2px;
    color: #788697;
    font-size: 10px;
}

.cg-bars {
    display: grid;
    gap: 7px;
    margin-top: 12px;
}

.cg-bar {
    display: grid;
    grid-template-columns: 45px 1fr 39px;
    align-items: center;
    gap: 6px;
    color: #8d9aa8;
    font-size: 9px;
}

.cg-track {
    height: 5px;
    border-radius: 99px;
    background: #252f3a;
    overflow: hidden;
}

.cg-fill {
    display: block;
    width: 0;
    height: 100%;
    border-radius: 99px;
    background: var(--cg-accent);
}

.cg-section {
    margin: 14px 7px 6px;
    color: #596778;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .11em;
    text-transform: uppercase;
}

.cg-nav {
    display: grid;
    gap: 2px;
}

.cg-nav a {
    min-height: 34px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 9px;
    border: 1px solid transparent;
    border-radius: 7px;
    color: #9aa6b5;
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
}

.cg-nav a:hover {
    color: #fff;
    background: rgba(255,255,255,.045);
}

.cg-nav a.active {
    color: #f4f8fc;
    background: var(--cg-accent-soft);
    border-color: rgba(93,167,255,.11);
}

.cg-nav a.active:before {
    content: '';
    width: 3px;
    height: 15px;
    margin-left: -10px;
    border-radius: 99px;
    background: var(--cg-accent);
}

.cg-icon {
    width: 18px;
    text-align: center;
    color: #6e7c8c;
}

.cg-nav a.active .cg-icon,
.cg-nav a:hover .cg-icon {
    color: var(--cg-accent);
}

.cg-bottom {
    position: fixed;
    left: var(--cg-side);
    right: 0;
    bottom: 0;
    height: var(--cg-bottom);
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    background: rgba(10,15,21,.98);
    border-top: 1px solid var(--cg-border);
    pointer-events: auto;
    overflow-x: auto;
}

.cg-bottom a {
    min-width: 108px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 10px;
    border: 1px solid var(--cg-border);
    border-radius: 8px;
    background: #141d26;
    color: #b7c1cb;
    text-decoration: none;
    font-size: 10px;
    font-weight: 650;
}

.cg-bottom a:hover {
    background: #19232e;
    color: #fff;
    border-color: var(--cg-border-strong);
}

/* Tablet/phone/PDA: keep Torn's native navigation and layout intact. */
@media (max-width: 980px) {
    :root {
        --cg-side: 0px;
        --cg-bottom: 0px;
    }

    #cg-shell {
        position: static;
        inset: auto;
        z-index: auto;
        pointer-events: none;
    }

    .cg-top,
    .cg-bottom {
        display: none !important;
    }

    .cg-side {
        display: none !important;
    }

    #mainContainer,
    #container,
    #mainContainerWrap {
        width: auto !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        background: transparent !important;
    }

    /* Do not hide Torn's actual PDA/mobile header or sidebar. */
    #topHeader,
    #sidebar,
    .sidebar,
    .area-sidebar {
        display: revert !important;
    }

    body {
        overflow-x: hidden !important;
    }

    #mainContainer,
    #container {
        box-sizing: border-box !important;
    }
}

@media (min-width: 981px) and (max-width: 1180px) {
    :root {
        --cg-side: 205px;
    }

    .cg-brand {
        min-width: 150px;
    }

    .cg-search {
        width: 250px;
    }
}

@media (max-width: 680px) {
    html,
    body {
        min-width: 0 !important;
    }

    body {
        font-size: 13px !important;
    }

    #mainContainer,
    #container,
    #mainContainerWrap {
        overflow-x: hidden !important;
    }
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        transition: none !important;
        animation: none !important;
    }
}
`;

    const style = document.createElement('style');
    style.id = 'cg-ui-v2-style';
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

    const link = item => {
        const a = document.createElement('a');
        a.href = item[2];
        a.innerHTML = `<span class="cg-icon">${item[0]}</span><span>${item[1]}</span>`;
        return a;
    };

    const root = document.createElement('div');
    root.id = 'cg-shell';
    root.innerHTML = `
        <header class="cg-top">
            <a class="cg-brand" href="/">
                <span class="cg-logo">CG</span>
                <span><strong>CONGERIE</strong><small>TORN INTERFACE</small></span>
            </a>
            <div class="cg-search">⌕&nbsp; Search Torn...</div>
            <div class="cg-grow"></div>
            <div class="cg-actions">
                <button type="button" aria-label="Notifications">●</button>
                <button type="button" aria-label="Messages">◎</button>
                <button type="button" aria-label="Settings">⚙</button>
            </div>
        </header>

        <aside class="cg-side">
            <div class="cg-player">
                <div class="cg-player-head">
                    <div class="cg-avatar">U</div>
                    <div>
                        <div class="cg-name">Player</div>
                        <div class="cg-meta">Level — · Online</div>
                    </div>
                </div>
                <div class="cg-bars">
                    <div class="cg-bar"><span>Energy</span><i class="cg-track"><b class="cg-fill" data-fill="energy"></b></i><b data-value="energy">—</b></div>
                    <div class="cg-bar"><span>Nerve</span><i class="cg-track"><b class="cg-fill" data-fill="nerve"></b></i><b data-value="nerve">—</b></div>
                    <div class="cg-bar"><span>Happy</span><i class="cg-track"><b class="cg-fill" data-fill="happy"></b></i><b data-value="happy">—</b></div>
                    <div class="cg-bar"><span>Life</span><i class="cg-track"><b class="cg-fill" data-fill="life"></b></i><b data-value="life">—</b></div>
                </div>
            </div>
            <div class="cg-section">Navigation</div>
            <nav class="cg-nav" data-main-nav></nav>
            <div class="cg-section">Quick access</div>
            <nav class="cg-nav" data-quick-nav></nav>
        </aside>

        <nav class="cg-bottom" data-bottom></nav>
    `;

    document.body.appendChild(root);

    nav.forEach(item => root.querySelector('[data-main-nav]').appendChild(link(item)));
    quick.forEach(item => root.querySelector('[data-quick-nav]').appendChild(link(item)));

    function active() {
        const path = location.pathname;
        root.querySelectorAll('.cg-nav a').forEach(a => {
            const href = (a.getAttribute('href') || '').split('?')[0];
            a.classList.toggle('active', href === '/' ? path === '/' : href === path);
        });
    }

    function text() {
        return (document.body.innerText || '').replace(/\s+/g, ' ').trim();
    }

    function sync() {
        const value = text();
        const name = value.match(/Name:\s*([^\n]+?)\s+Money:/i);
        const level = value.match(/Level:\s*(\d+)/i);
        const money = value.match(/Money:\s*\$?([\d,]+)/i);

        if (name) root.querySelector('.cg-name').textContent = name[1].trim();
        if (level) {
            root.querySelector('.cg-meta').textContent = `Level ${level[1]} · ${money ? '$' + money[1] : 'Online'}`;
        }

        [
            ['energy', /Energy:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['nerve', /Nerve:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['happy', /Happy:\s*([\d,]+)\s*\/\s*([\d,]+)/i],
            ['life', /Life:\s*([\d,]+)\s*\/\s*([\d,]+)/i]
        ].forEach(([key, regex]) => {
            const match = value.match(regex);
            if (!match) return;

            const current = Number(match[1].replace(/,/g, ''));
            const maximum = Number(match[2].replace(/,/g, ''));
            const percent = maximum ? Math.min(100, Math.max(0, current / maximum * 100)) : 0;

            root.querySelector(`[data-value="${key}"]`).textContent = `${match[1]}/${match[2]}`;
            root.querySelector(`[data-fill="${key}"]`).style.width = `${percent}%`;
        });
    }

    active();
    sync();

    let queued = false;
    new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            active();
            sync();
        });
    }).observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
