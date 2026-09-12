// ==UserScript==
// @name         Congerie Better UI for Torn
// @namespace    https://github.com/congeriesstudio-wq/better-ui
// @version      7.1.0
// @description  Full mobile-first Torn interface redesign for phones, tablets and Torn PDA.
// @match        https://www.torn.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// @downloadURL  https://raw.githubusercontent.com/congeriesstudio-wq/better-ui/main/congerie-torn-ui.user.js
// ==/UserScript==

(() => {
    'use strict';
    if (window.__congerieTornMobileV710) return;
    window.__congerieTornMobileV710 = true;

    const isMobile = () => window.matchMedia('(max-width: 900px)').matches || /Torn PDA/i.test(navigator.userAgent || '');
    if (!isMobile()) return;

    const ID = 'cg-mobile-v710';
    const text = v => String(v ?? '').replace(/\s+/g, ' ').trim();
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    const abs = href => { try { return new URL(href, location.href).href; } catch { return '#'; } };

    const ROUTES = [
        ['Home','/'],['City','/city.php'],['Profile','/profile.php'],['Items','/items.php'],
        ['Market','/market.php'],['Battle','/attack.php'],['Faction','/factions.php'],['Jobs','/joblist.php'],
        ['Education','/education.php'],['Travel','/travelagency.php'],['Missions','/missions.php'],
        ['Forums','/forums.php'],['Messages','/messages.php'],['Gym','/gym.php']
    ];

    const css = `
html.${ID},html.${ID} body{margin:0!important;min-width:0!important;max-width:100%!important;overflow-x:hidden!important;background:#070a0e!important;color:#e7edf3!important;color-scheme:dark!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;-webkit-text-size-adjust:100%}
html.${ID} *,html.${ID} *:before,html.${ID} *:after{box-sizing:border-box}
html.${ID} a{-webkit-tap-highlight-color:transparent}html.${ID} img,html.${ID} video{max-width:100%!important;height:auto}
html.${ID} #mainContainer,html.${ID} #mainContainerWrap,html.${ID} #container{width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;overflow:visible!important}
html.${ID} #cg7-header{position:relative;z-index:30;display:flex;align-items:center;gap:7px;min-height:55px;padding:8px 10px;background:#0c1218;border-bottom:1px solid rgba(255,255,255,.07);box-shadow:0 2px 16px rgba(0,0,0,.22)}
html.${ID} .cg7-brand{display:flex;align-items:center;gap:8px;min-width:0;color:#f4f7fa!important;text-decoration:none!important}.cg7-mark{width:32px;height:32px;display:grid;place-items:center;flex:0 0 32px;border-radius:9px;background:#101d29;border:1px solid rgba(112,185,255,.28);color:#7dbfff;font-size:9px;font-weight:900;letter-spacing:.04em}.cg7-brand-copy{min-width:0;line-height:1.02}.cg7-brand-copy strong{display:block;font-size:11px;letter-spacing:.1em}.cg7-brand-copy span{display:block;margin-top:3px;color:#64717e;font-size:7px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.cg7-grow{flex:1;min-width:4px}
html.${ID} .cg7-icon{width:35px;height:35px;display:grid;place-items:center;flex:0 0 35px;padding:0;border:1px solid rgba(255,255,255,.075);border-radius:9px;background:#111920;color:#aeb9c4;text-decoration:none!important;font-size:15px;font-weight:800;cursor:pointer}html.${ID} .cg7-icon:active{transform:scale(.96);background:#18232e}
html.${ID} #cg7-resources{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:7px 9px;background:#090e13;border-bottom:1px solid rgba(255,255,255,.055)}.cg7-stat{min-width:0;padding:6px 7px;border:1px solid rgba(255,255,255,.055);border-radius:7px;background:#0f161d}.cg7-stat-label{display:block;color:#596775;font-size:6px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cg7-stat-value{display:block;margin-top:3px;color:#e0e7ed;font-size:9px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cg7-stat-bar{height:2px;margin-top:5px;border-radius:2px;background:#1a232c;overflow:hidden}.cg7-stat-bar i{display:block;height:100%;width:0;background:#6eb7ff;border-radius:2px}
html.${ID} #cg7-menu{display:none;position:relative;z-index:29;padding:9px;background:#0a0f14;border-bottom:1px solid rgba(255,255,255,.075);box-shadow:0 7px 18px rgba(0,0,0,.22)}html.${ID} #cg7-menu.open{display:block}.cg7-menu-title{margin:1px 2px 8px;color:#52606e;font-size:7px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.cg7-menu-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}.cg7-menu-grid a{min-height:42px;display:flex;align-items:center;gap:8px;padding:0 9px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#10171e;color:#b5c0ca!important;text-decoration:none!important;font-size:10px;font-weight:750}.cg7-menu-grid a.active{border-color:rgba(99,175,255,.28);background:#122131;color:#e1efff!important}.cg7-menu-icon{width:18px;text-align:center;color:#70b7fa;font-size:12px}
html.${ID} #cg7-rail{display:flex;gap:6px;overflow-x:auto;padding:7px 9px;scrollbar-width:none;background:#090e13;border-bottom:1px solid rgba(255,255,255,.055)}html.${ID} #cg7-rail::-webkit-scrollbar{display:none}.cg7-rail-link{flex:0 0 auto;min-height:30px;display:flex;align-items:center;padding:0 11px;border:1px solid rgba(255,255,255,.065);border-radius:999px;background:#10171e;color:#84919e!important;text-decoration:none!important;font-size:9px;font-weight:750;white-space:nowrap}.cg7-rail-link.active{background:rgba(94,168,255,.13);border-color:rgba(94,168,255,.28);color:#ddecff!important}
html.${ID} #cg7-title{padding:14px 11px 6px}.cg7-kicker{display:block;margin-bottom:4px;color:#566472;font-size:7px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}.cg7-title-row{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.cg7-title-row h1{margin:0;color:#f0f4f7;font-size:21px;line-height:1.05;font-weight:850;letter-spacing:-.025em}.cg7-title-meta{color:#687684;font-size:8px;font-weight:700;white-space:nowrap}
html.${ID} #cg7-quick{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:2px 9px 9px}.cg7-quick-link{min-height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:1px solid rgba(255,255,255,.065);border-radius:9px;background:#10171e;color:#aeb9c4!important;text-decoration:none!important}.cg7-quick-link strong{font-size:14px;color:#7dbfff}.cg7-quick-link span{font-size:7px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.cg7-quick-link.active{background:#122131;border-color:rgba(100,177,255,.25)}
html.${ID} .cg7-section{margin:7px 9px;padding:11px;border:1px solid rgba(255,255,255,.065);border-radius:10px;background:#10171e}.cg7-section-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px}.cg7-section-head strong{color:#e1e7ec;font-size:11px;font-weight:820}.cg7-section-head span{color:#61707e;font-size:7px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.cg7-section[data-cg7-enhanced="1"]> :first-child{margin-top:0}
html.${ID} .cg7-action-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.cg7-action{min-height:45px;display:flex;align-items:center;gap:8px;padding:7px 9px;border:1px solid rgba(255,255,255,.06);border-radius:8px;background:#0d141b;color:#b9c4cd!important;text-decoration:none!important}.cg7-action b{font-size:12px;color:#74b9fa}.cg7-action span{font-size:9px;font-weight:750}.cg7-action small{display:block;margin-top:2px;color:#64717d;font-size:7px;font-weight:600}
html.${ID} .cg7-card{margin:7px 9px;padding:11px;border:1px solid rgba(255,255,255,.065);border-radius:10px;background:#10171e}.cg7-card[data-cg7-card="1"]{margin-top:7px}.cg7-native-label{color:#6b7885!important}.cg7-native-title{color:#e2e8ed!important}
html.${ID} table{max-width:100%!important}html.${ID} th{font-size:9px!important}html.${ID} td{font-size:10px!important}html.${ID} input[type=text],html.${ID} input[type=search],html.${ID} input[type=number],html.${ID} input[type=password],html.${ID} input[type=email],html.${ID} select,html.${ID} textarea{max-width:100%!important;min-height:38px!important;padding:8px 10px!important;border-radius:8px!important;background:#0c131a!important;border:1px solid rgba(255,255,255,.1)!important;color:#edf2f6!important;font-size:14px!important;box-shadow:none!important}html.${ID} button,html.${ID} input[type=button],html.${ID} input[type=submit],html.${ID} .button{min-height:38px;border-radius:8px!important;-webkit-tap-highlight-color:transparent}
html.${ID} [style*="overflow-x"],html.${ID} .table-scroll,html.${ID} .table-wrap{max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch}html.${ID} pre{max-width:100%;overflow:auto}
html.${ID} #cg7-home-overview{display:grid;grid-template-columns:1fr 1fr;gap:6px}.cg7-overview-item{min-height:58px;padding:9px;border-radius:8px;background:#0d141b;border:1px solid rgba(255,255,255,.05)}.cg7-overview-item span{display:block;color:#61707e;font-size:7px;font-weight:850;text-transform:uppercase;letter-spacing:.1em}.cg7-overview-item strong{display:block;margin-top:5px;color:#dce4ea;font-size:12px}.cg7-overview-item small{display:block;margin-top:3px;color:#64717d;font-size:7px}
html.${ID} .cg7-page-home #mainContainer>*,html.${ID} .cg7-page-home #mainContainerWrap>*,html.${ID} .cg7-page-home #container>*{max-width:100%!important}
html.${ID} .cg7-page-city .cg7-card,html.${ID} .cg7-page-travel .cg7-card,html.${ID} .cg7-page-battle .cg7-card,html.${ID} .cg7-page-market .cg7-card{background:#0f161d}
html.${ID} .cg7-footer-space{height:18px}
@media(min-width:601px) and (max-width:900px){.cg7-menu-grid{grid-template-columns:repeat(3,minmax(0,1fr))}html.${ID} #cg7-title{padding-left:16px;padding-right:16px}html.${ID} .cg7-section,html.${ID} .cg7-card{margin-left:16px;margin-right:16px}}
@media(max-width:430px){html.${ID} #cg7-resources{gap:4px;padding-left:7px;padding-right:7px}.cg7-stat{padding:6px 5px}.cg7-stat-label{font-size:5.5px}.cg7-stat-value{font-size:8px}.cg7-quick-link{min-height:45px}}
@media(max-width:380px){html.${ID} .cg7-brand-copy{display:none}html.${ID} #cg7-title .cg7-title-row h1{font-size:19px}.cg7-quick-link span{font-size:6.5px}}
`;

    function inject(){
        if(document.getElementById('cg7-style')) return;
        const s=document.createElement('style');s.id='cg7-style';s.textContent=css;(document.head||document.documentElement).appendChild(s);
    }

    function findMain(){return document.querySelector('#mainContainer')||document.querySelector('#mainContainerWrap')||document.querySelector('#container')||null}
    function currentPage(){
        const p=location.pathname.toLowerCase();
        const hit=[['index.php','Home'],['profile.php','Profile'],['city.php','City'],['items.php','Items'],['market.php','Market'],['attack.php','Battle'],['factions.php','Faction'],['joblist.php','Jobs'],['education.php','Education'],['travelagency.php','Travel'],['forums.php','Forums'],['messages.php','Messages'],['missions.php','Missions'],['gym.php','Gym']].find(x=>p.includes(x[0]));
        return hit ? hit[1] : (text(document.title.replace(/\s*-\s*Torn.*$/i,'')) || 'Torn');
    }
    function icon(label){const k=label.toLowerCase();if(k==='home')return'⌂';if(k.includes('profile'))return'●';if(k.includes('city'))return'⌖';if(k.includes('item'))return'▦';if(k.includes('battle'))return'⚔';if(k.includes('market'))return'◇';if(k.includes('faction'))return'◆';if(k.includes('job'))return'▤';if(k.includes('education'))return'□';if(k.includes('travel'))return'✈';if(k.includes('mission'))return'✓';if(k.includes('forum'))return'☷';if(k.includes('message'))return'✉';if(k.includes('gym'))return'▲';return'•'}

    function routeLinks(){
        const found=[];const seen=new Set();
        document.querySelectorAll('a[href]').forEach(a=>{
            const label=text(a.textContent),href=a.getAttribute('href');
            if(!label||!href||label.length>28||/^(logout|log out)$/i.test(label))return;
            const url=abs(href);if(!/^https:\/\/www\.torn\.com\//i.test(url)&&url!==location.origin+'/')return;
            const key=url.replace(/#.*$/,'');if(seen.has(key))return;seen.add(key);found.push({label,url:key});
        });
        ROUTES.forEach(([label,href])=>{const url=abs(href).replace(/#.*$/,'');if(!seen.has(url)){seen.add(url);found.push({label,url})}});
        return found;
    }

    function createHeader(){
        if(document.getElementById('cg7-header'))return;
        const h=document.createElement('header');h.id='cg7-header';
        h.innerHTML='<a class="cg7-brand" href="/"><span class="cg7-mark">CG</span><span class="cg7-brand-copy"><strong>CONGERIE</strong><span>Mobile interface</span></span></a><span class="cg7-grow"></span><button class="cg7-icon" type="button" data-cg7-menu aria-label="Open navigation">☰</button><a class="cg7-icon" href="/" aria-label="Home">⌂</a>';
        const main=findMain();if(main?.parentNode)main.parentNode.insertBefore(h,main);else document.body.prepend(h);
        h.querySelector('[data-cg7-menu]').addEventListener('click',()=>document.getElementById('cg7-menu')?.classList.toggle('open'));
    }

    function resourceSource(){
        const candidates=['#sidebar','#sidebarroot','#player-info','#user-info','.player-info','.user-info','[class*="player-info"]','[class*="user-info"]','[class*="resource"]','[class*="energy"]'];
        const nodes=[];candidates.forEach(sel=>document.querySelectorAll(sel).forEach(n=>nodes.push(n)));
        nodes.push(document.body);
        return nodes;
    }
    function readResource(label){
        const re=new RegExp('^'+label+'\\s*:?\\s*(.+)$','i');
        for(const root of resourceSource()){
            const lines=(root.innerText||'').split(/\n+/).map(text).filter(Boolean);
            for(let i=0;i<lines.length;i++){
                if(lines[i].toLowerCase()===label.toLowerCase() && lines[i+1])return lines[i+1];
                const m=lines[i].match(re);if(m)return m[1];
            }
        }
        return '';
    }
    function createResources(){
        if(document.getElementById('cg7-resources'))return;
        const r=document.createElement('section');r.id='cg7-resources';
        r.innerHTML=['Energy','Nerve','Happy','Life'].map(l=>`<div class="cg7-stat" data-cg7-stat="${l}"><span class="cg7-stat-label">${l}</span><span class="cg7-stat-value">${esc(readResource(l)||'—')}</span><span class="cg7-stat-bar"><i></i></span></div>`).join('');
        const h=document.getElementById('cg7-header');if(h?.parentNode)h.parentNode.insertBefore(r,h.nextSibling);
    }
    function refreshResources(){
        const root=document.getElementById('cg7-resources');if(!root)return;
        root.querySelectorAll('[data-cg7-stat]').forEach(card=>{const label=card.dataset.cg7Stat;const value=readResource(label);if(value){card.querySelector('.cg7-stat-value').textContent=value;const nums=value.match(/([0-9,.]+)\s*\/\s*([0-9,.]+)/);if(nums){const a=parseFloat(nums[1].replace(/,/g,'')),b=parseFloat(nums[2].replace(/,/g,''));card.querySelector('i').style.width=Math.max(0,Math.min(100,(a/b)*100))+'%'}}});
    }

    function createMenu(){
        if(document.getElementById('cg7-menu'))return;
        const m=document.createElement('section');m.id='cg7-menu';m.innerHTML='<div class="cg7-menu-title">Navigate</div><div class="cg7-menu-grid"></div>';
        const here=location.href.replace(/\/$/,'');const grid=m.querySelector('.cg7-menu-grid');
        ROUTES.forEach(([label,href])=>{const a=document.createElement('a');a.href=href;a.className=abs(href).replace(/\/$/,'')===here?'active':'';a.innerHTML=`<span class="cg7-menu-icon">${icon(label)}</span><span>${esc(label)}</span>`;grid.appendChild(a)});
        const header=document.getElementById('cg7-header');if(header?.parentNode)header.parentNode.insertBefore(m,header.nextSibling?.nextSibling||null);
    }
    function createRail(){
        if(document.getElementById('cg7-rail'))return;
        const r=document.createElement('nav');r.id='cg7-rail';const here=location.href.replace(/\/$/,'');
        ROUTES.slice(0,12).forEach(([label,href])=>{const a=document.createElement('a');a.className='cg7-rail-link'+(abs(href).replace(/\/$/,'')===here?' active':'');a.href=href;a.textContent=label;r.appendChild(a)});
        const main=findMain();if(main?.parentNode)main.parentNode.insertBefore(r,main);
    }
    function createTitle(){
        const main=findMain();if(!main||main.querySelector(':scope > #cg7-title'))return;
        const title=document.createElement('section');title.id='cg7-title';title.innerHTML=`<span class="cg7-kicker">Congerie mobile</span><div class="cg7-title-row"><h1>${esc(currentPage())}</h1><span class="cg7-title-meta">${location.hostname}</span></div>`;main.insertBefore(title,main.firstChild);
    }
    function createQuick(){
        if(document.getElementById('cg7-quick'))return;
        const q=document.createElement('nav');q.id='cg7-quick';
        [['City','/city.php','⌖'],['Items','/items.php','▦'],['Battle','/attack.php','⚔'],['Market','/market.php','◇']].forEach(([label,href,sym])=>{const a=document.createElement('a');a.className='cg7-quick-link';a.href=href;a.innerHTML=`<strong>${sym}</strong><span>${label}</span>`;q.appendChild(a)});
        const title=document.getElementById('cg7-title');if(title?.parentNode)title.parentNode.insertBefore(q,title.nextSibling);
    }

    function visibleNativeText(){
        const main=findMain();return main ? text(main.innerText).slice(0,5000) : '';
    }
    function firstValue(patterns){
        const main=findMain();if(!main)return '';
        const all=Array.from(main.querySelectorAll('a,button,span,div,strong,b,p')).map(n=>({n,t:text(n.textContent)})).filter(x=>x.t);
        for(const p of patterns){const hit=all.find(x=>p.test(x.t));if(hit)return hit.t}
        return '';
    }

    function addHomeOverview(){
        if(currentPage()!=='Home'||document.getElementById('cg7-home-overview'))return;
        const main=findMain();if(!main)return;
        const section=document.createElement('section');section.className='cg7-section';section.id='cg7-home-overview-wrap';
        section.innerHTML='<div class="cg7-section-head"><strong>Player overview</strong><span>Live from Torn</span></div><div id="cg7-home-overview"></div>';
        const grid=section.querySelector('#cg7-home-overview');
        [['Energy','Energy'],['Nerve','Nerve'],['Happy','Happy'],['Life','Life']].forEach(([label,key])=>{const item=document.createElement('div');item.className='cg7-overview-item';item.innerHTML=`<span>${label}</span><strong data-cg7-overview="${key}">${esc(readResource(key)||'—')}</strong><small>Current status</small>`;grid.appendChild(item)});
        const title=document.getElementById('cg7-title');const quick=document.getElementById('cg7-quick');const anchor=quick||title;if(anchor?.parentNode)anchor.parentNode.insertBefore(section,anchor.nextSibling);else main.insertBefore(section,main.firstChild);
    }
    function refreshHomeOverview(){document.querySelectorAll('[data-cg7-overview]').forEach(n=>{const v=readResource(n.dataset.cg7Overview);if(v)n.textContent=v})}

    function enhanceNativeContent(){
        const main=findMain();if(!main)return;
        main.classList.add('cg7-page-'+currentPage().toLowerCase().replace(/[^a-z0-9]+/g,'-'));
        const skip=new Set(['cg7-title','cg7-quick','cg7-home-overview-wrap']);
        Array.from(main.children).forEach(node=>{
            if(skip.has(node.id)||node.id==='cg7-page-hook'||/^(SCRIPT|STYLE|FORM|TABLE|UL|OL|FIELDSET)$/i.test(node.tagName))return;
            if(node.classList.contains('cg7-card'))return;
            const cls=text(node.className).toLowerCase();
            if(/header|footer|nav|menu|breadcrumb/.test(cls))return;
            if(node.children.length<1)return;
            node.classList.add('cg7-card');node.dataset.cg7Card='1';
        });
        main.querySelectorAll('h1,h2,h3,h4').forEach(h=>h.classList.add('cg7-native-title'));
        main.querySelectorAll('label,small,.label,.desc,.description').forEach(n=>n.classList.add('cg7-native-label'));
    }

    function cleanupOld(){
        document.querySelectorAll('#cg-app-v5,#cg-app-v502,#cg-app-v501,#cg-mobile-command-v600,#cg-mobile-nav-v600,#cg-mobile-scroll-v600').forEach(n=>n.remove());
        document.querySelectorAll('#cg-v5-style,#cg-v502-style,#cg-v501-style,#cg-mobile-v600-style').forEach(n=>n.remove());
    }
    function apply(){
        if(!document.body||!isMobile())return;
        document.documentElement.classList.add(ID);inject();cleanupOld();
        createHeader();createResources();createMenu();createRail();createTitle();createQuick();addHomeOverview();enhanceNativeContent();refreshResources();refreshHomeOverview();
        if(!document.getElementById('cg7-footer-space')){const s=document.createElement('div');s.id='cg7-footer-space';s.className='cg7-footer-space';findMain()?.appendChild(s)}
    }

    let timer=0;let applying=false;
    function schedule(){if(applying)return;clearTimeout(timer);timer=setTimeout(()=>{applying=true;try{apply()}finally{applying=false}},120)}
    const observer=new MutationObserver(ms=>{if(!isMobile())return;const meaningful=ms.some(m=>m.type==='childList'&&Array.from(m.addedNodes).some(n=>n.nodeType===1&&!String(n.id||'').startsWith('cg7-')));if(meaningful)schedule()});
    function start(){apply();observer.observe(document.body,{childList:true,subtree:true});let last=location.href;setInterval(()=>{if(location.href!==last){last=location.href;schedule()}refreshResources();refreshHomeOverview()},700)}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();