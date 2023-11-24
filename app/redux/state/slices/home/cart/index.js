import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";


const addCartApi = createAsyncThunk("post/myCart", async (payload) => {
  const { data } = await martApi
    .post("/user/cart", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});


export const addCartHandler = (payload, dispatch) => {
  dispatch(addCartApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/cart");
      }
    })
    .catch((e) => {});
};



const cartQuantityApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .get(`/user/cart-qty?id=${payload.id}&operator=${payload.operator}`, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const changeQuantity = (payload, dispatch) => {
  dispatch(cartQuantityApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/cart");
    })
    .catch((e) => {});
};


const deleteBulkCartApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .post(`/user/cart/delete-bulk`, payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const deleteBulkCart = (payload, dispatch) => {
  dispatch(deleteBulkCartApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/cart");
    })
    .catch((e) => {});
};
