import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const userSelectionApi = createAsyncThunk(
  "post/addNewAddressApi",
  async (payload) => {
    const { data } = await martApi
      .post("/user/select", payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const selectAsDefault = (payload, dispatch) => {
  dispatch(userSelectionApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/get-account");
      }
    })
    .catch((e) => {});
};

//
