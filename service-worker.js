const CACHE_NAME = 'fq-calendar-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './css/player.css',
  './css/phoneTemplate.css',
  './css/template.css',
  './js/jquery.js',
  './js/config.js',
  './js/main.js',
  './js/bookImgData.js',
  './js/check.js',
  './js/LoadingJS.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const respClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, respClone));
        return response;
      });
    })
  );
});
