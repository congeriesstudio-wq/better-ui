// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      9.0.0
// @description  Complete mobile Torn interface redesign with clean app shell and sidebar navigation.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';
    if (window.__congerieTornMobileV900) return;
    window.__congerieTornMobileV900 = true;

    const mobile = () => window.matchMedia('(max-width: 900px)').matches || /Torn PDA/i.test(navigator.userAgent || '');
    if (!mobile()) return;

    const V = 'cg9';
    const clean = v => String(v ?? '').replace(/\s+/g, ' ').trim();
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

    const NAV = [
        ['Home','/','⌂'],['City','/city.php','⌖'],['Profile','/profile.php','●'],['Items','/items.php','▦'],
        ['Market','/market.php','◇'],['Battle','/attack.php','⚔'],['Faction','/factions.php','◆'],['Jobs','/joblist.php','▤'],
        ['Education','/education.php','□'],['Travel','/travelagency.php','✈'],['Missions','/missions.php','✓'],
        ['Forums','/forums.php','☷'],['Messages','/messages.php','✉'],['Gym','/gym.php','▲']
    ];

    const css = `
html.${V},html.${V} body{margin:0!important;min-width:0!important;max-width:100%!important;overflow-x:hidden!important;background:#080b0f!important;color:#e8edf2!important;color-scheme:dark!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;-webkit-text-size-adjust:100%}
html.${V} *,html.${V} *:before,html.${V} *:after{box-sizing:border-box}html.${V} img,html.${V} video{max-width:100%!important;height:auto}html.${V} a{-webkit-tap-highlight-color:transparent}
html.${V} #mainContainer,html.${V} #mainContainerWrap,html.${V} #container{width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;overflow:visible!important}
html.${V} #cg9-header{position:relative;z-index:1000;display:flex;align-items:center;gap:9px;height:58px;padding:9px 11px;background:#0c1117;border-bottom:1px solid rgba(255,255,255,.07);box-shadow:0 3px 18px rgba(0,0,0,.25)}
html.${V} .cg9-brand{display:flex;align-items:center;gap:9px;min-width:0;text-decoration:none!important;color:#f5f7f9!important}.cg9-mark{width:34px;height:34px;display:grid;place-items:center;flex:0 0 34px;border-radius:9px;background:#101a24;border:1px solid rgba(113,184,255,.25);color:#7dbfff;font-size:9px;font-weight:900;letter-spacing:.05em}.cg9-brand strong{display:block;font-size:11px;letter-spacing:.11em;line-height:1}.cg9-brand small{display:block;margin-top:4px;color:#64717e;font-size:7px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.cg9-spacer{flex:1}.cg9-head{width:38px;height:38px;display:grid;place-items:center;padding:0;border:1px solid rgba(255,255,255,.08);border-radius:9px;background:#111920;color:#c2cbd3!important;text-decoration:none!important;font-size:17px;font-weight:800;cursor:pointer}.cg9-head:active{transform:scale(.97)}
html.${V} #cg9-resources{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:7px 9px;background:#090e13;border-bottom:1px solid rgba(255,255,255,.055)}.cg9-stat{min-width:0;padding:6px 7px;border:1px solid rgba(255,255,255,.055);border-radius:7px;background:#0f151c}.cg9-stat label{display:block;color:#5c6976;font-size:6px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}.cg9-stat strong{display:block;margin-top:3px;color:#e0e6eb;font-size:9px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cg9-stat i{display:block;height:2px;margin-top:5px;border-radius:2px;background:#1a232c;overflow:hidden}.cg9-stat i b{display:block;width:0;height:100%;background:#6eb5f5;border-radius:2px}
html.${V} #cg9-drawer{position:fixed;z-index:2000;inset:0;visibility:hidden;pointer-events:none}.cg9-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.58);opacity:0;transition:opacity .16s ease}.cg9-panel{position:absolute;left:0;top:0;bottom:0;width:min(290px,82vw);background:#0b1117;border-right:1px solid rgba(255,255,255,.08);box-shadow:12px 0 35px rgba(0,0,0,.4);transform:translateX(-102%);transition:transform .18s ease;overflow-y:auto;padding:14px 11px 24px}.cg9-drawer-head{display:flex;align-items:center;gap:9px;padding:3px 2px 15px}.cg9-drawer-head strong{font-size:12px;letter-spacing:.08em}.cg9-drawer-head span{display:block;margin-top:3px;color:#667482;font-size:7px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.cg9-close{margin-left:auto;width:34px;height:34px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:#111920;color:#b8c2cb;font-size:17px}.cg9-nav-group{margin-top:13px}.cg9-nav-label{margin:0 3px 6px;color:#566472;font-size:7px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.cg9-nav{display:flex;flex-direction:column;gap:4px}.cg9-nav a{min-height:43px;display:flex;align-items:center;gap:10px;padding:0 10px;border:1px solid transparent;border-radius:8px;color:#aeb9c4!important;text-decoration:none!important;font-size:10px;font-weight:800}.cg9-nav a b{width:21px;text-align:center;color:#6eaef0;font-size:13px}.cg9-nav a.active{background:#132131;border-color:rgba(100,177,255,.23);color:#e7f3ff!important}.cg9-nav a.active b{color:#86c5ff}.cg9-divider{height:1px;margin:12px 2px;background:rgba(255,255,255,.055)}
html.${V} #cg9-drawer.open{visibility:visible;pointer-events:auto}.cg9-drawer.open .cg9-backdrop{opacity:1}.cg9-drawer.open .cg9-panel{transform:translateX(0)}
html.${V} #cg9-main{width:100%;min-width:0}.cg9-page-head{padding:17px 12px 10px}.cg9-page-kicker{display:block;color:#566472;font-size:7px;font-weight:900;letter-spacing:.17em;text-transform:uppercase;margin-bottom:5px}.cg9-page-head h1{margin:0;color:#f2f5f7;font-size:22px;line-height:1.05;font-weight:850;letter-spacing:-.025em}.cg9-page-head p{margin:6px 0 0;color:#707d89;font-size:9px;line-height:1.35}
html.${V} .cg9-command{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;margin:0 9px 9px}.cg9-command a{min-height:46px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:1px solid rgba(255,255,255,.055);border-radius:8px;background:#0f161d;color:#aab6c0!important;text-decoration:none!important}.cg9-command a b{color:#73b6f7;font-size:14px}.cg9-command a span{font-size:6.5px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.cg9-command a.active{background:#12202f;border-color:rgba(102,179,255,.24);color:#e1efff!important}
html.${V} .cg9-native{margin:7px 9px!important;padding:10px!important;border:1px solid rgba(255,255,255,.06)!important;border-radius:10px!important;background:#10171e!important;box-shadow:none!important}.cg9-native>h1,.cg9-native>h2,.cg9-native>h3{margin-top:0!important;color:#e4ebef!important}.cg9-native table{max-width:100%!important}html.${V} table{max-width:100%!important}html.${V} th{font-size:9px!important}html.${V} td{font-size:10px!important}
html.${V} input[type=text],html.${V} input[type=search],html.${V} input[type=number],html.${V} input[type=password],html.${V} input[type=email],html.${V} select,html.${V} textarea{max-width:100%!important;min-height:39px!important;padding:8px 10px!important;border-radius:8px!important;background:#0b1218!important;border:1px solid rgba(255,255,255,.09)!important;color:#edf2f6!important;font-size:14px!important;box-shadow:none!important}html.${V} button,html.${V} input[type=button],html.${V} input[type=submit]{min-height:39px;border-radius:8px!important}
html.${V} .table-scroll,html.${V} .table-wrap,html.${V} [style*="overflow-x"]{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch}html.${V} pre{max-width:100%;overflow:auto}
html.${V} .cg9-footer{height:18px}
html.${V} .cg9-hidden-native{display:none!important}
@media(min-width:700px) and (max-width:900px){html.${V} #cg9-drawer{position:relative;visibility:visible;pointer-events:auto;inset:auto;height:auto}html.${V} #cg9-drawer .cg9-backdrop,html.${V} #cg9-drawer .cg9-close{display:none}html.${V} #cg9-drawer .cg9-panel{position:relative;transform:none;width:100%;box-shadow:none;border:0;padding:9px 14px 12px;overflow:visible}html.${V} .cg9-nav{display:grid;grid-template-columns:repeat(4,1fr)}html.${V} .cg9-nav a{min-height:39px}html.${V} .cg9-command{margin-left:14px;margin-right:14px}}
@media(max-width:430px){html.${V} #cg9-resources{padding-left:7px;padding-right:7px;gap:4px}.cg9-stat{padding:6px 5px}.cg9-stat label{font-size:5.5px}.cg9-stat strong{font-size:8px}.cg9-command{gap:4px;margin-left:7px;margin-right:7px}.cg9-command a{min-height:44px}.cg9-command a span{font-size:6px}}
@media(max-width:380px){html.${V} .cg9-brand small{display:none}.cg9-page-head h1{font-size:20px}}
`;

    function inject(){
        if(document.getElementById('cg9-style')) return;
        const s=document.createElement('style');s.id='cg9-style';s.textContent=css;(document.head||document.documentElement).appendChild(s);
    }
    function findMain(){return document.querySelector('#mainContainer')||document.querySelector('#mainContainerWrap')||document.querySelector('#container')||null}
    function page(){
        const p=location.pathname.toLowerCase();
        const hit=[['index.php','Home'],['profile.php','Profile'],['city.php','City'],['items.php','Items'],['market.php','Market'],['attack.php','Battle'],['factions.php','Faction'],['joblist.php','Jobs'],['education.php','Education'],['travelagency.php','Travel'],['missions.php','Missions'],['forums.php','Forums'],['messages.php','Messages'],['gym.php','Gym']].find(x=>p.includes(x[0]));
        return hit?hit[1]:(clean(document.title.replace(/\s*-\s*Torn.*$/i,''))||'Torn');
    }
    function active(){const p=location.pathname.replace(/\/$/,'')||'/';return NAV.find(n=>n[1].replace(/\/$/,'')===p)?.[0]||page()}
    function hideNativeChrome(){
        const selectors=['#topHeader','#mobileHeader','.topHeader','.mobileHeader','.top-header','.mobile-header','.header-wrap','.main-header'];
        selectors.forEach(sel=>document.querySelectorAll(sel).forEach(el=>{if(el.id?.startsWith('cg9-')||el.closest('#cg9-drawer'))return;const r=el.getBoundingClientRect();if(r.top<140&&r.height<130)el.classList.add('cg9-hidden-native')}));
        document.querySelectorAll('.cg9-hidden-native').forEach(el=>el.style.setProperty('display','none','important'));
    }
    function cleanupOld(){
        ['#cg8-header','#cg8-resources','#cg8-sidebar','#cg8-menu','#cg8-quick','#cg8-title','#cg8-home-actions','#cg7-header','#cg7-resources','#cg7-menu','#cg7-rail','#cg7-title','#cg7-quick','#cg7-home-actions'].forEach(s=>document.querySelectorAll(s).forEach(n=>n.remove()));
        ['#cg8-style','#cg7-style','#cg-mobile-v700-style','#cg-mobile-v710-style'].forEach(s=>document.querySelectorAll(s).forEach(n=>n.remove()));
        document.documentElement.classList.remove('cg-mobile-v700','cg-mobile-v710','cg8');
    }
    function createHeader(){
        if(document.getElementById('cg9-header'))return;
        const h=document.createElement('header');h.id='cg9-header';
        h.innerHTML='<button class="cg9-head" type="button" data-cg9-open aria-label="Open sidebar">☰</button><a class="cg9-brand" href="/"><span class="cg9-mark">CG</span><span><strong>CONGERIE</strong><small>Mobile command</small></span></a><span class="cg9-spacer"></span><a class="cg9-head" href="/" aria-label="Home">⌂</a>';
        const main=findMain();if(main?.parentNode)main.parentNode.insertBefore(h,main);else document.body.prepend(h);
        h.querySelector('[data-cg9-open]').addEventListener('click',()=>document.getElementById('cg9-drawer')?.classList.add('open'));
    }
    function resource(name){
        const candidates=Array.from(document.querySelectorAll('*')).filter(e=>e.children.length===0&&clean(e.textContent).toLowerCase()===name.toLowerCase()).slice(0,15);
        for(const label of candidates){let p=label.parentElement;for(let i=0;i<3&&p;i++,p=p.parentElement){const t=clean(p.innerText||'');const m=t.match(new RegExp(name+'\\s*[:\\n ]+([^\\n]+)','i'));if(m&&clean(m[1])!==name)return clean(m[1])}}
        return '';
    }
    function createResources(){
        if(document.getElementById('cg9-resources'))return;
        const r=document.createElement('section');r.id='cg9-resources';r.innerHTML=['Energy','Nerve','Happy','Life'].map(n=>`<div class="cg9-stat"><label>${n}</label><strong data-cg9-stat="${n}">—</strong><i><b></b></i></div>`).join('');
        const h=document.getElementById('cg9-header');h?.parentNode.insertBefore(r,h.nextSibling);
    }
    function refreshResources(){
        const root=document.getElementById('cg9-resources');if(!root)return;
        ['Energy','Nerve','Happy','Life'].forEach(n=>{const raw=resource(n);const el=root.querySelector(`[data-cg9-stat="${n}"]`);if(!el)return;if(raw)el.textContent=raw;const m=raw.match(/([\d,.]+)\s*(?:\/|of)\s*([\d,.]+)/i);if(m){el.textContent=`${m[1]} / ${m[2]}`;const a=parseFloat(m[1].replace(/,/g,'')),b=parseFloat(m[2].replace(/,/g,''));el.nextElementSibling.querySelector('b').style.width=(b?Math.min(100,Math.max(0,a/b*100)):0)+'%'}});
    }
    function createDrawer(){
        if(document.getElementById('cg9-drawer'))return;
        const d=document.createElement('aside');d.id='cg9-drawer';const activePage=active();
        d.innerHTML='<div class="cg9-backdrop" data-cg9-close></div><div class="cg9-panel"><div class="cg9-drawer-head"><span class="cg9-mark">CG</span><div><strong>Navigation</strong><span>Congerie mobile</span></div><button class="cg9-close" type="button" data-cg9-close>×</button></div><div class="cg9-nav-group"><div class="cg9-nav-label">Core</div><nav class="cg9-nav"></nav></div><div class="cg9-divider"></div><div class="cg9-nav-group"><div class="cg9-nav-label">More</div><nav class="cg9-nav cg9-more"></nav></div></div></aside>';
        const core=new Set(['Home','City','Profile','Items','Market','Battle','Faction']);const a=d.querySelector('.cg9-nav'),b=d.querySelector('.cg9-more');
        NAV.forEach(([label,href,ico])=>{const x=document.createElement('a');x.href=href;x.className=label===activePage?'active':'';x.innerHTML=`<b>${ico}</b><span>${label}</span>`;(core.has(label)?a:b).appendChild(x)});
        d.querySelectorAll('[data-cg9-close]').forEach(x=>x.addEventListener('click',()=>d.classList.remove('open')));document.body.appendChild(d);
    }
    function createPageHead(){
        const main=findMain();if(!main||main.querySelector(':scope>#cg9-page-head'))return;
        const h=document.createElement('section');h.id='cg9-page-head';h.className='cg9-page-head';h.innerHTML=`<span class="cg9-page-kicker">Congerie mobile</span><h1>${esc(page())}</h1>`;main.insertBefore(h,main.firstChild);
    }
    function createCommand(){
        if(document.getElementById('cg9-command'))return;
        const q=document.createElement('nav');q.id='cg9-command';const activePage=active();NAV.filter(n=>['Home','City','Items','Battle'].includes(n[0])).forEach(([label,href,ico])=>{const a=document.createElement('a');a.href=href;a.className=label===activePage?'active':'';a.innerHTML=`<b>${ico}</b><span>${label}</span>`;q.appendChild(a)});
        const main=findMain();main?.parentNode.insertBefore(q,main);
    }
    function enhanceContent(){
        const main=findMain();if(!main)return;main.id='cg9-main';main.classList.add('cg9-main-page');
        Array.from(main.children).forEach(node=>{if(node.id==='cg9-page-head'||node.id?.startsWith('cg9-')||node.tagName==='SCRIPT'||node.tagName==='STYLE')return;if(node.matches('form,table,ul,ol,fieldset,button,input,select,textarea,nav'))return;if(node.children.length<1)return;const cls=String(node.className||'').toLowerCase();if(/header|footer|menu|sidebar|navigation/.test(cls))return;node.classList.add('cg9-native')});
        if(!main.querySelector('.cg9-footer')){const f=document.createElement('div');f.className='cg9-footer';main.appendChild(f)}
    }
    let timer=0,last=location.href;
    function apply(){if(!document.body||!mobile())return;cleanupOld();inject();document.documentElement.classList.add(V);createHeader();createResources();createDrawer();createPageHead();createCommand();enhanceContent();hideNativeChrome();refreshResources()}
    function schedule(){clearTimeout(timer);timer=setTimeout(apply,120)}
    const observer=new MutationObserver(records=>{if(records.some(r=>r.type==='childList'&&Array.from(r.addedNodes).some(n=>n.nodeType===1&&!String(n.id||'').startsWith('cg9-'))))schedule()});
    function start(){apply();observer.observe(document.body,{childList:true,subtree:true});setInterval(()=>{if(location.href!==last){last=location.href;schedule()}},500);setInterval(refreshResources,1800)}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();