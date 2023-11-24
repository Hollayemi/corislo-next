import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { otpHandler } from "./setOtp";
import { getShopInfo } from "./shopInfo";
import { getAccount } from "../auth/Login";
// import { editShopInfo } from './settings/editShop';

export const createNewStore = createAsyncThunk(
  "post/addNewShop",
  async (payload) => {
    const { data } = await martApi
      .post("/store/new", payload)
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const shopConfig = createAsyncThunk(
  "post/shopInstance",
  async (payload) => {
    const { data } = await martApi
      .post("/store/default", { payload }, {})
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const createStoreHandler = (payload, dispatch, router, setStage) => {
  dispatch(createNewStore(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        setStage(2)
        router.push(res.navigateTo);
      }
      setStage(2)
    })
    .catch((e) => {});
};

export const fetchShopInfo = (dispatch, setState) => {
  dispatch(getShopInfo())
    .then(unwrapResult)
    .then((res) => {
      res.type == "success" && setState(res.data);
    });
};

export const toDashboard = (dispatch, navigate) => {
  dispatch(otpHandler())
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        alert(res.op);
        navigate("/seller/dashboard/auth");
      }
    })
    .catch((e) => {});
};
