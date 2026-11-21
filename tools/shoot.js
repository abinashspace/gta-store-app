const { chromium } = require('playwright-core');
const fs = require('fs');
const BASE = process.env.BASE || 'http://localhost:8765/';
const OUT = process.env.OUT || '/workspace/gta-store/screenshots/v3';
const THROTTLE = Number(process.env.CPU_THROTTLE || 4);
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  const page = await ctx.newPage();
  if (THROTTLE > 1) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
  }
  const errs = [];
  page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push('PAGEERROR '+e.message));
  page.on('requestfailed', r => {
    const u=r.url();
    if (/\/favicon\.ico$/.test(u)) return;
    errs.push('REQFAIL '+u+' '+r.failure()?.errorText);
  });
  page.on('response', r => {
    if (r.status()>=400 && !/\/favicon\.ico$/.test(r.url())) errs.push('HTTP '+r.status()+' '+r.url());
  });
  const ready = async () => {
    await page.waitForFunction(() => {
      const v = document.querySelector('#view');
      if (!v) return false;
      if (v.querySelector('.loading')) return false;
      if (v.querySelector('.skel') && !v.querySelector('.hero, .page-title, .ghead, .quiz, .pcard')) return false;
      return !!(v.querySelector('.page-title, .hero, .ghead, .quiz, .pcard, .empty'));
    }, { timeout: 45000 });
  };
  const go = async (hash, name, fn) => {
    await page.goto(BASE + hash, { waitUntil:'domcontentloaded' });
    await ready();
    await page.keyboard.press('Escape'); await page.waitForTimeout(250);
    if (fn) await fn();
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    const txt = await page.evaluate(()=>document.querySelector('#view').innerText.slice(0,180).replace(/\s+/g,' '));
    const ph = await page.evaluate(()=>document.querySelectorAll('.ph').length);
    const broken = await page.evaluate(()=>[...document.images].filter(i=>i.src && i.complete && i.naturalWidth===0).map(i=>i.src));
    console.log(name, '| placeholders:', ph, '| broken imgs:', broken.length, broken.slice(0,3), '|', txt);
    return { ph, broken };
  };
  const brokenAll = [];
  const rec = async (...a) => { const r = await go(...a); if (r.broken.length) brokenAll.push(...r.broken); };
  await rec('#/', '01-home');
  await rec('#/', '01b-home-shelves', async()=>{ await page.evaluate(()=>scrollTo(0,1200)); });
  await rec('#/game/gta-san-andreas', '02-game-san-andreas');
  await rec('#/game/gta-v/vehicles', '03-section-gta-v-vehicles');
  await rec('#/game/gta-v/vehicles', '04-record-sheet', async()=>{ await page.click('.rcard'); });
  await rec('#/game/gta-san-andreas/cheats', '05-section-cheats');
  for (let i=0;i<3;i++){ await rec('#/game/gta-iv/characters','tmp', async()=>{ await page.click(`.rcard >> nth=${i}`); }); }
  await rec('#/game/gta-v/vehicles','tmp', async()=>{ await page.click('.rcard').catch(()=>{}); await page.click('[data-fav]'); });
  await rec('#/career', '06-career-achievements');
  await rec('#/career', '06b-achievements-grid', async()=>{ await page.evaluate(()=>document.querySelector('.ach')?.scrollIntoView()); });
  await rec('#/quiz', '07-quiz-modes');
  await rec('#/quiz/play/ride', '08-quiz-vehicle', async()=>{ await page.waitForSelector('.opt'); });
  await rec('#/quiz/play/who', '09-quiz-character', async()=>{ await page.waitForSelector('.opt'); await page.waitForTimeout(300); await page.click('.opt'); });
  await rec('#/quiz/play/cheat', '09b-quiz-cheat', async()=>{ await page.waitForSelector('.opt'); });
  await rec('#/garage', '10-garage');
  await rec('#/search', '11-search', async()=>{ await page.waitForTimeout(800); await page.fill('#sq','infernus'); await page.waitForTimeout(700); });
  await rec('#/timeline', '12-timeline');
  await rec('#/compare', '13-compare');
  await rec('#/cheats', '14-all-cheats');
  await rec('#/games', '15-all-games');
  await rec('#/top/vehicles', '16-top-speed');
  await page.goto(BASE+'#/quiz/play/mix'); await page.waitForSelector('.opt',{timeout:30000});
  for (let i=0;i<10;i++){ await page.waitForSelector('.opt:not([disabled])',{timeout:20000}); await page.click('.opt'); await page.waitForTimeout(1500); }
  await page.waitForTimeout(400); await page.screenshot({ path: `${OUT}/17-quiz-end.png` });
  console.log('quiz end:', await page.evaluate(()=>document.querySelector('#quiz')?.innerText.replace(/\s+/g,' ')));
  console.log('state:', await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('gtaStore.v1'));return {xp:p.xp, seen:Object.keys(p.seen).length, favs:Object.keys(p.favs).length, ach:Object.keys(p.ach), quiz:p.quiz}}));
  const unique=[...new Set(errs)];
  console.log('ERRORS:', unique.length, unique.slice(0,30));
  console.log('BROKEN_TOTAL:', [...new Set(brokenAll)].length, [...new Set(brokenAll)].slice(0,8));
  // Apple wording check
  const words = await page.evaluate(async () => {
    const hashes = ['#/','#/games','#/quiz','#/garage','#/career','#/search'];
    const hits = [];
    for (const h of hashes) {
      location.hash = h; await new Promise(r=>setTimeout(r,200));
      const t = document.body.innerText;
      for (const w of ['Arcade','Games We Love','For You','Start Playing','Continue Playing','View Game','Game Center']) {
        if (t.includes(w)) hits.push(h+': '+w);
      }
    }
    return hits;
  });
  console.log('APPLE_WORDS:', words);
  await browser.close();
  if (unique.length || brokenAll.length || words.length) process.exitCode = 2;
})();
