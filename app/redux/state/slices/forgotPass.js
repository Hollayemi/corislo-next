import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import toaster from "@/app/configs/toaster";

const forgotPass = createAsyncThunk("post/forgotPassword", async (payload) => {
  const { data } = await martApi
    .post("/user/forgot-password", payload, {})
    .then((res) => res)
    .catch((err) => err.response);

  return data;
});

export const forgotPassHandler = (formData, dispatch) => {
  dispatch(forgotPass(formData))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
