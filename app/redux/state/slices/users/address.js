import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const addNewAddressApi = createAsyncThunk(
  "post/addNewAddressApi",
  async (payload) => {
    const { data } = await martApi
      .post("/user/address", payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const saveNewAddress = (payload, dispatch) => {
  dispatch(addNewAddressApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/addresses");
    })
    .catch((e) => {});
};


const deleteAddHandler = createAsyncThunk("post/deleteAddress", async (id) => {
  const { data } = await martApi
    .delete("/user/address/delete/" + id, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const deleteAddress = (id, dispatch) => {
  dispatch(deleteAddHandler(id))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/addresses");
        mutate("/user/get-account");
      }
    })
    .catch((e) => {});
};
