const CACHE_NAME = "travelApp-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./tab1.html",
  "./tab2.html",
  "./tab3.html",
  "./manifest.json",
  "./icon-193.png",
  "./icon-513.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  clients.claim(); 
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
