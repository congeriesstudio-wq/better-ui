// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      1.0.0
// @description  Modern dark/glass visual redesign for Torn PDA. Visual-only; no gameplay automation or external requests.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    const STYLE_ID = 'congerie-better-ui-style';
    const ROOT_ID = 'congerie-ui-controls';

    if (document.getElementById(STYLE_ID)) return;

    const css = `
        :root {
            --cg-bg: #0a0d12;
            --cg-surface: rgba(18, 23, 32, .88);
            --cg-surface-2: rgba(25, 31, 42, .92);
            --cg-border: rgba(255,255,255,.09);
            --cg-border-strong: rgba(255,255,255,.15);
            --cg-text: #eef2f7;
            --cg-muted: #9ba7b7;
            --cg-accent: #60a5fa;
            --cg-accent-2: #3b82f6;
            --cg-shadow: 0 16px 45px rgba(0,0,0,.32);
            --cg-radius: 14px;
        }

        html {
            background: var(--cg-bg) !important;
        }

        body {
            background:
                radial-gradient(circle at 15% -10%, rgba(59,130,246,.12), transparent 32%),
                radial-gradient(circle at 90% 0%, rgba(96,165,250,.07), transparent 28%),
                var(--cg-bg) !important;
            color: var(--cg-text) !important;
        }

        /* Common Torn surfaces */
        [class*="content"], [class*="panel"], [class*="box"], [class*="card"],
        [class*="profile"], [class*="page-title"], [class*="section"] {
            border-color: var(--cg-border) !important;
        }

        /* Cards/panels without relying on Torn's generated class suffixes */
        .content-wrapper, .content-wrapper > *, main, aside {
            --tw-ring-color: transparent;
        }

        button, input, textarea, select {
            font: inherit !important;
        }

        button, [role="button"], input[type="button"], input[type="submit"] {
            border-radius: 10px !important;
            transition: transform .15s ease, filter .15s ease, box-shadow .15s ease !important;
        }

        button:hover, [role="button"]:hover, input[type="button"]:hover, input[type="submit"]:hover {
            filter: brightness(1.08) !important;
        }

        button:active, [role="button"]:active {
            transform: translateY(1px) !important;
        }

        input, textarea, select {
            background: rgba(9, 13, 19, .78) !important;
            color: var(--cg-text) !important;
            border: 1px solid var(--cg-border-strong) !important;
            border-radius: 10px !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,.025) !important;
        }

        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: rgba(96,165,250,.7) !important;
            box-shadow: 0 0 0 3px rgba(96,165,250,.12) !important;
        }

        a {
            transition: color .15s ease, opacity .15s ease !important;
        }

        table {
            border-collapse: separate !important;
            border-spacing: 0 !important;
            overflow: hidden !important;
            border-radius: 12px !important;
            border: 1px solid var(--cg-border) !important;
            background: rgba(14,18,25,.72) !important;
        }

        th {
            background: rgba(255,255,255,.045) !important;
            color: #cbd5e1 !important;
        }

        td, th {
            border-color: var(--cg-border) !important;
        }

        /* Scrollbars */
        * {
            scrollbar-width: thin;
            scrollbar-color: rgba(148,163,184,.35) transparent;
        }

        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb {
            background: rgba(148,163,184,.30);
            border-radius: 99px;
        }
        *::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,.48); }

        /* Congerie floating control */
        #${ROOT_ID} {
            position: fixed;
            right: 14px;
            bottom: 14px;
            z-index: 2147483647;
            font-family: Arial, Helvetica, sans-serif;
        }

        #${ROOT_ID} .cg-toggle {
            width: 44px;
            height: 44px;
            border: 1px solid rgba(96,165,250,.35);
            border-radius: 50%;
            background: rgba(15, 20, 29, .92);
            color: var(--cg-accent);
            box-shadow: var(--cg-shadow);
            cursor: pointer;
            font-weight: 800;
            font-size: 13px;
            backdrop-filter: blur(12px);
        }

        #${ROOT_ID} .cg-toggle:hover {
            box-shadow: 0 0 0 4px rgba(96,165,250,.10), var(--cg-shadow);
        }

        #${ROOT_ID} .cg-menu {
            display: none;
            position: absolute;
            right: 0;
            bottom: 54px;
            width: 220px;
            padding: 14px;
            border: 1px solid var(--cg-border-strong);
            border-radius: var(--cg-radius);
            background: rgba(12, 17, 25, .94);
            box-shadow: var(--cg-shadow);
            backdrop-filter: blur(18px);
        }

        #${ROOT_ID}.open .cg-menu { display: block; }

        #${ROOT_ID} .cg-title {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #dbeafe;
            margin-bottom: 10px;
        }

        #${ROOT_ID} .cg-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin: 9px 0;
            color: var(--cg-muted);
            font-size: 12px;
        }

        #${ROOT_ID} .cg-row button {
            border: 1px solid var(--cg-border-strong);
            background: rgba(255,255,255,.055);
            color: #e5e7eb;
            padding: 6px 9px;
            cursor: pointer;
        }

        #${ROOT_ID} .cg-row button.active {
            background: rgba(96,165,250,.16);
            border-color: rgba(96,165,250,.45);
            color: #bfdbfe;
        }

        #${ROOT_ID} .cg-note {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid var(--cg-border);
            color: #64748b;
            font-size: 10px;
            line-height: 1.45;
        }

        html.cg-compact * { line-height: 1.18 !important; }
        html.cg-compact button, html.cg-compact input, html.cg-compact select { min-height: 30px !important; }
    `;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);

    const controls = document.createElement('div');
    controls.id = ROOT_ID;
    controls.innerHTML = `
        <div class="cg-menu">
            <div class="cg-title">Congerie UI</div>
            <div class="cg-row">
                <span>Compact mode</span>
                <button type="button" id="cg-compact">Off</button>
            </div>
            <div class="cg-row">
                <span>Accent</span>
                <button type="button" id="cg-accent">Blue</button>
            </div>
            <div class="cg-note">Visual changes only. No gameplay automation or external requests.</div>
        </div>
        <button type="button" class="cg-toggle" aria-label="Open Congerie UI settings">CG</button>
    `;

    const mount = () => {
        if (!document.body || document.getElementById(ROOT_ID)) return;
        document.body.appendChild(controls);

        const toggle = controls.querySelector('.cg-toggle');
        toggle.addEventListener('click', () => controls.classList.toggle('open'));

        const compactButton = controls.querySelector('#cg-compact');
        compactButton.addEventListener('click', () => {
            const enabled = document.documentElement.classList.toggle('cg-compact');
            compactButton.textContent = enabled ? 'On' : 'Off';
            compactButton.classList.toggle('active', enabled);
            try { localStorage.setItem('cg-compact', enabled ? '1' : '0'); } catch (_) {}
        });

        const accentButton = controls.querySelector('#cg-accent');
        accentButton.addEventListener('click', () => {
            const root = document.documentElement;
            const current = root.style.getPropertyValue('--cg-accent').trim();
            const next = current === '#a78bfa' ? '#34d399' : current === '#34d399' ? '#60a5fa' : '#a78bfa';
            const name = next === '#a78bfa' ? 'Purple' : next === '#34d399' ? 'Green' : 'Blue';
            root.style.setProperty('--cg-accent', next);
            root.style.setProperty('--cg-accent-2', next);
            accentButton.textContent = name;
        });

        try {
            if (localStorage.getItem('cg-compact') === '1') {
                document.documentElement.classList.add('cg-compact');
                compactButton.textContent = 'On';
                compactButton.classList.add('active');
            }
        } catch (_) {}
    };

    if (document.body) mount();
    else window.addEventListener('DOMContentLoaded', mount, { once: true });

    // Torn is a dynamic app, so keep only our mount point alive if the page rerenders.
    const observer = new MutationObserver(() => {
        if (!document.getElementById(ROOT_ID) && document.body) {
            document.body.appendChild(controls);
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
