# 주식회사 가치 (gachi co., ltd.) 홈페이지

전문 행정업무 대행 에이전시 **주식회사 가치**의 정적(static) 웹사이트입니다.
빌드 도구 없이 순수 HTML / CSS / JavaScript 로 동작합니다.

## 로컬 실행
루트 절대경로(`/assets/...`)를 사용하므로 **반드시 웹 서버로 실행**해야 합니다. (`file://` 로 직접 열면 동작하지 않음)

```bash
npx serve -l 4321 .
# 또는
python -m http.server 4321
```
→ http://localhost:4321

## 콘텐츠 수정 위치
| 무엇을 | 어디서 |
|--------|--------|
| 회사정보·대표번호·주소·로고 경로 | `assets/js/content.js` 의 `SITE` |
| 메뉴 구성 | `assets/js/content.js` 의 `SITEMAP` |
| 공지사항 | `assets/data/notices.json` |
| 각 페이지 내용 | 해당 HTML, 또는 `build/gen-pages.js` 수정 후 `node build/gen-pages.js` |
| 디자인(색/폰트) | `assets/css/style.css` 상단 `:root` |
| 아이콘 | `<i data-lucide='이름'></i>` ([lucide.dev](https://lucide.dev)) |

## 하위 페이지 재생성
```bash
node build/gen-pages.js
```

## 배포 (중요)
사이트가 **루트 절대경로**를 사용하므로, 사이트 루트(`/`)에서 서빙되는 호스트를 사용해야 합니다.
**Cloudflare Pages / Netlify / Vercel** 권장 (무료, 루트 서빙, HTTPS, 자동 배포).
GitHub Pages 프로젝트 페이지(`/repo/` 하위 경로)는 절대경로가 깨지므로 권장하지 않습니다.
