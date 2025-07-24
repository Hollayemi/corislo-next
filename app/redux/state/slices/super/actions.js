import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { superHeader } from "../api/setAuthHeaders";
import { getAwaitingProducts } from "./dashboard";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const verifyProductApi = createAsyncThunk(
  "post/verifyProduct",
  async (payload) => {
    const { data } = await martApi
      .post("/super/product/action", payload, superHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

//
export const verifyAction = (  dispatch, payload,) => {
  
  console.log(payload);
  dispatch(verifyProductApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/super/waiting-products")
    })
    .catch((err) => {});
};


const activatorApi = createAsyncThunk(
  "post/accountActivation",
  async (payload) => {
    const { data } = await martApi
      .post("/super/activator", payload, superHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const activator = (payload, dispatch, refresh) => {
  dispatch(activatorApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate(refresh)
    })
    .catch((err) => {});
};
