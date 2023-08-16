import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
//
//
//
//
//
const activationApi = createAsyncThunk(
  "post/accountActivation",
  async (payload) => {
    const xmartToken = tokens.corislo;
    const { data } = await martApi
      .post("/activation", payload, jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const activation = (dispatch, data) => {
  dispatch(activationApi(data))
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && toaster({ ...res }), window.history.back();
    })
    .catch((err) => {});
};
