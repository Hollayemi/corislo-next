/* eslint-disable no-useless-escape */
import toaster from "@/app/configs/toaster";
import martApi from "./baseApi";
import { jsonHeader } from "./setAuthHeaders";
import { isMobile, deviceType, osName } from "react-device-detect";


const PUBLIC_VAPID_KEY2 =
  "BCttWS18Th1RaDR7gVIVtlXOw_P-nE7qJVkXZxEOW2a1yHOS4vKEuEWtRN-A5lX9_lmDjM3nPivWeF3rZoCi8Rk";

const handleSubscribeToNotification = async (connections) => {
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const serverKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY2);
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverKey,
      });

  
      if(!connections[osName]){
      const sendSubscription = async (payload) => {
        const { data } = await martApi
          .post(
            `/notifications/subscription`,
            { subscription: payload, device: osName },
            jsonHeader()
          )
          .then((res) => res)
          .catch((e) => e);
        return data;
      };
      sendSubscription(subscription);
    }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Unable to subscribe to push notifications.", error);
  }
};

export default handleSubscribeToNotification;
