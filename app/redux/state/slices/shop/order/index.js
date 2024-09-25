import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";

const updateOrderApi = createAsyncThunk("post/update", async (payload) => {
  const { data } = await martApi
    .post("/branch/order-update", payload, jsonHeader("store"))
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return e.response;
    });
  return data;
});

export const storeUpdateOrder = (dispatch, payload, callback) => {
  dispatch(updateOrderApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate(`/branch/order-request?order=${payload.orderId}`);
      }
      callback()
    })
    .catch((err) => {
      console.log(err);
    });
};
