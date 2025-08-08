const CACHE_NAME = 'hamrah-nazer-v1';
const ASSETS = ['/', '/index.html','/style.css','/app.js','/manifest.json','/icons/logo.svg','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ return caches.open(CACHE_NAME).then(cache=>{ cache.put(e.request, res.clone()); return res; }); })).catch(()=>caches.match('/index.html'))); });