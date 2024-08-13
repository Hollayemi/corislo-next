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


export const createStoreHandler = (payload, dispatch, router, setStage) => {
  dispatch(createNewStore(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      console.log(res)
      setStage(res.stage > -1 ? res.stage : 2)
      if (res.type === "success") {
        router.push(res.navigateTo);
      }
    })
    .catch((e) => {});
};

export const fetchShopInfo = (dispatch, setState) => {
  dispatch(getShopInfo())
    .then(unwrapResult)
    .then((res) => {
      res.type == "success" && setState(res.data);
    });
};
