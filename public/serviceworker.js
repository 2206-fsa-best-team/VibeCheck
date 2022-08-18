 //the version of cache - prevents the need to reload assets
  const CACHE_NAME = "v1";
  //array of files you choose to cache
  const urlsToCache = ['index.html', 'offline.html'];
  const self = this; // represents the service worker

  //Install the Service Worker
 self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache)
    })
    )});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
    /* fetch requests made - not trying to store requests, but instead make new ones each time so the data is up to date */
    return fetch(event.request)
            .catch(() => caches.match('offline.html'))
  })
  )
})

// Activate the Service worker
self.addEventListener('activate', (event) => {
  const cacheAllowList = []
  cacheAllowList.push(CACHE_NAME) // cache_name declared above

  event.waitUntil(
    caches.keys()
    .then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if(!cacheAllowList.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
})
