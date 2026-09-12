// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      5.0.2
// @description  Responsive Torn interface redesign with a safe native mode for mobile and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';

    if (window.__congerieTornUIv502) return;
    window.__congerieTornUIv502 = true;

    /*
     * Mobile/PDA safety rule:
     * Torn PDA and Torn mobile use a different DOM/navigation lifecycle than desktop.
     * Never move #mainContainer, hide Torn's native chrome, or add a fixed navigation
     * layer on those layouts. Doing so can break Torn's internal page navigation.
     * Desktop keeps the Congerie shell; mobile/PDA stays native until a dedicated
     * PDA adapter is implemented against its actual DOM.
     */
    const isMobile = () => {
        const ua = navigator.userAgent || '';
        return window.matchMedia('(max-width: 800px)').matches || /Torn PDA/i.test(ua);
    };

    if (isMobile()) return;

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
        const result = [];
        selectors.forEach(selector => root.querySelectorAll(selector).forEach(node => {
            if (!seen.has(node)) { seen.add(node); result.push(node); }
        }));
        return result;
    };

    const text = value => String(value || '').replace(/\s+/g, ' ').trim();
    const esc = value => String(value ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    const css = `
:root{--cg-bg:#080b0f;--cg-panel:#111820;--cg-panel2:#151e27;--cg-border:rgba(255,255,255,.075);--cg-strong:rgba(255,255,255,.13);--cg-text:#edf2f6;--cg-muted:#788695;--cg-accent:#5ea8ff;--cg-soft:rgba(94,168,255,.12);--cg-header:56px;--cg-sidebar:244px}
html.cg-v502,html.cg-v502 body{min-width:0!important;margin:0!important;padding:0!important;background:var(--cg-bg)!important;color:var(--cg-text)!important;color-scheme:dark}
html.cg-v502 body{overflow-x:hidden!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif!important;background:linear-gradient(180deg,#0b1016,#080b0f 74%)!important}
#cg-app-v502,#cg-app-v502 *{box-sizing:border-box}
#cg-app-v502{min-height:100vh;display:grid;grid-template-columns:var(--cg-sidebar) minmax(0,1fr);grid-template-rows:var(--cg-header) minmax(0,1fr);grid-template-areas:"header header" "side main"}
.cg502-header{grid-area:header;height:var(--cg-header);display:flex;align-items:center;gap:12px;padding:0 16px;position:sticky;top:0;z-index:500;background:rgba(8,11,15,.97);border-bottom:1px solid var(--cg-strong);backdrop-filter:blur(12px)}
.cg502-brand{width:190px;flex:0 0 190px;display:flex;align-items:center;gap:9px;color:var(--cg-text);text-decoration:none}.cg502-mark{width:31px;height:31px;display:grid;place-items:center;border:1px solid rgba(94,168,255,.32);border-radius:8px;background:var(--cg-soft);color:var(--cg-accent);font-size:9px;font-weight:900}.cg502-brand strong{font-size:12px;letter-spacing:.05em}.cg502-brand small{display:block;margin-top:3px;color:var(--cg-muted);font-size:7px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.cg502-title{min-width:0;overflow:hidden;color:#c8d1da;font-size:11px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}.cg502-spacer{flex:1}.cg502-search{width:min(310px,28vw);height:34px;display:flex;align-items:center;gap:7px;padding:0 10px;border:1px solid var(--cg-border);border-radius:8px;background:#0c1218;color:var(--cg-muted)}.cg502-search input{width:100%;min-width:0;border:0!important;outline:0!important;background:transparent!important;color:var(--cg-text)!important;font-size:11px!important}.cg502-icon{width:34px;height:34px;border:1px solid transparent;border-radius:8px;background:transparent;color:#8996a4;cursor:pointer}
.cg502-side{grid-area:side;min-height:0;height:calc(100vh - var(--cg-header));position:sticky;top:var(--cg-header);overflow:auto;padding:12px 10px 18px;background:#0b1015;border-right:1px solid var(--cg-border)}.cg502-player{padding:12px;border:1px solid var(--cg-border);border-radius:9px;background:linear-gradient(145deg,#151e27,#10161d)}.cg502-head{display:flex;align-items:center;gap:9px}.cg502-avatar{width:38px;height:38px;display:grid;place-items:center;overflow:hidden;border-radius:9px;background:#23313e;color:#e9f0f5;font-size:11px;font-weight:900}.cg502-avatar img{width:100%;height:100%;object-fit:cover}.cg502-copy{min-width:0}.cg502-name{overflow:hidden;color:#f0f4f7;font-size:11px;font-weight:800;text-overflow:ellipsis;white-space:nowrap}.cg502-meta{margin-top:3px;color:var(--cg-muted);font-size:8px}.cg502-money{margin-left:auto;color:#d5dde5;font-size:8px;white-space:nowrap}.cg502-nav-title{margin:17px 7px 7px;color:#536170;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}.cg502-nav{display:grid;gap:2px}.cg502-nav a{min-height:34px;display:flex;align-items:center;gap:9px;padding:0 9px;border:1px solid transparent;border-radius:7px;color:#95a1ae;text-decoration:none;font-size:10px;font-weight:650}.cg502-nav a:hover{color:#fff;background:rgba(255,255,255,.04)}.cg502-nav a.active{color:#f3f7fa;background:var(--cg-soft);border-color:rgba(94,168,255,.14)}.cg502-nav-icon{width:18px;flex:0 0 18px;color:#6c7987;text-align:center;font-size:12px}
.cg502-main{grid-area:main;min-width:0;padding:20px clamp(14px,2.5vw,36px) 28px}.cg502-content{width:min(100%,1500px);min-width:0;margin:0 auto}.cg502-pagebar{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:15px}.cg502-pagebar small{display:block;margin-bottom:5px;color:var(--cg-muted);font-size:8px;font-weight:850;letter-spacing:.13em;text-transform:uppercase}.cg502-pagebar h1{margin:0;color:#f2f5f8;font-size:clamp(20px,2vw,27px);line-height:1.05;font-weight:780}.cg502-pagebar p{margin:6px 0 0;color:var(--cg-muted);font-size:10px}
html.cg-v502 #cg-content-v502{width:100%;min-width:0}html.cg-v502 #cg-content-v502> #mainContainer,html.cg-v502 #cg-content-v502> #mainContainerWrap,html.cg-v502 #cg-content-v502> #container{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;padding:0!important;background:transparent!important}html.cg-v502 #cg-content-v502 img{max-width:100%}html.cg-v502 #cg-content-v502 a{color:#8bc2ff}html.cg-v502 #cg-content-v502 table{width:100%!important;max-width:100%;border-collapse:separate!important;border-spacing:0!important;overflow:hidden;background:var(--cg-panel)!important;border:1px solid var(--cg-border)!important;border-radius:9px!important}html.cg-v502 #cg-content-v502 th{padding:9px 11px!important;background:var(--cg-panel2)!important;color:#cbd5de!important;border-color:var(--cg-border)!important;font-size:9px!important;text-align:left}html.cg-v502 #cg-content-v502 td{padding:9px 11px!important;background:transparent!important;color:#bec8d1!important;border-color:var(--cg-border)!important;font-size:10px!important}html.cg-v502 #cg-content-v502 input:not([type=checkbox]):not([type=radio]),html.cg-v502 #cg-content-v502 select,html.cg-v502 #cg-content-v502 textarea{max-width:100%;padding:7px 10px!important;background:#0b1117!important;color:var(--cg-text)!important;border:1px solid var(--cg-strong)!important;border-radius:7px!important;box-shadow:none!important}
@media(max-width:1050px){:root{--cg-sidebar:215px}.cg502-brand{width:170px;flex-basis:170px}.cg502-search{width:min(260px,25vw)}}
`;

    function injectStyle() {
        if (document.getElementById('cg-v502-style')) return;
        const style = document.createElement('style');
        style.id = 'cg-v502-style';
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    function getHeader(){return first(SELECTORS.header)}
    function getSidebar(){return first(SELECTORS.sidebar)}
    function getMain(){
        const direct=document.querySelector('#mainContainer'); if(direct)return direct;
        const wrapped=document.querySelector('#mainContainerWrap'); if(wrapped)return wrapped;
        const generic=document.querySelector('#container'); if(!generic)return null;
        const header=getHeader(),sidebar=getSidebar();
        if(generic===document.body||generic.contains(header)||generic.contains(sidebar))return null;
        return generic;
    }

    function pageName(){
        const p=location.pathname.toLowerCase();
        const map=[['index.php','Dashboard'],['profile.php','Profile'],['city.php','City'],['items.php','Items'],['market.php','Market'],['factions.php','Faction'],['joblist.php','Jobs'],['education.php','Education'],['travelagency.php','Travel'],['forums.php','Forums'],['messages.php','Messages'],['missions.php','Missions']];
        const hit=map.find(([x])=>p.includes(x));
        return hit?hit[1]:(text(document.title.replace(/\s*-\s*Torn.*$/i,''))||'Torn');
    }

    function icon(label){const k=label.toLowerCase();if(k.includes('home')||k.includes('dashboard'))return'⌂';if(k.includes('profile'))return'●';if(k.includes('city'))return'⌖';if(k.includes('item'))return'▦';if(k.includes('battle')||k.includes('attack'))return'⚔';if(k.includes('market'))return'◇';if(k.includes('faction'))return'◆';if(k.includes('job'))return'▤';if(k.includes('education'))return'□';if(k.includes('travel'))return'✈';if(k.includes('mission'))return'✓';if(k.includes('forum'))return'☷';if(k.includes('message'))return'✉';return'•'}

    function navLinks(){
        const side=getSidebar(); if(!side)return[];
        const seen=new Set(),out=[];
        side.querySelectorAll('a[href]').forEach(a=>{const label=text(a.textContent),href=a.getAttribute('href');if(!label||!href||href.startsWith('javascript:')||label.length>42)return;const absolute=new URL(href,location.href).href;if(seen.has(absolute))return;seen.add(absolute);out.push({label,href:absolute})});
        return out;
    }

    function makeNav(items){
        const nav=document.createElement('nav');nav.className='cg502-nav';
        items.forEach(item=>{const a=document.createElement('a');a.href=item.href;a.dataset.cgLabel=item.label.toLowerCase();a.innerHTML=`<span class="cg502-nav-icon">${esc(icon(item.label))}</span><span>${esc(item.label)}</span>`;nav.appendChild(a)});
        return nav;
    }

    function playerCard(){
        const side=getSidebar();if(!side)return'';
        const lines=(side.innerText||'').split(/\n+/).map(text).filter(Boolean);
        const value=label=>{const i=lines.findIndex(x=>x.toLowerCase()===label.toLowerCase());return i>=0?(lines[i+1]||''):''};
        const name=value('Name')||'Player',level=value('Level'),money=value('Money');
        const img=side.querySelector('img');
        const avatar=img?.src?`<img src="${esc(img.src)}" alt="">`:esc(name.slice(0,2).toUpperCase());
        return `<section class="cg502-player"><div class="cg502-head"><div class="cg502-avatar">${avatar}</div><div class="cg502-copy"><div class="cg502-name">${esc(name)}</div><div class="cg502-meta">${esc(level?`Level ${level}`:'Torn player')}</div></div>${money?`<span class="cg502-money">${esc(money)}</span>`:''}</div></section>`;
    }

    function shell(){
        if(document.getElementById('cg-app-v502'))return document.getElementById('cg-app-v502');
        const app=document.createElement('div');app.id='cg-app-v502';
        app.innerHTML=`<header class="cg502-header"><a class="cg502-brand" href="/"><span class="cg502-mark">CG</span><span><strong>CONGERIE</strong><small>Torn interface</small></span></a><div class="cg502-title" data-cg-title></div><div class="cg502-spacer"></div><label class="cg502-search">⌕<input type="search" placeholder="Filter navigation" autocomplete="off"></label><button class="cg502-icon" type="button" data-cg-reload aria-label="Reload">↻</button></header><aside class="cg502-side"></aside><main class="cg502-main"><div class="cg502-content" id="cg-content-v502"></div></main>`;
        document.body.prepend(app);
        app.querySelector('[data-cg-reload]').addEventListener('click',()=>location.reload());
        app.querySelector('input').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();app.querySelectorAll('.cg502-nav a').forEach(a=>a.hidden=Boolean(q)&&!a.dataset.cgLabel.includes(q))});
        return app;
    }

    function moveMain(){
        const content=document.getElementById('cg-content-v502'),main=getMain();
        if(!content||!main)return false;
        if(main===content||content.contains(main))return true;
        content.replaceChildren(main);
        return true;
    }

    function render(){
        const app=shell(),side=app.querySelector('.cg502-side'),items=navLinks();
        side.innerHTML=playerCard()+`<div class="cg502-nav-title">Navigation</div>`;
        side.appendChild(makeNav(items));
        app.querySelectorAll('.cg502-nav a').forEach(a=>a.classList.toggle('active',a.href.split('#')[0].replace(/\/$/,'')===location.href.split('#')[0].replace(/\/$/,'')));
        const content=document.getElementById('cg-content-v502');
        if(content&&!content.querySelector(':scope>.cg502-pagebar')){const bar=document.createElement('div');bar.className='cg502-pagebar';content.prepend(bar)}
        const bar=content?.querySelector(':scope>.cg502-pagebar');if(bar)bar.innerHTML=`<div><small>Torn / Congerie</small><h1>${esc(pageName())}</h1><p>Clean controls. Faster navigation. Your Torn page, redesigned.</p></div>`;
        const title=app.querySelector('[data-cg-title]');if(title)title.textContent=pageName();
    }

    function hideNative(){
        all(SELECTORS.header).forEach(n=>{if(!n.closest('#cg-app-v502'))n.style.setProperty('display','none','important')});
        all(SELECTORS.sidebar).forEach(n=>{if(!n.closest('#cg-app-v502'))n.style.setProperty('display','none','important')});
    }

    function apply(){
        if(!document.body||isMobile())return;
        const main=getMain();if(!main)return;
        injectStyle();document.documentElement.classList.add('cg-v502');shell();
        if(!moveMain())return;
        render();hideNative();
    }

    let queued=false;
    const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;try{apply()}catch(e){console.error('[Congerie UI]',e)}})};

    function start(){
        if(isMobile())return;
        apply();
        const observer=new MutationObserver(mutations=>{if(isMobile())return;const changed=mutations.some(m=>m.type==='childList'&&[...m.addedNodes].some(n=>n.nodeType===1&&!n.closest?.('#cg-app-v502')));if(changed)schedule()});
        observer.observe(document.body,{childList:true,subtree:true});
        let last=location.href;setInterval(()=>{if(isMobile())return;if(location.href!==last){last=location.href;schedule()}},500);
    }

    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
