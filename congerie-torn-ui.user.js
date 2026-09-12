// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      6.0.0
// @description  Mobile-first Torn interface redesign for phones, tablets and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.__congerieTornMobileV600) return;
    window.__congerieTornMobileV600 = true;

    const MOBILE_QUERY = '(max-width: 900px)';
    const isMobile = () => window.matchMedia(MOBILE_QUERY).matches || /Torn PDA/i.test(navigator.userAgent || '');
    if (!isMobile()) return;

    const ROOT = 'cg-mobile-v600';
    const STYLE_ID = 'cg-mobile-v600-style';
    const BAR_ID = 'cg-mobile-command-v600';
    const NAV_ID = 'cg-mobile-nav-v600';

    const text = value => String(value ?? '').replace(/\s+/g, ' ').trim();
    const esc = value => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const css = `
html.${ROOT},html.${ROOT} body{
    min-width:0!important;
    max-width:100%!important;
    overflow-x:hidden!important;
    background:#080b0f!important;
    color:#e9eef3!important;
    color-scheme:dark!important;
}
html.${ROOT} body{
    margin:0!important;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;
    -webkit-text-size-adjust:100%;
}
html.${ROOT} *,html.${ROOT} *::before,html.${ROOT} *::after{box-sizing:border-box}
html.${ROOT} img,html.${ROOT} video,html.${ROOT} iframe{max-width:100%!important}
html.${ROOT} #${BAR_ID}{
    width:100%;
    min-height:50px;
    display:flex;
    align-items:center;
    gap:8px;
    padding:8px 10px;
    position:relative;
    z-index:20;
    background:linear-gradient(180deg,#111820,#0c1117);
    border-bottom:1px solid rgba(255,255,255,.08);
}
html.${ROOT} .cg-m-brand{
    flex:0 0 auto;
    display:flex;
    align-items:center;
    gap:8px;
    min-width:0;
    text-decoration:none!important;
    color:#f1f5f8!important;
}
html.${ROOT} .cg-m-mark{
    width:31px;height:31px;display:grid;place-items:center;
    border-radius:8px;
    background:rgba(94,168,255,.11);
    border:1px solid rgba(94,168,255,.24);
    color:#78b9ff;
    font-size:9px;font-weight:900;letter-spacing:.04em;
}
html.${ROOT} .cg-m-brand-text{min-width:0;line-height:1.05}
html.${ROOT} .cg-m-brand-text strong{display:block;font-size:11px;letter-spacing:.08em}
html.${ROOT} .cg-m-brand-text small{display:block;margin-top:3px;color:#667483;font-size:7px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
html.${ROOT} .cg-m-spacer{flex:1 1 auto;min-width:2px}
html.${ROOT} .cg-m-btn{
    flex:0 0 auto;
    width:34px;height:34px;
    display:grid;place-items:center;
    border:1px solid rgba(255,255,255,.08);
    border-radius:8px;
    background:#111820;
    color:#aeb9c4;
    font:700 15px/1 inherit;
    text-decoration:none!important;
    cursor:pointer;
    -webkit-tap-highlight-color:transparent;
}
html.${ROOT} .cg-m-btn:active{transform:scale(.96);background:#17212b}
html.${ROOT} #${NAV_ID}{
    width:100%;
    display:none;
    padding:8px 10px 10px;
    background:#0c1117;
    border-bottom:1px solid rgba(255,255,255,.08);
}
html.${ROOT} #${NAV_ID}.open{display:block}
html.${ROOT} .cg-m-nav-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
html.${ROOT} .cg-m-nav-grid a{
    min-height:38px;
    display:flex;align-items:center;gap:8px;
    padding:0 10px;
    border:1px solid rgba(255,255,255,.065);
    border-radius:8px;
    background:#10171e;
    color:#aeb8c2!important;
    text-decoration:none!important;
    font-size:10px;font-weight:700;
}
html.${ROOT} .cg-m-nav-grid a:active{background:#17212b;border-color:rgba(94,168,255,.22)}
html.${ROOT} .cg-m-nav-icon{width:18px;text-align:center;color:#6faef1;font-size:12px}
html.${ROOT} .cg-m-section-label{margin:2px 2px 6px;color:#536170;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
html.${ROOT} .cg-m-scroll-nav{
    width:100%;
    display:flex;
    gap:6px;
    overflow-x:auto;
    overscroll-behavior-x:contain;
    scrollbar-width:none;
    padding:7px 10px;
    background:#0b1015;
    border-bottom:1px solid rgba(255,255,255,.06);
}
html.${ROOT} .cg-m-scroll-nav::-webkit-scrollbar{display:none}
html.${ROOT} .cg-m-scroll-nav a{
    flex:0 0 auto;
    min-height:30px;
    display:flex;align-items:center;
    padding:0 11px;
    border:1px solid rgba(255,255,255,.07);
    border-radius:999px;
    background:#10171e;
    color:#8996a3!important;
    text-decoration:none!important;
    font-size:9px;font-weight:750;
    white-space:nowrap;
}
html.${ROOT} .cg-m-scroll-nav a.active{background:rgba(94,168,255,.12);border-color:rgba(94,168,255,.24);color:#dcecff!important}
html.${ROOT} #${BAR_ID}+#${NAV_ID}+ .cg-m-scroll-nav{}
html.${ROOT} .cg-m-page-title{
    margin:0 0 9px;
    padding:14px 12px 0;
}
html.${ROOT} .cg-m-page-title small{display:block;margin-bottom:4px;color:#596777;font-size:7px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
html.${ROOT} .cg-m-page-title h1{margin:0;color:#f0f4f7;font-size:20px;line-height:1.08;font-weight:800}
html.${ROOT} .cg-m-page-title p{margin:5px 0 0;color:#758291;font-size:10px;line-height:1.4}

/* Keep Torn's application structure intact. These rules only reshape visible content. */
html.${ROOT} #mainContainer,
html.${ROOT} #mainContainerWrap,
html.${ROOT} #container{
    width:100%!important;
    max-width:100%!important;
    min-width:0!important;
    margin-left:0!important;
    margin-right:0!important;
}
html.${ROOT} #mainContainerWrap,
html.${ROOT} #mainContainer,
html.${ROOT} #container{overflow:visible!important}
html.${ROOT} table{
    max-width:100%!important;
}
html.${ROOT} table:not(.torn-table):not([class*="table"]){
    width:100%!important;
}
html.${ROOT} input[type=text],html.${ROOT} input[type=search],html.${ROOT} input[type=number],html.${ROOT} input[type=password],html.${ROOT} select,html.${ROOT} textarea{
    max-width:100%!important;
    min-height:36px;
    border-radius:7px!important;
    background:#0d141b!important;
    border:1px solid rgba(255,255,255,.11)!important;
    color:#e9eef3!important;
    font-size:14px!important;
}
html.${ROOT} button,
html.${ROOT} input[type=button],
html.${ROOT} input[type=submit],
html.${ROOT} .button{
    min-height:36px;
    border-radius:7px!important;
    -webkit-tap-highlight-color:transparent;
}
html.${ROOT} a{-webkit-tap-highlight-color:transparent}

/* Common Torn panels become cleaner cards without changing their structure. */
html.${ROOT} .content-wrapper,
html.${ROOT} .content-box,
html.${ROOT} .panel,
html.${ROOT} .box,
html.${ROOT} .torn-box{
    max-width:100%!important;
}
html.${ROOT} .cg-mobile-card{
    margin:8px 10px;
    padding:12px;
    border:1px solid rgba(255,255,255,.07);
    border-radius:9px;
    background:#10171e;
}

@media(min-width:601px) and (max-width:900px){
    html.${ROOT} #${NAV_ID} .cg-m-nav-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    html.${ROOT} .cg-m-page-title{padding-left:16px;padding-right:16px}
}
@media(max-width:380px){
    html.${ROOT} #${BAR_ID}{padding-left:8px;padding-right:8px}
    html.${ROOT} .cg-m-brand-text{display:none}
    html.${ROOT} .cg-m-nav-grid{grid-template-columns:1fr 1fr}
    html.${ROOT} .cg-m-page-title h1{font-size:18px}
}
`;

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    function currentPage() {
        const path = location.pathname.toLowerCase();
        const map = [
            ['index.php', 'Home'],
            ['profile.php', 'Profile'],
            ['city.php', 'City'],
            ['items.php', 'Items'],
            ['market.php', 'Market'],
            ['factions.php', 'Faction'],
            ['joblist.php', 'Jobs'],
            ['education.php', 'Education'],
            ['travelagency.php', 'Travel'],
            ['forums.php', 'Forums'],
            ['messages.php', 'Messages'],
            ['missions.php', 'Missions'],
            ['attack.php', 'Battle'],
            ['loader.php', 'Battle'],
            ['gym.php', 'Gym']
        ];
        const hit = map.find(([needle]) => path.includes(needle));
        if (hit) return hit[1];
        const title = text(document.title.replace(/\s*-\s*Torn.*$/i, ''));
        return title || 'Torn';
    }

    function icon(label) {
        const k = label.toLowerCase();
        if (k.includes('home')) return '⌂';
        if (k.includes('profile')) return '●';
        if (k.includes('city')) return '⌖';
        if (k.includes('item')) return '▦';
        if (k.includes('battle') || k.includes('attack')) return '⚔';
        if (k.includes('market')) return '◇';
        if (k.includes('faction')) return '◆';
        if (k.includes('job')) return '▤';
        if (k.includes('education')) return '□';
        if (k.includes('travel')) return '✈';
        if (k.includes('mission')) return '✓';
        if (k.includes('forum')) return '☷';
        if (k.includes('message')) return '✉';
        if (k.includes('gym')) return '▲';
        return '•';
    }

    function findNativeNav() {
        const selectors = [
            '#sidebar',
            '.area-sidebar',
            '#mobile-menu',
            '.mobile-menu',
            '[class*="mobile-nav"]',
            '[class*="mobile-menu"]'
        ];
        for (const selector of selectors) {
            const node = document.querySelector(selector);
            if (node && node.querySelector('a[href]')) return node;
        }
        return null;
    }

    function collectLinks() {
        const native = findNativeNav();
        const roots = native ? [native] : [];
        const seen = new Set();
        const result = [];

        roots.forEach(root => {
            root.querySelectorAll('a[href]').forEach(a => {
                const label = text(a.textContent);
                const href = a.getAttribute('href');
                if (!label || !href || href.startsWith('javascript:') || label.length > 36) return;
                if (/^(logout|log out)$/i.test(label)) return;
                const absolute = new URL(href, location.href).href;
                if (seen.has(absolute)) return;
                seen.add(absolute);
                result.push({ label, href: absolute });
            });
        });

        const fallback = [
            ['Home', '/'],
            ['Profile', '/profile.php'],
            ['City', '/city.php'],
            ['Items', '/items.php'],
            ['Market', '/market.php'],
            ['Faction', '/factions.php'],
            ['Jobs', '/joblist.php'],
            ['Education', '/education.php'],
            ['Travel', '/travelagency.php'],
            ['Forums', '/forums.php'],
            ['Messages', '/messages.php'],
            ['Missions', '/missions.php']
        ];

        fallback.forEach(([label, href]) => {
            const absolute = new URL(href, location.origin).href;
            if (!seen.has(absolute)) result.push({ label, href: absolute });
        });

        return result.slice(0, 24);
    }

    function createBar() {
        if (document.getElementById(BAR_ID)) return document.getElementById(BAR_ID);

        const bar = document.createElement('div');
        bar.id = BAR_ID;
        bar.innerHTML = `
            <a class="cg-m-brand" href="/" aria-label="Congerie home">
                <span class="cg-m-mark">CG</span>
                <span class="cg-m-brand-text"><strong>CONGERIE</strong><small>Torn mobile</small></span>
            </a>
            <span class="cg-m-spacer"></span>
            <button class="cg-m-btn" type="button" data-cg-menu aria-label="Open navigation">☰</button>
            <a class="cg-m-btn" href="/" aria-label="Home">⌂</a>
        `;

        const anchor = findSafeInsertionPoint();
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor);
        else document.body.prepend(bar);

        return bar;
    }

    function findSafeInsertionPoint() {
        const candidates = [
            document.querySelector('#mainContainerWrap'),
            document.querySelector('#mainContainer'),
            document.querySelector('#container')
        ];
        return candidates.find(Boolean) || document.body.firstElementChild;
    }

    function createNav() {
        if (document.getElementById(NAV_ID)) return document.getElementById(NAV_ID);

        const nav = document.createElement('section');
        nav.id = NAV_ID;
        nav.setAttribute('aria-label', 'Congerie navigation');
        nav.innerHTML = '<div class="cg-m-section-label">Quick navigation</div><div class="cg-m-nav-grid"></div>';

        const grid = nav.querySelector('.cg-m-nav-grid');
        collectLinks().forEach(item => {
            const a = document.createElement('a');
            a.href = item.href;
            a.innerHTML = `<span class="cg-m-nav-icon">${esc(icon(item.label))}</span><span>${esc(item.label)}</span>`;
            grid.appendChild(a);
        });

        const bar = document.getElementById(BAR_ID);
        if (bar && bar.nextSibling) bar.parentNode.insertBefore(nav, bar.nextSibling);
        else if (bar) bar.parentNode.appendChild(nav);
        else document.body.prepend(nav);

        const button = bar?.querySelector('[data-cg-menu]');
        button?.addEventListener('click', () => nav.classList.toggle('open'));
        return nav;
    }

    function createScrollNav() {
        const id = 'cg-mobile-scroll-v600';
        if (document.getElementById(id)) return document.getElementById(id);

        const nav = document.createElement('nav');
        nav.id = id;
        nav.className = 'cg-m-scroll-nav';
        const links = collectLinks().slice(0, 12);
        const current = location.href.replace(/\/$/, '');

        links.forEach(item => {
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            if (item.href.replace(/\/$/, '') === current) a.classList.add('active');
            nav.appendChild(a);
        });

        const menu = document.getElementById(NAV_ID);
        if (menu?.nextSibling) menu.parentNode.insertBefore(nav, menu.nextSibling);
        else if (menu) menu.parentNode.appendChild(nav);
        return nav;
    }

    function createPageTitle() {
        const main = document.querySelector('#mainContainer') || document.querySelector('#mainContainerWrap') || document.querySelector('#container');
        if (!main || main.querySelector(':scope > .cg-m-page-title')) return;

        const title = currentPage();
        const block = document.createElement('div');
        block.className = 'cg-m-page-title';
        block.innerHTML = `<small>Congerie mobile</small><h1>${esc(title)}</h1>`;

        // Insert inside Torn's main container, never replace or move the container itself.
        main.insertBefore(block, main.firstChild);
    }

    function markRoot() {
        document.documentElement.classList.add(ROOT);
    }

    function removeDesktopArtifacts() {
        // If an older Congerie desktop shell exists from a previous version, remove only
        // our own nodes. Torn's native containers are never moved or deleted here.
        document.querySelectorAll('#cg-app-v5,#cg-app-v502,#cg-app-v501').forEach(node => node.remove());
        document.querySelectorAll('#cg-v5-style,#cg-v502-style,#cg-v501-style').forEach(node => node.remove());
    }

    function apply() {
        if (!document.body || !isMobile()) return;
        markRoot();
        injectStyle();
        removeDesktopArtifacts();
        createBar();
        createNav();
        createScrollNav();
        createPageTitle();
    }

    let scheduled = false;
    const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            apply();
        });
    };

    // Torn changes page content dynamically. Observe only for our insertion targets;
    // never mutate/reparent Torn nodes from the observer.
    const observer = new MutationObserver(mutations => {
        if (!isMobile()) return;
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            const changed = Array.from(mutation.addedNodes).some(node =>
                node.nodeType === 1 && !node.closest?.(`#${BAR_ID},#${NAV_ID},#cg-mobile-scroll-v600`)
            );
            if (changed) { schedule(); break; }
        }
    });

    function start() {
        apply();
        observer.observe(document.body, { childList: true, subtree: true });
        let lastPath = location.href;
        window.setInterval(() => {
            if (!isMobile()) return;
            if (location.href !== lastPath) {
                lastPath = location.href;
                window.setTimeout(schedule, 80);
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
