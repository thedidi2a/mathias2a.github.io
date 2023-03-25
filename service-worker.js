// Nom du cache
const CACHE_NAME = 'my-site-cache-v1';

// Liste des fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/image.jpg'
];

// Installation du service worker et mise en cache des fichiers
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Récupération des fichiers mis en cache si disponible, sinon récupération depuis le réseau
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log('Fichier récupéré depuis le cache');
          return response;
        }
        console.log('Fichier récupéré depuis le réseau');
        return fetch(event.request);
      })
  );
});
