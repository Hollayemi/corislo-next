import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { getShopInfo } from "./shopInfo";

export const createNewStore = createAsyncThunk(
  "post/addNewShop",
  async (payload) => {
    const { data } = await martApi
      .post("/store/new", payload)
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);


export const createStoreHandler = (payload, dispatch, setStage, setLoading) => {
  setLoading(true);
  dispatch(createNewStore(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      console.log(res)
      setStage(res.type === "success" ? 1 : 0)
      if (res.type === "success") {
        setLoading(false);
      }
      setLoading(false);
    })
    .catch((e) => {
      setLoading(false);
      toaster({
        type: "error",
        message: e?.data?.message || "Something went wrong",
      });
    });
};

export const fetchShopInfo = (dispatch, setState) => {
  dispatch(getShopInfo())
    .then(unwrapResult)
    .then((res) => {
      res.type == "success" && setState(res.data);
    });
};
