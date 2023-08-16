import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
//
//
//
//
//
const listOrdersItemsApi = createAsyncThunk(
  "post/listOrdersItems",
  async () => {
    const xmartToken = tokens.corisio;
    const { data } = await martApi
      .get("/xmart/order-request", jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const AllOrdersItems = (dispatch, setState) => {
  dispatch(listOrdersItemsApi())
    .then(unwrapResult)
    .then((res) => res.type === "success" && setState(res.data))
    .catch((err) => {});
};
