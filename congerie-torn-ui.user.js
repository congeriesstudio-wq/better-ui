// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      7.0.0
// @description  Full mobile-first Torn interface redesign for phones, tablets and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';
    if (window.__congerieTornMobileV700) return;
    window.__congerieTornMobileV700 = true;

    const mobile = () => window.matchMedia('(max-width: 900px)').matches || /Torn PDA/i.test(navigator.userAgent || '');
    if (!mobile()) return;

    const ID = 'cg-mobile-v700';
    const text = v => String(v ?? '').replace(/\s+/g, ' ').trim();
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

    const css = `
html.${ID},html.${ID} body{margin:0!important;min-width:0!important;max-width:100%!important;overflow-x:hidden!important;background:#070a0e!important;color:#e8edf2!important;color-scheme:dark!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;-webkit-text-size-adjust:100%}
html.${ID} *,html.${ID} *:before,html.${ID} *:after{box-sizing:border-box}
html.${ID} img,html.${ID} video{max-width:100%!important;height:auto}
html.${ID} a{-webkit-tap-highlight-color:transparent}

/* Congerie app chrome: normal-flow only. Nothing covers Torn content. */
html.${ID} #cg7-header{display:flex;align-items:center;gap:8px;min-height:54px;padding:8px 10px;background:#0d1319;border-bottom:1px solid rgba(255,255,255,.075);box-shadow:0 2px 14px rgba(0,0,0,.18)}
html.${ID} .cg7-brand{display:flex;align-items:center;gap:8px;min-width:0;color:#f3f6f9!important;text-decoration:none!important}
html.${ID} .cg7-mark{width:32px;height:32px;display:grid;place-items:center;flex:0 0 32px;border-radius:9px;background:linear-gradient(145deg,#16283a,#101922);border:1px solid rgba(111,183,255,.28);color:#79bbff;font-size:9px;font-weight:900;letter-spacing:.04em}
html.${ID} .cg7-brand-copy{min-width:0;line-height:1.05}.cg7-brand-copy strong{display:block;font-size:11px;letter-spacing:.09em}.cg7-brand-copy span{display:block;margin-top:3px;color:#667482;font-size:7px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
html.${ID} .cg7-grow{flex:1;min-width:3px}
html.${ID} .cg7-icon{width:35px;height:35px;display:grid;place-items:center;flex:0 0 35px;padding:0;border:1px solid rgba(255,255,255,.075);border-radius:9px;background:#111920;color:#aeb8c2;text-decoration:none!important;font-size:15px;font-weight:800;cursor:pointer}
html.${ID} .cg7-icon:active{transform:scale(.96);background:#17212b}

html.${ID} #cg7-resources{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:7px 9px;background:#0a0f14;border-bottom:1px solid rgba(255,255,255,.055)}
html.${ID} .cg7-stat{min-width:0;padding:6px 7px;border:1px solid rgba(255,255,255,.055);border-radius:7px;background:#0f161d}
html.${ID} .cg7-stat-label{display:block;color:#586675;font-size:6px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
html.${ID} .cg7-stat-value{display:block;margin-top:3px;color:#dce4ea;font-size:9px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
html.${ID} .cg7-stat-value.cg7-good{color:#91d5a5}.cg7-stat-value.cg7-warn{color:#e5b56d}.cg7-stat-value.cg7-danger{color:#ee8888}

html.${ID} #cg7-menu{display:none;padding:8px 9px 10px;background:#0a0f14;border-bottom:1px solid rgba(255,255,255,.075)}
html.${ID} #cg7-menu.open{display:block}
html.${ID} .cg7-menu-title{margin:1px 2px 7px;color:#52606f;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
html.${ID} .cg7-menu-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
html.${ID} .cg7-menu-grid a{min-height:40px;display:flex;align-items:center;gap:8px;padding:0 9px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#10171e;color:#aeb8c2!important;text-decoration:none!important;font-size:10px;font-weight:750}
html.${ID} .cg7-menu-grid a:active{background:#18232e;border-color:rgba(94,168,255,.25)}
html.${ID} .cg7-menu-icon{width:18px;text-align:center;color:#72b3f5;font-size:12px}

html.${ID} #cg7-rail{display:flex;gap:6px;overflow-x:auto;padding:7px 9px;scrollbar-width:none;background:#090e13;border-bottom:1px solid rgba(255,255,255,.055)}
html.${ID} #cg7-rail::-webkit-scrollbar{display:none}
html.${ID} #cg7-rail a{flex:0 0 auto;min-height:30px;display:flex;align-items:center;padding:0 11px;border:1px solid rgba(255,255,255,.065);border-radius:999px;background:#10171e;color:#84919e!important;text-decoration:none!important;font-size:9px;font-weight:750;white-space:nowrap}
html.${ID} #cg7-rail a.active{background:rgba(94,168,255,.13);border-color:rgba(94,168,255,.27);color:#ddecff!important}

/* Preserve Torn's containers. We reshape them in place rather than moving them. */
html.${ID} #mainContainer,html.${ID} #mainContainerWrap,html.${ID} #container{width:100%!important;max-width:100%!important;min-width:0!important;margin-left:0!important;margin-right:0!important;overflow:visible!important}
html.${ID} #cg7-title{padding:15px 11px 4px}
html.${ID} #cg7-title small{display:block;margin-bottom:4px;color:#556372;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
html.${ID} #cg7-title h1{margin:0;color:#f0f4f7;font-size:21px;line-height:1.08;font-weight:820;letter-spacing:-.02em}
html.${ID} #cg7-title p{margin:5px 0 0;color:#73808d;font-size:10px;line-height:1.4}

/* Turn common Torn sections into a consistent mobile design language. */
html.${ID} #mainContainer > *,html.${ID} #mainContainerWrap > *,html.${ID} #container > *{max-width:100%!important}
html.${ID} table{max-width:100%!important}
html.${ID} table:not([class*="table"]){width:100%!important}
html.${ID} th{font-size:9px!important}
html.${ID} td{font-size:10px!important}
html.${ID} input[type=text],html.${ID} input[type=search],html.${ID} input[type=number],html.${ID} input[type=password],html.${ID} input[type=email],html.${ID} select,html.${ID} textarea{max-width:100%!important;min-height:38px!important;padding:8px 10px!important;border-radius:8px!important;background:#0c131a!important;border:1px solid rgba(255,255,255,.1)!important;color:#edf2f6!important;font-size:14px!important;box-shadow:none!important}
html.${ID} button,html.${ID} input[type=button],html.${ID} input[type=submit],html.${ID} .button{min-height:38px;border-radius:8px!important;-webkit-tap-highlight-color:transparent}
html.${ID} .content-wrapper,html.${ID} .content-box,html.${ID} .panel,html.${ID} .box,html.${ID} .torn-box{max-width:100%!important}
html.${ID} .cg7-card{margin:7px 9px;padding:11px;border:1px solid rgba(255,255,255,.065);border-radius:10px;background:#10171e}
html.${ID} .cg7-card-title{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;color:#dfe6ec;font-size:11px;font-weight:800}

/* Make wide legacy rows scroll instead of breaking the viewport. */
html.${ID} .table-scroll,html.${ID} .table-wrap,html.${ID} [style*="overflow-x"]{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch}
html.${ID} pre{max-width:100%;overflow:auto}

/* Mobile spacing and touch targets. */
html.${ID} #mainContainer a,html.${ID} #mainContainerWrap a,html.${ID} #container a{touch-action:manipulation}
html.${ID} #mainContainer img,html.${ID} #mainContainerWrap img,html.${ID} #container img{max-width:100%!important}

@media(min-width:601px) and (max-width:900px){
    html.${ID} #cg7-menu .cg7-menu-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    html.${ID} #cg7-title{padding-left:16px;padding-right:16px}
}
@media(max-width:430px){html.${ID} #cg7-resources{grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding-left:7px;padding-right:7px}.cg7-stat{padding:6px 5px}.cg7-stat-label{font-size:5.5px}.cg7-stat-value{font-size:8px}}
@media(max-width:380px){html.${ID} .cg7-brand-copy{display:none}html.${ID} #cg7-title h1{font-size:19px}}
`;

    function inject(){
        if(document.getElementById('cg7-style')) return;
        const s=document.createElement('style');s.id='cg7-style';s.textContent=css;(document.head||document.documentElement).appendChild(s);
    }

    function page(){
        const p=location.pathname.toLowerCase();
        const map=[['index.php','Home'],['profile.php','Profile'],['city.php','City'],['items.php','Items'],['market.php','Market'],['factions.php','Faction'],['joblist.php','Jobs'],['education.php','Education'],['travelagency.php','Travel'],['forums.php','Forums'],['messages.php','Messages'],['missions.php','Missions'],['attack.php','Battle'],['gym.php','Gym']];
        const hit=map.find(x=>p.includes(x[0]));
        return hit?hit[1]:text(document.title.replace(/\s*-\s*Torn.*$/i,''))||'Torn';
    }

    function icon(label){
        const k=label.toLowerCase();
        if(k.includes('home'))return'⌂';if(k.includes('profile'))return'●';if(k.includes('city'))return'⌖';if(k.includes('item'))return'▦';if(k.includes('attack')||k.includes('battle'))return'⚔';if(k.includes('market'))return'◇';if(k.includes('faction'))return'◆';if(k.includes('job'))return'▤';if(k.includes('education'))return'□';if(k.includes('travel'))return'✈';if(k.includes('mission'))return'✓';if(k.includes('forum'))return'☷';if(k.includes('message'))return'✉';if(k.includes('gym'))return'▲';return'•';
    }

    function nativeNav(){
        const sels=['#sidebar','.area-sidebar','#mobile-menu','.mobile-menu','[class*="mobile-nav"]','[class*="mobile-menu"]'];
        for(const sel of sels){const n=document.querySelector(sel);if(n&&n.querySelector('a[href]'))return n}return null;
    }

    function links(){
        const out=[],seen=new Set(),root=nativeNav();
        if(root) root.querySelectorAll('a[href]').forEach(a=>{const label=text(a.textContent),href=a.getAttribute('href');if(!label||!href||href.startsWith('javascript:')||label.length>34||/^(logout|log out)$/i.test(label))return;const abs=new URL(href,location.href).href;if(seen.has(abs))return;seen.add(abs);out.push({label,href:abs})});
        [['Home','/'],['Profile','/profile.php'],['City','/city.php'],['Items','/items.php'],['Market','/market.php'],['Faction','/factions.php'],['Jobs','/joblist.php'],['Education','/education.php'],['Travel','/travelagency.php'],['Forums','/forums.php'],['Messages','/messages.php'],['Missions','/missions.php']].forEach(([label,href])=>{const abs=new URL(href,location.origin).href;if(!seen.has(abs))out.push({label,href:abs})});
        return out.slice(0,24);
    }

    function findMain(){return document.querySelector('#mainContainer')||document.querySelector('#mainContainerWrap')||document.querySelector('#container')||null}

    function createHeader(){
        if(document.getElementById('cg7-header'))return;
        const h=document.createElement('header');h.id='cg7-header';
        h.innerHTML='<a class="cg7-brand" href="/"><span class="cg7-mark">CG</span><span class="cg7-brand-copy"><strong>CONGERIE</strong><span>Mobile interface</span></span></a><span class="cg7-grow"></span><button class="cg7-icon" type="button" data-cg7-menu aria-label="Navigation">☰</button><a class="cg7-icon" href="/" aria-label="Home">⌂</a>';
        const main=findMain();
        if(main?.parentNode)main.parentNode.insertBefore(h,main);else document.body.prepend(h);
        h.querySelector('[data-cg7-menu]').addEventListener('click',()=>document.getElementById('cg7-menu')?.classList.toggle('open'));
    }

    function readValue(label){
        const root=nativeNav();if(!root)return '';
        const lines=(root.innerText||'').split(/\n+/).map(text).filter(Boolean);
        const i=lines.findIndex(x=>x.toLowerCase()===label.toLowerCase());
        return i>=0?lines[i+1]||'':'';
    }

    function createResources(){
        if(document.getElementById('cg7-resources'))return;
        const vals=[['Energy',readValue('Energy')],['Nerve',readValue('Nerve')],['Happy',readValue('Happy')],['Life',readValue('Life')]];
        const r=document.createElement('section');r.id='cg7-resources';
        r.innerHTML=vals.map(([l,v])=>`<div class="cg7-stat"><span class="cg7-stat-label">${l}</span><span class="cg7-stat-value">${esc(v||'—')}</span></div>`).join('');
        const header=document.getElementById('cg7-header');header?.parentNode.insertBefore(r,header.nextSibling);
    }

    function createMenu(){
        if(document.getElementById('cg7-menu'))return;
        const m=document.createElement('section');m.id='cg7-menu';
        m.innerHTML='<div class="cg7-menu-title">Navigate</div><div class="cg7-menu-grid"></div>';
        const grid=m.querySelector('.cg7-menu-grid');links().forEach(item=>{const a=document.createElement('a');a.href=item.href;a.innerHTML=`<span class="cg7-menu-icon">${esc(icon(item.label))}</span><span>${esc(item.label)}</span>`;grid.appendChild(a)});
        const header=document.getElementById('cg7-header');header?.parentNode.insertBefore(m,header.nextSibling?.nextSibling||null);
    }

    function createRail(){
        if(document.getElementById('cg7-rail'))return;
        const r=document.createElement('nav');r.id='cg7-rail';
        const here=location.href.replace(/\/$/,'');
        links().slice(0,12).forEach(item=>{const a=document.createElement('a');a.href=item.href;a.textContent=item.label;if(item.href.replace(/\/$/,'')===here)a.classList.add('active');r.appendChild(a)});
        const main=findMain();const menu=document.getElementById('cg7-menu');
        if(menu?.parentNode)menu.parentNode.insertBefore(r,main);else if(main?.parentNode)main.parentNode.insertBefore(r,main);
    }

    function createTitle(){
        const main=findMain();if(!main||main.querySelector(':scope > #cg7-title'))return;
        const t=document.createElement('section');t.id='cg7-title';t.innerHTML=`<small>Congerie mobile</small><h1>${esc(page())}</h1>`;
        main.insertBefore(t,main.firstChild);
    }

    function stylePageContent(){
        const main=findMain();if(!main)return;
        main.classList.add('cg7-main');
        // Add semantic card treatment only to obvious top-level blocks, never to forms or controls.
        Array.from(main.children).forEach(node=>{
            if(node.id==='cg7-title'||node.id==='cg7-page-hook'||node.tagName==='SCRIPT'||node.tagName==='STYLE')return;
            if(node.matches('form,table,ul,ol,fieldset,button,input,select,textarea'))return;
            const cls=(node.className||'').toString().toLowerCase();
            if(/header|footer|nav|menu/.test(cls))return;
            if(node.children.length>0 && !node.classList.contains('cg7-card')) node.classList.add('cg7-card');
        });
    }

    function cleanupOld(){
        document.querySelectorAll('#cg-app-v5,#cg-app-v502,#cg-app-v501,#cg-mobile-command-v600,#cg-mobile-nav-v600,#cg-mobile-scroll-v600').forEach(n=>n.remove());
        document.querySelectorAll('#cg-v5-style,#cg-v502-style,#cg-v501-style,#cg-mobile-v600-style').forEach(n=>n.remove());
    }

    let timer=0;
    function apply(){
        if(!document.body||!mobile())return;
        document.documentElement.classList.add(ID);
        inject();cleanupOld();createHeader();createResources();createMenu();createRail();createTitle();stylePageContent();
    }
    function schedule(){clearTimeout(timer);timer=setTimeout(apply,90)}

    const observer=new MutationObserver(ms=>{
        if(!mobile())return;
        const meaningful=ms.some(m=>m.type==='childList'&&Array.from(m.addedNodes).some(n=>n.nodeType===1&&!n.id?.startsWith('cg7-')));
        if(meaningful)schedule();
    });

    function start(){apply();observer.observe(document.body,{childList:true,subtree:true});let last=location.href;setInterval(()=>{if(location.href!==last){last=location.href;schedule()}},500)}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();