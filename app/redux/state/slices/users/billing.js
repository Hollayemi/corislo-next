import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const saveBillingApi = createAsyncThunk(
  "post/saveBillingApi",
  async (payload) => {
    const { data } = await martApi
      .post("/user/billing", payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const saveBilling = (payload, dispatch) => {
  dispatch(saveBillingApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/billings");
    })
    .catch((e) => {});
};


const deleteHandler = createAsyncThunk("post/deleteBilling", async (id) => {
  const { data } = await martApi
    .delete("/user/billing/delete/" + id, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const deleteBilling = (id, dispatch) => {
  dispatch(deleteHandler(id))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/billings");
      }
    })
    .catch((e) => {});
};
