const { chromium } = require('playwright-core');
const fs = require('fs');
const BASE = process.env.BASE || 'http://localhost:8765/';
const OUT = process.env.OUT || '/workspace/gta-store/screenshots/v2';
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  const page = await ctx.newPage();
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
  const go = async (hash, name, fn) => {
    await page.goto(BASE + hash, { waitUntil:'networkidle' });
    await page.waitForSelector('#view .loading', { state:'detached', timeout:30000 }).catch(()=>{});
    await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    if (fn) await fn();
    await page.waitForTimeout(2800);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    const txt = await page.evaluate(()=>document.querySelector('#view').innerText.slice(0,180).replace(/\s+/g,' '));
    const ph = await page.evaluate(()=>document.querySelectorAll('.ph').length);
    const broken = await page.evaluate(()=>[...document.images].filter(i=>i.complete && i.naturalWidth===0 && i.getAttribute('loading')!=='lazy').map(i=>i.src));
    console.log(name, '| placeholders:', ph, '| broken imgs:', broken.length, broken.slice(0,3), '|', txt);
  };
  await go('#/', '01-home');
  await go('#/', '01b-home-shelves', async()=>{ await page.evaluate(()=>scrollTo(0,1500)); });
  await go('#/game/gta-san-andreas', '02-game-san-andreas');
  await go('#/game/gta-v/vehicles', '03-section-gta-v-vehicles');
  await go('#/game/gta-v/vehicles', '04-record-sheet', async()=>{ await page.click('.rcard'); });
  await go('#/game/gta-san-andreas/cheats', '05-section-cheats');
  for (let i=0;i<3;i++){ await go('#/game/gta-iv/characters','tmp', async()=>{ await page.click(`.rcard >> nth=${i}`); }); }
  await go('#/game/gta-v/vehicles','tmp', async()=>{ await page.click('.rcard').catch(()=>{}); await page.click('[data-fav]'); });
  await go('#/career', '06-career-achievements');
  await go('#/career', '06b-achievements-grid', async()=>{ await page.evaluate(()=>document.querySelector('.ach').scrollIntoView()); });
  await go('#/quiz', '07-quiz-modes');
  await go('#/quiz/play/ride', '08-quiz-vehicle', async()=>{ await page.waitForSelector('.opt'); });
  await go('#/quiz/play/who', '09-quiz-character', async()=>{ await page.waitForSelector('.opt'); await page.waitForTimeout(400); await page.click('.opt'); });
  await go('#/quiz/play/cheat', '09b-quiz-cheat', async()=>{ await page.waitForSelector('.opt'); });
  await go('#/garage', '10-garage');
  await go('#/search', '11-search', async()=>{ await page.waitForTimeout(2500); await page.fill('#sq','infernus'); await page.waitForTimeout(600); });
  await go('#/timeline', '12-timeline');
  await go('#/compare', '13-compare');
  await go('#/cheats', '14-all-cheats');
  await go('#/games', '15-all-games');
  await go('#/top/vehicles', '16-top-speed');
  await page.goto(BASE+'#/quiz/play/mix'); await page.waitForSelector('.opt',{timeout:30000});
  for (let i=0;i<10;i++){ await page.waitForSelector('.opt:not([disabled])',{timeout:20000}); await page.click('.opt'); await page.waitForTimeout(1700); }
  await page.waitForTimeout(500); await page.screenshot({ path: `${OUT}/17-quiz-end.png` });
  console.log('quiz end:', await page.evaluate(()=>document.querySelector('#quiz').innerText.replace(/\s+/g,' ')));
  console.log('state:', await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('gtaStore.v1'));return {xp:p.xp, seen:Object.keys(p.seen).length, favs:Object.keys(p.favs).length, ach:Object.keys(p.ach), quiz:p.quiz}}));
  const unique=[...new Set(errs)];
  console.log('ERRORS:', unique.length, unique.slice(0,30));
  await browser.close();
  if (unique.length) process.exitCode = 2;
})();
