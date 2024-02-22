import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const updateAccountApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .post("/user/update-account", payload.body, jsonHeader(userToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateUserAccount = (formData, auth, dispatch, navigate) => {
  const payload = {
    body: formData,
    auth,
  };
  dispatch(updateAccountApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && navigate("/login");
    })
    .catch((e) => {});
};


const updatePictureApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const { data } = await martApi
      .post("/user/update-picture", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateUserPicture = (payload, dispatch, setLoading) => {
  setLoading(true)
  dispatch(updatePictureApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/get-account");
      setLoading(false)
    })
    .catch((e) => {
      setLoading(false)
    });
};
//
//
//