import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import toast from "react-hot-toast";

const storeLoginApi = createAsyncThunk("post/UserLogin", async (payload) => {
  const { data } = await martApi
    .post("/dashboard/login", payload)
    .then((res) => {
      const { accessToken } = res.data;
      localStorage.setItem("store_token", accessToken);
      return res;
    })
    .catch((err) => err.response);

  return data;
});

export const getStaffAccount = createAsyncThunk("post/loginSlice", async () => {
  const { data } = await martApi
    .get(`/store/get-account`, jsonHeader())
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

export const storeLoginHandler = (payload, router, dispatch, saveStoreName, removeStoreName) => {
  dispatch(storeLoginApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster(res)
      if (res.type === "success") {
        saveStoreName()
        router.push(res.to);
      }else{
        removeStoreName("storeName")
      }
      // localStorage.setItem("store_token", accessToken);
    })
    .catch((err) => {
    });
      
};


const changeEmailApi = createAsyncThunk("post/RP", async (payload) => {
  const { data } = await martApi
    .post("/staff/change-email", payload, jsonHeader("store"))
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
