import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";

const passwordResetApi = createAsyncThunk("post/UserLogin", async (payload) => {
  const { data } = await martApi
    .post("/branch/staff/reset-password", payload)
    .then((res) => {
      return res;
    })
    .catch((err) => err.response);

  return data;
});


export const passwordResetHandler = (payload, router, dispatch) => {
  dispatch(passwordResetApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        router.push("/dashboard/login");
      }
    })
    .catch((err) => {
    });
};


const changePasswordApi = createAsyncThunk("post/UserLogin", async (payload) => {
  const { data } = await martApi
    .post("/branch/staff/change-password", payload, jsonHeader("store"))
    .then((res) => {
      return res;
    })
    .catch((err) => err.response);

  return data;
});


export const changeStorePassword = (payload, dispatch) => {
  dispatch(changePasswordApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
    })
    .catch((err) => {
    });
};