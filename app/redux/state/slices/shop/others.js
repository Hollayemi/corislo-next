import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";

export const viewAllNotificationsApi = createAsyncThunk(
  "post/fetchBranch",
  async (payload) => {
    const { data } = await martApi
      .get(`/branch/notification/view-all`, jsonHeader("store"))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);