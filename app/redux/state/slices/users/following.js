import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";
import socket from "@/app/utils/socket.io";

const followStoreApi = createAsyncThunk(
  "post/followStoreApi",
  async (payload) => {
    const { data } = await martApi
      .post("/user/following", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const followStore = (storeId, dispatch, isIncluded) => {
  console.log(storeId);
  dispatch(followStoreApi({ storeId }))
    .then(unwrapResult)
    .then((res) => {
      socket("user_token").emit("createChatRoom", { branchId: storeId });
      toaster({ ...res });
      mutate("/user/following");
    })
    .catch((e) => {});
};
