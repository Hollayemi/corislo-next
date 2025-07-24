import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";

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
      toaster({ ...res });
      mutate("/user/pending-reviews");
    })
    .catch((e) => {});
};



const newShopFeedback = createAsyncThunk("post/newFeedback", async (payload) => {
  const { data } = await martApi
    .post("/store/feedback", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});


export const shopFeedbackHandler = (payload, dispatch) => {
  dispatch(newShopFeedback(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate(`/store/feedback/${payload.store}/${payload.branch}`);
      }
    })
    .catch((e) => {});
};

