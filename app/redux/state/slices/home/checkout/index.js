import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { getAllAddress } from "./fetch";
import tokens from "@/app/configs/tokens";

const addNewAddress = createAsyncThunk(
  "post/addNewAddress",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .post("/user/address", payload.body, jsonHeader(userToken))
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

const deleteAddHandler = createAsyncThunk("post/deleteAddress", async (id) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .delete("/deleteAddress/" + id, jsonHeader(userToken))
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const newAddress = (payload, dispatch) => {
  dispatch(addNewAddress(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        getAllAddress(payload, dispatch);
      }
    })
    .catch((e) => {});
};

//
export const deleteAddress = (id, dispatch, setState) => {
  dispatch(deleteAddHandler(id))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        getAllAddress(payload, dispatch, setState);
      }
    })
    .catch((e) => {});
};
