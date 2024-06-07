import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { REQUEST_STATUS } from "../../constants";
import { jsonHeader } from "../../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

const newFeedback = createAsyncThunk("post/newFeedback", async (payload) => {
  const { data } = await martApi
    .post("/product/feedback", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});


export const feedbackHandler = (payload, dispatch) => {
  dispatch(newFeedback(payload))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        toaster({ ...res });
        mutate("/user/feedback");
      }
    })
    .catch((e) => {});
};
