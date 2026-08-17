const CACHE="lloyd-demo-coach-easy-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE)
  .then(c=>c.addAll(["./","./index.html","./manifest.json"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>
  Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const c2=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,c2)).catch(()=>{});
    return resp;}).catch(()=>caches.match("./index.html"))));});
