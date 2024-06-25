import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../constants";
import martApi from "../api/baseApi";
import { getAccount } from "./Login";
import toaster from "@/app/configs/toaster";
import { mutate } from "swr";

export const RegNewUser = createAsyncThunk(
  "post/RegNewUser",
  async (payload) => {
    console.log(payload);
    const { data } = await martApi
      .post("/auth/create-account", payload, {})
      .then((e) => {
        console.log(e);
        const { token } = e.data;
        typeof window !== "undefined" &&
          localStorage.setItem("user_token", token);
        return e;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    return data;
  }
);

export const registerHandler = (payload, router, dispatch) => {
  dispatch(RegNewUser(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      console.log("here");
      if (res.type === "success") {
        if (mutate("/user/get-account")) router.push("/auth/otp-verification");
      }
    })
    .catch((err) => {
    });
};
