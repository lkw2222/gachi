/* =====================================================================
   가치 홈페이지 — 공통 스크립트 (헤더/푸터 주입 · 메뉴 · 언어 · 설정값)
   페이지에서는 이 파일만 불러오면 헤더/푸터가 자동 생성됩니다.
   ===================================================================== */
(function(){
  "use strict";
  var S = window.SITE, MAP = window.SITEMAP, UI = window.I18N_UI;
  function norm(p){ return (p.replace(/\/index(\.html)?$/,"/").replace(/\.html$/,"").replace(/\/+$/,"") || "/"); }
  var path = norm(location.pathname);
  var isHome = document.body.dataset.home === "true";
  var lang = localStorage.getItem("gachi_lang") || "ko";

  /* ---------- helpers ---------- */
  function el(html){ var t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstChild; }
  function L(ko,en){ return lang==="en" && en ? en : ko; }
  function active(p){ return norm(p)===path; }

  /* ---------- HEADER ---------- */
  function buildHeader(){
    var gnb = MAP.map(function(g){
      var subs = g.children.map(function(c){
        return '<li><a href="'+c.path+'">'+L(c.label,c.en)+'</a></li>';
      }).join("");
      var on = g.children.some(function(c){return active(c.path);}) ? " on":"";
      return '<li class="'+on.trim()+'"><a href="'+g.path+'">'+L(g.label,g.en)+'</a>'+
             '<ul class="submenu">'+subs+'</ul></li>';
    }).join("");

    var contactPath = "/support/contact.html";
    var h = el(
      '<header id="siteHeader" class="'+(isHome?"":"solid")+'">'+
        '<div class="wrap hdr-inner">'+
          '<a class="brand" href="/index.html">'+
            '<img src="'+S.logoEmblem+'" alt="'+S.name+'">'+
            '<span class="bt"><b>'+S.name+'</b><span>'+S.nameEn.toUpperCase()+'</span></span>'+
          '</a>'+
          '<nav><ul class="gnb">'+gnb+'</ul></nav>'+
          '<div class="hdr-right">'+
            '<a class="hdr-phone" href="tel:'+S.phone.replace(/[^0-9]/g,"")+'"><span>'+L(UI.ko.phoneLabel,UI.en.phoneLabel)+'</span><b>'+S.phone+'</b></a>'+
            '<div class="lang"><button data-lang="ko"'+(lang==="ko"?' class="on"':"")+'>KR</button><button data-lang="en"'+(lang==="en"?' class="on"':"")+'>EN</button></div>'+
            '<a class="btn btn-gold" href="'+contactPath+'">'+L(UI.ko.cta,UI.en.cta)+'</a>'+
            '<button class="menu-toggle" id="mTgl" aria-label="menu"><span></span><span></span><span></span></button>'+
          '</div>'+
        '</div>'+
      '</header>'
    );
    document.body.insertBefore(h, document.body.firstChild);

    /* mobile drawer */
    var grps = MAP.map(function(g){
      var subs = g.children.map(function(c){ return '<a href="'+c.path+'">'+L(c.label,c.en)+'</a>'; }).join("");
      return '<div class="m-grp"><button>'+L(g.label,g.en)+'<span class="arr">▾</span></button><div class="m-sub">'+subs+'</div></div>';
    }).join("");
    var drawer = el('<div class="m-drawer" id="mDrawer"><button class="m-close" id="mClose">×</button>'+grps+
      '<div class="m-cta"><a class="btn btn-gold" href="'+contactPath+'">'+L(UI.ko.cta,UI.en.cta)+' · '+S.phone+'</a></div></div>');
    var backdrop = el('<div class="m-backdrop" id="mBackdrop"></div>');
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    wireHeader();
  }

  function wireHeader(){
    var header=document.getElementById("siteHeader");
    if(isHome){
      var onScroll=function(){ header.classList.toggle("scrolled", window.scrollY>40); };
      window.addEventListener("scroll",onScroll); onScroll();
    }
    var tgl=document.getElementById("mTgl"), dr=document.getElementById("mDrawer"),
        bd=document.getElementById("mBackdrop"), cl=document.getElementById("mClose");
    function close(){ dr.classList.remove("open"); bd.classList.remove("open"); }
    tgl.addEventListener("click",function(){ dr.classList.add("open"); bd.classList.add("open"); });
    cl.addEventListener("click",close); bd.addEventListener("click",close);
    dr.querySelectorAll(".m-grp > button").forEach(function(b){
      b.addEventListener("click",function(){ b.parentNode.classList.toggle("open"); });
    });
    document.querySelectorAll(".lang button").forEach(function(b){
      b.addEventListener("click",function(){ setLang(b.dataset.lang); });
    });
  }

  /* ---------- SUBHERO + BREADCRUMB (비-홈 페이지) ---------- */
  function buildSubhero(){
    if(isHome) return;
    var group=null, child=null;
    MAP.forEach(function(g){ g.children.forEach(function(c){ if(active(c.path)){ group=g; child=c; } }); });
    var title = (lang==="en" && child && child.en) ? child.en : (document.body.dataset.title || (child?child.label:""));
    var desc  = lang==="en" ? (document.body.dataset.descEn||document.body.dataset.desc||"") : (document.body.dataset.desc||"");
    var crumb = '<a href="/index.html">'+L(UI.ko.home,UI.en.home)+'</a>';
    if(group) crumb += '<span class="sep">›</span><a href="'+group.path+'">'+L(group.label,group.en)+'</a>';
    if(child) crumb += '<span class="sep">›</span><span class="cur">'+L(child.label,child.en)+'</span>';
    var sh = el('<section class="subhero"><div class="wrap"><div class="crumb">'+crumb+'</div>'+
      '<h1>'+title+'</h1>'+(desc?'<p>'+desc+'</p>':"")+'</div></section>');
    document.getElementById("siteHeader").after(sh);
  }

  /* ---------- FOOTER ---------- */
  function buildFooter(){
    var cols = MAP.map(function(g){
      var links = g.children.map(function(c){ return '<a href="'+c.path+'">'+L(c.label,c.en)+'</a>'; }).join("");
      return '<div><h4>'+L(g.label,g.en)+'</h4>'+links+'</div>';
    }).join("");
    var f = el('<footer id="siteFooter"><div class="wrap foot">'+
      '<div class="fbrand"><img src="'+S.logoEmblem+'" alt="'+S.name+'">'+
        '<p style="color:#fff;font-weight:700;font-size:16px">'+S.name+' <span style="color:var(--gold);font-weight:400;font-size:13px">'+S.nameEn+'</span></p>'+
        '<p>'+L(S.slogan,S.sloganEn)+'</p>'+
        '<p>'+L(UI.ko.phoneLabel,UI.en.phoneLabel)+' '+S.phone+' · '+S.email+'</p>'+
        '<p>'+L(S.address,S.addressEn)+'</p>'+
        '<p>'+(lang==="en"?"CEO ":"대표 ")+S.ceo+'</p>'+
      '</div>'+
      '<div class="foot-cols">'+cols+'</div>'+
    '</div>'+
    '<div class="wrap copy"><span>© '+(new Date().getFullYear())+' '+S.name+' ('+S.nameEn+'). '+L(UI.ko.allRights,UI.en.allRights)+'</span>'+
      '<span>사업자등록번호 '+S.bizno+'</span></div></footer>');
    document.body.appendChild(f);

    document.body.appendChild(el('<a href="/support/contact.html" class="btn btn-gold float-cta">'+L(UI.ko.float,UI.en.float)+'</a>'));
  }

  /* ---------- 설정값 주입 ([data-cfg="phone"] 등) ---------- */
  function injectConfig(){
    document.querySelectorAll("[data-cfg]").forEach(function(n){
      var k=n.dataset.cfg, v=S[k];
      if(k==="address") v=L(S.address,S.addressEn);
      if(k==="hours")   v=L(S.hours,S.hoursEn);
      if(v!=null){ if(n.tagName==="A"&&k==="phone"){ n.href="tel:"+S.phone.replace(/[^0-9]/g,""); n.textContent=v; } else n.textContent=v; }
    });
    document.querySelectorAll('a[data-tel]').forEach(function(a){ a.href="tel:"+S.phone.replace(/[^0-9]/g,""); });
  }

  /* ---------- 언어 ([data-en] 속성으로 영문 제공) ---------- */
  var cache={};
  function applyLang(){
    document.querySelectorAll("[data-en]").forEach(function(n,i){
      if(cache[i]===undefined) cache[i]=n.innerHTML;
      n.innerHTML = (lang==="en") ? n.getAttribute("data-en") : cache[i];
    });
    document.querySelectorAll("[data-ph-en]").forEach(function(n){
      if(!n._phko) n._phko=n.getAttribute("placeholder")||"";
      n.setAttribute("placeholder", lang==="en"?n.getAttribute("data-ph-en"):n._phko);
    });
    document.documentElement.lang=lang;
  }
  function rerenderChrome(){
    var h=document.getElementById("siteHeader"); if(h) h.remove();
    var f=document.getElementById("siteFooter"); if(f) f.remove();
    var sh=document.querySelector(".subhero"); if(sh) sh.remove();
    document.querySelectorAll(".m-drawer,.m-backdrop,.float-cta").forEach(function(n){n.remove();});
    buildHeader(); buildSubhero(); buildFooter(); injectConfig();
  }
  window.setLang=function(l){ lang=l; localStorage.setItem("gachi_lang",l); applyLang(); rerenderChrome(); };

  /* ---------- reveal on scroll ---------- */
  function reveal(){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);} });},{threshold:.12});
    document.querySelectorAll(".reveal").forEach(function(n,i){ n.style.transitionDelay=(i%4*70)+"ms"; io.observe(n); });
  }

  /* ---------- 폼 데모 핸들러 ---------- */
  window.gachiSubmit=function(e){
    e.preventDefault();
    alert(lang==="en"?"Thank you! Your inquiry has been received. We'll contact you within 1 business day.":
      "감사합니다! 상담 신청이 접수되었습니다. 영업일 기준 1일 이내에 연락드리겠습니다.");
    e.target.reset(); return false;
  };

  /* ---------- init ---------- */
  function drawIcons(){ if(window.lucide && lucide.createIcons) try{ lucide.createIcons(); }catch(e){} }
  window.gachiIcons = drawIcons;
  document.addEventListener("DOMContentLoaded",function(){
    buildHeader(); buildSubhero(); buildFooter(); injectConfig(); applyLang(); reveal(); drawIcons();
  });
})();
