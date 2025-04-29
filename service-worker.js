const CACHE_NAME = 'parqueadero-cache-v1';
const urlsToCache = [
    'index.html',
    'styles.css',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache);
        })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', event => {
    event.respondWidth(
        caches.match(event.request)
        .then(response =>{
            return response || fetch(event.request);
        })
    );
  });