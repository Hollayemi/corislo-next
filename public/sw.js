console.log("Service worker loaded...");
const CACHE_NAME = "version-1";
const urlsToCache = ["/", "index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    ...data,
    icon: "/static/media/logo.9875ef88e24d808d4654.png",
    image: "/static/media/main3.070b7fd5c9bcff5f5f2b.png",
  });
  // e.waitUntil(
  //     self.registration.showNotification(data.title, options)
  // );
});
