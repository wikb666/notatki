const CACHE = 'notatki-z-lekcji-app-v5';
const REQUIRED = ['./', './index.html'];
const OPTIONAL = ['./manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './sprawdz-instalacje.html'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Strona musi dzialac offline. Blad pojedynczej ikony nie blokuje SW.
    await cache.addAll(REQUIRED);
    await Promise.allSettled(OPTIONAL.map(x => cache.add(x)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('notatki-z-lekcji-app-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(fetch(req).then(res => {
      if(res.ok) {const copy=res.clone(); caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});}
      return res;
    }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(fetch(req).then(res => {
      if(res.ok) {const copy=res.clone(); caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});}
      return res;
    }).catch(() => caches.match(req)));
  }
});
