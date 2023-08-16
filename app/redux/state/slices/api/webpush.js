/* eslint-disable no-useless-escape */
import martApi from "./baseApi";
import { jsonHeader } from "./setAuthHeaders";
import tokens from "@/app/configs/tokens";

const PUBLIC_VAPID_KEY =
  "BPbVtUE6lBIkaSnpFJfMYutVrAtGu4kKzAOk4a4fd4dH4nHcPkRmLeMWwq-rxydhb38PlK_X2CQ287OigY9nQYU";

const handleSubscribeToNotification = async () => {
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
      const registration = await navigator.serviceWorker.ready;
      const serverKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverKey,
      });
      const sendSubscription = async (payload) => {
        const userToken = tokens.auth;
        const { data } = await martApi
          .post(
            `/user/notifications/subscription`,
            payload,
            jsonHeader(userToken)
          )
          .then((res) => res)
          .catch((e) => e);
        return data;
      };
      sendSubscription(subscription);
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Unable to subscribe to push notifications.", error);
  }
};

export default handleSubscribeToNotification;
