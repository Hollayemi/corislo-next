importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js");

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
    icon: "images/logo/icon/main1.jpg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
