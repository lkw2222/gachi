/* =====================================================================
   공지사항 — notices.json 기반 목록 / 상세 렌더링 (무서버)
   ?id=숫자 가 있으면 상세, 없으면 목록을 그립니다.
   ===================================================================== */
(function () {
  "use strict";
  var MOUNT = "noticeApp";
  var DATA_URL = "/assets/data/notices.json";

  function fmtDate(s) { return (s || "").replace(/-/g, "."); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  function sortNotices(list) {
    return list.slice().sort(function (a, b) {
      if (!!b.pinned - !!a.pinned) return (!!b.pinned) - (!!a.pinned);
      return (b.date || "").localeCompare(a.date || "");
    });
  }

  function renderList(list) {
    if (!list.length) return '<p style="color:var(--muted)">등록된 공지사항이 없습니다.</p>';
    var rows = list.map(function (n) {
      var badge = n.category ? '<span class="badge">' + esc(n.category) + "</span>" : "";
      return '<a class="row" href="?id=' + n.id + '">' +
        '<span class="num">' + (n.pinned ? "<i data-lucide='pin' style='width:16px;height:16px;color:var(--gold)'></i>" : n.id) + "</span>" +
        '<span class="ttl">' + badge + esc(n.title) + "</span>" +
        '<span class="date">' + fmtDate(n.date) + "</span></a>";
    }).join("");
    return '<div class="list-board">' + rows + "</div>";
  }

  function navLink(lbl, n) {
    if (!n) return '<span><span class="lbl">' + lbl + '</span><span class="t" style="color:var(--muted)">없음</span></span>';
    return '<a href="?id=' + n.id + '"><span class="lbl">' + lbl + '</span><span class="t">' + esc(n.title) + "</span></a>";
  }

  function renderDetail(list, id) {
    var idx = list.findIndex(function (n) { return String(n.id) === String(id); });
    if (idx < 0) {
      return '<div class="notice-detail"><h2>존재하지 않는 공지입니다.</h2><div class="notice-back"><a class="btn btn-navy" href="?">목록으로</a></div></div>';
    }
    var n = list[idx];
    var badge = n.category ? '<span class="badge">' + esc(n.category) + "</span>" : "";
    var newer = list[idx - 1]; // 정렬상 위(최신)
    var older = list[idx + 1];
    return '<div class="notice-detail">' +
      '<div class="nd-head"><h2>' + esc(n.title) + "</h2>" +
      '<div class="meta">' + badge + "<span>" + fmtDate(n.date) + "</span></div></div>" +
      '<div class="notice-body prose">' + (n.content || "") + "</div>" +
      '<div class="notice-nav">' + navLink("이전", newer) + navLink("다음", older) + "</div>" +
      '<div class="notice-back"><a class="btn btn-navy" href="?">목록으로 →</a></div></div>';
  }

  function render(data) {
    var el = document.getElementById(MOUNT);
    if (!el) return;
    var list = sortNotices((data && data.notices) || []);
    var id = new URLSearchParams(location.search).get("id");
    el.innerHTML = id ? renderDetail(list, id) : renderList(list);
    if (window.gachiIcons) window.gachiIcons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById(MOUNT);
    if (!el) return;
    fetch(DATA_URL, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () { el.innerHTML = '<p style="color:var(--muted)">공지사항을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>'; });
  });

  // 뒤로가기/앞으로가기 대응
  window.addEventListener("popstate", function () {
    fetch(DATA_URL, { cache: "no-store" }).then(function (r) { return r.json(); }).then(render).catch(function () {});
  });
})();
