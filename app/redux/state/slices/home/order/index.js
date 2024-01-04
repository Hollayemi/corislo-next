import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";

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

const fetchOrder = createAsyncThunk("post/fetchOrder", async (payload) => {
  const { data } = await martApi
    .get(`/user/order`, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const FetchOrderHandler = (dispatch, setState) => {
  dispatch(fetchOrder())
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      if (res.type === "success") {
        setState && setState(res.message);
      }
    })
    .catch((e) => {});
};

const deleteOrderApi = createAsyncThunk(
  "post/deleteOrder",
  async (payload) => {
    const { data } = await martApi
      .patch(`/user/delete-order/${payload}`, {}, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const deleteOrder = (orderId, dispatch) => {
  dispatch(deleteOrderApi(orderId))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/order");
    })
    .catch((e) => {});
};

const cancelOrderApi = createAsyncThunk(
  "patch/cancelOrder",
  async (payload) => {
    const { data } = await martApi
      .patch(`/branch/cancel-order/${payload}`, {}, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const cancelOrder = (orderId, dispatch) => {
  dispatch(cancelOrderApi(orderId))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        window.location.reload();
      }
    })
    .catch((e) => {});
};
