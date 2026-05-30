/* 이모지 → Lucide 아이콘 태그 일괄 치환. node build/replace-emojis.js
   index.html 과 build/gen-pages.js 의 아이콘용 이모지를 <i data-lucide='name'></i> 로 바�É니다.
   (속성은 작은따옴표 → 큰따옴표 JS 문자열 안에서도 안전) */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const MAP = {
  "🔄": "refresh-cw", "🤝": "handshake", "⚡": "zap", "📈": "trending-up",
  "🏛️": "landmark", "🔐": "shield-check", "📋": "clipboard-list", "🏆": "award",
  "✅": "badge-check", "🏢": "building-2", "🌐": "globe",
  "📞": "phone", "✉️": "mail", "📍": "map-pin", "🕘": "clock",
  "🔬": "flask-conical", "🏭": "factory", "📊": "bar-chart-3", "🚀": "rocket",
  "📣": "megaphone", "🧭": "compass",
  "🛡️": "shield-check", "🔒": "lock", "📡": "radio", "⚖️": "scale", "🔁": "repeat",
  "🗂️": "folder-open", "📦": "package", "🔍": "search", "📝": "file-pen", "🏅": "medal",
  "💡": "lightbulb", "⚙️": "settings", "📐": "ruler",
  "🧾": "receipt", "🛒": "shopping-cart", "📚": "book-open",
  "🛂": "stamp", "📜": "scroll-text", "👥": "users", "🏠": "house",
  "🎯": "target", "🌟": "star", "💎": "gem",
  "🏫": "school", "💳": "credit-card", "🔔": "bell", "📨": "send", "📱": "smartphone",
  "⏱️": "timer", "📲": "smartphone", "👨‍👩‍👧": "users-round", "🔗": "link",
  "📳": "activity", "🌡️": "thermometer", "📄": "file-text",
  "🧪": "test-tube", "🔧": "wrench", "🗺️": "map",
};

function tag(name) { return "<i data-lucide='" + name + "'></i>"; }

const files = ["index.html", "build/gen-pages.js"];
let total = 0;
for (const rel of files) {
  const fp = path.join(ROOT, rel);
  let txt = fs.readFileSync(fp, "utf8");
  let n = 0;
  // 긴 이모지(ZWJ/VS16)부터 치환하여 부분매칭 방지
  const keys = Object.keys(MAP).sort((a, b) => b.length - a.length);
  for (const emo of keys) {
    const parts = txt.split(emo);
    if (parts.length > 1) { n += parts.length - 1; txt = parts.join(tag(MAP[emo])); }
  }
  fs.writeFileSync(fp, txt, "utf8");
  total += n;
  console.log(rel + ": " + n + " replaced");
}
console.log("total " + total + " replaced");
