import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../constants";
import martApi from "../api/baseApi";
import { getAccount } from "./Login";
import toaster from "@/app/configs/toaster";
import { mutate } from "swr";
import { jsonHeader } from "../api/setAuthHeaders";

export const otpVerificationApi = createAsyncThunk(
  "post/RegNewUser",
  async (payload) => {
    console.log(payload);
    const { data } = await martApi
      .post("/auth/verify", payload, jsonHeader())
      .then((e) => {
        return e;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    return data;
  }
);

export const verifyOtp = (payload, dispatch, callBack) => {
  dispatch(otpVerificationApi(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      console.log("here");
      if (res.type === "success") {
        callBack()
      }
    })
    .catch((err) => {
    });
};

const resendOtpApi = createAsyncThunk("post/resendOtp", async (payload) => {
  const { data } = await martApi
    .post("/new/otp", payload)
    .then((e) => {
      return e;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
  return data;
});

export const resendOtp = (payload, dispatch, callBack) => {
  dispatch(resendOtpApi(payload))
    .then(unwrapResult)
    .then((res) => {
      alert(res?.otp);
      toaster({ ...res });
      if(res.type === "success"){
        callBack()
      }
    })
    .catch((err) => {
    });
};
