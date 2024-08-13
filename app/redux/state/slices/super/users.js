import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
//
const getAccountsApi = createAsyncThunk("post/getAllAccounts", async () => {
  const xmartToken = tokens.corisio;
  const { data } = await martApi
    .get("/user/get-account", jsonHeader(xmartToken))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const getAccounts = (dispatch, setState) => {
  dispatch(getAccountsApi())
    .then(unwrapResult)
    .then((res) => res.type === "success" && setState(res.message))
    .catch((err) => {});
};
