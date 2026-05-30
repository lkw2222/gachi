/* 하위 페이지 생성기 — node build/gen-pages.js 로 실행.
   페이지 내용을 수정하려면 이 파일의 PAGES 객체를 고치고 다시 실행하거나,
   생성된 각 HTML 파일을 직접 편집하면 됩니다. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

/* ---- 공통 셸 ---- */
function shell({ title, desc, descEn, body }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | 주식회사 가치</title>
<meta name="description" content="${desc}" />
<link rel="stylesheet" href="/assets/css/style.css" />
<script src="/assets/js/content.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" defer></script>
<script src="/assets/js/site.js" defer></script>
</head>
<body data-title="${title}" data-desc="${desc}"${descEn ? ` data-desc-en="${descEn}"` : ""}>
${body}
</body>
</html>
`;
}

/* ---- 조각 헬퍼 ---- */
const sec = (inner, cls = "") => `<section class="sec ${cls}"><div class="wrap">${inner}</div></section>`;
const lead = (ko, en) => `<p class="lead-p reveal"${en ? ` data-en="${en}"` : ""}>${ko}</p>`;
const head = (tag, h, hEn, p, pEn) =>
  `<div class="sec-head reveal"><span class="tag">${tag}</span><h2${hEn ? ` data-en="${hEn}"` : ""}>${h}</h2>${p ? `<p${pEn ? ` data-en="${pEn}"` : ""}>${p}</p>` : ""}</div>`;
const feats = (arr) =>
  `<div class="feat-grid">${arr.map(f => `<div class="feat reveal"><div class="ic">${f.i}</div><h3>${f.h}</h3><p>${f.p}</p></div>`).join("")}</div>`;
const table = (cols, rows) =>
  `<table class="tbl reveal"><thead><tr>${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const process4 = (steps) =>
  `<div class="process">${steps.map((s, i) => `<div class="step reveal"><div class="circle">0${i + 1}</div><h3>${s.h}</h3><p>${s.p}</p></div>`).join("")}</div>`;
const ctaBand = () => sec(
  `<div class="sec-head center reveal" style="margin-bottom:24px"><h2 data-en="Need a Free Consultation?">전문 상담이 필요하신가요?</h2><p data-en="Our experts will find the optimal solution for you.">전문 컨설턴트가 고객님께 최적의 솔루션을 제안해 드립니다.</p></div>
   <div style="text-align:center"><a class="btn btn-gold" href="/support/contact.html" data-en="Request a Consultation →">상담 신청하기 →</a> <a class="btn btn-navy" data-tel href="#" data-en="Call 1533-2512">대표번호 1533-2512</a></div>`,
  "sec-soft");
const draft = () => `<div class="draft-note reveal">📌 이 페이지는 초안입니다. 실제 내용으로 자유롭게 수정하세요. (콘텐츠는 이 HTML 파일에서 바로 편집 가능합니다)</div>`;

/* 표준 행정업무 페이지 구성 */
function adminPage({ tag, lead: ld, ldEn, fHead, fSub, fitems, tCols, tRows, steps }) {
  return sec(
    head(tag, fHead, "", fSub) + lead(ld, ldEn) + feats(fitems)
  ) +
    sec(head("Details", "세부 지원 분야", "", "분야별 상세 지원 내용입니다.") + table(tCols, tRows), "sec-soft") +
    sec(head("Process", "진행 절차", "", "체계적인 단계별 프로세스로 진행합니다.") + process4(steps)) +
    ctaBand();
}

const PAGES = {};

/* ===================== 1. 회사소개 ===================== */
PAGES["company/about.html"] = {
  title: "가치 소개", desc: "주식회사 가치를 소개합니다.", descEn: "About gachi co., ltd.",
  body:
    sec(
      head("About gachi", "신뢰 위에 가치를 더하다", "Adding Value upon Trust", "주식회사 가치는 복잡한 행정 절차를 One-Stop으로 해결하는 전문 행정업무 대행 에이전시입니다.") +
      lead("주식회사 가치는 정부지원사업, 각종 인증·인허가, 공공조달, 출입국 행정까지 기업이 마주하는 복잡한 행정 업무를 한 곳에서 해결합니다. 분야별 전문가 네트워크와 풍부한 실무 경험을 바탕으로, 고객이 본업에 집중할 수 있도록 신뢰할 수 있는 행정 파트너가 되겠습니다.",
        "gachi handles the complex administrative tasks businesses face — from government support programs and certifications to public procurement and immigration — all in one place.") +
      feats([
        { i: "<i data-lucide='refresh-cw'></i>", h: "One-Stop 솔루션", p: "상담부터 신청·사후관리까지 모든 과정을 한 번에 처리합니다." },
        { i: "<i data-lucide='handshake'></i>", h: "전문 네트워크", p: "각 분야 전문가와 협업하여 정확하고 신뢰도 높은 결과를 제공합니다." },
        { i: "<i data-lucide='zap'></i>", h: "신속·정확", p: "고객 상황에 최적화된 전략으로 빠르고 정확하게 지원합니다." },
        { i: "<i data-lucide='trending-up'></i>", h: "성장 파트너", p: "단순 대행을 넘어 고객의 지속 성장을 함께하는 동반자입니다." },
      ])
    ) +
    sec(head("Mission", "미션 & 비전", "", "고객의 가치를 실현하는 행정 전문 기업") +
      `<div class="feat-grid"><div class="feat reveal"><div class="ic"><i data-lucide='target'></i></div><h3>Mission</h3><p>복잡한 행정을 단순하게, 고객의 시간을 가치 있게 만듭니다.</p></div>
       <div class="feat reveal"><div class="ic"><i data-lucide='star'></i></div><h3>Vision</h3><p>대한민국 대표 행정업무 종합 솔루션 기업으로 성장합니다.</p></div>
       <div class="feat reveal"><div class="ic"><i data-lucide='gem'></i></div><h3>Core Value</h3><p>신뢰 · 전문성 · 실행력으로 고객의 가치를 더합니다.</p></div></div>`, "sec-soft") +
    sec(head("Overview", "회사 개요", "", "") + table(["구분", "내용"], [
      ["법인명", "주식회사 가치 (gachi co., ltd.)"],
      ["대표자", '<span data-cfg="ceo"></span>'],
      ["설립일", '<span data-cfg="estDate"></span>'],
      ["사업자등록번호", '<span data-cfg="bizno"></span>'],
      ["소재지", '<span data-cfg="address"></span>'],
      ["대표번호", '<span data-cfg="phone"></span>'],
      ["사업분야", "경영컨설팅 · 정부지원/인증/인허가 행정대행 · 정보통신(소프트웨어) · 교육서비스"],
    ])) +
    ctaBand(),
};

PAGES["company/history.html"] = {
  title: "회사 연혁", desc: "주식회사 가치의 성장 발자취입니다.", descEn: "Our history.",
  body: sec(draft() + head("History", "회사 연혁", "", "주식회사 가치가 걸어온 길입니다. (실제 연혁으로 수정해주세요)") +
    `<div class="timeline">
      <div class="tl-item reveal"><div class="yr">2026</div><ul><li>기업 홈페이지 구축 및 서비스 영역 확대</li><li>안심알리미·스쿨톡 서비스 운영</li></ul></div>
      <div class="tl-item reveal"><div class="yr">2025.12</div><ul><li>주식회사 가치 설립 (대전광역시 유성구)</li><li>정부지원사업·기업인증, 공공조달·입찰, 법인설립·인허가 등 행정업무 대행 서비스 개시</li></ul></div>
    </div>`),
};

PAGES["company/ceo.html"] = {
  title: "인사말", desc: "CEO 인사말입니다.", descEn: "CEO message.",
  body: sec(
    `<div class="prose reveal" style="max-width:820px">
      <p style="font-size:22px;font-weight:800;color:var(--navy);line-height:1.4">전문 행정업무 대행 에이전시,<br>행정업무 혁신의 중심 <span class="accent">주식회사 가치</span>가 함께하겠습니다.</p>
      <p>안녕하십니까. 주식회사 가치를 찾아주신 고객 여러분께 진심으로 감사드립니다.</p>
      <p>국가 사회 발전과 함께 기업을 둘러싼 행정 환경은 날로 복잡해지고 있습니다. 다양한 정부지원사업과 인증·인허가 제도는 기업에게 큰 기회이지만, 그 절차와 요건을 정확히 이해하고 대응하기란 결코 쉽지 않습니다.</p>
      <p>주식회사 가치는 이러한 고객의 어려움을 함께 고민하고 해결하기 위해 설립되었습니다. 정부지원사업, ISMS-P·위치정보, 공공조달·입찰, 기업인증, KC인증, 법인설립·인허가, 비자·출입국에 이르기까지 — 분야별 전문성을 바탕으로 고객 맞춤형 One-Stop 행정 서비스를 제공합니다.</p>
      <p>저희는 단순한 대행을 넘어, 고객의 성장을 함께하는 든든한 파트너가 되고자 합니다. 신뢰 위에 가치를 더하는 기업, 주식회사 가치가 늘 함께하겠습니다. 감사합니다.</p>
      <p style="text-align:right;font-weight:700;color:var(--navy)">주식회사 가치 대표이사 <span class="accent">연제광</span></p>
    </div>`
  ) + ctaBand(),
};

PAGES["company/news.html"] = {
  title: "뉴스", desc: "주식회사 가치의 소식입니다.", descEn: "News.",
  body: sec(draft() + head("News", "뉴스 / 보도자료", "", "주식회사 가치의 최신 소식을 전해드립니다.") +
    `<div class="list-board reveal">
      <div class="row"><span class="num">3</span><span class="ttl"><span class="badge">공지</span>2026년 정부지원사업 통합공고 안내</span><span class="date">2026.05.20</span></div>
      <div class="row"><span class="num">2</span><span class="ttl"><span class="badge">소식</span>안심알리미 서비스 정식 오픈</span><span class="date">2026.04.10</span></div>
      <div class="row"><span class="num">1</span><span class="ttl"><span class="badge">소식</span>주식회사 가치 홈페이지 오픈</span><span class="date">2026.03.02</span></div>
    </div>`),
};

PAGES["company/location.html"] = {
  title: "찾아오시는 길", desc: "주식회사 가치 오시는 길 안내입니다.", descEn: "How to find us.",
  body: sec(
    head("Location", "찾아오시는 길", "", "방문 전 연락 주시면 더욱 편리하게 안내해 드립니다.") +
    `<a class="map-figure reveal" href="https://map.naver.com/p/search/${encodeURIComponent("대전광역시 유성구 은구비남로33번길 13-8 양지빌딩")}" target="_blank" rel="noopener">
      <span class="map-pin-badge"><i data-lucide='map-pin'></i> 주식회사 가치 (양지빌딩 322호)</span>
      <img src="/assets/img/map.png" alt="주식회사 가치 위치 지도 — 대전광역시 유성구 은구비남로33번길 13-8, 양지빌딩 322호" />
      <span class="map-hint"><i data-lucide='external-link'></i> 네이버지도에서 크게 보기</span>
    </a>` +
    `<div style="margin-top:26px">${table(["구분", "내용"], [
      ["주소", '<span data-cfg="address"></span>'],
      ["대표번호", '<span data-cfg="phone"></span>'],
      ["이메일", '<span data-cfg="email"></span>'],
      ["운영시간", '<span data-cfg="hours"></span>'],
      ["사업자등록번호", '<span data-cfg="bizno"></span>'],
      ["대표자", '<span data-cfg="ceo"></span>'],
      ["교통편", "대전도시철도 1호선 <strong>노은역</strong> 인근, 양지빌딩 322호 · 방문 전 연락 주시면 자세히 안내해 드립니다."],
    ])}</div>`
  ) + ctaBand(),
};

/* ===================== 2. 행정업무 ===================== */
PAGES["admin/gov-support.html"] = {
  title: "정부지원사업", desc: "R&D·시설·경영·창업·마케팅 등 기업 맞춤형 정부지원사업을 발굴·신청합니다.",
  descEn: "We identify and apply for tailored government support programs.",
  body: adminPage({
    tag: "Gov't Support", fHead: "기업 맞춤형 정부지원사업", fSub: "복잡한 정부지원사업, 발굴부터 사업계획서 작성·신청·사후관리까지 전 과정을 지원합니다.",
    lead: "중소기업·소상공인·예비창업자를 위한 다양한 정부지원사업의 자격을 진단하고, 사업 목적에 맞는 사업을 발굴하여 사업계획서 작성과 신청, 선정 이후 사후관리까지 책임지고 지원합니다.",
    ldEn: "We diagnose eligibility for various government programs and support the entire process from discovery to proposal writing, application, and follow-up.",
    fitems: [
      { i: "<i data-lucide='flask-conical'></i>", h: "R&D 연구개발", p: "기술개발·R&D 과제 발굴 및 사업계획서 작성 지원" },
      { i: "<i data-lucide='factory'></i>", h: "시설 지원", p: "생산시설·장비 도입 등 시설자금 지원사업 매칭" },
      { i: "<i data-lucide='bar-chart-3'></i>", h: "경영 지원", p: "경영안정·운전자금 등 경영 분야 지원사업 안내" },
      { i: "<i data-lucide='rocket'></i>", h: "창업·벤처", p: "예비창업패키지 등 창업 단계별 지원사업 연계" },
      { i: "<i data-lucide='megaphone'></i>", h: "마케팅·판로", p: "마케팅·수출·판로개척 연계 지원사업 발굴" },
      { i: "<i data-lucide='compass'></i>", h: "맞춤 컨설팅", p: "기업 현황 진단 후 최적 지원사업 포트폴리오 제안" },
    ],
    tCols: ["지원 분야", "주요 내용"],
    tRows: [
      ["R&D 연구개발 지원사업", "기술개발 과제, 정부 R&D 매칭, 사업계획서 작성 및 발표 지원"],
      ["시설 지원사업", "생산설비·시설자금, 스마트공장 등 시설 도입 지원"],
      ["경영 사업 지원사업", "경영안정자금, 운전자금 등 경영 분야 정책자금 안내"],
      ["창업·벤처 지원사업", "예비창업패키지, 초기창업패키지 등 창업 지원"],
      ["마케팅·판로 연계", "온·오프라인 마케팅, 수출바우처, 판로개척 지원"],
    ],
    steps: [
      { h: "현황 진단", p: "기업 상황과 자격요건을 분석합니다." },
      { h: "사업 발굴", p: "목적에 맞는 지원사업을 발굴합니다." },
      { h: "신청·작성", p: "사업계획서 작성과 신청을 대행합니다." },
      { h: "사후관리", p: "선정 후 정산·관리까지 지원합니다." },
    ],
  }),
};

PAGES["admin/isms-p.html"] = {
  title: "ISMS-P · 위치정보사업", desc: "ISMS-P 인증, 개인정보보호, 위치정보사업 신고·허가를 체계적으로 컨설팅합니다.",
  descEn: "ISMS-P certification, privacy protection, and location-based business registration.",
  body: adminPage({
    tag: "Info Security", fHead: "정보보호 · 위치정보사업", fSub: "정보보호 및 위치정보서비스 사업의 법적·기술적 요구사항을 충족하도록 체계적으로 지원합니다.",
    lead: "ISMS-P 인증 취득과 개인정보보호 체계 구축, 위치정보사업 신고·허가까지 — 검증된 전문성과 체계적인 관리로 안전하고 신뢰할 수 있는 인증·허가를 지원합니다.",
    ldEn: "From ISMS-P certification to privacy systems and location-based business registration, we provide trusted, systematic support.",
    fitems: [
      { i: "<i data-lucide='shield-check'></i>", h: "ISMS-P 인증", p: "정보보호 및 개인정보보호 관리체계 인증 취득 지원" },
      { i: "<i data-lucide='lock'></i>", h: "개인정보보호", p: "개인정보 보호체계 구축 및 정기 점검·자문" },
      { i: "<i data-lucide='radio'></i>", h: "위치정보사업", p: "위치정보사업 신고·허가 및 위치기반서비스 신고" },
      { i: "<i data-lucide='clipboard-list'></i>", h: "체계 컨설팅", p: "설계부터 인증, 사후관리까지 체계적 컨설팅" },
      { i: "<i data-lucide='scale'></i>", h: "법령 준수", p: "관련 법령·기준 준수 점검 및 대응 지원" },
      { i: "<i data-lucide='repeat'></i>", h: "지속 관리", p: "인증 취득 후 사후관리 및 갱신 지원" },
    ],
    tCols: ["지원 분야", "주요 내용"],
    tRows: [
      ["ISMS-P 인증", "현황 진단, 정보보호 정책 수립, 위험분석, 인증심사 대응"],
      ["개인정보보호", "보호체계 구축, 개인정보 영향평가, 정기 점검"],
      ["위치정보사업 신고·허가", "사업 신고·허가 요건 검토 및 서류 작성·신청"],
      ["위치기반서비스 신고", "LBS 신고 요건 검토 및 신고 대행"],
    ],
    steps: [
      { h: "현황 진단", p: "정보보호 수준과 요건을 진단합니다." },
      { h: "체계 수립", p: "정책·관리체계를 설계·구축합니다." },
      { h: "심사·신고", p: "인증심사·신고 절차를 대응합니다." },
      { h: "사후관리", p: "취득 후 점검·갱신을 지원합니다." },
    ],
  }),
};

PAGES["admin/procurement.html"] = {
  title: "공공조달 · 입찰", desc: "나라장터(KONEPS) 등록부터 공공기관 입찰까지 전 과정을 지원합니다.",
  descEn: "From KONEPS registration to public bidding, we support the entire process.",
  body: adminPage({
    tag: "Procurement", fHead: "공공조달 · 입찰", fSub: "나라장터 등록부터 입찰 공고 분석, 서류 작성, 낙찰 후 계약까지 공공조달 전 과정을 지원합니다.",
    lead: "나라장터(KONEPS) 등록과 조달청 물품·용역 등록, 입찰 자격 진단부터 공고 분석·서류 작성·낙찰 관리까지 — 공공기관 입찰 업무의 전 과정을 체계적으로 지원합니다.",
    ldEn: "We support the full public procurement process — from KONEPS registration to bid analysis, documentation, and contract management.",
    fitems: [
      { i: "<i data-lucide='folder-open'></i>", h: "조달 등록", p: "나라장터(KONEPS) 입찰 참가자격 등록 지원" },
      { i: "<i data-lucide='package'></i>", h: "물품 등록", p: "조달청 물품·용역 종합쇼핑몰 등록 지원" },
      { i: "<i data-lucide='search'></i>", h: "입찰 공고 분석", p: "참여 가능 공고 검색 및 자격·요건 분석" },
      { i: "<i data-lucide='file-pen'></i>", h: "서류 작성", p: "입찰 제안서·서류 작성 및 제출 대행" },
      { i: "<i data-lucide='handshake'></i>", h: "낙찰·계약", p: "낙찰 후 계약 체결 및 이행 관리 지원" },
      { i: "<i data-lucide='medal'></i>", h: "우수조달", p: "우수조달물품·혁신제품 지정 신청 지원" },
    ],
    tCols: ["지원 분야", "주요 내용"],
    tRows: [
      ["입찰 참가자격 등록", "나라장터 등록, 인증서 발급, 업종·면허 확인"],
      ["조달청 물품 등록", "종합쇼핑몰 등록, 다수공급자계약(MAS) 지원"],
      ["입찰 참여 지원", "공고 분석, 제안서 작성, 적격심사 대응"],
      ["우수조달·혁신제품", "우수조달물품·혁신제품 지정 신청 컨설팅"],
    ],
    steps: [
      { h: "자격 진단", p: "입찰 참여 자격을 진단합니다." },
      { h: "등록 대행", p: "나라장터·조달 등록을 대행합니다." },
      { h: "입찰 지원", p: "공고 분석과 서류 작성을 지원합니다." },
      { h: "계약 관리", p: "낙찰 후 계약·이행을 관리합니다." },
    ],
  }),
};

PAGES["admin/certification.html"] = {
  title: "기업인증", desc: "벤처·이노비즈·메인비즈·ISO·기업부설연구소 등 기업인증 취득을 지원합니다.",
  descEn: "Support for Venture, Inno-Biz, Main-Biz, ISO, and R&D center certifications.",
  body: adminPage({
    tag: "Certification", fHead: "기업인증", fSub: "기업의 신뢰도와 경쟁력을 높이는 다양한 기업인증을 신속·정확하게 취득하도록 지원합니다.",
    lead: "벤처기업확인, 이노비즈, 메인비즈, 경영시스템(ISO) 인증, 기업부설연구소 등 — 전문 컨설팅을 통해 인증을 신속·정확하게 취득하고, 정부지원·입찰 가점과 금융·세제 혜택까지 연계할 수 있도록 지원합니다.",
    ldEn: "We help you obtain Venture, Inno-Biz, Main-Biz, ISO, and corporate R&D center certifications quickly and accurately.",
    fitems: [
      { i: "<i data-lucide='rocket'></i>", h: "벤처기업확인", p: "기술·사업성 평가 기반 벤처기업 확인 지원" },
      { i: "<i data-lucide='lightbulb'></i>", h: "이노비즈", p: "기술혁신형 중소기업(Inno-Biz) 인증 지원" },
      { i: "<i data-lucide='settings'></i>", h: "메인비즈", p: "경영혁신형 중소기업(Main-Biz) 인증 지원" },
      { i: "<i data-lucide='ruler'></i>", h: "ISO 인증", p: "ISO 9001·14001 등 경영시스템 인증 지원" },
      { i: "<i data-lucide='flask-conical'></i>", h: "기업부설연구소", p: "기업부설연구소·연구개발전담부서 설립 지원" },
      { i: "<i data-lucide='building-2'></i>", h: "기타 인증", p: "여성·장애인·사회적기업 등 기타 인증 지원" },
    ],
    tCols: ["인증", "기대 효과"],
    tRows: [
      ["벤처기업확인", "정부지원사업 가점, 세제 감면, 코스닥 상장 특례"],
      ["이노비즈 / 메인비즈", "정책자금 우대, 입찰 가점, 기업 신뢰도 향상"],
      ["경영시스템(ISO)", "품질·환경 경영 체계 확립, 거래·입찰 신뢰 확보"],
      ["기업부설연구소", "R&D 세액공제, 연구인력 지원, 정부과제 참여"],
    ],
    steps: [
      { h: "상담·진단", p: "인증 요건과 취득 가능성을 진단합니다." },
      { h: "서류 준비", p: "필요 서류와 증빙을 준비합니다." },
      { h: "심사 대응", p: "신청과 현장·서면 심사를 대응합니다." },
      { h: "사후관리", p: "취득 후 갱신·변경을 관리합니다." },
    ],
  }),
};

PAGES["admin/kc.html"] = {
  title: "KC인증", desc: "안전확인·자율안전확인 등 제품 KC인증(인형뽑기 기계 등) 취득을 지원합니다.",
  descEn: "Product KC certification incl. arcade claw machines.",
  body: adminPage({
    tag: "KC Certification", fHead: "KC인증", fSub: "제품의 안전성 확보와 시장 유통을 위한 필수 인증, KC인증 취득을 처음부터 끝까지 지원합니다.",
    lead: "KC인증은 제품의 안전성 확보와 시장 유통을 위한 필수 인증입니다. 인형뽑기 기계 등 제품의 특성과 법적 요구사항을 정확히 분석하여, 최적의 인증전략 수립부터 시험·인증, 사후관리까지 One-Stop으로 지원합니다.",
    ldEn: "We support product KC certification — from strategy to testing, certification, and follow-up.",
    fitems: [
      { i: "<i data-lucide='shield-check'></i>", h: "안전확인", p: "안전확인 대상 제품의 시험·신고 지원" },
      { i: "<i data-lucide='badge-check'></i>", h: "자율안전확인", p: "자율안전확인 대상 제품 신고 지원" },
      { i: "<i data-lucide='file-text'></i>", h: "공급자적합성", p: "공급자적합성확인 대상 제품 대응" },
      { i: "<i data-lucide='search'></i>", h: "대상 검토", p: "제품의 KC인증 대상 여부 사전 검토" },
      { i: "<i data-lucide='test-tube'></i>", h: "시험·검사", p: "공인시험기관 연계 시험·검사 지원" },
      { i: "<i data-lucide='repeat'></i>", h: "사후관리", p: "인증 후 변경·갱신 등 사후관리 지원" },
    ],
    tCols: ["인증 유형", "내용"],
    tRows: [
      ["안전확인", "안전확인 대상 제품의 시험성적서 확보 및 신고"],
      ["자율안전확인", "자율안전확인 대상 제품의 자가확인·신고"],
      ["공급자적합성확인", "공급자가 스스로 적합성 확인 후 표시"],
      ["대표 품목", "인형뽑기(크레인) 게임기 등 오락용 기계 외 다수"],
    ],
    steps: [
      { h: "상담·검토", p: "인증 대상 여부를 검토합니다." },
      { h: "전략 수립", p: "최적의 인증 절차를 안내합니다." },
      { h: "시험·신청", p: "시험·검사 및 인증 신청을 진행합니다." },
      { h: "취득·관리", p: "인증 취득 후 사후관리합니다." },
    ],
  }),
};

PAGES["admin/incorporation.html"] = {
  title: "법인설립 및 인허가", desc: "법인설립과 산업·환경·식품 등 각종 인·허가 대행 업무를 지원합니다.",
  descEn: "Company incorporation and various licensing services.",
  body: adminPage({
    tag: "Incorporation", fHead: "법인설립 및 인허가", fSub: "사업의 시작과 운영에 필요한 법인설립과 각종 인·허가 업무를 신속·정확하게 대행합니다.",
    lead: "상호·정관·자본금 결정부터 법인 등기, 사업자등록까지 — 그리고 업종별로 요구되는 산업·정보통신·온라인쇼핑몰·교육 등 각종 인·허가 업무를 신속하고 정확하게 대행합니다.",
    ldEn: "From incorporation to business registration and industry-specific licensing, we handle it all quickly and accurately.",
    fitems: [
      { i: "<i data-lucide='building-2'></i>", h: "법인설립", p: "상호·정관·자본금 결정 및 법인 등기 대행" },
      { i: "<i data-lucide='receipt'></i>", h: "사업자등록", p: "사업자등록 및 각종 신고 업무 지원" },
      { i: "<i data-lucide='factory'></i>", h: "산업 인허가", p: "제조·산업 분야 인·허가 요건 검토·신청" },
      { i: "<i data-lucide='radio'></i>", h: "정보통신", p: "부가통신사업 신고 등 정보통신 인허가" },
      { i: "<i data-lucide='shopping-cart'></i>", h: "온라인쇼핑몰", p: "통신판매업 신고 등 전자상거래 인허가" },
      { i: "<i data-lucide='book-open'></i>", h: "교육·기타", p: "학원 등 교육 및 기타 업종 인허가 지원" },
    ],
    tCols: ["업무", "주요 내용"],
    tRows: [
      ["법인설립", "발기인·정관 작성, 자본금 납입, 설립등기, 법인 인감"],
      ["사업자등록", "사업자등록 신청, 업종 코드 선정, 세무 신고 안내"],
      ["산업·환경·식품", "공장설립, 환경·식품 영업허가 등 인·허가 대행"],
      ["통신·전자상거래", "부가통신·통신판매업 신고 등"],
    ],
    steps: [
      { h: "상담·설계", p: "사업 형태와 인허가 요건을 설계합니다." },
      { h: "서류 준비", p: "정관·신청서 등 서류를 준비합니다." },
      { h: "등기·신청", p: "법인 등기와 인허가 신청을 진행합니다." },
      { h: "사후 지원", p: "변경·추가 인허가를 지원합니다." },
    ],
  }),
};

PAGES["admin/visa.html"] = {
  title: "비자 · 출입국", desc: "E-7 비자 등 외국인 채용·체류 관련 출입국 행정 업무를 지원합니다.",
  descEn: "Immigration administration incl. E-7 visas.",
  body: adminPage({
    tag: "Visa & Immigration", fHead: "비자 · 출입국", fSub: "외국인 인력 채용과 체류, 사증 발급까지 복잡한 출입국 행정 업무를 정확하게 지원합니다.",
    lead: "외국인 인력 채용을 위한 사증발급인정서 신청부터 체류자격 변경·연장, E-7(특정활동) 등 비자 발급까지 — 복잡한 출입국 행정 절차를 정확하고 신속하게 지원합니다.",
    ldEn: "From visa issuance certificates to status changes and E-7 visas, we handle complex immigration procedures accurately.",
    fitems: [
      { i: "<i data-lucide='stamp'></i>", h: "비자 발급", p: "E-7 등 취업·체류 비자 발급 지원" },
      { i: "<i data-lucide='refresh-cw'></i>", h: "체류자격 변경", p: "체류자격 변경·연장 신청 대행" },
      { i: "<i data-lucide='scroll-text'></i>", h: "사증발급인정서", p: "외국인 초청을 위한 사증발급인정서 신청" },
      { i: "<i data-lucide='users'></i>", h: "외국인 채용", p: "외국인 고용 절차 및 행정 지원" },
      { i: "<i data-lucide='house'></i>", h: "체류 행정", p: "외국인등록·재입국 등 체류 관련 행정" },
      { i: "<i data-lucide='compass'></i>", h: "맞춤 상담", p: "기업·개인 상황별 비자 전략 상담" },
    ],
    tCols: ["비자 유형", "주요 대상"],
    tRows: [
      ["E-7 (특정활동)", "전문 인력·숙련 기능 인력 등 특정 직종 취업"],
      ["D-8 (기업투자)", "외국인 투자기업의 경영·관리·생산 인력"],
      ["D-9 (무역경영)", "무역·수출입 등 경영 활동 인력"],
      ["F-2 / F-5 / F-6", "거주·영주·결혼이민 등 체류자격"],
    ],
    steps: [
      { h: "상담·진단", p: "체류·채용 요건을 진단합니다." },
      { h: "서류 준비", p: "비자·신청 서류를 준비합니다." },
      { h: "신청·접수", p: "출입국·재외공관 신청을 진행합니다." },
      { h: "사후 지원", p: "연장·변경 등 사후관리합니다." },
    ],
  }),
};

/* ===================== 3. 서비스 ===================== */
PAGES["service/ansim.html"] = {
  title: "안심알리미 소개", desc: "부모님이 안심하고 자녀를 학교에 보낼 수 있도록 등·하교 상황을 알려주는 알림 서비스입니다.",
  descEn: "A notification service that lets parents send their children to school with peace of mind by reporting arrival and departure.",
  body: sec(
      head("Ansim Almi", "안심알리미란?", "", "부모님이 안심하고 자녀를 학교에 보낼 수 있도록 등·하교 상황을 알려주는 알림 서비스입니다.") +
      lead("안심알리미는 학생이 학교 출입구에 설치된 리더기에 카드를 태그하면, 자녀의 등·하교 정보가 부모님께 실시간으로 전달되는 안심 알림 서비스입니다. 학교와 학부모를 연결하여 자녀의 안전한 등·하교를 함께 지킵니다.",
        "When a student tags their card on a reader installed at the school entrance, the child's arrival and departure information is delivered to parents in real time.") +
      feats([
        { i: "<i data-lucide='school'></i>", h: "출입구 리더기 설치", p: "각 학교별 출입구에 카드 인식 리더기를 설치합니다." },
        { i: "<i data-lucide='credit-card'></i>", h: "학생별 카드 발급", p: "학생별 안심 카드를 발급·배포하여 등·하교 시 태그합니다." },
        { i: "<i data-lucide='bell'></i>", h: "실시간 등·하교 알림", p: "자녀의 등·하교 정보를 보호자에게 실시간으로 알려드립니다." },
        { i: "<i data-lucide='send'></i>", h: "통신문 발송·수거", p: "각 학교별 가정통신문 발송 및 수거 업무를 지원합니다." },
        { i: "<i data-lucide='shield-check'></i>", h: "설치 후 안전성 검사", p: "설치 후 안전성 검사 및 테스트로 안정적 운영을 보장합니다." },
        { i: "<i data-lucide='smartphone'></i>", h: "스쿨톡 앱 연동", p: "앱·문자 서비스 ‘스쿨톡’과 연동되어 정보를 전송합니다." },
      ])
    ) +
    sec(
      head("Process", "안심알리미 도입 절차", "", "서비스 업체 선정부터 시행까지 체계적으로 진행됩니다.") +
      `<div class="ansim-flow reveal">
        <div class="af-node">안심알리미<span>서비스 업체 선정</span></div>
        <div class="af-arrow">›</div>
        <div class="af-mid">
          <div>각 학교별 통신문 발송 및 수거</div>
          <div>학생별 카드 발급 및 배포</div>
          <div>설치 후 안전성 검사 및 테스트</div>
          <div>각 학교별 출입구 리더기 설치</div>
        </div>
        <div class="af-arrow">›</div>
        <div class="af-node">안심알리미<span>서비스 시행</span></div>
      </div>`,
      "sec-soft"
    ) +
    sec(`<div class="sec-head center reveal" style="margin-bottom:24px"><h2>자녀의 안전한 등·하교, 안심알리미와 함께하세요</h2><p>도입을 원하시는 학교·기관은 언제든 문의해 주세요.</p></div>
      <div style="text-align:center"><a class="btn btn-gold" href="/service/schooltalk.html">스쿨톡 알아보기 →</a> <a class="btn btn-navy" data-tel href="#">대표번호 1533-2512</a></div>`),
};

PAGES["service/schooltalk.html"] = {
  title: "스쿨톡", desc: "자녀들의 등·하교 정보를 실시간으로 부모님께 알려드리는 앱 서비스입니다.",
  descEn: "An app service that delivers children's arrival and departure information to parents in real time.",
  body: sec(
      head("SchoolTalk", "스쿨톡", "", "자녀들의 등·하교 정보를 실시간으로 부모님들께 알려드리는 앱 서비스입니다.") +
      lead("스쿨톡은 앱 및 문자를 통해 학생의 등·하교 정보를 실시간으로 전송하는 서비스입니다. 자녀가 학교에 도착하고 하교하는 순간을 부모님께 즉시 알려드려, 멀리 있어도 안심할 수 있습니다.",
        "SchoolTalk delivers students' arrival and departure information to parents in real time via app and text message.") +
      feats([
        { i: "<i data-lucide='timer'></i>", h: "실시간 등·하교 알림", p: "학생의 등교·하교 시점을 실시간으로 알려드립니다." },
        { i: "<i data-lucide='smartphone'></i>", h: "앱 + 문자 전송", p: "스쿨톡 앱과 문자(SMS)를 통해 정보를 동시에 전송합니다." },
        { i: "<i data-lucide='users-round'></i>", h: "보호자 안심", p: "멀리 있어도 자녀의 등·하교를 바로 확인할 수 있습니다." },
        { i: "<i data-lucide='link'></i>", h: "안심알리미 연동", p: "출입구 리더기·카드 기반 안심알리미와 연동됩니다." },
      ])
    ) +
    sec(
      head("How it works", "이렇게 전송됩니다", "", "출입구 태그 한 번이면 부모님께 바로 전달됩니다.") +
      process4([
        { h: "카드 태그", p: "학생이 출입구 리더기에 카드를 태그합니다." },
        { h: "정보 인식", p: "리더기가 학생의 등·하교를 인식합니다." },
        { h: "실시간 전송", p: "앱·문자로 정보를 실시간 전송합니다." },
        { h: "보호자 수신", p: "부모님이 즉시 알림을 확인합니다." },
      ])
    ) +
    sec(`<div style="text-align:center"><a class="btn btn-gold" href="/service/ansim.html">안심알리미 소개 →</a> <a class="btn btn-navy" data-tel href="#">도입 문의 1533-2512</a></div>`, "sec-soft"),
};

const termsBody = (titleko) => sec(draft() +
  `<div class="prose reveal" style="max-width:860px">
    <h3>제1조 (목적)</h3><p>본 약관은 주식회사 가치(이하 "회사")가 제공하는 ${titleko} 관련 서비스의 이용 조건 및 절차, 회사와 이용자의 권리·의무·책임사항을 규정함을 목적으로 합니다. <strong>(실제 약관 전문으로 교체해주세요.)</strong></p>
    <h3>제2조 (정의)</h3><p>본 약관에서 사용하는 용어의 정의는 관련 법령 및 서비스 안내에서 정하는 바에 따릅니다.</p>
    <h3>제3조 (약관의 효력 및 변경)</h3><p>본 약관은 서비스 화면에 게시함으로써 효력이 발생하며, 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.</p>
    <h3>제4조 (서비스의 제공 및 변경)</h3><p>회사는 안정적인 서비스 제공을 위해 노력하며, 운영상·기술상 필요에 따라 서비스 내용을 변경할 수 있습니다.</p>
    <p style="color:var(--muted);font-size:13.5px">※ 본 내용은 표준 예시이며, 반드시 법무 검토를 거친 실제 약관으로 교체하시기 바랍니다.</p>
  </div>`);

PAGES["service/terms-service.html"] = { title: "서비스 이용약관", desc: "서비스 이용약관입니다.", descEn: "Terms of Service.", body: termsBody("서비스") };
PAGES["service/terms-location.html"] = { title: "위치기반서비스 이용약관", desc: "위치기반서비스 이용약관입니다.", descEn: "Location-Based Service Terms.", body: termsBody("위치기반") };
PAGES["service/privacy.html"] = {
  title: "개인정보처리방침", desc: "개인정보처리방침입니다.", descEn: "Privacy Policy.",
  body: sec(draft() +
    `<div class="prose reveal" style="max-width:860px">
      <p>주식회사 가치(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. <strong>(실제 방침으로 교체해주세요.)</strong></p>
      <h3>1. 수집하는 개인정보 항목</h3><ul><li>필수: 이름, 연락처, 이메일</li><li>선택: 회사명, 문의 내용</li></ul>
      <h3>2. 개인정보의 수집·이용 목적</h3><p>상담 신청 처리, 서비스 안내 및 문의 응대를 위해 이용합니다.</p>
      <h3>3. 개인정보의 보유·이용 기간</h3><p>수집·이용 목적 달성 후 관련 법령에 따른 기간 동안 보관 후 파기합니다.</p>
      <h3>4. 개인정보보호책임자</h3><p>책임자: ○○○ / 연락처: <span data-cfg="phone"></span></p>
      <p style="color:var(--muted);font-size:13.5px">※ 본 내용은 예시이며, 실제 운영에 맞는 방침으로 반드시 교체하시기 바랍니다.</p>
    </div>`),
};

/* ===================== 4. 제품 ===================== */
PAGES["product/enerpac.html"] = {
  title: "에너팩 제품소개", desc: "휴대용 진동측정기, 레이저 축정렬기 등 에너팩 제품을 소개합니다.",
  descEn: "Enerpac products: portable vibration meters, laser shaft aligners, and more.",
  body: sec(draft() + head("Products", "에너팩 (Enerpac)", "", "설비 진단·정비를 위한 정밀 측정 장비 브랜드, 에너팩 제품을 소개합니다.") +
    lead("에너팩은 휴대용 진동측정기, 레이저 축정렬기 등 설비의 상태 진단과 예지보전을 위한 정밀 측정 장비를 제공합니다. (실제 제품 정보·이미지로 수정해주세요.)") +
    feats([
      { i: "<i data-lucide='activity'></i>", h: "휴대용 진동측정기", p: "회전설비의 진동을 측정해 이상 징후를 조기에 진단합니다." },
      { i: "<i data-lucide='target'></i>", h: "레이저 축정렬기", p: "축정렬 상태를 정밀하게 측정·교정하여 설비 수명을 연장합니다." },
      { i: "<i data-lucide='thermometer'></i>", h: "기타 측정 장비", p: "온도·회전수 등 다양한 설비 진단 장비를 제공합니다." },
    ])) +
    sec(head("Lineup", "세부 제품", "", "세부 제품 라인업입니다. (실제 제품으로 교체)") +
      `<div class="services">
        <div class="svc reveal"><div class="ic"><i data-lucide='activity'></i></div><h3>진동측정기 모델 A</h3><p>휴대형 진동 측정·분석 장비. 상세 사양은 추후 업데이트.</p></div>
        <div class="svc reveal"><div class="ic"><i data-lucide='target'></i></div><h3>레이저 축정렬기 모델 B</h3><p>고정밀 축정렬 측정 장비. 상세 사양은 추후 업데이트.</p></div>
        <div class="svc reveal"><div class="ic"><i data-lucide='wrench'></i></div><h3>측정 액세서리</h3><p>센서·케이블 등 측정 부속품.</p></div>
      </div>`, "sec-soft") +
    sec(`<div style="text-align:center"><a class="btn btn-gold" href="/support/contact.html">제품 문의하기 →</a></div>`),
};

/* ===================== 5. 고객센터 ===================== */
PAGES["support/notice.html"] = {
  title: "공지사항", desc: "주식회사 가치 공지사항입니다.", descEn: "Notice.",
  body: sec(head("Notice", "공지사항", "", "주식회사 가치의 공지사항을 확인하세요.") +
    `<div id="noticeApp" class="reveal"><p style="color:var(--muted)">불러오는 중...</p></div>`) +
    `<script src="/assets/js/notices.js" defer></script>`,
};

PAGES["support/contact.html"] = {
  title: "상담문의", desc: "무료 상담을 신청하세요. 대표번호 1533-2512.",
  descEn: "Request a free consultation. Tel 1533-2512.",
  body: `<section class="sec contact"><div class="wrap grid">
    <div class="reveal">
      <span class="tag">Contact</span>
      <h2 data-en="Request a Free<br>Consultation">무료 상담을<br>신청하세요</h2>
      <p class="lead" data-en="Our experts solve your administrative challenges together. Leave your details and we'll contact you promptly.">행정업무 고민, 전문가가 함께 해결합니다. 아래 정보를 남겨주시면 빠르게 연락드리겠습니다.</p>
      <div class="info-list">
        <div class="row"><div class="ic"><i data-lucide='phone'></i></div><div><b data-en="Phone">대표번호</b><span data-cfg="phone"></span></div></div>
        <div class="row"><div class="ic"><i data-lucide='mail'></i></div><div><b data-en="Email">이메일</b><span data-cfg="email"></span></div></div>
        <div class="row"><div class="ic"><i data-lucide='map-pin'></i></div><div><b data-en="Address">오시는 길</b><span data-cfg="address"></span></div></div>
        <div class="row"><div class="ic"><i data-lucide='clock'></i></div><div><b data-en="Hours">상담 시간</b><span data-cfg="hours"></span></div></div>
      </div>
    </div>
    <form class="card reveal" onsubmit="return gachiSubmit(event)">
      <div class="two">
        <div class="field"><label data-en="Name *">이름 *</label><input name="name" required placeholder="홍길동" data-ph-en="John Doe" /></div>
        <div class="field"><label data-en="Company">회사명</label><input name="company" placeholder="(주)가치" data-ph-en="gachi co." /></div>
      </div>
      <div class="two">
        <div class="field"><label data-en="Phone *">연락처 *</label><input name="phone" required placeholder="010-0000-0000" /></div>
        <div class="field"><label data-en="Email">이메일</label><input name="email" type="email" placeholder="email@example.com" /></div>
      </div>
      <div class="field"><label data-en="Service of Interest">관심 서비스</label>
        <select name="service">
          <option data-en="Please select">선택해주세요</option>
          <option>정부지원사업</option><option>ISMS-P · 위치정보사업</option><option>공공조달 · 입찰</option>
          <option>기업인증</option><option>KC인증</option><option>법인설립 및 인허가</option>
          <option>비자 · 출입국</option><option>안심알리미 서비스</option><option>에너팩 제품</option>
        </select>
      </div>
      <div class="field"><label data-en="Message">문의 내용</label><textarea name="message" placeholder="문의하실 내용을 입력해주세요." data-ph-en="Tell us how we can help."></textarea></div>
      <button type="submit" class="btn btn-gold" data-en="Submit Inquiry">상담 신청하기</button>
      <p class="form-note" data-en="* We'll reach out within 1 business day.">* 제출 시 담당자가 영업일 기준 1일 이내에 연락드립니다.</p>
    </form>
  </div></section>`,
};

/* ---- 파일 쓰기 ---- */
let count = 0;
for (const rel in PAGES) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, shell(PAGES[rel]), "utf8");
  count++;
}
console.log("generated " + count + " pages");
