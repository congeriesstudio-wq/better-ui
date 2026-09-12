// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      8.0.0
// @description  Complete mobile Torn interface redesign with adaptive sidebar navigation.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';
    if (window.__congerieTornMobileV800) return;
    window.__congerieTornMobileV800 = true;

    const mobile = () => window.matchMedia('(max-width: 900px)').matches || /Torn PDA/i.test(navigator.userAgent || '');
    if (!mobile()) return;

    const V = 'cg8';
    const clean = v => String(v ?? '').replace(/\s+/g, ' ').trim();
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    const url = href => { try { return new URL(href, location.href).href; } catch { return '#'; } };

    const NAV = [
        ['Home','/','⌂'],
        ['Profile','/profile.php','●'],
        ['City','/city.php','⌖'],
        ['Items','/items.php','▦'],
        ['Market','/market.php','◇'],
        ['Battle','/attack.php','⚔'],
        ['Faction','/factions.php','◆'],
        ['Jobs','/joblist.php','▤'],
        ['Education','/education.php','□'],
        ['Travel','/travelagency.php','✈'],
        ['Missions','/missions.php','✓'],
        ['Forums','/forums.php','☷'],
        ['Messages','/messages.php','✉'],
        ['Gym','/gym.php','▲']
    ];

    const css = `
html.${V},html.${V} body{margin:0!important;min-width:0!important;max-width:100%!important;overflow-x:hidden!important;background:#070a0e!important;color:#e7edf3!important;color-scheme:dark!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;-webkit-text-size-adjust:100%}
html.${V} *,html.${V} *:before,html.${V} *:after{box-sizing:border-box}
html.${V} a{-webkit-tap-highlight-color:transparent}html.${V} img,html.${V} video{max-width:100%!important;height:auto}
html.${V} #mainContainer,html.${V} #mainContainerWrap,html.${V} #container{width:100%!important;max-width:100%!important;min-width:0!important;margin-left:0!important;margin-right:0!important;overflow:visible!important}

html.${V} #cg8-header{position:relative;z-index:100;display:flex;align-items:center;gap:8px;min-height:56px;padding:8px 10px;background:#0c1218;border-bottom:1px solid rgba(255,255,255,.07)}
html.${V} .cg8-brand{display:flex;align-items:center;gap:9px;min-width:0;text-decoration:none!important;color:#f4f7fa!important}
html.${V} .cg8-mark{width:34px;height:34px;display:grid;place-items:center;flex:0 0 34px;border-radius:10px;background:#111d28;border:1px solid rgba(110,184,255,.28);color:#7dbfff;font-size:9px;font-weight:900;letter-spacing:.05em}
html.${V} .cg8-brand-copy{line-height:1.02;min-width:0}.cg8-brand-copy strong{display:block;font-size:11px;letter-spacing:.1em}.cg8-brand-copy span{display:block;margin-top:3px;color:#64717e;font-size:7px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
html.${V} .cg8-spacer{flex:1;min-width:4px}.cg8-head-btn{width:36px;height:36px;display:grid;place-items:center;padding:0;border:1px solid rgba(255,255,255,.08);border-radius:9px;background:#111920;color:#b8c2cb!important;text-decoration:none!important;font-size:16px;font-weight:800;cursor:pointer}

html.${V} #cg8-resources{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:7px 9px;background:#090e13;border-bottom:1px solid rgba(255,255,255,.055)}
html.${V} .cg8-stat{min-width:0;padding:6px 7px;border:1px solid rgba(255,255,255,.055);border-radius:8px;background:#0f161d}.cg8-stat-label{display:block;color:#596775;font-size:6px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cg8-stat-value{display:block;margin-top:3px;color:#e0e7ed;font-size:9px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cg8-stat-bar{height:2px;margin-top:5px;background:#1b242d;border-radius:3px;overflow:hidden}.cg8-stat-bar i{display:block;height:100%;width:0;background:#72b9fb;border-radius:3px}

html.${V} #cg8-layout{display:block;width:100%}
html.${V} #cg8-sidebar{position:relative;z-index:90;width:100%;background:#0a0f14;border-bottom:1px solid rgba(255,255,255,.07)}
html.${V} .cg8-sidebar-head{display:flex;align-items:center;gap:9px;padding:10px 11px}.cg8-sidebar-head strong{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#dfe6ec}.cg8-sidebar-head span{margin-left:auto;color:#596775;font-size:7px;font-weight:800}
html.${V} .cg8-sidebar-scroll{display:flex;gap:6px;overflow-x:auto;padding:0 9px 9px;scrollbar-width:none}.cg8-sidebar-scroll::-webkit-scrollbar{display:none}
html.${V} .cg8-nav-item{flex:0 0 auto;min-height:38px;display:flex;align-items:center;gap:7px;padding:0 10px;border:1px solid rgba(255,255,255,.065);border-radius:8px;background:#10171e;color:#9ca9b5!important;text-decoration:none!important;font-size:9px;font-weight:800;white-space:nowrap}.cg8-nav-item b{font-size:13px;color:#6eaeed;font-weight:800}.cg8-nav-item.active{background:#132232;border-color:rgba(100,177,255,.3);color:#e5f1ff!important}.cg8-nav-item.active b{color:#8ac5ff}

html.${V} #cg8-sidebar-toggle{display:none}.cg8-sidebar-extra{display:none}
html.${V} #cg8-menu{display:none;position:relative;z-index:95;padding:9px;background:#0a0f14;border-bottom:1px solid rgba(255,255,255,.07)}html.${V} #cg8-menu.open{display:block}.cg8-menu-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}.cg8-menu-grid a{min-height:42px;display:flex;align-items:center;gap:8px;padding:0 9px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#10171e;color:#b7c1ca!important;text-decoration:none!important;font-size:10px;font-weight:800}.cg8-menu-grid a.active{background:#132232;border-color:rgba(100,177,255,.28);color:#e7f3ff!important}.cg8-menu-grid b{width:18px;text-align:center;color:#72b9fb;font-size:13px}

html.${V} #cg8-main{width:100%;min-width:0}
html.${V} #cg8-title{padding:15px 11px 7px}.cg8-kicker{display:block;margin-bottom:4px;color:#596775;font-size:7px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.cg8-title-row{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.cg8-title-row h1{margin:0;color:#f1f5f8;font-size:21px;line-height:1.05;font-weight:850;letter-spacing:-.025em}.cg8-title-meta{color:#63717e;font-size:8px;font-weight:750;white-space:nowrap}
html.${V} #cg8-quick{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:1px 9px 9px}.cg8-quick{min-height:47px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:1px solid rgba(255,255,255,.06);border-radius:9px;background:#10171e;color:#aeb9c4!important;text-decoration:none!important}.cg8-quick b{font-size:14px;color:#78baf9}.cg8-quick span{font-size:7px;font-weight:850;letter-spacing:.06em;text-transform:uppercase}.cg8-quick.active{background:#132232;border-color:rgba(100,177,255,.28)}

html.${V} .cg8-section{margin:7px 9px;padding:11px;border:1px solid rgba(255,255,255,.065);border-radius:10px;background:#10171e}.cg8-section-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px}.cg8-section-head strong{color:#e0e7ec;font-size:11px;font-weight:850}.cg8-section-head span{color:#61707e;font-size:7px;font-weight:850;letter-spacing:.1em;text-transform:uppercase}.cg8-action-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.cg8-action{min-height:46px;display:flex;align-items:center;gap:8px;padding:7px 9px;border:1px solid rgba(255,255,255,.055);border-radius:8px;background:#0d141b;color:#b9c4cd!important;text-decoration:none!important}.cg8-action b{font-size:13px;color:#74b9fa}.cg8-action span{font-size:9px;font-weight:800}.cg8-action small{display:block;margin-top:2px;color:#64717d;font-size:7px;font-weight:650}

html.${V} .cg8-native-card{margin:7px 9px!important;padding:11px!important;border:1px solid rgba(255,255,255,.06)!important;border-radius:10px!important;background:#10171e!important;box-shadow:none!important}.cg8-native-card table{margin-left:0!important;margin-right:0!important}.cg8-native-card>h1,.cg8-native-card>h2,.cg8-native-card>h3{margin-top:0!important;color:#e4ebf0!important}
html.${V} table{max-width:100%!important}html.${V} th{font-size:9px!important}html.${V} td{font-size:10px!important}
html.${V} input[type=text],html.${V} input[type=search],html.${V} input[type=number],html.${V} input[type=password],html.${V} input[type=email],html.${V} select,html.${V} textarea{max-width:100%!important;min-height:39px!important;padding:8px 10px!important;border-radius:8px!important;background:#0c131a!important;border:1px solid rgba(255,255,255,.1)!important;color:#edf2f6!important;font-size:14px!important;box-shadow:none!important}html.${V} button,html.${V} input[type=button],html.${V} input[type=submit]{min-height:39px;border-radius:8px!important}
html.${V} .table-scroll,html.${V} .table-wrap,html.${V} [style*="overflow-x"]{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch}html.${V} pre{max-width:100%;overflow:auto}
html.${V} .cg8-footer-space{height:20px}

@media(min-width:601px) and (max-width:900px){html.${V} #cg8-sidebar-scroll{padding-left:16px;padding-right:16px}.cg8-section,.cg8-native-card{margin-left:16px!important;margin-right:16px!important}.cg8-menu-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:430px){html.${V} #cg8-resources{gap:4px;padding-left:7px;padding-right:7px}.cg8-stat{padding:6px 5px}.cg8-stat-label{font-size:5.5px}.cg8-stat-value{font-size:8px}.cg8-quick{min-height:44px}}
@media(max-width:380px){html.${V} .cg8-brand-copy{display:none}.cg8-title-row h1{font-size:19px}.cg8-quick span{font-size:6.5px}}

@media(min-width:700px) and (max-width:900px){html.${V} #cg8-sidebar{display:block}.cg8-sidebar-scroll{flex-wrap:wrap;overflow:visible}}
`;

    function inject(){
        if(document.getElementById('cg8-style')) return;
        const s=document.createElement('style');s.id='cg8-style';s.textContent=css;(document.head||document.documentElement).appendChild(s);
    }

    function findMain(){return document.querySelector('#mainContainer')||document.querySelector('#mainContainerWrap')||document.querySelector('#container')||null}
    function currentPage(){
        const p=location.pathname.toLowerCase();
        const hit=[['index.php','Home'],['profile.php','Profile'],['city.php','City'],['items.php','Items'],['market.php','Market'],['attack.php','Battle'],['factions.php','Faction'],['joblist.php','Jobs'],['education.php','Education'],['travelagency.php','Travel'],['missions.php','Missions'],['forums.php','Forums'],['messages.php','Messages'],['gym.php','Gym']].find(x=>p.includes(x[0]));
        return hit?hit[1]:(clean(document.title.replace(/\s*-\s*Torn.*$/i,''))||'Torn');
    }
    function activeRoute(){
        const here=location.pathname.replace(/\/$/,'')||'/';
        return NAV.find(x=>x[1].replace(/\/$/,'')===here)?.[0]||currentPage();
    }

    function createHeader(){
        if(document.getElementById('cg8-header')) return;
        const h=document.createElement('header');h.id='cg8-header';
        h.innerHTML='<a class="cg8-brand" href="/"><span class="cg8-mark">CG</span><span class="cg8-brand-copy"><strong>CONGERIE</strong><span>Mobile interface</span></span></a><span class="cg8-spacer"></span><button class="cg8-head-btn" type="button" data-cg8-menu aria-label="Open navigation">☰</button><a class="cg8-head-btn" href="/" aria-label="Home">⌂</a>';
        const main=findMain();
        if(main&&main.parentNode) main.parentNode.insertBefore(h,main); else document.body.prepend(h);
        h.querySelector('[data-cg8-menu]').addEventListener('click',()=>document.getElementById('cg8-menu')?.classList.toggle('open'));
    }

    function nativeText(){
        const selectors=['#sidebar','.area-sidebar','#mobile-menu','.mobile-menu','[class*="sidebar"]','[class*="mobile-nav"]'];
        for(const s of selectors){const n=document.querySelector(s);if(n&&clean(n.innerText))return n.innerText}
        return '';
    }
    function resourceValue(name){
        const root=document.body;
        const labels=Array.from(root.querySelectorAll('*')).filter(el=>el.children.length===0&&clean(el.textContent).toLowerCase()===name.toLowerCase()).slice(0,12);
        for(const label of labels){
            let p=label.parentElement;
            for(let i=0;i<3&&p;i++,p=p.parentElement){
                const t=clean(p.innerText||'');
                if(t&&t.length<120){const m=t.match(new RegExp(name+'\\s*[:\\n ]+([^\\n]+)','i'));if(m&&clean(m[1])!==name)return clean(m[1])}
            }
        }
        const t=clean(nativeText());const lines=t.split(/\n+/).map(clean).filter(Boolean);const i=lines.findIndex(x=>x.toLowerCase()===name.toLowerCase());return i>=0?lines[i+1]||'':'';
    }
    function resourceMax(name){
        const v=resourceValue(name);const m=v.match(/([\d,.]+)\s*(?:\/|of)\s*([\d,.]+)/i);return m?{value:m[1],max:m[2]}:{value:v,max:''};
    }

    function createResources(){
        if(document.getElementById('cg8-resources'))return;
        const r=document.createElement('section');r.id='cg8-resources';
        r.innerHTML=['Energy','Nerve','Happy','Life'].map(n=>{const x=resourceMax(n);return `<div class="cg8-stat"><span class="cg8-stat-label">${n}</span><span class="cg8-stat-value" data-cg8-stat="${n}">${esc(x.value||'—')}</span><div class="cg8-stat-bar"><i></i></div></div>`}).join('');
        const h=document.getElementById('cg8-header');if(h?.parentNode)h.parentNode.insertBefore(r,h.nextSibling);
    }
    function refreshResources(){
        const root=document.getElementById('cg8-resources');if(!root)return;
        ['Energy','Nerve','Happy','Life'].forEach(n=>{const x=resourceMax(n),v=root.querySelector(`[data-cg8-stat="${n}"]`);if(v&&x.value)v.textContent=x.max?`${x.value} / ${x.max}`:x.value;const bar=v?.nextElementSibling?.querySelector('i');if(bar&&x.value&&x.max){const a=parseFloat(x.value.replace(/,/g,'')),b=parseFloat(x.max.replace(/,/g,''));bar.style.width=(b>0?Math.max(0,Math.min(100,a/b*100)):0)+'%'}});
    }

    function createSidebar(){
        if(document.getElementById('cg8-sidebar'))return;
        const s=document.createElement('aside');s.id='cg8-sidebar';
        const active=activeRoute();
        s.innerHTML=`<div class="cg8-sidebar-head"><strong>Quick navigation</strong><span>${esc(active)}</span></div><nav class="cg8-sidebar-scroll">${NAV.map(([label,href,ico])=>`<a class="cg8-nav-item${label===active?' active':''}" href="${href}"><b>${ico}</b><span>${label}</span></a>`).join('')}</nav>`;
        const main=findMain();if(main?.parentNode)main.parentNode.insertBefore(s,main);
    }

    function createMenu(){
        if(document.getElementById('cg8-menu'))return;
        const m=document.createElement('section');m.id='cg8-menu';m.innerHTML='<div class="cg8-menu-grid"></div>';
        const grid=m.firstElementChild,active=activeRoute();
        NAV.forEach(([label,href,ico])=>{const a=document.createElement('a');a.href=href;a.className=label===active?'active':'';a.innerHTML=`<b>${ico}</b><span>${label}</span>`;grid.appendChild(a)});
        const h=document.getElementById('cg8-header');if(h?.parentNode)h.parentNode.insertBefore(m,h.nextSibling);
    }

    function createTitle(){
        const main=findMain();if(!main||main.querySelector(':scope>#cg8-title'))return;
        const t=document.createElement('section');t.id='cg8-title';t.innerHTML=`<span class="cg8-kicker">Congerie mobile</span><div class="cg8-title-row"><h1>${esc(currentPage())}</h1><span class="cg8-title-meta">${esc(location.pathname.replace(/^\//,'' )||'home')}</span></div>`;
        main.insertBefore(t,main.firstChild);
    }

    function createQuick(){
        if(document.getElementById('cg8-quick'))return;
        const q=document.createElement('nav');q.id='cg8-quick';
        const list=NAV.filter(x=>['Home','City','Items','Battle'].includes(x[0]));const active=activeRoute();
        q.innerHTML=list.map(([label,href,ico])=>`<a class="cg8-quick${label===active?' active':''}" href="${href}"><b>${ico}</b><span>${label}</span></a>`).join('');
        const main=findMain();if(main?.parentNode)main.parentNode.insertBefore(q,main);
    }

    function addNativeCards(){
        const main=findMain();if(!main)return;
        Array.from(main.children).forEach(node=>{
            if(['cg8-title','SCRIPT','STYLE'].includes(node.tagName==='SECTION'?node.id:node.tagName))return;
            if(node.id&&/^cg8-/.test(node.id))return;
            if(node.matches('form,table,ul,ol,fieldset,button,input,select,textarea,nav'))return;
            if(node.children.length<1)return;
            const cls=String(node.className||'').toLowerCase();
            if(/header|footer|menu|sidebar|navigation/.test(cls))return;
            node.classList.add('cg8-native-card');
        });
    }

    function enhanceHome(){
        const main=findMain();if(!main||document.getElementById('cg8-home-actions'))return;
        const section=document.createElement('section');section.id='cg8-home-actions';section.className='cg8-section';
        section.innerHTML='<div class="cg8-section-head"><strong>Command center</strong><span>Fast access</span></div><div class="cg8-action-grid"></div>';
        const grid=section.querySelector('.cg8-action-grid');[['City','/city.php','⌖','Activities'],['Items','/items.php','▦','Inventory'],['Battle','/attack.php','⚔','Targets'],['Travel','/travelagency.php','✈','Travel']].forEach(([n,h,i,d])=>{const a=document.createElement('a');a.className='cg8-action';a.href=h;a.innerHTML=`<b>${i}</b><span>${n}<small>${d}</small></span>`;grid.appendChild(a)});
        main.insertBefore(section,main.children[1]||null);
    }
    function pageClass(){return 'cg8-page-'+currentPage().toLowerCase().replace(/[^a-z0-9]+/g,'-')}

    function applyPage(){
        const main=findMain();if(!main)return;
        main.classList.add('cg8-main',pageClass());
        if(currentPage()==='Home')enhanceHome();
        addNativeCards();
        if(!main.querySelector('.cg8-footer-space')){const f=document.createElement('div');f.className='cg8-footer-space';main.appendChild(f)}
    }

    function cleanupOld(){
        ['#cg-app-v5','#cg-app-v502','#cg-app-v501','#cg-mobile-command-v600','#cg-mobile-nav-v600','#cg-mobile-scroll-v600'].forEach(s=>document.querySelectorAll(s).forEach(n=>n.remove()));
        ['#cg-v5-style','#cg-v502-style','#cg-v501-style','#cg-mobile-v600-style','#cg7-style'].forEach(s=>document.querySelectorAll(s).forEach(n=>n.remove()));
        document.documentElement.classList.remove('cg-mobile-v700','cg-mobile-v710');
    }

    let timer=0,lastUrl=location.href;
    function apply(){
        if(!document.body||!mobile())return;
        cleanupOld();inject();document.documentElement.classList.add(V);
        createHeader();createResources();createSidebar();createMenu();createQuick();createTitle();applyPage();refreshResources();
    }
    function schedule(){clearTimeout(timer);timer=setTimeout(apply,100)}

    const observer=new MutationObserver(records=>{
        if(!mobile())return;
        const meaningful=records.some(r=>r.type==='childList'&&Array.from(r.addedNodes).some(n=>n.nodeType===1&&!String(n.id||'').startsWith('cg8-')));
        if(meaningful)schedule();
    });

    function start(){
        apply();
        observer.observe(document.body,{childList:true,subtree:true});
        setInterval(()=>{if(location.href!==lastUrl){lastUrl=location.href;schedule()}},400);
        setInterval(refreshResources,1500);
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
