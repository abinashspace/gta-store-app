const V='gta-store-v1';
const SHELL=['./','index.html','css/app.css','js/app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==V+'-rt').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.origin===location.origin){ // app shell: network first, cache fallback
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
    return;
  }
  if(u.hostname==='abinashspace.github.io'||u.hostname.endsWith('fonts.gstatic.com')||u.hostname.endsWith('fonts.googleapis.com')){ // stale-while-revalidate
    e.respondWith(caches.open(V+'-rt').then(c=>c.match(r).then(m=>{const f=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res;}).catch(()=>m);return m||f;})));
  }
});
