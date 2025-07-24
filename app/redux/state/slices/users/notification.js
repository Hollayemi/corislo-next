import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

const addUserNotificationApi = createAsyncThunk(
  "post/addUserNotificationApi",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .post("/user/notification", payload, jsonHeader(userToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const addUserNotification = (payload, auth, dispatch, setData) => {
  dispatch(addUserNotificationApi(payload))
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && setData(res.data);
    })
    .catch((e) => {});
};

//
// delete pickup agent
const getUserNotificationApi = createAsyncThunk(
  "post/deletePickup",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .get("/user/notification", jsonHeader(userToken))
      .then((res) => res)
      .catch((e) => e);
    return data;
  }
);

export const getUserNotification = (dispatch, setData) => {
  dispatch(getUserNotificationApi())
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && setData(res.data);
    })
    .catch((e) => {});
};
//
//
//
//
// delete pickup agent
const updateUserNotifApi = createAsyncThunk(
  "post/updateNotif",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .patch(`/user/notification`, {}, jsonHeader(userToken))
      .then((res) => res)
      .catch((e) => e);
    return data;
  }
);

export const updateUserNotif = (formData, dispatch, setData) => {
  dispatch(updateUserNotifApi(payload))
    .then(unwrapResult)
    .then(async (res) => {
      res.status === "success" && setData(res.data);

      console.log(" Registering service worker ");
      const register = await navigator.serviceWorker.register(
        "../../../../../worker.js",
        { scope: "/" }
      );
      console.log(" Registering push ");
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.PUBLIC_VAPID_KEY
        ),
      });
    })
    .catch((e) => {});
};
