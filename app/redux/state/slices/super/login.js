import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { superHeader } from "../api/setAuthHeaders";

const superLoginApi = createAsyncThunk("post/superLogin", async (payload) => {
  const { data } = await martApi
    .post("/coristen/login", payload)
    .then((res) => {
      const { accessToken } = res.data;
      localStorage.setItem("super_token", accessToken);
      return res;
    })
    .catch((err) => err.response);

  return data;
});


export const superLoginHandler = (payload, router, dispatch) => {
  dispatch(superLoginApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        router.push("/coristen");
      }
    })
    .catch((err) => {
    });
};


export const getStaffAccount = createAsyncThunk("post/loginSlice", async () => {
  const { data } = await martApi
    .get(`/super/get-account`, superHeader())
    .then((res) => {
      const { accessToken } = res;
      localStorage.setItem("store_token", accessToken);
      return res;
    })
    .catch((e) => console.log(e.response));
  return data;
});

/*

*/



const changeEmailApi = createAsyncThunk("post/RP", async (payload) => {
  const { data } = await martApi
    .post("/staff/change-email", payload, superHeader())
    .then((res) => res)
    .catch((err) => err.response);

  return data;
});

export const changeStaffEmail = (payload, dispatch) => {
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
