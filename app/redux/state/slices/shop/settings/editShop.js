import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { getAccount } from "../../auth/Login";
import tokens from "@/app/configs/tokens";

export const storeAuthHandler = () => <></>;
export const editShopAuth = () => <></>;

const editEntryModeApi = createAsyncThunk(
  "post/fetchBranch",
  async (payload) => {
    const userToken = tokens.auth;
    const { data } = await martApi
      .patch(`/user/update-account`, payload, jsonHeader(userToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const editEntryModeHandler = (dispatch, payload) => {
  dispatch(editEntryModeApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        dispatch(getAccount());
        // dispatch(storeLogout());
      }
    })
    .catch((e) => {});
};
