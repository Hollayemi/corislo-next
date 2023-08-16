import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { myBusinessFiles } from "./display/displayAll";
import { getShopInfo } from "./shopInfo";
import tokens from "@/app/configs/tokens";

export const dashBoardLogin = createAsyncThunk(
  "post/dashboardLogin",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .post("/store/dashboardLogin", payload, jsonHeader(userToken))
      .then((res) => res)
      .catch((err) => err.response);
    return data;
  }
);

export const dasboardLoginHandler = (payload, dispatch, navigate) => {
  dispatch(dashBoardLogin(payload))
    .then(unwrapResult)
    .then(async (res) => {
      toaster({ ...res });
      if (res.type === "success") {
        const { accessToken, staffStatus } = res;
        localStorage.setItem("store_token", accessToken);
        await dispatch(getShopInfo());
        await dispatch(myBusinessFiles());
        if (staffStatus === "waiting" || staffStatus === "created") {
          navigate("/seller/dashboard/update-auth");
        } else {
          navigate("/seller/dashboard");
        }
      }
    })
    .catch((e) => {});
};
