/* =====================================================================
   가치 홈페이지 — 콘텐츠 / 설정 파일
   ★ 이 파일만 수정하면 회사정보·연락처·로고·메뉴를 한 번에 바꿀 수 있습니다.
   ===================================================================== */

/* ---------- 1. 회사 기본 정보 (여기만 바꾸면 전체 사이트에 반영) ---------- */
window.SITE = {
  name:       "주식회사 가치",
  nameEn:     "gachi co., ltd.",
  slogan:     "신뢰 위에 가치를 더하다.",
  sloganEn:   "Adding Value upon Trust.",
  intro:      "정부지원사업부터 각종 인증·인허가까지, 복잡한 행정 절차를 One-Stop으로 해결하는 전문 행정업무 대행 에이전시입니다.",
  introEn:    "A professional administrative agency handling everything from government support programs to certifications and licensing — all in one stop.",

  ceo:        "연제광",             // 대표자
  corpNo:     "160111-0073505",     // 법인등록번호
  estDate:    "2025년 12월 12일",   // 개업연월일

  phone:      "1533-2512",          // 대표번호
  email:      "contact@gachi.co.kr",
  address:    "대전광역시 유성구 은구비남로33번길 13-8, 322호 (지족동, 양지빌딩)",
  addressEn:  "Rm 322, 13-8, Eunguibinam-ro 33beon-gil, Yuseong-gu, Daejeon, Korea",
  bizno:      "406-81-67284",       // 사업자등록번호
  hours:      "평일 09:00 - 18:00 (점심 12:00-13:00)",
  hoursEn:    "Weekdays 09:00 - 18:00",

  /* 로고 / 슬로건 이미지 경로 — 파일을 교체하거나 경로만 바꾸면 됩니다 */
  logoEmblem: "/assets/img/logo-emblem.png",   // 금색 엠블럼 (배경 투명)
  sloganImg:  "/assets/img/slogan.png",         // 슬로건 이미지 (배경 투명)
};

/* ---------- 2. 사이트맵 / 내비게이션 (메뉴 구조) ---------- */
/* label: 한글, en: 영문, path: 페이지 경로 (사이트 루트 기준 절대경로) */
window.SITEMAP = [
  { id:"company", label:"회사소개", en:"About", path:"/company/about.html", children:[
    { label:"가치 소개",       en:"Overview",  path:"/company/about.html" },
    { label:"회사 연혁",       en:"History",   path:"/company/history.html" },
    { label:"인사말",          en:"CEO Message", path:"/company/ceo.html" },
    { label:"뉴스",            en:"News",      path:"/company/news.html" },
    { label:"찾아오시는 길",   en:"Location",  path:"/company/location.html" },
  ]},
  { id:"admin", label:"행정업무", en:"Administrative", path:"/admin/gov-support.html", children:[
    { label:"정부지원사업",            en:"Gov't Support",   path:"/admin/gov-support.html" },
    { label:"ISMS-P · 위치정보사업",   en:"ISMS-P",          path:"/admin/isms-p.html" },
    { label:"공공조달 · 입찰",         en:"Procurement",     path:"/admin/procurement.html" },
    { label:"기업인증",                en:"Certification",   path:"/admin/certification.html" },
    { label:"KC인증",                  en:"KC Cert.",        path:"/admin/kc.html" },
    { label:"법인설립 및 인허가",      en:"Incorporation",   path:"/admin/incorporation.html" },
    { label:"비자 · 출입국",           en:"Visa",            path:"/admin/visa.html" },
  ]},
  { id:"service", label:"서비스", en:"Services", path:"/service/ansim.html", children:[
    { label:"안심알리미 소개",          en:"Ansim Almi",      path:"/service/ansim.html" },
    { label:"스쿨톡",                  en:"SchoolTalk",      path:"/service/schooltalk.html" },
    { label:"서비스 이용약관",          en:"Terms of Service", path:"/service/terms-service.html" },
    { label:"위치기반서비스 이용약관",  en:"LBS Terms",       path:"/service/terms-location.html" },
    { label:"개인정보처리방침",         en:"Privacy Policy",  path:"/service/privacy.html" },
  ]},
  { id:"product", label:"제품", en:"Products", path:"/product/enerpac.html", children:[
    { label:"에너팩 제품소개",          en:"Enerpac",         path:"/product/enerpac.html" },
  ]},
  { id:"support", label:"고객센터", en:"Support", path:"/support/notice.html", children:[
    { label:"공지사항",                en:"Notice",          path:"/support/notice.html" },
    { label:"상담문의",                en:"Contact",         path:"/support/contact.html" },
  ]},
];

/* ---------- 3. 공통 UI 텍스트 (한/영) ---------- */
window.I18N_UI = {
  ko:{ cta:"상담신청", consult:"무료 상담 신청", more:"자세히 보기", home:"홈",
       quickHome:"바로가기", quickSvc:"주요 서비스", allRights:"All rights reserved.",
       float:"💬 상담신청", call:"전화상담", phoneLabel:"대표번호" },
  en:{ cta:"Contact", consult:"Free Consultation", more:"Learn more", home:"Home",
       quickHome:"Quick Links", quickSvc:"Key Services", allRights:"All rights reserved.",
       float:"💬 Contact", call:"Call", phoneLabel:"Tel" },
};
