/* ============================================================
   SKANOPT · main.js — render, i18n uygulama, animasyon, etkileşim
   ============================================================ */
(function(){
  "use strict";
  const I18N = window.I18N, SPECS = window.SPECS, SITE = window.SITE || {};
  const $  = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> Array.prototype.slice.call((c||document).querySelectorAll(s));
  const el = (tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
  const getPath=(o,p)=>p.split(".").reduce((a,k)=>(a&&a[k]!=null)?a[k]:null,o);

  /* ---------- ikon seti (inline SVG, currentColor) ---------- */
  const I = {
    rotary:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v4h-4"/><circle cx="12" cy="12" r="3"/></svg>',
    scan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7.5" y="7.5" width="9" height="9" rx="1"/></svg>',
    plc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="9" rx="1.5"/><path d="M8 8V5M16 8V5M9 17v2M15 17v2M8 12h.01M12 12h.01M16 12h.01"/></svg>',
    calib:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>',
    camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/></svg>',
    truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>',
    robot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="9" width="12" height="9" rx="2"/><path d="M12 9V5M12 5a1.5 1.5 0 1 0 0-.01"/><path d="M3 13v2M21 13v2M9.5 14h.01M14.5 14h.01"/></svg>',
    cnc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M5 20v-6l4-2 4 3 6-4v9"/><path d="M9 12V7l3-2"/></svg>',
    sync:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 21v-5h5M21 3v5h-5"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M10 8H7a4 4 0 0 0 0 8h3M14 8h3a4 4 0 0 1 0 8h-3"/></svg>',
    report:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    car:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13l2-5h12l2 5M3 13h18v4h-2M5 17H3v-4M7 17h10"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/></svg>',
    appliance:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 8h12"/><circle cx="12" cy="14.5" r="3.2"/><path d="M9 5.5h.01"/></svg>',
    implant:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M8 7h8M9 11h6M10 15h4"/></svg>',
    chip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"/></svg>',
    mold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v6a8 8 0 0 1-8 8 8 8 0 0 1-8-8z"/><path d="M9 18v2h6v-2"/></svg>',
    aero:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 3 3 6 3 9l4 3v2l-5-1.5L12 22l-2-4.5L5 19v-2l4-3c0-3 1-6 3-9z"/></svg>',
    lab:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v2a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.8 12.2l-.3.5.7 2.6-2.7-.7-.5.3A8 8 0 1 1 12 4zm-3 4.3c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.1-1.5-.5-.6-.8-1.2-.9-1.4-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4z"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>'
  };
  const icon = k => I[k] || I.target;

  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get("lang");
  let lang = urlLang || "en";
  if(lang!=="tr") lang="en";
  let activeSeries = "V";

  /* ---------------- dinamik render ---------------- */
  function renderDynamic(d){
    // Hero Alt Maddeleri (Pill/Badge)
    const subHost = $("#heroSubChips");
    if(subHost && d.hero.sub) {
      subHost.innerHTML = "";
      d.hero.sub.split("\n").forEach((line, i) => {
        const text = line.replace(/^-\s*/, "").trim();
        if(!text) return;
        const pill = el("div", "hero-pill");
        pill.dataset.reveal = "";
        pill.style.transitionDelay = (i * 60) + "ms";
        pill.innerHTML = icon("check") + "<span>" + text + "</span>";
        subHost.appendChild(pill);
      });
    }

    // Neden başlığına görsel logo gömülmesi
    const whyTitleHost = $("#whyTitleContainer");
    if(whyTitleHost && d.why.title) {
      // "SKANOPT Bunlarda Fark Yaratır" -> "SKANOPT" yerine logo.png koy, kalanı metin olarak ekle
      const titleText = d.why.title;
      if(titleText.includes("SKANOPT")) {
        const parts = titleText.split("SKANOPT");
        whyTitleHost.innerHTML = "";
        if(parts[0]) whyTitleHost.appendChild(document.createTextNode(parts[0]));
        
        const logoImg = el("img", "inline-brand-logo");
        logoImg.src = "assets/img/logo.png?v=3";
        logoImg.alt = "SKANOPT";
        whyTitleHost.appendChild(logoImg);
        
        if(parts[1]) whyTitleHost.appendChild(document.createTextNode(parts[1]));
      } else {
        whyTitleHost.textContent = titleText;
      }
    }

    // Neden — kartlar
    grid("#whyGrid", d.why.cards, (c,i)=>card("card", c.icon, c.t, c.d, i));
    // Seriler — sekmeler + paneller
    renderSeries(d);
    // Nasıl çalışır
    grid("#stepsGrid", d.how.steps, (s,i)=>{
      const e=el("div","step"); e.dataset.reveal=""; e.style.transitionDelay=(i*80)+"ms";
      e.innerHTML='<div class="step__num">'+(i+1)+'</div><h3>'+s.t+'</h3><p>'+s.d+'</p>'; return e;
    });
    // Otomasyon noktaları
    grid("#autoPoints", d.auto.points, (p,i)=>{
      const e=el("div","point"); e.dataset.reveal=""; e.style.transitionDelay=(i*70)+"ms";
      e.innerHTML='<div class="point__ic">'+icon(p.icon)+'</div><div><h3>'+p.t+'</h3><p>'+p.d+'</p></div>'; return e;
    });
    $("#autoVideo") && tryPlay($("#autoVideo"));
    // Yazılım — ölçüm çipleri / kartlar / rozetler
    grid("#measChips", d.sw.measurements, (m,i)=>{
      const e=el("span","chip"); e.dataset.reveal=""; e.style.transitionDelay=((i%6)*45)+"ms";
      e.innerHTML=icon("check")+"<span>"+m+"</span>"; return e;
    });
    grid("#swCards", d.sw.cards, (c,i)=>card("card", c.icon, c.t, c.d, i));
    grid("#swBadges", d.sw.badges, (b)=>el("span","badge",icon("check")+"<span>"+b+"</span>"));
    // Karşılaştırma
    renderCompare(d);
    // Sektörler
    grid("#sectorGrid", d.sec.sectors, (s,i)=>{
      const e=el("div","sector"); e.dataset.reveal=""; e.style.transitionDelay=((i%4)*70)+"ms";
      const imgKey = s.icon === "implant" ? "sec-medical" : (s.icon === "chip" ? "sec-chip" : "sec-" + s.icon);
      e.innerHTML = `
        <div class="sector__img">
          <picture>
            <source srcset="assets/img/${imgKey}.webp" type="image/webp">
            <img src="assets/img/${imgKey}.jpg" alt="${s.t}" loading="lazy" width="600" height="400">
          </picture>
        </div>
        <div class="sector__body">
          <div class="sector__header">
            <div class="sector__ic">${icon(s.icon)}</div>
            <h3>${s.t}</h3>
          </div>
          <p>${s.d}</p>
        </div>
      `;
      return e;
    });
    grid("#appsStrip", d.sec.apps, (a)=>el("span",null,a));
    // Referanslar
    grid("#refsGrid", d.ref.items, (r,i)=>{
      const e=el("div","ref"); e.dataset.reveal=""; e.style.transitionDelay=(i*90)+"ms";
      e.innerHTML='<div class="flag">'+r.flag+'</div><h3>'+r.country+'</h3><div class="role">'+r.role+'</div><p>'+r.desc+'</p>'; return e;
    });
    // İletişim yöntemleri + footer iletişim + WhatsApp
    renderContactMethods(d);
  }

  function grid(sel, items, build){
    const host=$(sel); if(!host) return; host.innerHTML="";
    items.forEach((it,i)=>host.appendChild(build(it,i)));
  }
  function card(cls, ic, t, d, i){
    const e=el("div",cls+(ic==="truck"||ic==="report"?" card--accent":"")); e.dataset.reveal=""; e.style.transitionDelay=((i%4)*70)+"ms";
    e.innerHTML='<div class="card__icon">'+icon(ic)+'</div><h3>'+t+'</h3><p>'+d+'</p>'; return e;
  }

  function renderSeries(d){
    const tabsHost=$("#seriesTabs"), panelHost=$("#seriesPanels");
    if(!tabsHost||!panelHost) return;
    tabsHost.innerHTML=""; panelHost.innerHTML="";
    d.series.order.forEach(key=>{
      const it=d.series.items[key];
      const tab=el("button","tab"+(key===activeSeries?" active":""),it.name);
      tab.setAttribute("role","tab"); tab.dataset.series=key;
      tab.id="tab-"+key; tab.setAttribute("aria-selected",key===activeSeries?"true":"false");
      tab.setAttribute("aria-controls","panel-"+key);
      tab.addEventListener("click",()=>{activeSeries=key;switchSeries(key);});
      tabsHost.appendChild(tab);

      const h=d.series.headers;
      let rows=(SPECS[key]||[]).map(r=>"<tr><td>"+r[0]+"</td><td>"+r[1]+"</td><td>"+r[2]+"</td><td>"+r[3]+"</td></tr>").join("");
      const feats=it.feats.map(f=>"<li>"+icon("check")+"<span>"+f+"</span></li>").join("");
      const imgMap = { V: "product-v", VR: "product-vr", VRE: "product-vre", W: "product-w", H: "product-h" };
      const imgName = imgMap[key] || "product-v";
      const panel=el("div","panel"+(key===activeSeries?" active":"")); panel.dataset.series=key;
      panel.setAttribute("role","tabpanel"); panel.id="panel-"+key;
      panel.setAttribute("aria-labelledby","tab-"+key);
      panel.innerHTML = `
        <div class="panel__grid">
          <div class="panel__media">
            <picture>
              <source srcset="assets/img/${imgName}.webp" type="image/webp">
              <img src="assets/img/${imgName}.png" alt="${it.name}" loading="lazy" width="800" height="600">
            </picture>
          </div>
          <div class="panel__info">
            <h3>${it.name}</h3>
            <div class="panel__tag">${it.tag}</div>
            <p style="color:var(--ink-soft); margin-bottom:6px;">${it.desc}</p>
            <ul class="panel__feats">${feats}</ul>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr><th>${h.model}</th><th>${h.fovh}</th><th>${h.fovv}</th><th>${h.acc}</th></tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
            <p class="spec-note">${d.series.note}</p>
          </div>
        </div>
      `;
      panelHost.appendChild(panel);
    });
  }
  function switchSeries(key){
    $$("#seriesTabs .tab").forEach(t=>{t.classList.toggle("active",t.dataset.series===key);t.setAttribute("aria-selected",t.dataset.series===key?"true":"false");});
    $$("#seriesPanels .panel").forEach(p=>p.classList.toggle("active",p.dataset.series===key));
  }

  function renderCompare(d){
    const t=$("#compareTable"); if(!t) return;
    const cols=d.cmp.cols, last=cols.length-1;
    let head="<thead><tr><th>"+d.cmp.feature+"</th>"+cols.map((c,i)=>'<th'+(i===last?' class="us"':'')+'>'+c+'</th>').join("")+"</tr></thead>";
    let body="<tbody>"+d.cmp.rows.map(r=>{
      const cells=r.cells.map((cell,i)=>{
        let inner=cell;
        if(cell.indexOf("✓")===0) inner='<span class="yes">'+cell+'</span>';
        else if(cell==="❌"||cell==="—"||cell==="◐") inner='<span class="no">'+cell+'</span>';
        return '<td'+(i===last?' class="us"':'')+'>'+inner+'</td>';
      }).join("");
      return "<tr><td>"+r.label+"</td>"+cells+"</tr>";
    }).join("")+"</tbody>";
    t.innerHTML=head+body;
  }

  function renderContactMethods(d){
    const c=d.contact, host=$("#contactMethods");
    if(host){
      host.innerHTML="";
      const items=[];
      if(SITE.web)   items.push({ic:"globe",lbl:c.mWeb, val:SITE.web, href:SITE.webUrl||("https://"+SITE.web), cls:""});
      if(SITE.email) items.push({ic:"mail",lbl:c.mMail, val:SITE.email, href:"mailto:"+SITE.email, cls:""});
      if(SITE.phoneDisplay) items.push({ic:"phone",lbl:c.mPhone, val:SITE.phoneDisplay, href:SITE.phoneE164?("tel:"+SITE.phoneE164):null, cls:""});
      if(SITE.whatsappNumber) items.push({ic:"whatsapp",lbl:c.mWa, val:c.ctaBtn, href:waLink(), cls:"wa"});
      items.forEach(it=>{
        const tag=it.href?"a":"div";
        const e=el(tag,"method "+it.cls);
        if(it.href){e.href=it.href; if(it.cls==="wa"||it.ic==="globe")e.target="_blank";}
        e.innerHTML='<div class="method__ic">'+icon(it.ic)+'</div><div><small>'+it.lbl+'</small><b>'+it.val+'</b></div>';
        host.appendChild(e);
      });
    }
    // footer iletişim
    const fc=$("#footerContact");
    if(fc){
      fc.innerHTML="";
      if(SITE.web)   fc.appendChild(el("li",null,icon("globe")+"<a href='"+(SITE.webUrl||("https://"+SITE.web))+"' target='_blank'>"+SITE.web+"</a>"));
      if(SITE.email) fc.appendChild(el("li",null,icon("mail")+"<a href='mailto:"+SITE.email+"'>"+SITE.email+"</a>"));
      if(SITE.phoneDisplay) fc.appendChild(el("li",null,icon("phone")+"<span>"+SITE.phoneDisplay+"</span>"));
    }
    // WhatsApp CTA butonu
    const wa=$("#waCta");
    if(wa){
      if(SITE.whatsappNumber){ wa.href=waLink(); wa.target="_blank"; wa.style.display=""; }
      else if(SITE.email){ wa.href="mailto:"+SITE.email; wa.textContent=c.mMail; }
    }
  }
  function waLink(){
    return "https://wa.me/"+(SITE.whatsappNumber||"")+(SITE.whatsappText?("?text="+encodeURIComponent(SITE.whatsappText)):"");
  }

  /* ---------------- i18n metin uygulama ---------------- */
  function applyI18nText(d){
    $$("[data-i18n]").forEach(node=>{
      const v=getPath(d,node.getAttribute("data-i18n"));
      if(v==null) return;
      if(node.tagName==="META") node.setAttribute("content",v);
      else if(node.tagName==="TITLE"){ node.textContent=v; document.title=v; }
      else node.textContent=v;
    });
  }

  function setLang(l){
    lang=(l==="en")?"en":"tr";
    const d=I18N[lang];
    document.documentElement.lang=lang;
    applyI18nText(d);
    renderDynamic(d);
    $$(".lang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    localStorage.setItem("skanopt_lang",lang);
    setupReveal();      // yeni eklenen düğümleri gözlemle
  }

  /* ---------------- animasyonlar & etkileşim ---------------- */
  let revealObs;
  function setupReveal(){
    if(!("IntersectionObserver" in window)){ $$("[data-reveal]").forEach(e=>e.classList.add("in")); return; }
    if(!revealObs){
      revealObs=new IntersectionObserver((ents)=>{
        ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); if(en.target.dataset.count!=null) animateCount(en.target); revealObs.unobserve(en.target);} });
      },{threshold:.14,rootMargin:"0px 0px -8% 0px"});
    }
    $$("[data-reveal]:not(.in)").forEach(e=>revealObs.observe(e));
    $$(".stat__num[data-count]").forEach(e=>revealObs.observe(e));
  }

  function animateCount(node){
    if(node._done) return; node._done=true;
    const target=parseFloat(node.dataset.count), dec=parseInt(node.dataset.decimals||"0",10), pre=node.dataset.prefix||"";
    const txt=node.firstChild; const dur=1200; const t0=performance.now();
    function fmt(v){ return pre + (dec? v.toFixed(dec) : Math.round(v).toString()); }
    if(target<1){ if(txt) txt.nodeValue=fmt(target); return; }   // çok küçük değerler için animasyon atlanır
    function tick(now){
      let p=Math.min(1,(now-t0)/dur); p=1-Math.pow(1-p,3);
      if(txt) txt.nodeValue=fmt(target*p);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function tryPlay(v){ const p=v.play&&v.play(); if(p&&p.catch) p.catch(()=>{}); }

  function setupHeader(){
    const h=$("#header"), bar=$("#scrollProgress"), glow=$(".hero__media .glow");
    let ticking=false;
    function update(){
      const y=window.scrollY;
      h.classList.toggle("scrolled",y>10);
      if(bar){ const max=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=(max>0?(y/max*100):0)+"%"; }
      if(glow && y<900) glow.style.transform="translateY("+(y*0.18)+"px)";
      if(y < 50){
        $$(".nav a").forEach(l=>l.classList.remove("active"));
      }
      ticking=false;
    }
    update();
    window.addEventListener("scroll",()=>{ if(!ticking){ requestAnimationFrame(update); ticking=true; } },{passive:true});
  }
  function setupNav(){
    const burger=$("#burger"), mnav=$("#mobileNav");
    const close=()=>{burger.classList.remove("open");mnav.classList.remove("open");burger.setAttribute("aria-expanded","false");};
    burger&&burger.addEventListener("click",()=>{
      const open=!mnav.classList.contains("open");
      mnav.classList.toggle("open",open); burger.classList.toggle("open",open); burger.setAttribute("aria-expanded",String(open));
    });
    $$("#mobileNav a").forEach(a=>a.addEventListener("click",close));
    // aktif bölüm vurgusu
    const links=$$(".nav a"); const map={};
    links.forEach(a=>{const id=a.getAttribute("href").slice(1); if(id)map[id]=a;});
    if("IntersectionObserver" in window){
      const so=new IntersectionObserver((ents)=>{
        ents.forEach(en=>{ if(en.isIntersecting){ links.forEach(l=>l.classList.remove("active")); const a=map[en.target.id]; if(a)a.classList.add("active"); } });
      },{rootMargin:"-45% 0px -50% 0px"});
      $$("main section[id]").forEach(s=>{ if(map[s.id]) so.observe(s); });
    }
  }
  function setupLang(){ $$(".lang button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang))); }

  function setupForm(){
    const f=$("#contactForm"), msg=$("#formMsg"); if(!f) return;
    f.addEventListener("submit",async (e)=>{
      e.preventDefault();
      const c=I18N[lang].contact;
      msg.className="form__msg";
      if(!f.checkValidity()){ f.reportValidity(); return; }
      
      const formData = new FormData(f);
      const data = Object.fromEntries(formData.entries());
      const interests = formData.getAll("interest");
      
      if(interests.length === 0){
        msg.textContent = lang === "tr" ? "Lütfen ilgilendiğiniz konulardan en az birini seçin." : "Please select at least one interest.";
        msg.className = "form__msg err";
        return;
      }
      
      data.interests = interests.join(", ");
      
      const btn=f.querySelector("button[type=submit]"); const orig=btn.textContent; btn.disabled=true; btn.textContent=c.sending;
      try{
        if(SITE.formEndpoint){
          const r=await fetch(SITE.formEndpoint,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(data)});
          if(!r.ok) throw new Error("bad");
          msg.textContent=c.ok; msg.className="form__msg ok"; f.reset();
        }else{
          // mailto yedeği
          const subj=encodeURIComponent("SKANOPT Demo/Teklif — "+(data.company||data.name||""));
          const marketingConsentVal = data.consent_marketing ? (lang === "tr" ? "Evet / Onaylandı" : "Yes / Approved") : (lang === "tr" ? "Hayır / Onaylanmadı" : "No / Disapproved");
          const body=encodeURIComponent(
            c.name + ": " + (data.name||"") + "\n" +
            c.company + ": " + (data.company||"") + "\n" +
            c.emailLabel.replace(" (required)","").replace(" (zorunlu)","") + ": " + (data.email||"") + "\n" +
            c.categoryLabel.replace(" (required)","").replace(" (zorunlu)","") + ": " + (data.category||"") + "\n" +
            c.interestsLabel.replace(" (required)","").replace(" (zorunlu)","") + ": " + (data.interests||"") + "\n" +
            (lang === "tr" ? "Ticari İletişim İzni" : "Marketing Consent") + ": " + marketingConsentVal + "\n\n" +
            c.messageLabel + ":\n" + (data.message||"")
          );
          window.location.href="mailto:"+(SITE.email||"")+"?subject="+subj+"&body="+body;
          msg.textContent=c.ok; msg.className="form__msg ok";
        }
      }catch(err){ msg.textContent=c.err; msg.className="form__msg err"; }
      finally{ btn.disabled=false; btn.textContent=orig; }
    });
  }

  function setupVideoStack() {
    const cards = $$(".video-card");
    if (cards.length < 2) return;
    
    let swapTimer = null;
    
    // Function to swap active card
    const swap = () => {
      const activeCard = cards.find(c => c.classList.contains("active"));
      const nextCard = cards.find(c => !c.classList.contains("active"));
      if (activeCard && nextCard) {
        activeCard.classList.remove("active");
        nextCard.classList.add("active");
      }
    };
    
    // Start or restart the auto-swap interval
    const startTimer = () => {
      if (swapTimer) clearInterval(swapTimer);
      swapTimer = setInterval(() => {
        swap();
      }, 10000); // 10 seconds
    };
    
    // User triggered swap (resets the timer)
    const handleUserTriggeredSwap = (targetCard) => {
      if (targetCard) {
        if (targetCard.classList.contains("active")) return;
        cards.forEach(c => {
          c.classList.toggle("active", c === targetCard);
        });
      } else {
        swap();
      }
      startTimer();
    };
    
    cards.forEach(card => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      
      card.addEventListener("click", () => {
        handleUserTriggeredSwap(card);
      });
      
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleUserTriggeredSwap(card);
        }
      });
    });
    
    // Setup swap button click handler
    const swapBtn = $("#videoSwapBtn");
    if (swapBtn) {
      swapBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card click triggers
        handleUserTriggeredSwap(null);
      });
    }
    
    // Start initial timer
    startTimer();
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded",()=>{
    $("#year").textContent=new Date().getFullYear();
    setLang(lang);     // metin + dinamik render + reveal
    setupHeader(); setupNav(); setupLang(); setupForm();
    setupVideoStack();
    setupReveal();
  });
})();
