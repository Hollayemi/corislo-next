import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import toaster from "@/app/configs/toaster";

import martApi from "../api/baseApi";

const forgotPasswordApi = createAsyncThunk("post/FP", async (payload) => {
  console.log(payload);
  const { data } = await martApi
    .post("/user/forgot-password", payload, {})
    .then((res) => res)
    .catch((err) => err.response);

  return data;
});

export const ForgotPasswordHandler = (email, navigate, dispatch) => {
  dispatch(forgotPasswordApi({ email }))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      if (res.type === "success") {
        localStorage.setItem("sending-email-to", email);
        navigate("/email-sent");
      }
    })
    .catch((err) => {
      toaster( {message: "No Connection", type: "error"} );
    });
};
