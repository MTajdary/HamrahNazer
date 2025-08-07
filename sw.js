const CACHE_NAME = 'hamrah-nazer-cache-v7'; // نسخه کش برای به‌روزرسانی اجباری افزایش یافت
const urlsToCache = [
    './', // Cache the root
    './index.html', // Or the correct name of your main html file
    './manifest.json', // Cache the manifest
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;800&display=swap'
];

// Install event: open cache and add all core assets
self.addEventListener('install', event => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker.
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache and caching core assets');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event: serve from cache first, then network (Cache First Strategy)
self.addEventListener('fetch', event => {
    // We only want to cache GET requests.
    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                // Return response from cache if found
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // Don't cache opaque responses (e.g. from CDNs without CORS)
                    if (networkResponse.type !== 'opaque') {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
                // Return cached response immediately if available, and update cache in background
                return response || fetchPromise;
            }).catch(error => {
                console.error('Error in fetch handler:', error);
                // Optional: return a fallback page if fetch fails
                // return caches.match('./offline.html');
            });
        })
    );
});
        
// Activate event: clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages under this SW's scope.
  );
});
