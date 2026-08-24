/* =====================================================================
   에너팩 제품 — enerpac.json 기반 그리드 + 라이트박스(세부이미지 갤러리)
   ===================================================================== */
(function () {
  "use strict";
  var DATA_URL = "/assets/data/enerpac.json";
  var lb, lbImg, lbTitle, lbCount, lbPrev, lbNext;
  var gallery = [], gIdx = 0;

  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c];}); }

  /* 모델명 표시: 영문 + (한글) 분리 스타일 */
  function fmtName(n){
    var m = n.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if(m) return esc(m[1]) + ' <span style="color:var(--muted);font-weight:600">('+esc(m[2])+')</span>';
    return esc(n);
  }

  /* ---- 인트로(첫 항목) ---- */
  function renderIntro(p){
    var host = document.getElementById("enerpacIntro");
    if(!host) return;
    host.innerHTML =
      '<div class="prod-intro">'+
        '<div class="pi-img"><img src="'+p.thumb+'" alt="ENERPAC" loading="lazy"></div>'+
        '<div>'+
          '<div class="brand">ENERPAC</div>'+
          '<h2>산업 현장이 신뢰하는<br>유압 공구, 에너팩</h2>'+
          '<p>에너팩(ENERPAC)은 전 세계 산업 현장에서 사용되는 유압 공구 전문 브랜드입니다. 유압 실린더·펌프·유압잭·토크렌치 등 높은 내구성과 정밀도를 갖춘 제품으로 안전하고 효율적인 작업을 지원합니다.</p>'+
          (p.details && p.details.length ? '<button class="btn btn-gold" type="button" id="enerpacCatalog">전체 카탈로그 보기 ('+p.details.length+') →</button>' : '')+
        '</div>'+
      '</div>';
    var b = document.getElementById("enerpacCatalog");
    if(b) b.addEventListener("click", function(){ openLightbox(p.details, "ENERPAC 카탈로그"); });
  }

  /* ---- 제품 그리드 ---- */
  function renderGrid(list){
    var host = document.getElementById("enerpacGrid");
    if(!host) return;
    host.innerHTML = list.map(function(p, i){
      return '<button class="prod-card reveal" type="button" data-i="'+i+'">'+
        '<div class="prod-thumb"><img src="'+p.thumb+'" alt="'+esc(p.name)+'" loading="lazy"></div>'+
        '<div class="prod-meta"><span class="nm">'+fmtName(p.name)+'</span>'+
          '<span class="more">상세 사양 보기 →</span></div>'+
      '</button>';
    }).join("");
    host.querySelectorAll(".prod-card").forEach(function(card){
      card.addEventListener("click", function(){
        var p = list[+card.dataset.i];
        var imgs = (p.details && p.details.length) ? p.details : [p.thumb];
        openLightbox(imgs, p.name);
      });
    });
  }

  /* ---- 라이트박스 ---- */
  function buildLightbox(){
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<div class="lb-bar"><div><span class="lb-title"></span><span class="lb-count"></span></div>'+
        '<button class="lb-close" type="button" aria-label="닫기">×</button></div>'+
      '<div class="lb-stage"><div class="lb-spinner"></div><img alt=""></div>'+
      '<button class="lb-nav lb-prev" type="button" aria-label="이전">‹</button>'+
      '<button class="lb-nav lb-next" type="button" aria-label="다음">›</button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector(".lb-stage img");
    lbTitle = lb.querySelector(".lb-title");
    lbCount = lb.querySelector(".lb-count");
    lbPrev = lb.querySelector(".lb-prev");
    lbNext = lb.querySelector(".lb-next");
    lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function(){ show(gIdx-1); });
    lbNext.addEventListener("click", function(){ show(gIdx+1); });
    lb.addEventListener("click", function(e){ if(e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function(e){
      if(!lb.classList.contains("open")) return;
      if(e.key === "Escape") closeLightbox();
      else if(e.key === "ArrowLeft") show(gIdx-1);
      else if(e.key === "ArrowRight") show(gIdx+1);
    });
  }
  function show(i){
    if(i < 0 || i >= gallery.length) return;
    gIdx = i;
    var stage = lb.querySelector(".lb-stage");
    stage.classList.add("loading");                 // 로딩 스피너 표시
    lbImg.onload = function(){ stage.classList.remove("loading"); };
    lbImg.onerror = function(){ stage.classList.remove("loading"); };
    lbImg.src = gallery[i];
    if(lbImg.complete && lbImg.naturalWidth > 0) stage.classList.remove("loading"); // 캐시된 경우
    stage.scrollTop = 0;
    lbCount.textContent = gallery.length > 1 ? (i+1) + " / " + gallery.length : "";
    lbPrev.disabled = (i === 0);
    lbNext.disabled = (i === gallery.length-1);
  }
  function openLightbox(imgs, title){
    gallery = imgs.slice(); gIdx = 0;
    lbTitle.textContent = title || "";
    show(0);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function(){
    if(!document.getElementById("enerpacGrid")) return;
    buildLightbox();
    fetch(DATA_URL, {cache:"no-store"})
      .then(function(r){ return r.json(); })
      .then(function(data){
        var ps = (data && data.products) || [];
        if(ps.length){ renderIntro(ps[0]); renderGrid(ps.slice(1)); }
        if(window.gachiIcons) window.gachiIcons();
        // reveal 재적용
        var io = new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.1});
        document.querySelectorAll("#enerpacGrid .reveal").forEach(function(n){ io.observe(n); });
      })
      .catch(function(){
        var g = document.getElementById("enerpacGrid");
        if(g) g.innerHTML = '<p style="color:var(--muted)">제품 목록을 불러오지 못했습니다.</p>';
      });
  });
})();
