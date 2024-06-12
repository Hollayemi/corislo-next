import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";

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
        mutate("/product/feedback");
      }
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
      if (res.type === "success") {
        toaster({ ...res });
        mutate(`/store/feedback/${payload.store}/${payload.branch}}`);
      }
    })
    .catch((e) => {});
};

