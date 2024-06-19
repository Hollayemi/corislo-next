import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

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

export const followStore = (payload, dispatch, socket, isIncluded) => {
  dispatch(followStoreApi(payload))
    .then(unwrapResult)
    .then((res) => {
      !isIncluded &&
      socket.emit("createChatRoom", {
        branchId: payload?.branchId,
      });
      toaster({ ...res });
      mutate("/user/following");
    })
    .catch((e) => {});
};
