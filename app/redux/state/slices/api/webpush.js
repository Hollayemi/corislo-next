/* eslint-disable no-useless-escape */
import toaster from "@/app/configs/toaster";
import martApi from "./baseApi";
import { jsonHeader } from "./setAuthHeaders";
import { isMobile, deviceType, osName } from "react-device-detect";



const handleSubscribeToNotification = async (connections, subFor = "user") => {
  const PUBLIC_VAPID_KEY2 = process.env.VAPID_PUBLIC_KEY || "BKjE-3grH11rRppsn-wBmrXSERKLWiszSB2zXbcEXAGAfgmUN3MFCjXLSuzPOob36kS1drjxgCIZO_LXJ2dwOI4"
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

      let subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        return;
      }
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverKey,
      });



      if (!connections[osName]) {
        const sendSubscription = async (payload) => {
          const { data } = await martApi
            .post(
              `/notification/subscribe`,
              { subscription: payload, deviceId: osName },
              jsonHeader(subFor)
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
