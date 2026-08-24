/* ENERPAC 제품목록.xlsx 파싱 + 이미지 다운로드 + enerpac.json 생성
   실행: node build/fetch-enerpac.js  (1회성 데이터 준비용) */
const fs = require("fs");
const path = require("path");
const http = require("http");

const UNPACK = process.argv[2]; // 압축 푼 xlsx 폴더 경로
const ROOT = path.join(__dirname, "..");
const IMGDIR = path.join(ROOT, "assets", "img", "products", "enerpac");
const JSONOUT = path.join(ROOT, "assets", "data", "enerpac.json");

/* 제품 순서에 맞춘 슬러그 (파일명/식별용) */
const SLUGS = ["intro","bhp","gps","mps","sgm","sg","torque-wrench","electric-pump",
  "hand-pump","electric-economy-pump","puller","wedge-spread","nut-splitter","air-pump",
  "double-acting-jack","center-hole-jack","aluminium-jack","single-acting-jack",
  "low-height-jack","flat-jack"];

/* ---- 1. sharedStrings 파싱 ---- */
const ss = fs.readFileSync(path.join(UNPACK,"xl","sharedStrings.xml"),"utf8");
const strings = [];
ss.replace(/<t[^>]*>([\s\S]*?)<\/t>/g, function(_,t){
  strings.push(t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'"));
  return _;
});

/* ---- 2. sheet1 셀 파싱 ---- */
const sheet = fs.readFileSync(path.join(UNPACK,"xl","worksheets","sheet1.xml"),"utf8");
const cells = {}; // {A3: value}
sheet.replace(/<c r="([A-Z]+\d+)"[^>]*?(?:\st="s")?>\s*<v>(\d+)<\/v>\s*<\/c>/g, function(m, ref, v){
  // t="s" 인 셀만 문자열 매핑 (숫자셀은 제외되어도 이 데이터엔 문자열뿐)
  if(/t="s"/.test(m)) cells[ref] = strings[parseInt(v,10)];
  return m;
});

/* ---- 3. 제품 그룹핑 (A=모델, B=대표, C=세부; 병합으로 연속행) ---- */
function col(letter,row){ return cells[letter+row]; }
const products = [];
let cur = null;
for(let r=3; r<=48; r++){
  const a = col("A",r), b = col("B",r), c = col("C",r);
  if(a){ cur = { name:a, thumb:b||"", details: [] }; products.push(cur); if(c) cur.details.push(c); }
  else if(cur && c){ cur.details.push(c); }
}
if(products.length !== SLUGS.length){
  console.error("경고: 제품 수 "+products.length+" != 슬러그 "+SLUGS.length);
}
products.forEach((p,i)=> p.slug = SLUGS[i] || ("p"+(i+1)));

/* ---- 4. 다운로드 목록 구성 (도메인 ASCII로 통일) ---- */
function ascii(u){ return u.replace("영재기술.nasoft.kr","youngjaetech.nasoft.kr"); }
function ext(u){ const m = u.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i); return m ? m[1].toLowerCase() : "jpg"; }

const jobs = [];
const catalog = [];
products.forEach(function(p){
  const item = { name:p.name, slug:p.slug, thumb:"", details:[] };
  if(p.thumb){ const fn = p.slug+"-t."+ext(p.thumb); item.thumb = "/assets/img/products/enerpac/"+fn; jobs.push({url:ascii(p.thumb), file:path.join(IMGDIR,fn)}); }
  p.details.forEach(function(d,i){ const fn = p.slug+"-d"+(i+1)+"."+ext(d); item.details.push("/assets/img/products/enerpac/"+fn); jobs.push({url:ascii(d), file:path.join(IMGDIR,fn)}); });
  catalog.push(item);
});

/* ---- 5. 다운로드 (동시 5개) ---- */
fs.mkdirSync(IMGDIR,{recursive:true});
function download(job){
  return new Promise(function(resolve){
    const f = fs.createWriteStream(job.file);
    const req = http.get(job.url, {headers:{"User-Agent":"Mozilla/5.0"}}, function(res){
      if(res.statusCode !== 200){ f.close(); fs.unlink(job.file,()=>{}); console.error("FAIL "+res.statusCode+" "+job.url); return resolve(false); }
      res.pipe(f); f.on("finish", function(){ f.close(function(){ resolve(true); }); });
    });
    req.on("error", function(e){ f.close(); fs.unlink(job.file,()=>{}); console.error("ERR "+e.message+" "+job.url); resolve(false); });
    req.setTimeout(20000, function(){ req.destroy(); resolve(false); });
  });
}
(async function(){
  let ok=0, fail=0, idx=0;
  const CONC=5;
  async function worker(){ while(idx<jobs.length){ const j=jobs[idx++]; const r=await download(j); r?ok++:fail++; } }
  await Promise.all(Array.from({length:CONC},worker));
  fs.mkdirSync(path.dirname(JSONOUT),{recursive:true});
  fs.writeFileSync(JSONOUT, JSON.stringify({products:catalog}, null, 2), "utf8");
  console.log("제품 "+catalog.length+"개 / 이미지 성공 "+ok+" 실패 "+fail);
  console.log("JSON: "+JSONOUT);
})();
