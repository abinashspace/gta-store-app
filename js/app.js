/* GTA Store — Apple Games–inspired app powered by GTA Hub (https://abinashspace.github.io/gta-hub/) */
'use strict';
const HUB = 'https://abinashspace.github.io/gta-hub/';
const SECTIONS = ['characters','missions','vehicles','weapons','cheats','locations','collectibles'];
const SEC = {
  characters:{icon:'user',inv:'Crew',verb:'Add to Crew',portrait:true},
  missions:{icon:'film',inv:'Mission Log',verb:'Add to Log'},
  vehicles:{icon:'car',inv:'Garage',verb:'Park in Garage'},
  weapons:{icon:'bolt',inv:'Armory',verb:'Add to Armory'},
  cheats:{icon:'key',inv:'Cheat Book',verb:'Bookmark'},
  locations:{icon:'pin',inv:'Safehouses',verb:'Pin'},
  collectibles:{icon:'gem',inv:'Stash',verb:'Add to Stash'}
};
const PATHS = {
  user:'<circle cx="12" cy="8.5" r="3.2"/><path d="M5.2 19a6.8 6.8 0 0 1 13.6 0"/>',
  film:'<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6v12M16 6v12M4 10h16M4 14h16"/>',
  car:'<path d="M4 14v3h2.2M18 17h2v-3M5 14l1.6-4.2A2 2 0 0 1 8.5 8.5h7a2 2 0 0 1 1.9 1.3L19 14M7 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM4.5 14h15"/>',
  bolt:'<path d="M13 3 5.5 13.5h6L11 21l7.5-10.5h-6L13 3Z"/>',
  key:'<circle cx="8.5" cy="12" r="3.2"/><path d="M11.5 12H20v2.2M17 12v2.2"/>',
  pin:'<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/>',
  gem:'<path d="M12 3 4.5 9.5 12 21l7.5-11.5L12 3Zm-7.5 6.5h15M8.2 3.8 4.5 9.5 12 3M15.8 3.8 19.5 9.5 12 3"/>',
  lock:'<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11"/>',
  plus:'<path d="M12 6v12M6 12h12"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  star:'<path d="m12 3 2.4 5.6L20.5 9.5 16 13.6 17.3 20 12 16.8 6.7 20 8 13.6 3.5 9.5l6.1-.9L12 3Z"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 2"/>',
  flag:'<path d="M6 4v16M6 5h11l-2 4 2 4H6"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.2"/>',
  dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/>',
  list:'<path d="M8 7h12M8 12h12M8 17h12M4 7h0M4 12h0M4 17h0"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 5h10v4a5 5 0 0 1-10 0V5Z"/><path d="M7 6H5a3 3 0 0 0 3 5M17 6h2a3 3 0 0 1-3 5"/>',
  book:'<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5V5.5ZM19 18H7.5A2.5 2.5 0 0 0 5 20.5"/>',
  radio:'<circle cx="12" cy="15" r="4"/><path d="M8 6.5 18 4M12 11V8"/>',
  map:'<path d="m8 5 8-2v16l-8 2V5ZM8 5 4 7v16l4-2M16 3l4 2v16l-4-2"/>'
};
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const img = p => p ? HUB + p : '';
const isReal = p => !!p && !/\.svg$/i.test(p);
const today = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const money = n => typeof n==='number' ? '$'+n.toLocaleString('en-US') : esc(n);
const accentOf = g => (g && g.accent) || '#0a84ff';
function ico(n, s=20){
  return `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${PATHS[n]||''}</svg>`;
}
function pic(p, alt='', extra=''){
  const src=img(p);
  if(!src) return `<span class="img-ph"></span>`;
  return `<img ${extra} src="${src}" alt="${esc(alt)}">`;
}
function ring(pct, size=36, sw=3){
  const r=(size/2)-sw, c=2*Math.PI*r, off=c*(1-Math.max(0,Math.min(1,pct/100)));
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle class="trk" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${sw}"/><circle class="val" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${sw}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/></svg>`;
}

/* ---------------- data ---------------- */
const DB = { index:null, games:{}, compare:null, timeline:null, search:null, list:[], era:{} };
async function getJSON(path){ const r = await fetch(HUB+path); if(!r.ok) throw new Error(path+' '+r.status); return r.json(); }
async function loadAll(onProg){
  const [index, compare, timeline] = await Promise.all([getJSON('data/index.json'), getJSON('data/cross/compare.json'), getJSON('data/cross/timeline.json')]);
  DB.index = index; DB.compare = compare; DB.timeline = timeline;
  DB.list = [...index.games].sort((a,b)=>a.order-b.order);
  compare.games.forEach(g => DB.era[g.slug] = {key:g.eraKey, name:g.era, setting:g.setting});
  let done = 0; onProg(0, DB.list.length);
  await Promise.all(DB.list.map(g => getJSON(g.links.data).then(b => { DB.games[g.slug]=b; onProg(++done, DB.list.length); })));
}
const game = s => DB.list.find(g=>g.slug===s);
const items = (s, sec) => DB.games[s]?.[sec]?.items || [];
const recName = (sec, it) => sec==='cheats' ? it.effect : it.name;
const findRec = (s, sec, id) => items(s,sec).find(i=>i.id===id);
const allRecs = sec => DB.list.flatMap(g => items(g.slug, sec).map(it => ({g, it})));
const cover = g => DB.games[g.slug]?.meta?.images?.cover;
const banner = g => DB.games[g.slug]?.meta?.images?.banner;
const total = s => SECTIONS.reduce((n,sec)=>n+items(s,sec).length,0);

/* ---------------- player state ---------------- */
const KEY = 'gtaStore.v1';
const blank = () => ({xp:0, seen:{}, favs:{}, games:{}, library:{}, quiz:{answered:0, correct:0, bestCombo:0, sessions:0}, streak:{last:null,count:0,best:0}, daily:{date:null,prog:{},done:{}}, ach:{}, heat:{v:0,t:Date.now()}, cnt:{copy:0, search:0, timeline:0, compare:0, cheatsAll:0}, eras:{}});
let P = (()=>{ try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)||'{}')); } catch { return blank(); } })();
const save = () => localStorage.setItem(KEY, JSON.stringify(P));
const lvlFloor = L => 50*L*(L-1);
const level = xp => { let L=1; while(xp >= lvlFloor(L+1)) L++; return L; };
const RANKS = [[1,'Wannabe'],[2,'Street Punk'],[4,'Hustler'],[6,'Soldier'],[9,'Enforcer'],[12,'Lieutenant'],[16,'Underboss'],[21,'Kingpin']];
const rank = L => RANKS.filter(r=>L>=r[0]).pop()[1];
function heat(){ const mins=(Date.now()-P.heat.t)/60000; return Math.max(0, Math.min(5, P.heat.v - mins*0.5)); }
function addHeat(v){ const h=heat(); P.heat={v:Math.min(5,h+v),t:Date.now()}; if(Math.floor(P.heat.v)>=5) unlockCheck(); }

/* daily missions */
const DAILY_POOL = [
  {id:'v5',ico:'car',t:'Boost 5 rides',d:'Inspect 5 vehicles',ev:'view:vehicles',n:5,xp:80},
  {id:'w3',ico:'bolt',t:'Ammu-Nation run',d:'Inspect 3 weapons',ev:'view:weapons',n:3,xp:60},
  {id:'c3',ico:'user',t:'Meet the crew',d:'Inspect 3 characters',ev:'view:characters',n:3,xp:60},
  {id:'m5',ico:'film',t:'Story mode',d:'Read 5 missions',ev:'view:missions',n:5,xp:80},
  {id:'l2',ico:'pin',t:'Sightseeing',d:'Visit 2 locations',ev:'view:locations',n:2,xp:50},
  {id:'q3',ico:'target',t:'Pull off a heist',d:'Get 3 quiz answers right',ev:'quiz',n:3,xp:100},
  {id:'f2',ico:'star',t:'Fill the garage',d:'Collect 2 records',ev:'fav',n:2,xp:60},
  {id:'ch1',ico:'key',t:'HESOYAM',d:'Copy a cheat code',ev:'copy',n:1,xp:40},
  {id:'g2',ico:'flag',t:'Island hopper',d:'Open 2 different games',ev:'game',n:2,xp:60},
  {id:'s1',ico:'search',t:'Snitch',d:'Search the database',ev:'search',n:1,xp:30},
];
function dailyToday(){
  const d=today(); if(P.daily.date!==d){ P.daily={date:d,prog:{},done:{}}; save(); }
  let seed=[...d].reduce((a,c)=>a*31+c.charCodeAt(0)>>>0,7);
  const pool=[...DAILY_POOL], out=[];
  while(out.length<3){ seed=(seed*1103515245+12345)>>>0; out.push(pool.splice(seed%pool.length,1)[0]); }
  return out;
}

/* achievements */
const seenIn = sec => Object.keys(P.seen).filter(k=>k.split('/')[1]===sec).length;
const favCount = () => Object.keys(P.favs).length;
const ACH = [
  {id:'first',t:'Fresh Off the Bus',d:'Inspect your first record',f:()=>[Object.keys(P.seen).length,1]},
  {id:'tour5',t:'Tourist',d:'Open 5 different games',f:()=>[Object.keys(P.games).length,5]},
  {id:'tourall',t:'Globetrotter',d:'Open all 17 games',f:()=>[Object.keys(P.games).length,DB.list.length||17]},
  {id:'eras',t:'Multiverse',d:'Explore a 2D, 3D and HD Universe game',f:()=>[['2d','3d','hd'].filter(e=>P.eras[e]).length,3]},
  {id:'veh50',t:'Gearhead',d:'Inspect 50 vehicles',f:()=>[seenIn('vehicles'),50]},
  {id:'wep25',t:'Gun Nut',d:'Inspect 25 weapons',f:()=>[seenIn('weapons'),25]},
  {id:'chr25',t:'Networker',d:'Inspect 25 characters',f:()=>[seenIn('characters'),25]},
  {id:'mis50',t:'Mission Junkie',d:'Read 50 missions',f:()=>[seenIn('missions'),50]},
  {id:'loc20',t:'Postcard Collector',d:'Visit 20 locations',f:()=>[seenIn('locations'),20]},
  {id:'cheat5',t:'Dirty Cheater',d:'Copy 5 cheat codes',f:()=>[P.cnt.copy,5]},
  {id:'fav10',t:'Collector',d:'Collect 10 records',f:()=>[favCount(),10]},
  {id:'fav50',t:'Hoarder',d:'Collect 50 records',f:()=>[favCount(),50]},
  {id:'lib5',t:'Box Set',d:'Add 5 games to your library',f:()=>[Object.keys(P.library).length,5]},
  {id:'q10',t:'Rookie Heister',d:'10 correct quiz answers',f:()=>[P.quiz.correct,10]},
  {id:'q100',t:'Big Score',d:'100 correct quiz answers',f:()=>[P.quiz.correct,100]},
  {id:'combo8',t:'Perfect Heist',d:'Hit an 8x answer combo',f:()=>[P.quiz.bestCombo,8]},
  {id:'streak3',t:'Regular',d:'3-day login streak',f:()=>[P.streak.best,3]},
  {id:'streak7',t:'Made Man',d:'7-day login streak',f:()=>[P.streak.best,7]},
  {id:'wanted',t:'Five Star Fugitive',d:'Reach a 5-star wanted level',f:()=>[Math.floor(heat()),5]},
  {id:'hist',t:'Historian',d:'Open the timeline and the compare board',f:()=>[(P.cnt.timeline?1:0)+(P.cnt.compare?1:0),2]},
  {id:'sec100',t:'100% Completion',d:'Inspect every record in any one game section',f:()=>[DB.list.some(g=>SECTIONS.some(sec=>{const it=items(g.slug,sec);return it.length>=3&&it.every(r=>P.seen[`${g.slug}/${sec}/${r.id}`]);}))?1:0,1]},
  {id:'lvl5',t:'Hustler',d:'Reach level 5',f:()=>[level(P.xp),5]},
  {id:'lvl12',t:'Lieutenant',d:'Reach level 12',f:()=>[level(P.xp),12]},
];
function unlockCheck(){
  if(!DB.list.length) return;
  for(const a of ACH){ if(P.ach[a.id]) continue; const [c,n]=a.f(); if(c>=n){ P.ach[a.id]=Date.now(); save(); queueFx(()=>bigFx('Achievement Unlocked', a.t)); gainXP(150,'Achievement',true); } }
}

/* xp + events */
function gainXP(n, why, quiet){
  const before=level(P.xp); P.xp+=n; save();
  if(!quiet) toast(`+${n} XP · ${why}`,'xp');
  const after=level(P.xp);
  if(after>before) queueFx(()=>bigFx('Level Up', `Level ${after} · ${rank(after)}`));
  hud();
}
function track(ev){
  const ds=dailyToday();
  for(const m of ds){ if(P.daily.done[m.id]) continue; if(m.ev===ev){ P.daily.prog[m.id]=(P.daily.prog[m.id]||0)+1; if(P.daily.prog[m.id]>=m.n){ P.daily.done[m.id]=1; save(); queueFx(()=>bigFx('Mission Complete', m.t)); gainXP(m.xp,'Daily mission',true);} } }
  save(); unlockCheck(); hud();
}
function touchStreak(){
  const d=today(); if(P.streak.last===d) return;
  const y=new Date(); y.setDate(y.getDate()-1);
  const yd=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}`;
  P.streak.count = P.streak.last===yd ? P.streak.count+1 : 1; P.streak.last=d; P.streak.best=Math.max(P.streak.best,P.streak.count);
  save(); if(P.streak.count>1) setTimeout(()=>toast(`${P.streak.count}-day streak · +${20*Math.min(P.streak.count,7)} XP`,'xp'),900);
  gainXP(20*Math.min(P.streak.count,7),'Daily login',true);
}
function markSeen(s, sec, id){
  const k=`${s}/${sec}/${id}`; if(P.seen[k]) return;
  P.seen[k]=Date.now(); addHeat(.35); gainXP(10, `New ${sec.replace(/s$/,'')}`); track('view:'+sec);
}
function visitGame(s){
  if(!P.games[s]){ P.games[s]=Date.now(); const e=DB.era[s]?.key; if(e) P.eras[e]=1; gainXP(25,'New game discovered'); track('game'); }
  else { P.games[s]=Date.now(); save(); }
}
function toggleFav(k){
  if(P.favs[k]){ delete P.favs[k]; save(); toast('Removed from library'); }
  else { P.favs[k]=Date.now(); addHeat(.4); gainXP(5,'Collected'); track('fav'); }
  hud();
}
function gameProgress(s){ const t=total(s); if(!t) return 0; const n=Object.keys(P.seen).filter(k=>k.startsWith(s+'/')).length; return Math.round(100*n/t); }

/* ---------------- fx ---------------- */
let fxQ=[], fxBusy=false;
function queueFx(f){ fxQ.push(f); if(!fxBusy) runFx(); }
function runFx(){ const f=fxQ.shift(); if(!f){fxBusy=false;return;} fxBusy=true; f(); setTimeout(runFx, 2300); }
function toast(t, cls=''){ const el=document.createElement('div'); el.className='toast '+cls; el.textContent=t; $('#fx').appendChild(el); setTimeout(()=>el.remove(),2600); }
function bigFx(big, sub, fail=false){
  const el=document.createElement('div'); el.className='banner-fx'+(fail?' fail':'');
  el.innerHTML=`<div class="in"><div class="medal">${ico(fail?'x':'check',28)}</div><div class="big">${esc(big)}</div><div class="sub">${esc(sub)}</div></div>`;
  document.body.appendChild(el); setTimeout(()=>el.remove(),2100);
  if(navigator.vibrate) navigator.vibrate(fail?[80]:[20,30,20]);
}

/* ---------------- HUD ---------------- */
function starsHTML(n){ return `<span class="wanted" title="Wanted level">${[1,2,3,4,5].map(i=>`<span class="s ${i<=n?'on':''}">★</span>`).join('')}</span>`; }
function hud(){
  const L=level(P.xp), a=lvlFloor(L), b=lvlFloor(L+1);
  const pct=Math.round(100*(P.xp-a)/(b-a));
  const el=$('#hud'); if(!el) return;
  el.innerHTML = `${starsHTML(Math.floor(heat()))}<span class="ava" title="${esc(rank(L))} · Level ${L}">${ring(pct,36,2.5)}<span class="face"><span>${L}</span></span></span>`;
}
setInterval(()=>{ if(DB.list.length) hud(); }, 30000);

/* ---------------- components ---------------- */
function ph(title='Coming soon', sub='Locked slot', icon='lock', cls=''){
  return `<div class="ph ${cls}" aria-label="${esc(title)} placeholder"><span class="lk">${ico(icon,20)}</span><b>${esc(title)}</b><small>${esc(sub)}</small></div>`;
}
function shelf(title, sub, inner, more){
  const head = more
    ? `<a class="shelf-title" href="${more}">${esc(title)} <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></a>`
    : `<h2 class="shelf-title">${esc(title)}</h2>`;
  return `<section class="shelf"><div class="shelf-head">${head}${sub?`<small>${esc(sub)}</small>`:''}</div><div class="row">${inner}</div></section>`;
}
function gameCard(g){
  const own=P.library[g.slug], p=gameProgress(g.slug);
  return `<a class="gcard" href="#/game/${g.slug}" style="--gaccent:${esc(accentOf(g))}"><div class="cov">${pic(cover(g), g.title+' cover','loading="lazy"')}${own?'<span class="badge-own">In Library</span>':''}</div><div class="t">${esc(g.short_title||g.title)}</div><div class="m">${g.year} · ${esc(g.type)}${g.status!=='released'?' · '+esc(g.status):''}</div><div class="prog"><i style="width:${p}%"></i></div></a>`;
}
function editCard(g, kicker='Featured'){
  return `<a class="ecard" href="#/game/${g.slug}" style="--gaccent:${esc(accentOf(g))}">${pic(banner(g)||cover(g), g.title,'loading="lazy"')}<div class="cap"><small>${esc(kicker)}</small><b>${esc(g.title)}</b></div></a>`;
}
function metaLine(sec, it){
  switch(sec){
    case 'characters': return it.role;
    case 'missions': return `#${it.order} · ${it.type}${it.reward?.money!=null?' · '+money(it.reward.money):''}`;
    case 'vehicles': return [it.category, it.top_speed_kph?it.top_speed_kph+' km/h':null].filter(Boolean).join(' · ');
    case 'weapons': return [it.type, it.damage_tier?it.damage_tier+' dmg':null].filter(Boolean).join(' · ');
    case 'cheats': return (it.codes||[]).map(c=>c.platform).filter((v,i,a)=>a.indexOf(v)===i).join(' · ');
    case 'locations': return [it.type, it.parent].filter(Boolean).join(' · ');
    case 'collectibles': return [it.type, it.total!=null?'×'+it.total:null].filter(Boolean).join(' · ');
  }
}
function recCard(s, sec, it, showGame){
  const k=`${s}/${sec}/${it.id}`;
  return `<button class="rcard ${SEC[sec].portrait?'portrait':''}" data-open="${k}"><div class="im">${pic(it.image, recName(sec,it),'loading="lazy"')}${isReal(it.image)?'':'<span class="concept">Concept art</span>'}${P.seen[k]?'<span class="seen">Seen</span>':''}${P.favs[k]?`<span class="fav">${ico('star',12)}</span>`:''}</div><div class="b"><div class="t">${esc(recName(sec,it))}</div><div class="m">${esc(showGame?(game(s).short_title+' · '):'')}${esc(metaLine(sec,it)||'')}</div></div></button>`;
}
function footer(){ return `<div class="footer">Data and art from <a href="${HUB}" target="_blank" rel="noopener">GTA Hub</a> · generated ${esc((DB.index.generated||'').slice(0,10))}. Fan project, not affiliated with Rockstar Games.</div>`; }
function eraChips(active){
  const chips=[['','All Games'],['hd','HD Universe'],['3d','3D Universe'],['2d','2D Universe'],['upcoming','Upcoming']];
  return `<div class="filter-chips">${chips.map(([k,l])=>`<a class="chip ${active===k?'on':''}" href="#/games${k?'/'+k:''}"><span class="dot" style="--accent:${k==='hd'?'#0b7285':k==='3d'?'#2f9e44':k==='2d'?'#e03131':k==='upcoming'?'#d6336c':'#8e8e93'}"></span>${l}</a>`).join('')}</div>`;
}

/* ---------------- views ---------------- */
const V = {};
let heroTimer=null;
V.home = () => {
  const ds=dailyToday();
  const heroGames = DB.list.filter(g=>banner(g) && g.type==='Main' && g.status==='released').sort((a,b)=>b.year-a.year).slice(0,7);
  const featured = [...DB.list].filter(g=>g.type==='Main').sort((a,b)=>b.records-a.records);
  const byEra = k => DB.list.filter(g=>DB.era[g.slug]?.key===k);
  const fast = allRecs('vehicles').filter(r=>r.it.top_speed_kph && isReal(r.it.image)).sort((a,b)=>b.it.top_speed_kph-a.it.top_speed_kph).slice(0,16);
  const prot = allRecs('characters').filter(r=>/protagonist/i.test(r.it.role||'') && isReal(r.it.image));
  const heavy = allRecs('weapons').filter(r=>/high|very/i.test(r.it.damage_tier||'') && isReal(r.it.image)).slice(0,16);
  const big = allRecs('missions').filter(r=>typeof r.it.reward?.money==='number' && isReal(r.it.image)).sort((a,b)=>b.it.reward.money-a.it.reward.money).slice(0,14);
  const recent = Object.entries(P.games).sort((a,b)=>b[1]-a[1]).map(([s])=>game(s)).filter(Boolean).slice(0,8);
  const playList = (recent.length?recent:featured).slice(0,8);
  const lib = DB.list.filter(g=>P.library[g.slug]);
  const eraShelf = (k, sub) => { const gs=byEra(k); const e=DB.timeline.eras.find(x=>x.key===k); return gs.length?shelf(e?.name||k, e?.range||sub, gs.map(gameCard).join('')+ph('Coming soon','New '+(e?.name||'')+' drop','lock','cov'),'#/games/'+k):''; };
  return `
  <div class="hero home" id="hero"><h1 class="page-title">Home</h1>${heroGames.map((g,i)=>`<a class="slide ${i?'':'on'}" href="#/game/${g.slug}">${pic(banner(g), g.title+' banner', i?'loading="lazy"':'')}<div class="cap"><div class="eyebrow">${g.status==='released'?'For You':'Coming Soon'}</div><h2>${esc(g.title)}</h2><div class="sub">${esc((g.cities||[]).join(', ') || (DB.era[g.slug]?.name||''))} · ${g.year}</div><span class="btn">View Game</span></div></a>`).join('')}<div class="dots">${heroGames.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>
  <section class="shelf" style="margin-top:14px"><div class="shelf-head"><h2 class="shelf-title">${recent.length?'Continue Playing':'Start Playing'}</h2></div><div class="row icons">${playList.map(g=>`<a class="icon-game" href="#/game/${g.slug}" title="${esc(g.title)}">${pic(cover(g), g.title,'loading="lazy"')}</a>`).join('')}${ph('Coming soon','Open another game','plus','icon')}</div></section>
  ${shelf('Games We Love','Main entries with the deepest coverage',featured.map(g=>editCard(g,'Main series')).join('')+ph('Coming soon','More games','lock','wide'),'#/games')}
  <section class="shelf"><div class="shelf-head"><a class="shelf-title" href="#/career">Today’s Missions <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></a><small>Resets at midnight · ${Object.keys(P.daily.done).length}/3 complete</small></div>
  <div class="daily">${ds.map(dmHTML).join('')}${ph('Coming soon','Bonus contract','lock','listph')}</div></section>
  ${eraShelf('hd')}${eraShelf('3d')}${eraShelf('2d')}${eraShelf('upcoming')}
  ${shelf('Top Speed','Fastest rides with a recorded top speed',fast.map(r=>recCard(r.g.slug,'vehicles',r.it,true)).join('')+ph('Coming soon','More speed data'),'#/top/vehicles')}
  ${shelf('Protagonists','Every playable lead with art',prot.map(r=>recCard(r.g.slug,'characters',r.it,true)).join('')+ph('Coming soon','Next protagonist'))}
  ${shelf('Heavy Armory','High-damage weapons across the series',heavy.map(r=>recCard(r.g.slug,'weapons',r.it,true)).join('')+ph('Coming soon','More weapons'))}
  ${shelf('Biggest Paydays','Highest cash mission rewards',big.map(r=>recCard(r.g.slug,'missions',r.it,true)).join('')+ph('Coming soon','More payouts'))}
  ${lib.length?shelf('Your Library','Games you added',lib.map(gameCard).join('')+ph('Empty slot','Add another game','plus','cov'),'#/games'):''}
  ${shelf('Explore','Series-wide views',[
      ['#/timeline','clock','Timeline','Eras and release order'],
      ['#/compare','list','Compare','Records per game'],
      ['#/cheats','key','All Cheats','Every code, every platform'],
      ['#/quiz','target','Heists','Quiz mini-games']
    ].map(([h,ic,t,d])=>`<a class="qm" style="width:168px" href="${h}"><span class="e">${ico(ic)}</span><div><b>${t}</b><br><small>${d}</small></div></a>`).join('')+ph('Coming soon','Radio stations','radio'))}
  ${footer()}`;
};
V.home.after = () => {
  const slides=[...document.querySelectorAll('#hero .slide')], dots=[...document.querySelectorAll('#hero .dots i')]; let i=0;
  clearInterval(heroTimer); if(!slides.length) return;
  heroTimer=setInterval(()=>{ if(!document.body.contains(slides[0])) return clearInterval(heroTimer); slides[i].classList.remove('on'); dots[i].classList.remove('on'); i=(i+1)%slides.length; slides[i].classList.add('on'); dots[i].classList.add('on'); },5200);
};
function dmHTML(m){ const p=Math.min(m.n,P.daily.prog[m.id]||0), done=P.daily.done[m.id]; return `<div class="dm ${done?'done':''}"><span class="dm-ico">${ico(done?'check':m.ico)}</span><div class="tx"><b>${esc(m.t)}</b><small>${esc(m.d)} · ${p}/${m.n}</small><div class="prog"><i style="width:${100*p/m.n}%"></i></div></div><span class="rw">+${m.xp} XP</span></div>`; }

V.games = (era) => {
  const list = era ? DB.list.filter(g=>DB.era[g.slug]?.key===era) : DB.list;
  const hero = (era?list:[...DB.list].sort((a,b)=>(b.status==='upcoming')-(a.status==='upcoming')||b.year-a.year))[0] || DB.list[0];
  const eName = era ? (DB.timeline.eras.find(x=>x.key===era)?.name || era) : 'Arcade';
  const fresh = [...DB.list].sort((a,b)=>b.year-a.year).slice(0,8);
  return `
  <div class="hero" id="hero"><h1 class="page-title">Arcade</h1>${hero?`<a class="slide on" href="#/game/${hero.slug}">${pic(banner(hero)||cover(hero), hero.title+' banner')}<div class="cap"><div class="eyebrow">${hero.status==='upcoming'?'Coming Soon':'Featured'}</div><h2>${esc(hero.title)}</h2><div class="sub">${esc(hero.status==='upcoming'?'A new chapter is on the way':((hero.cities||[]).join(', ')+' · '+hero.year))}</div><span class="btn">View Game</span></div></a>`:''}</div>
  ${eraChips(era||'')}
  ${shelf('New Release','Latest and upcoming titles',fresh.map(g=>editCard(g, String(g.year))).join('')+ph('Coming soon','Next release','lock','wide'),'#/timeline')}
  <div class="page-head" style="padding-top:8px"><h2 class="shelf-title">${esc(eName)}</h2><p class="lede">${list.length} games · ${list.reduce((n,g)=>n+g.records,0).toLocaleString()} records</p></div>
  <div class="grid covers">${list.map(gameCard).join('')}${ph('Coming soon','Next GTA','lock','cov')}</div>${footer()}`;
};

V.game = (s, sec) => {
  const g=game(s); if(!g) return V.notfound();
  visitGame(s);
  const b=DB.games[s], p=gameProgress(s), era=DB.era[s];
  const tabs = `<nav class="tabs"><a href="#/game/${s}" class="${sec?'':'on'}">Overview</a>${SECTIONS.map(k=>`<a href="#/game/${s}/${k}" class="${sec===k?'on':''}">${esc(DB.index.sections.find(x=>x.key===k)?.title||k)}<em>${items(s,k).length}</em></a>`).join('')}</nav>`;
  let body='';
  if(!sec){
    body = `<div class="statgrid">${SECTIONS.map(k=>{const n=items(s,k).length, seen=Object.keys(P.seen).filter(x=>x.startsWith(`${s}/${k}/`)).length; return `<a class="stat" href="#/game/${s}/${k}"><b>${n}</b><span>${k}</span><div class="prog"><i style="width:${n?100*seen/n:0}%"></i></div></a>`;}).join('')}${ph('Coming soon','New section','lock')}</div>
    <div class="info"><dl><dt>Released</dt><dd>${esc(g.released||g.year)}</dd><dt>Type</dt><dd>${esc(g.type)} · ${esc(g.status)}</dd><dt>Era</dt><dd>${esc(era?.name||'')}</dd>${era?.setting?`<dt>Setting</dt><dd>${esc(era.setting)}</dd>`:''}<dt>Cities</dt><dd>${esc((g.cities||[]).join(', '))}</dd><dt>Protagonists</dt><dd>${esc((g.protagonists||[]).join(', '))}</dd><dt>Platforms</dt><dd>${esc((g.platforms||[]).join(', '))}</dd><dt>Coverage</dt><dd><div class="chips static">${SECTIONS.map(k=>`<span class="chip">${k}: ${esc(g.coverage?.[k]||'?')}</span>`).join('')}</div></dd>${(b.meta.sources||[]).length?`<dt>Sources</dt><dd style="color:var(--mut)">${esc(b.meta.sources.join(' · '))}</dd>`:''}</dl></div>
    ${SECTIONS.map(k=>{ const it=items(s,k); const title=DB.index.sections.find(x=>x.key===k).title; if(!it.length) return shelf(title,'No records yet',ph('Coming soon',`No ${k} published yet`)); return shelf(title, `${it.length} records`, it.slice(0,12).map(r=>recCard(s,k,r)).join('')+ph('Coming soon','More '+k), `#/game/${s}/${k}`);}).join('')}`;
  } else body = sectionBody(s, sec);
  return `<div class="gbanner" style="--gaccent:${esc(accentOf(g))}">${pic(banner(g), g.title+' banner')}</div>
  <div class="ghead"><div class="cov">${pic(cover(g), g.title+' cover')}</div><div><div class="chips static"><span class="chip">${g.year}</span><span class="chip">${esc(era?.name||'')}</span>${g.status!=='released'?`<span class="chip hot">${esc(g.status)}</span>`:''}</div><h1>${esc(g.title)}</h1><div class="meta">${p}% explored · ${g.records} records</div><div class="prog" style="width:160px;--gaccent:${esc(accentOf(g))}"><i style="width:${p}%"></i></div></div></div>
  <div class="actions"><button class="btn ${P.library[s]?'ok':'solid'}" data-lib="${s}">${P.library[s]?'In Library':'Get'}</button><a class="btn alt" href="#/quiz/game/${s}">Quiz this game</a><a class="btn alt" href="${HUB}${g.links.page}" target="_blank" rel="noopener">Open in GTA Hub</a></div>
  ${tabs}${body}${footer()}`;
};
function sectionBody(s, sec){
  const it=items(s,sec), cov=DB.games[s][sec]?.coverage;
  const head=`<div class="sec-intro"><span>${esc(DB.index.sections.find(x=>x.key===sec)?.description||'')}</span><span class="chip">${esc(cov||'')}</span></div>`;
  if(!it.length) return head+`<div class="grid">${ph('Coming soon',`No ${sec} published for this game yet`)}</div>`;
  const cats=[...new Set(it.map(r=>r.category||r.type).filter(Boolean))];
  const f=`<div class="filter"><input class="input" id="secq" placeholder="Filter ${it.length} ${sec}…" autocomplete="off">${cats.length>1?`<select class="input" id="secc"><option value="">All types</option>${cats.map(c=>`<option>${esc(c)}</option>`).join('')}</select>`:''}</div>`;
  return head+f+`<div id="seclist">${sectionList(s,sec,it)}</div>`;
}
function sectionList(s,sec,list){
  if(sec==='cheats') return `<div class="list">${list.map(r=>cheatRow(s,r)).join('')}${ph('Coming soon','More codes for this game','lock','listph')}</div>`;
  return `<div class="grid">${list.map(r=>recCard(s,sec,r)).join('')}${ph('Coming soon','Locked slot · more '+sec)}</div>`;
}
function cheatRow(s, r, showGame){
  const k=`${s}/cheats/${r.id}`;
  return `<div class="li"><div class="ic">${ico('key')}</div><div class="tx"><b>${esc(r.effect)}</b>${showGame?`<small>${esc(game(s)?.title)}</small>`:''}<div>${(r.codes||[]).map(c=>`<span class="code" title="${esc(c.platform)}">${esc(c.platform)}: ${esc(c.code)}</span>`).join('')}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn sm alt" data-copy="${esc((r.codes||[])[0]?.code||'')}" data-k="${k}">Copy</button><button class="btn sm alt" data-open="${k}">${P.favs[k]?'Saved':'Save'}</button></div></div>`;
}
V.game.after = (s, sec) => {
  const q=$('#secq'), c=$('#secc'); if(!q) return;
  const run=()=>{ const t=q.value.trim().toLowerCase(), cv=c?.value; const it=items(s,sec).filter(r=>(!cv||(r.category||r.type)===cv)&&(!t||JSON.stringify(r).toLowerCase().includes(t))); $('#seclist').innerHTML=sectionList(s,sec,it); };
  q.oninput=run; if(c) c.onchange=run;
};

V.top = sec => { const l=allRecs(sec).filter(r=>r.it.top_speed_kph).sort((a,b)=>b.it.top_speed_kph-a.it.top_speed_kph);
  return `<div class="page-head"><h1 class="page-title">Top Speed</h1><p class="lede">${l.length} vehicles with a recorded top speed</p></div><div class="list">${l.map((r,i)=>`<button class="li" data-open="${r.g.slug}/vehicles/${r.it.id}"><div class="ic">${pic(r.it.image, r.it.name,'loading="lazy"')}</div><div class="tx"><b>${i+1}. ${esc(r.it.name)}</b><small>${esc(r.g.short_title)} · ${esc(r.it.category)}</small></div><b>${r.it.top_speed_kph} km/h</b></button>`).join('')}${ph('Coming soon','More speed tests','flag','listph')}</div>${footer()}`; };

V.cheats = () => { P.cnt.cheatsAll++; save();
  const plats=[...new Set(DB.list.flatMap(g=>items(g.slug,'cheats').flatMap(c=>c.codes.map(x=>x.platform))))].sort();
  return `<div class="page-head"><h1 class="page-title">Cheats</h1><p class="lede">${allRecs('cheats').length} cheats across ${DB.list.filter(g=>items(g.slug,'cheats').length).length} games. Copy one for XP.</p></div>
  <div class="filter"><input class="input" id="chq" placeholder="Search effects or codes…"><select class="input" id="chg"><option value="">All games</option>${DB.list.filter(g=>items(g.slug,'cheats').length).map(g=>`<option value="${g.slug}">${esc(g.short_title)}</option>`).join('')}</select><select class="input" id="chp"><option value="">All platforms</option>${plats.map(p=>`<option>${esc(p)}</option>`).join('')}</select></div><div id="chl"></div>${footer()}`; };
V.cheats.after = () => { const run=()=>{ const t=$('#chq').value.toLowerCase(), g=$('#chg').value, p=$('#chp').value;
  const l=allRecs('cheats').filter(r=>(!g||r.g.slug===g)&&(!p||r.it.codes.some(c=>c.platform===p))&&(!t||JSON.stringify(r.it).toLowerCase().includes(t)));
  $('#chl').innerHTML=`<div class="list">${l.slice(0,200).map(r=>cheatRow(r.g.slug,r.it,true)).join('')}${l.length>200?`<div class="empty">Showing 200 of ${l.length}. Narrow the filter.</div>`:''}${ph('Coming soon','More cheats unlock with future data','lock','listph')}</div>`; };
  ['#chq','#chg','#chp'].forEach(s=>$(s).addEventListener('input',run)); run(); };

V.timeline = () => { if(!P.cnt.timeline){P.cnt.timeline=1; gainXP(30,'Timeline unlocked'); unlockCheck();}
  return `<div class="page-head"><h1 class="page-title">Timeline</h1><p class="lede">${esc(DB.timeline.description||'')}</p></div>${DB.timeline.eras.map(e=>`<div class="era"><h3>${esc(e.name)} <small>${esc(e.range||'')}</small></h3><p>${esc(e.blurb||'')}</p><div class="tl">${e.games.map(g=>`<a class="li" href="#/game/${g.slug}"><div class="ic">${pic(cover(game(g.slug)), g.title,'loading="lazy"')}</div><div class="tx"><b>${esc(g.title)}</b><small>${esc(g.released||g.year)} · ${esc(g.type)} · ${esc(g.setting||'')}</small></div><span class="chip">${g.records}</span></a>`).join('')}${ph('Coming soon','Next chapter of the '+e.name,'lock','listph')}</div></div>`).join('')}${footer()}`; };

V.compare = () => { if(!P.cnt.compare){P.cnt.compare=1; gainXP(30,'Compare board unlocked'); unlockCheck();}
  const C=DB.compare, secs=C.sections; const max={}; secs.forEach(s=>max[s.key]=Math.max(...C.games.map(g=>g.counts[s.key]||0)));
  return `<div class="page-head"><h1 class="page-title">Compare</h1><p class="lede">${esc(C.description||'')}</p></div>
  <section class="shelf"><div class="shelf-head"><h2 class="shelf-title">Section Leaders</h2></div><div class="leaders">${C.leaders.map(l=>`<a class="stat" href="#/game/${l.leader.slug}/${l.section}"><span>${esc(l.title)}</span><b>${l.leader.count}</b><span>${esc(game(l.leader.slug)?.short_title||l.leader.title)}${l.runner_up?` · ${esc(game(l.runner_up.slug)?.short_title||l.runner_up.title)} (${l.runner_up.count})`:''}</span></a>`).join('')}${ph('Coming soon','New leaderboard','trophy')}</div></section>
  <div class="shelf-head" style="margin-top:20px"><h2 class="shelf-title">Records per game</h2></div>
  <div class="tablewrap"><table class="cmp"><thead><tr><th>Game</th>${secs.map(s=>`<th>${esc(s.title)}</th>`).join('')}<th>Total</th></tr></thead><tbody>${C.games.map(g=>`<tr><td><a href="#/game/${g.slug}">${esc(g.short_title)}</a></td>${secs.map(s=>`<td class="${g.counts[s.key]===max[s.key]&&max[s.key]?'lead':''}">${g.counts[s.key]??0}</td>`).join('')}<td>${g.records}</td></tr>`).join('')}<tr class="phrow"><td>Coming soon</td>${secs.map(()=>'<td>—</td>').join('')}<td>—</td></tr></tbody></table></div>
  <section class="shelf"><div class="shelf-head"><h2 class="shelf-title">Cities</h2><small>Which games visit each city</small></div><div class="list">${(C.cities||[]).map(c=>`<div class="li"><div class="ic">${ico('pin')}</div><div class="tx"><b>${esc(c.name)}</b><small>${c.games.map(g=>esc(game(g.slug)?.short_title||g.title)).join(' · ')}</small></div><span class="chip">${c.games.length}</span></div>`).join('')}${ph('Coming soon','New city','lock','listph')}</div></section>${footer()}`; };

V.search = () => `<div class="page-head"><h1 class="page-title">Search</h1></div><div class="filter"><input class="input" id="sq" placeholder="Search 3,700+ records: Infernus, CJ, HESOYAM…" autocomplete="off" autofocus></div><div id="sr"><div class="empty">${DB.search?'Type at least 2 letters.':'Loading the search index…'}</div></div>`;
V.search.after = async () => {
  if(!DB.search){ try{ DB.search=await getJSON('data/search-index.json'); }catch(e){ $('#sr').innerHTML='<div class="empty">Search index unavailable.</div>'; return; } if($('#sr')) $('#sr').innerHTML='<div class="empty">Type at least 2 letters.</div>'; }
  let t0, tracked=false; const q=$('#sq'); if(!q) return;
  q.oninput=()=>{ clearTimeout(t0); t0=setTimeout(()=>{ const t=q.value.trim().toLowerCase(); if(t.length<2){ $('#sr').innerHTML='<div class="empty">Type at least 2 letters.</div>'; return; }
    if(!tracked){ tracked=true; P.cnt.search++; track('search'); }
    const res=DB.search.filter(r=>(r.title+' '+(r.keywords||'')+' '+(r.subtitle||'')).toLowerCase().includes(t)).sort((a,b)=>(b.title.toLowerCase().startsWith(t))-(a.title.toLowerCase().startsWith(t))).slice(0,60);
    $('#sr').innerHTML=`<div class="list">${res.map(r=>{ const sec=SECTIONS.includes(r.kind)?r.kind:null; const rec=sec&&findRec(r.game,sec,r.id);
      const icon = rec?.image ? pic(rec.image, r.title,'loading="lazy"') : (r.kind==='game'&&game(r.game)?pic(cover(game(r.game)), r.title,'loading="lazy"'):ico(SEC[r.kind]?.icon||'search'));
      const attr = rec ? `data-open="${r.game}/${sec}/${r.id}"` : `data-href="#/game/${r.game}"`;
      return `<button class="li" ${attr}><div class="ic">${icon}</div><div class="tx"><b>${esc(r.title)}</b><small>${esc(r.kind)} · ${esc(r.subtitle||'')}</small></div></button>`;}).join('')||'<div class="empty">No matches.</div>'}${ph('Coming soon','Smarter search and filters','lock','listph')}</div>`; },160); };
};

V.garage = (tab='vehicles') => {
  const favs=Object.keys(P.favs).sort((a,b)=>P.favs[b]-P.favs[a]).map(k=>{const [s,sec,id]=k.split('/'); return {s,sec,it:findRec(s,sec,id)};}).filter(x=>x.it);
  const cur=favs.filter(f=>f.sec===tab), lib=DB.list.filter(g=>P.library[g.slug]);
  return `<div class="page-head"><h1 class="page-title">Library</h1><p class="lede">${favs.length} collected · ${lib.length} games in library. Save any record to collect it.</p></div>
  <nav class="tabs">${SECTIONS.map(k=>`<a href="#/garage/${k}" class="${tab===k?'on':''}">${SEC[k].inv}<em>${favs.filter(f=>f.sec===k).length}</em></a>`).join('')}</nav>
  ${tab==='cheats'?`<div class="list">${cur.map(f=>cheatRow(f.s,f.it,true)).join('')}${ph('Empty slot','Bookmark a cheat to fill it','plus','listph')}</div>`:`<div class="grid">${cur.map(f=>recCard(f.s,f.sec,f.it,true)).join('')}${Array.from({length:Math.max(1,4-cur.length)},(_,i)=>ph(i?'Locked slot':'Empty slot',i?'Level up to unlock':'Collect a '+tab.replace(/s$/,''),i?'lock':'plus')).join('')}</div>`}
  ${shelf('Game Library','Games you added from the store',lib.map(gameCard).join('')+ph('Empty slot','Tap Get on a game','plus','cov'),'#/games')}${footer()}`;
};

V.career = () => {
  const L=level(P.xp), a=lvlFloor(L), b=lvlFloor(L+1), got=ACH.filter(x=>P.ach[x.id]).length, ds=dailyToday();
  const pct=Math.round(100*(P.xp-a)/(b-a));
  return `<div class="page-head"><h1 class="page-title">Profile</h1></div>
  <div class="pcard"><div class="ava-lg">${ring(pct,96,5)}<span class="face">${L}</span></div>
  <div class="rank">${esc(rank(L))}</div><div class="lvl-label">Level ${L} · ${P.streak.count||0}-day streak</div>
  ${starsHTML(Math.floor(heat()))}
  <div class="xp-line">${(P.xp-a).toLocaleString()} / ${(b-a).toLocaleString()} XP to level ${L+1} · ${P.xp.toLocaleString()} total</div></div>
  <div class="statgrid">${[[Object.keys(P.seen).length,'Records seen'],[favCount(),'Collected'],[Object.keys(P.games).length+'/'+DB.list.length,'Games opened'],[P.quiz.correct,'Quiz correct'],[P.quiz.answered?Math.round(100*P.quiz.correct/P.quiz.answered)+'%':'—','Accuracy'],[P.streak.best,'Best streak'],[got+'/'+ACH.length,'Achievements']].map(([n,l])=>`<div class="stat"><b>${n}</b><span>${l}</span></div>`).join('')}${ph('Coming soon','New stat','lock')}</div>
  <section class="shelf"><div class="shelf-head"><h2 class="shelf-title">Today’s Missions</h2><small>${esc(today())}</small></div><div class="daily">${ds.map(dmHTML).join('')}${ph('Coming soon','Bonus contract','lock','listph')}</div></section>
  <section class="shelf"><div class="shelf-head"><h2 class="shelf-title">Achievements</h2><small>${got} of ${ACH.length} unlocked · +150 XP each</small></div>
  <div class="ach">${ACH.map(x=>{const [c,n]=x.f(), on=!!P.ach[x.id], pctA=Math.min(100,100*c/n); return `<div class="ac ${on?'got':'locked'}"><div class="medal">${ring(pctA,64,3.5)}<span class="core">${esc(x.t.charAt(0))}</span></div><b>${esc(x.t)}</b><small>${esc(x.d)}</small><div class="prog"><i style="width:${pctA}%"></i></div><small>${on?'Unlocked':Math.min(c,n)+' / '+n}</small></div>`;}).join('')}${ph('??? Secret','Hidden achievement','lock')}${ph('Coming soon','More achievements','lock')}</div></section>
  <section class="shelf"><div class="shelf-head"><h2 class="shelf-title">Game Progress</h2><small>Records inspected per game</small></div><div class="list">${DB.list.map(g=>{const p=gameProgress(g.slug);return `<a class="li" href="#/game/${g.slug}"><div class="ic">${pic(cover(g), g.title,'loading="lazy"')}</div><div class="tx"><b>${esc(g.short_title)}</b><small>${p}% · ${Object.keys(P.seen).filter(k=>k.startsWith(g.slug+'/')).length}/${total(g.slug)}</small><div class="prog" style="--gaccent:${esc(accentOf(g))}"><i style="width:${p}%"></i></div></div>${p===100?'<span class="chip">100%</span>':''}</a>`;}).join('')}${ph('Coming soon','Next game','lock','listph')}</div></section>
  <div class="actions"><button class="btn alt" data-reset>Reset progress</button></div>${footer()}`;
};

/* ---------------- quiz ---------------- */
const QMODES = [
  {id:'ride',ico:'car',t:'Name that ride',d:'Guess the vehicle from its photo',sec:'vehicles'},
  {id:'who',ico:'user',t:"Who's that?",d:'Guess the character from the portrait',sec:'characters'},
  {id:'arms',ico:'bolt',t:'Arms dealer',d:'Name the weapon',sec:'weapons'},
  {id:'which',ico:'flag',t:'Which game?',d:'Match the mission to its game',sec:'missions'},
  {id:'cheat',ico:'key',t:'Cheat sheet',d:'What does this code do?',sec:'cheats'},
  {id:'mix',ico:'dice',t:'Free roam',d:'A mix of every mode',sec:null},
];
let Q=null;
function makeQ(mode, only){
  const gs = only ? [game(only)] : DB.list;
  const m = mode==='mix' ? pick(QMODES.filter(x=>x.id!=='mix')).id : mode;
  const pool = sec => gs.flatMap(g=>items(g.slug,sec).map(it=>({g,it})));
  if(['ride','who','arms'].includes(m)){
    const sec={ride:'vehicles',who:'characters',arms:'weapons'}[m];
    const cands = pool(sec).filter(r=>isReal(r.it.image)); if(!cands.length) return null;
    const ans=pick(cands); const sameGame=items(ans.g.slug,sec).map(x=>x.name).filter(n=>n!==ans.it.name);
    const other=[...new Set(allRecs(sec).map(r=>r.it.name))].filter(n=>n!==ans.it.name);
    const near=n=>{const a=n.toLowerCase().split(/\s+/),b=ans.it.name.toLowerCase().split(/\s+/);return a.length>1&&b.length>1&&a[a.length-1]===b[b.length-1]&&a[0].slice(0,3)===b[0].slice(0,3);};
    const wrong=shuffle([...new Set(sameGame)].filter(n=>!near(n))).slice(0,3); let guard=0; while(wrong.length<3&&guard++<200){ const n=pick(other); if(!wrong.includes(n)&&!near(n)) wrong.push(n); }
    return {m, sec, ans, image:ans.it.image, portrait:sec==='characters', prompt:{ride:'Which vehicle is this?',who:'Who is this?',arms:'Name this weapon'}[m], hint:ans.g.short_title, opts:shuffle([ans.it.name,...wrong]), right:ans.it.name};
  }
  if(m==='which'){
    if(gs.length<2) return makeQ(pick(['ride','who','arms','cheat']), only);
    const ans=pick(pool('missions')); const wrong=shuffle(DB.list.filter(g=>g.slug!==ans.g.slug&&items(g.slug,'missions').length)).slice(0,3).map(g=>g.title);
    return {m, sec:'missions', ans, image:isReal(ans.it.image)?ans.it.image:null, prompt:`Which game has the mission “${ans.it.name}”?`, hint:ans.it.summary, opts:shuffle([ans.g.title,...wrong]), right:ans.g.title};
  }
  if(m==='cheat'){
    const cands=pool('cheats').filter(r=>r.it.codes?.length && items(r.g.slug,'cheats').length>=4); if(!cands.length) return makeQ('ride', only);
    const ans=pick(cands), code=pick(ans.it.codes); const wrong=shuffle(items(ans.g.slug,'cheats').filter(c=>c.effect!==ans.it.effect)).slice(0,3).map(c=>c.effect);
    return {m, sec:'cheats', ans, prompt:`${ans.g.short_title} · ${code.platform}: what does this code do?`, code:code.code, opts:shuffle([ans.it.effect,...wrong]), right:ans.it.effect};
  }
}
V.quiz = (sub, slug) => {
  if(sub==='play' || sub==='game'){ return `<div class="quiz" id="quiz"></div>`; }
  return `<div class="page-head"><h1 class="page-title">Heists</h1><p class="lede">10-question runs built from real GTA Hub records. Answer fast for a time bonus, chain answers for a combo. Best combo: <b class="combo">${P.quiz.bestCombo}×</b></p></div>
  <div class="qmodes">${QMODES.map(m=>`<a class="qm" href="#/quiz/play/${m.id}"><span class="e">${ico(m.ico)}</span><div><b>${esc(m.t)}</b><br><small>${esc(m.d)}</small></div></a>`).join('')}${ph('Coming soon','Radio station quiz','radio')}${ph('Coming soon','Map pin challenge','lock')}</div>
  ${shelf('Quiz a single game','Questions from one game only',DB.list.filter(g=>items(g.slug,'vehicles').some(v=>isReal(v.image))).map(g=>`<a class="gcard" href="#/quiz/game/${g.slug}"><div class="cov">${pic(cover(g), g.title,'loading="lazy"')}</div><div class="t">${esc(g.short_title)}</div><div class="m">10 questions</div></a>`).join('')+ph('Coming soon','More games','lock','cov'))}${footer()}`;
};
V.quiz.after = (sub, arg) => { if(sub==='play') startQuiz(arg||'mix'); else if(sub==='game') startQuiz('mix', arg); };
function startQuiz(mode, only){ P.quiz.sessions++; save(); Q={mode, only, i:0, n:10, score:0, xp:0, combo:0, best:0, q:null, t:null, left:0}; nextQ(); }
function nextQ(){
  const el=$('#quiz'); if(!el) return clearInterval(Q?.t);
  if(Q.i>=Q.n) return endQuiz();
  let q=null, tries=0; while(!q && tries++<10) q=makeQ(Q.mode, Q.only); Q.q=q; Q.i++; Q.left=150;
  el.innerHTML=`<div class="qtop"><span>Q ${Q.i} / ${Q.n}</span><span class="combo">${Q.combo>1?Q.combo+'× combo':''}</span><span>${Q.score} · +${Q.xp} XP</span></div><div class="timer"><i id="tbar" style="width:100%"></i></div>
  ${q.image?`<div class="qimg ${q.portrait?'portrait':''}">${pic(q.image,'Quiz image')}</div>`:''}
  <p class="qprompt">${esc(q.prompt)}</p>${q.code?`<p><span class="code" style="font-size:16px">${esc(q.code)}</span></p>`:''}${q.hint&&!q.code?`<p style="color:var(--mut);font-size:13px;margin-top:-6px">${q.m==='which'?esc(q.hint):'Hint: '+esc(q.hint)}</p>`:''}
  <div class="opts">${q.opts.map(o=>`<button class="opt" data-ans="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  clearInterval(Q.t); Q.t=setInterval(()=>{ if(!$('#tbar')) return clearInterval(Q.t); Q.left--; $('#tbar').style.width=(Q.left/1.5)+'%'; if(Q.left<=0){ clearInterval(Q.t); answer(null); } },100);
}
function answer(a){
  clearInterval(Q.t); const q=Q.q, ok=a===q.right; P.quiz.answered++;
  document.querySelectorAll('.opt').forEach(b=>{ b.disabled=true; if(b.dataset.ans===q.right) b.classList.add('right'); else if(b.dataset.ans===a) b.classList.add('wrong'); });
  if(ok){ Q.combo++; Q.best=Math.max(Q.best,Q.combo); P.quiz.correct++; P.quiz.bestCombo=Math.max(P.quiz.bestCombo,Q.combo);
    const pts=100+Math.round(Q.left*2)+ (Q.combo>1?50*(Q.combo-1):0), xp=15+Math.min(Q.combo,5)*3; Q.score+=pts; Q.xp+=xp; addHeat(.5);
    toast(`Correct · +$${pts}${Q.combo>2?' · '+Q.combo+'× combo':''}`,'xp'); gainXP(xp,'Correct',true); track('quiz');
    if(q.ans) { const k=`${q.ans.g.slug}/${q.sec}/${q.ans.it.id}`; if(!P.seen[k]){ P.seen[k]=Date.now(); save(); } }
  } else { Q.combo=0; toast(a?'Incorrect':'Too slow'); if(navigator.vibrate) navigator.vibrate(80); }
  save(); hud(); setTimeout(nextQ, ok?900:1500);
}
function endQuiz(){
  const el=$('#quiz'); const pass=Q.xp>=15*5;
  if(pass) bigFx('Heist Complete', `$${Q.score.toLocaleString()} take`); else bigFx('Round Over', 'Better luck next time', true);
  gainXP(pass?50:10, pass?'Heist bonus':'Participation', false);
  el.innerHTML=`<div class="pcard" style="margin:0"><div class="rank">${pass?'Heist complete':'Round over'}</div><p style="font-size:40px;font-weight:700;letter-spacing:-.04em;margin:10px 0">$${Q.score.toLocaleString()}</p><p style="color:var(--mut)">+${Q.xp+(pass?50:10)} XP · best combo ${Q.best}×</p><div class="actions" style="justify-content:center"><button class="btn" data-replay>Play again</button><a class="btn alt" href="#/quiz">All heists</a></div></div>`;
}

V.notfound = () => `<div class="empty"><h2 class="page-title">Page not found</h2><p>That page doesn’t exist.</p><a class="btn" href="#/" style="margin-top:12px">Back to Home</a></div>`;

/* ---------------- record sheet ---------------- */
function openRecord(k){
  const [s,sec,id]=k.split('/'); const it=findRec(s,sec,id), g=game(s); if(!it) return;
  markSeen(s,sec,id);
  const rows=[];
  const add=(l,v)=>{ if(v!=null && v!=='' && !(Array.isArray(v)&&!v.length)) rows.push(`<dt>${esc(l)}</dt><dd>${Array.isArray(v)?esc(v.join(', ')):v}</dd>`); };
  if(sec==='characters'){ add('Role',esc(it.role)); add('Affiliations',it.affiliations); add('Status',esc(it.status)); add('First appearance',esc(it.first_appearance)); }
  if(sec==='missions'){ add('Order','#'+it.order); add('Type',esc(it.type)); add('Giver',esc(it.giver)); add('Location',esc(it.location)); add('Cash reward',it.reward?.money!=null?money(it.reward.money):null); add('Other reward',esc(it.reward?.other)); add('Playable',it.playable!=null?esc(Array.isArray(it.playable)?it.playable.join(', '):it.playable):null); }
  if(sec==='vehicles'){ add('Category',esc(it.category)); add('Class',esc(it.class)); add('Top speed',it.top_speed_kph?it.top_speed_kph+' km/h':null); add('Seats',it.seats); }
  if(sec==='weapons'){ add('Type',esc(it.type)); add('Damage',esc(it.damage_tier)); add('Ammo',esc(it.ammo)); add('Price',it.price!=null?money(it.price):null); add('Unlock',esc(it.unlock)); }
  if(sec==='cheats'){ add('Codes',(it.codes||[]).map(c=>`<span class="code">${esc(c.platform)}${c.input?' ('+esc(c.input)+')':''}: ${esc(c.code)}</span>`).join('<br>')); }
  if(sec==='locations'){ add('Type',esc(it.type)); add('Part of',esc(it.parent)); }
  if(sec==='collectibles'){ add('Type',esc(it.type)); add('Total',it.total); add('Reward',esc(it.reward)); }
  add('Game',`<a href="#/game/${s}/${sec}" data-close>${esc(g.title)}</a>`); add('Source',esc(it.source)); add('Verified',it.verified?'Yes':'Not yet');
  const sh=$('#sheet'); sh.hidden=false;
  sh.innerHTML=`<div class="panel" role="dialog" aria-label="${esc(recName(sec,it))}"><div class="grab"></div><div class="hero-img ${SEC[sec].portrait?'portrait':''}"><button class="x" data-close aria-label="Close">${ico('x',14)}</button>${pic(it.image, recName(sec,it))}</div>
  <div class="chips static" style="padding:12px 20px 0"><span class="chip">${esc(sec)}</span>${isReal(it.image)?'':'<span class="chip">Concept art · real image pending</span>'}${P.seen[k]?'<span class="chip">+10 XP earned</span>':''}</div>
  <h2>${esc(recName(sec,it))}</h2>${it.summary?`<p>${esc(it.summary)}</p>`:''}
  <div class="info"><dl>${rows.join('')}</dl></div>
  <div class="actions"><button class="btn ${P.favs[k]?'ok':''}" data-fav="${k}">${P.favs[k]?'In your '+SEC[sec].inv:SEC[sec].verb}</button>${sec==='cheats'&&it.codes?.[0]?`<button class="btn alt" data-copy="${esc(it.codes[0].code)}" data-k="${k}">Copy code</button>`:''}<a class="btn alt" href="${HUB}games/${s}/${sec}/${id}/" target="_blank" rel="noopener">Open in GTA Hub</a></div></div>`;
}
function closeSheet(){ const sh=$('#sheet'); sh.hidden=true; sh.innerHTML=''; }

/* ---------------- router ---------------- */
let lastRoute='';
function route(){
  const h=location.hash.replace(/^#\/?/,''); const [a,b,c]=h.split('/');
  closeSheet(); clearInterval(Q?.t);
  const map={'':['home',[]],games:['games',[b]],game:['game',[b,c]],top:['top',[b||'vehicles']],cheats:['cheats',[]],timeline:['timeline',[]],compare:['compare',[]],search:['search',[]],garage:['garage',[b||'vehicles']],career:['career',[]],quiz:['quiz',[b,c]]};
  const [name,args]=map[a]||['notfound',[]];
  const view=$('#view');
  view.innerHTML=V[name](...args);
  view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter');
  V[name].after?.(...args);
  const tab={'':'home',games:'games',game:'games',top:'home',cheats:'home',timeline:'home',compare:'home'}[a]??a;
  document.querySelectorAll('#tabbar a').forEach(x=>x.classList.toggle('on',x.dataset.tab===tab));
  $('#hud')?.classList.toggle('on', a==='career');
  if(h.split('/').slice(0,2).join('/')!==lastRoute.split('/').slice(0,2).join('/')) scrollTo(0,0);
  lastRoute=h; hud(); unlockCheck();
}
document.addEventListener('click', async e=>{
  const t=e.target.closest('[data-open],[data-fav],[data-copy],[data-close],[data-lib],[data-ans],[data-replay],[data-reset],[data-href]');
  if(!t){ if(e.target.id==='sheet') closeSheet(); return; }
  if(t.dataset.open) return openRecord(t.dataset.open);
  if(t.dataset.href) return location.hash=t.dataset.href;
  if(t.dataset.fav){ toggleFav(t.dataset.fav); const k=t.dataset.fav, sec=k.split('/')[1]; t.classList.toggle('ok',!!P.favs[k]); t.textContent=P.favs[k]?'In your '+SEC[sec].inv:SEC[sec].verb; return; }
  if(t.dataset.copy!==undefined){ try{ await navigator.clipboard.writeText(t.dataset.copy); }catch{} toast('Copied: '+t.dataset.copy); P.cnt.copy++; gainXP(5,'Cheat copied',true); track('copy'); return; }
  if(t.dataset.close!==undefined){ closeSheet(); return; }
  if(t.dataset.lib){ const s=t.dataset.lib; if(!P.library[s]){ P.library[s]=Date.now(); gainXP(20,'Added to library'); bigFx('Added to Library', game(s).short_title); } else { delete P.library[s]; save(); toast('Removed from library'); } unlockCheck(); route(); return; }
  if(t.dataset.ans!==undefined){ if(!t.disabled) answer(t.dataset.ans); return; }
  if(t.dataset.replay!==undefined){ startQuiz(Q.mode, Q.only); return; }
  if(t.dataset.reset!==undefined){ if(confirm('Reset all XP, achievements and inventory?')){ P=blank(); save(); touchStreak(); route(); } }
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSheet(); });
addEventListener('hashchange', route);

/* ---------------- boot ---------------- */
(async function boot(){
  const tips=['Every record you inspect earns XP.','Chain quiz answers for a combo bonus.','Copy a cheat code to raise your wanted level.','Placeholder cards mark slots coming in future drops.'];
  $('#view').innerHTML=`<div class="loading"><div><div class="big">Loading</div><div class="bar"><i id="lb"></i></div><div class="tip" id="lt">${pick(tips)}</div></div></div>`;
  try{
    await loadAll((d,n)=>{ const b=$('#lb'); if(b) b.style.width=(100*d/n)+'%'; });
  }catch(err){ console.warn(err); $('#view').innerHTML=`<div class="empty"><h2 class="page-title">Unable to load</h2><p>Couldn’t reach GTA Hub. Check your connection and try again.</p><button class="btn" onclick="location.reload()" style="margin-top:12px">Retry</button></div>`; return; }
  touchStreak(); dailyToday(); route();
  const nativeShell=!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform())||(location.protocol==='https:'&&location.hostname==='localhost'&&!location.port);
  if('serviceWorker' in navigator && location.protocol!=='file:' && !nativeShell) navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
