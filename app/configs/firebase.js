// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDqas7MYKKxxBSUz4jzt1DrWzliAg-EQVo",
  authDomain: "corisio-fcm.firebaseapp.com",
  projectId: "corisio-fcm",
  storageBucket: "corisio-fcm.firebasestorage.app",
  messagingSenderId: "1081323618495",
  appId: "1:1081323618495:web:8bf08ae7c66c20a2d7060a",
  measurementId: "G-D45D3VTR5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BCttWS18Th1RaDR7gVIVtlXOw_P-nE7qJVkXZxEOW2a1yHOS4vKEuEWtRN-A5lX9_lmDjM3nPivWeF3rZoCi8Rk",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token; // Save token to database for targeted notifications
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
  }
};

// Listener for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
