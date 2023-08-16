import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { getAwaitingProducts } from "./dashboard";
import tokens from "@/app/configs/tokens";

const verifyProductApi = createAsyncThunk(
  "post/verifyProduct",
  async (payload) => {
    const xmartToken = tokens.corisio;
    const { data } = await martApi
      .post("/verifyProduct", payload, jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

//
export const verifyAction = (
  dispatch,
  store,
  newStatus,
  name,
  _id,
  setData
) => {
  const payload = {
    store: store.toLowerCase(),
    newStatus,
    name,
    _id,
  };
  console.log(payload);
  dispatch(verifyProductApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        getAwaitingProducts(dispatch, setData, 1000);
      }
    })
    .catch((err) => {});
};
