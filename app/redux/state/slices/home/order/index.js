import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";

const addOrderApi = createAsyncThunk("post/myOrder", async (payload) => {
  const { data } = await martApi
    .post("/user/order", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const addNewOrder = (payload, dispatch) => {
  dispatch(addOrderApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/order");
    })
    .catch((e) => {});
};

const deleteOrderApi = createAsyncThunk("post/deleteOrder", async (payload) => {
  const { data } = await martApi
    .patch(`/user/delete-order/${payload}`, {}, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const deleteOrder = (orderId, dispatch) => {
  dispatch(deleteOrderApi(orderId))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/order");
    })
    .catch((e) => {});
};

const orderActionApi = createAsyncThunk(
  "patch/cancelOrder",
  async (payload) => {
    const { data } = await martApi
      .post(`/user/order-action`, payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const orderAction = (payload, dispatch) => {
  dispatch(orderActionApi(payload))
    .then(unwrapResult)
    .then(() => {
      payload.orderStatus &&
        mutate(`/user/order?status=${payload.orderStatus}`);
      mutate(`/user/order/${payload.orderId}`);
      mutate(`/user/order-count`);
      mutate(`/user/order-track?order=${payload.orderId}`);
    })
    .catch((e) => {});
};

const orderPriceApi = createAsyncThunk("patch/orderPrice", async (payload) => {
  const { data } = await martApi
    .post(`/user/order-price`, payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const orderPrice = (payload, dispatch, setResult) => {
  dispatch(orderPriceApi(payload))
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && setResult(res.data && res.data[0]);
    })
    .catch((e) => {});
};
