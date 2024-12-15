importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDqas7MYKKxxBSUz4jzt1DrWzliAg-EQVo",
  authDomain: "corisio-fcm.firebaseapp.com",
  projectId: "corisio-fcm",
  storageBucket: "corisio-fcm.firebasestorage.app",
  messagingSenderId: "1081323618495",
  appId: "1:1081323618495:web:8bf08ae7c66c20a2d7060a",
  measurementId: "G-D45D3VTR5M"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


console.log("Service worker loaded...");
const CACHE_NAME = "version-1";
const urlsToCache = ["/", "index.html"];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       return fetch(event.request).catch(() => caches.match("offline.html"));
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const cacheWhiteList = [];
//   cacheWhiteList.push(CACHE_NAME);
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhiteList.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });

self.addEventListener("push", (e) => {

  let jikjdd
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    ...data,
    icon: "/images/logo/icon/main.jpg",
    // image: "/images/logo/icon/main.jpg",
  });
  // e.waitUntil(
  //     self.registration.showNotification(data.title, options)
  // );
});
