import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import toaster from "@/app/configs/toaster";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

export const agentUpdateApi = createAsyncThunk(
  "post/agentInfo",
  async (payload) => {
    const { data } = await martApi
      .post("/agent/update", payload, jsonHeader())
      .then((res) => res)
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
    return data;
  }
);

export const agentUpdateHandle = (dispatch, payload) => {
  dispatch(agentUpdateApi(payload))
    .then(unwrapResult)
    .then((res) => {
      mutate("/agent");
      toaster({ ...res });
    })
    .catch((err) => console.log(err));
};

//
export const withdrawApi = createAsyncThunk(
  "post/withdraw",
  async (payload) => {
    const { data } = await martApi
      .post("/withdraw", payload.body, {})
      .then((res) => res)
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
    return data;
  }
);
