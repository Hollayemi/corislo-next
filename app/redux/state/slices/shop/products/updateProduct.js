import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import tokens from "@/app/configs/tokens";

export const editProduct = createAsyncThunk(
  "post/editProduct",
  async (payload) => {
    const storeToken = tokens.store;
    const { data } = await martApi
      .put("/editProduct", payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const editProductHandler = (formData, dispatch, neededInfo) => {
  if (neededInfo.authStatus === REQUEST_STATUS.VERIFIED) {
    const payload = {
      ...formData,
      shopID: neededInfo.shopData._id,
    };
    dispatch(editProduct(payload))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        toaster({ ...res });

        neededInfo.reFetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
