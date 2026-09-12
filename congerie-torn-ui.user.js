// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      1.1.0
// @description  Adaptive dark visual redesign for Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    const STYLE_ID = 'congerie-better-ui-style';
    const ROOT_ID = 'congerie-ui';
    const STORAGE = 'congerie-better-ui';

    if (document.getElementById(STYLE_ID)) return;

    const state = {
        compact: false,
        accent: 'blue',
        navOpen: false,
    };

    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE) || '{}');
        state.compact = saved.compact === true;
        state.accent = ['blue', 'violet', 'green'].includes(saved.accent) ? saved.accent : 'blue';
    } catch (_) {}

    const css = `
        :root {
            --cg-bg: #0b0e13;
            --cg-bg-soft: #0f131a;
            --cg-panel: #131820;
            --cg-panel-2: #171d26;
            --cg-panel-3: #1b222d;
            --cg-border: rgba(255,255,255,.075);
            --cg-border-strong: rgba(255,255,255,.12);
            --cg-text: #f1f5f9;
            --cg-text-2: #c4ccd7;
            --cg-muted: #8793a3;
            --cg-accent: #5da7ff;
            --cg-accent-soft: rgba(93,167,255,.13);
            --cg-accent-border: rgba(93,167,255,.32);
            --cg-success: #55c98a;
            --cg-warning: #e6b65b;
            --cg-danger: #ef7373;
            --cg-radius: 11px;
            --cg-radius-sm: 8px;
            --cg-shadow: 0 12px 35px rgba(0,0,0,.20);
            --cg-content-max: 1220px;
        }

        html.cg-accent-violet { --cg-accent:#a78bfa; --cg-accent-soft:rgba(167,139,250,.13); --cg-accent-border:rgba(167,139,250,.32); }
        html.cg-accent-green { --cg-accent:#55c98a; --cg-accent-soft:rgba(85,201,138,.13); --cg-accent-border:rgba(85,201,138,.32); }

        html {
            background: var(--cg-bg) !important;
            color-scheme: dark;
        }

        body {
            background: var(--cg-bg) !important;
            color: var(--cg-text) !important;
        }

        /* Keep Torn's own layout intact; this layer improves its surfaces instead of replacing functionality. */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: -1;
            background:
                radial-gradient(900px 500px at 15% -10%, rgba(93,167,255,.055), transparent 65%),
                radial-gradient(700px 450px at 100% 0%, rgba(255,255,255,.025), transparent 65%);
        }

        /* Typography */
        body, button, input, textarea, select {
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }

        /* Common surfaces. Deliberately avoids generated CSS-module class names. */
        [class*="content"] > *,
        [class*="panel"] > *,
        [class*="box"] > *,
        [class*="card"] > * {
            box-sizing: border-box;
        }

        /* Buttons */
        button,
        input[type="button"],
        input[type="submit"],
        input[type="reset"],
        [role="button"] {
            border-radius: var(--cg-radius-sm) !important;
            transition: background .14s ease, border-color .14s ease, color .14s ease, transform .12s ease, filter .14s ease !important;
        }

        button:hover,
        input[type="button"]:hover,
        input[type="submit"]:hover,
        [role="button"]:hover {
            filter: brightness(1.07);
        }

        button:active,
        input[type="button"]:active,
        input[type="submit"]:active,
        [role="button"]:active {
            transform: translateY(1px);
        }

        /* Forms */
        input:not([type="checkbox"]):not([type="radio"]),
        textarea,
        select {
            background: #0d1117 !important;
            color: var(--cg-text) !important;
            border: 1px solid var(--cg-border-strong) !important;
            border-radius: var(--cg-radius-sm) !important;
            box-shadow: none !important;
        }

        input:not([type="checkbox"]):not([type="radio"]):focus,
        textarea:focus,
        select:focus {
            outline: none !important;
            border-color: var(--cg-accent-border) !important;
            box-shadow: 0 0 0 3px var(--cg-accent-soft) !important;
        }

        /* Tables */
        table {
            border-collapse: separate !important;
            border-spacing: 0 !important;
            border: 1px solid var(--cg-border) !important;
            border-radius: var(--cg-radius) !important;
            overflow: hidden !important;
            background: var(--cg-panel) !important;
        }

        table th {
            background: #181e27 !important;
            color: var(--cg-text-2) !important;
            font-weight: 650 !important;
        }

        table td,
        table th {
            border-color: var(--cg-border) !important;
        }

        table tbody tr:hover {
            background: rgba(255,255,255,.018) !important;
        }

        /* Links */
        a {
            transition: color .14s ease, opacity .14s ease !important;
        }

        /* Scrollbars */
        * { scrollbar-width: thin; scrollbar-color: #343d4a transparent; }
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: #343d4a; border-radius: 99px; }
        *::-webkit-scrollbar-thumb:hover { background: #475466; }

        /* Congerie shell */
        #${ROOT_ID} {
            position: fixed;
            inset: 0;
            z-index: 2147483000;
            pointer-events: none;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        #${ROOT_ID} * { box-sizing: border-box; }

        #${ROOT_ID} .cg-sidebar {
            position: fixed;
            top: 12px;
            left: 12px;
            bottom: 12px;
            width: 196px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            background: rgba(15,19,25,.96);
            border: 1px solid var(--cg-border);
            border-radius: 14px;
            box-shadow: var(--cg-shadow);
            pointer-events: auto;
            transform: translateX(0);
            transition: transform .2s ease;
            overflow: hidden;
        }

        #${ROOT_ID} .cg-brand {
            height: 48px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 8px;
            margin-bottom: 8px;
        }

        #${ROOT_ID} .cg-mark {
            width: 30px;
            height: 30px;
            display: grid;
            place-items: center;
            border: 1px solid var(--cg-accent-border);
            border-radius: 9px;
            background: var(--cg-accent-soft);
            color: var(--cg-accent);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: -.04em;
        }

        #${ROOT_ID} .cg-brand-name {
            color: #f8fafc;
            font-size: 13px;
            font-weight: 750;
            letter-spacing: -.01em;
        }

        #${ROOT_ID} .cg-brand-sub {
            color: #657184;
            font-size: 9px;
            margin-top: 2px;
        }

        #${ROOT_ID} .cg-nav-label {
            padding: 8px 8px 5px;
            color: #566274;
            font-size: 9px;
            font-weight: 750;
            letter-spacing: .10em;
            text-transform: uppercase;
        }

        #${ROOT_ID} .cg-nav {
            display: flex;
            flex-direction: column;
            gap: 3px;
            overflow: auto;
            padding-right: 2px;
        }

        #${ROOT_ID} .cg-nav a {
            display: flex;
            align-items: center;
            gap: 9px;
            min-height: 34px;
            padding: 0 9px;
            color: #9ca8b8;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
        }

        #${ROOT_ID} .cg-nav a:hover,
        #${ROOT_ID} .cg-nav a.cg-active {
            color: #edf4fc;
            background: var(--cg-accent-soft);
            border-color: rgba(255,255,255,.035);
        }

        #${ROOT_ID} .cg-nav a.cg-active::after {
            content: '';
            width: 3px;
            height: 15px;
            margin-left: auto;
            border-radius: 99px;
            background: var(--cg-accent);
        }

        #${ROOT_ID} .cg-icon {
            width: 17px;
            color: #6f7c8d;
            text-align: center;
            font-size: 11px;
            font-weight: 800;
        }

        #${ROOT_ID} .cg-nav a:hover .cg-icon,
        #${ROOT_ID} .cg-nav a.cg-active .cg-icon { color: var(--cg-accent); }

        #${ROOT_ID} .cg-spacer { flex: 1; }

        #${ROOT_ID} .cg-footer {
            padding-top: 10px;
            border-top: 1px solid var(--cg-border);
        }

        #${ROOT_ID} .cg-settings {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 8px 9px;
            border: 1px solid transparent;
            border-radius: 8px;
            background: transparent;
            color: #8b98a9;
            cursor: pointer;
            text-align: left;
            font-size: 11px;
        }

        #${ROOT_ID} .cg-settings:hover {
            color: #eef2f7;
            background: rgba(255,255,255,.035);
        }

        #${ROOT_ID} .cg-settings-panel {
            display: none;
            position: fixed;
            left: 220px;
            bottom: 12px;
            width: 270px;
            padding: 15px;
            background: rgba(15,19,25,.98);
            border: 1px solid var(--cg-border-strong);
            border-radius: 13px;
            box-shadow: var(--cg-shadow);
        }

        #${ROOT_ID}.cg-settings-open .cg-settings-panel { display: block; }

        #${ROOT_ID} .cg-panel-title {
            color: #f1f5f9;
            font-size: 12px;
            font-weight: 750;
        }

        #${ROOT_ID} .cg-panel-sub {
            margin-top: 3px;
            color: #687588;
            font-size: 10px;
            line-height: 1.4;
        }

        #${ROOT_ID} .cg-setting {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 14px;
            color: #aab5c3;
            font-size: 11px;
        }

        #${ROOT_ID} .cg-setting button {
            min-width: 56px;
            padding: 6px 8px;
            border: 1px solid var(--cg-border-strong);
            background: #181e27;
            color: #dce3ec;
            cursor: pointer;
        }

        #${ROOT_ID} .cg-setting button.cg-on {
            border-color: var(--cg-accent-border);
            background: var(--cg-accent-soft);
            color: var(--cg-accent);
        }

        #${ROOT_ID} .cg-mobile-button {
            display: none;
            position: fixed;
            top: 10px;
            left: 10px;
            width: 38px;
            height: 38px;
            border: 1px solid var(--cg-border-strong);
            border-radius: 10px;
            background: rgba(15,19,25,.95);
            color: var(--cg-accent);
            cursor: pointer;
            pointer-events: auto;
        }

        /* Give Torn's main content breathing room on wider screens without changing its DOM. */
        @media (min-width: 900px) {
            body.cg-shell-active #mainContainer,
            body.cg-shell-active #mainContainerWrap,
            body.cg-shell-active .content-wrapper {
                margin-left: 216px !important;
            }
        }

        @media (max-width: 899px) {
            #${ROOT_ID} .cg-sidebar {
                top: 8px;
                left: 8px;
                bottom: 8px;
                width: 210px;
                transform: translateX(-230px);
            }
            #${ROOT_ID}.cg-nav-open .cg-sidebar { transform: translateX(0); }
            #${ROOT_ID} .cg-mobile-button { display: grid; place-items: center; }
            #${ROOT_ID} .cg-settings-panel { left: 8px; bottom: 58px; width: min(270px, calc(100vw - 16px)); }
            body.cg-shell-active #mainContainer,
            body.cg-shell-active #mainContainerWrap,
            body.cg-shell-active .content-wrapper {
                margin-left: 0 !important;
            }
        }

        @media (max-width: 520px) {
            #${ROOT_ID} .cg-sidebar { width: min(260px, calc(100vw - 16px)); }
        }

        html.cg-compact #${ROOT_ID} .cg-sidebar { width: 178px; }
        html.cg-compact #${ROOT_ID} .cg-nav a { min-height: 30px; font-size: 10px; }
        html.cg-compact #${ROOT_ID} .cg-brand { height: 42px; }

        /* Page-aware polish. These classes let later page modules target pages safely. */
        body.cg-page-home .content-wrapper,
        body.cg-page-profile .content-wrapper,
        body.cg-page-city .content-wrapper,
        body.cg-page-items .content-wrapper,
        body.cg-page-faction .content-wrapper,
        body.cg-page-market .content-wrapper {
            color: var(--cg-text);
        }
    `;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);

    function pageInfo() {
        const path = location.pathname.toLowerCase();
        const map = [
            ['/profiles.php', ['profile', 'Profile', '♙']],
            ['/city.php', ['city', 'City', '⌂']],
            ['/item.php', ['items', 'Items', '▣']],
            ['/factions.php', ['faction', 'Faction', '◆']],
            ['/hospitalview.php', ['hospital', 'Hospital', '＋']],
            ['/jailview.php', ['jail', 'Jail', '▥']],
            ['/joblist.php', ['job', 'Job', '▤']],
            ['/market/', ['market', 'Market', '$']],
            ['/loader.php', ['battle', 'Battle', '⚔']],
            ['/forums.php', ['forums', 'Forums', '☷']],
            ['/properties.php', ['property', 'Property', '⌂']],
            ['/education.php', ['education', 'Education', '▤']],
            ['/messages.php', ['messages', 'Messages', '✉']],
        ];
        const found = map.find(([prefix]) => path.startsWith(prefix));
        return found ? { key: found[0], label: found[1], icon: found[2] } : { key: 'home', label: 'Home', icon: '◆' };
    }

    function save() {
        try { localStorage.setItem(STORAGE, JSON.stringify({ compact: state.compact, accent: state.accent })); } catch (_) {}
    }

    function navItem(href, label, icon, key) {
        const active = pageInfo().key === key ? ' cg-active' : '';
        return `<a class="${active}" href="${href}" data-cg-key="${key}"><span class="cg-icon">${icon}</span><span>${label}</span></a>`;
    }

    function buildShell() {
        if (!document.body || document.getElementById(ROOT_ID)) return;

        const root = document.createElement('div');
        root.id = ROOT_ID;
        root.innerHTML = `
            <button class="cg-mobile-button" type="button" aria-label="Open navigation">☰</button>
            <aside class="cg-sidebar" aria-label="Congerie navigation">
                <div class="cg-brand">
                    <div class="cg-mark">CG</div>
                    <div>
                        <div class="cg-brand-name">Congerie</div>
                        <div class="cg-brand-sub">Better UI</div>
                    </div>
                </div>

                <div class="cg-nav-label">Navigate</div>
                <nav class="cg-nav">
                    ${navItem('/index.php', 'Home', '◆', 'home')}
                    ${navItem('/profiles.php', 'Profile', '♙', 'profile')}
                    ${navItem('/city.php', 'City', '⌂', 'city')}
                    ${navItem('/item.php', 'Items', '▣', 'items')}
                    ${navItem('/factions.php', 'Faction', '◆', 'faction')}
                    ${navItem('/joblist.php', 'Job', '▤', 'job')}
                    ${navItem('/hospitalview.php', 'Hospital', '＋', 'hospital')}
                    ${navItem('/jailview.php', 'Jail', '▥', 'jail')}
                    ${navItem('/market/', 'Market', '$', 'market')}
                    ${navItem('/education.php', 'Education', '▤', 'education')}
                    ${navItem('/messages.php', 'Messages', '✉', 'messages')}
                    ${navItem('/forums.php', 'Forums', '☷', 'forums')}
                </nav>

                <div class="cg-spacer"></div>
                <div class="cg-footer">
                    <button class="cg-settings" type="button"><span class="cg-icon">⚙</span><span>Interface settings</span></button>
                </div>
            </aside>

            <section class="cg-settings-panel" aria-label="Congerie settings">
                <div class="cg-panel-title">Interface</div>
                <div class="cg-panel-sub">Personalize the visual layer without changing Torn's functionality.</div>
                <div class="cg-setting"><span>Compact mode</span><button type="button" data-cg-action="compact"></button></div>
                <div class="cg-setting"><span>Accent</span><button type="button" data-cg-action="accent"></button></div>
            </section>
        `;

        document.body.appendChild(root);
        document.body.classList.add('cg-shell-active', `cg-page-${pageInfo().key}`);

        root.querySelector('.cg-mobile-button').addEventListener('click', () => {
            state.navOpen = !state.navOpen;
            root.classList.toggle('cg-nav-open', state.navOpen);
        });

        root.querySelector('.cg-settings').addEventListener('click', () => {
            root.classList.toggle('cg-settings-open');
        });

        root.querySelector('[data-cg-action="compact"]').addEventListener('click', () => {
            state.compact = !state.compact;
            applyState();
        });

        root.querySelector('[data-cg-action="accent"]').addEventListener('click', () => {
            state.accent = state.accent === 'blue' ? 'violet' : state.accent === 'violet' ? 'green' : 'blue';
            applyState();
        });

        applyState();
    }

    function applyState() {
        const html = document.documentElement;
        html.classList.toggle('cg-compact', state.compact);
        html.classList.toggle('cg-accent-violet', state.accent === 'violet');
        html.classList.toggle('cg-accent-green', state.accent === 'green');

        const root = document.getElementById(ROOT_ID);
        if (!root) return;

        const compact = root.querySelector('[data-cg-action="compact"]');
        const accent = root.querySelector('[data-cg-action="accent"]');
        if (compact) {
            compact.textContent = state.compact ? 'On' : 'Off';
            compact.classList.toggle('cg-on', state.compact);
        }
        if (accent) {
            accent.textContent = state.accent[0].toUpperCase() + state.accent.slice(1);
            accent.classList.toggle('cg-on', true);
        }
        save();
    }

    function init() {
        buildShell();
    }

    if (document.body) init();
    else window.addEventListener('DOMContentLoaded', init, { once: true });

    // Torn is a dynamic application. Recreate only our shell if Torn replaces the body contents.
    const observer = new MutationObserver(() => {
        if (!document.getElementById(ROOT_ID) && document.body) init();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
