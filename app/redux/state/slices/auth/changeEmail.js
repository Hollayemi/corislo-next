import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { userLogout } from "./Login"

const changeEmailApi = createAsyncThunk("post/RP", async (payload) => {
  console.log(payload);
  const { data } = await martApi
    .post("/auth/change-email", payload, jsonHeader())
    .then((res) => res)
    .catch((err) => err.response);

  return data;
});

export const changeEmailHandler = (payload, dispatch) => {
  dispatch(changeEmailApi(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster(res);
      if (res.type === "success") {
        dispatch(userLogout());
      }
    })
    .catch((err) => {
    });
};

