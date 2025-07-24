import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";

const newView = createAsyncThunk("post/newView", async (payload) => {
  const { data } = await martApi
    .post("/user/view", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const addNewViewProduct = (payload, dispatch) => {
  dispatch(newView(payload)).then(unwrapResult);
};
