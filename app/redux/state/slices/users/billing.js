import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const saveBillingApi = createAsyncThunk(
  "post/saveBillingApi",
  async (insert) => {
    const { data } = await martApi
      .post(`/${insert.forBusiness ? 'store' : 'user'}/billing`, insert.payload, jsonHeader(insert.forBusiness && "store"))
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const saveBilling = (payload, dispatch, forBusiness) => {
  dispatch(saveBillingApi({payload, forBusiness}))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate(`/${insert.forBusiness ? 'store' : 'user'}/billings`);
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
