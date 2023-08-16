import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import tokens from "@/app/configs/tokens";

const newView = createAsyncThunk("post/newView", async (payload) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .post("/user/view", payload, jsonHeader(userToken))
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const addNewView = (payload, dispatch) => {
  dispatch(newView(payload)).then(unwrapResult);
};

//
//
//
//

const getViewApi = createAsyncThunk("post/recentlyViewed", async (payload) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .get(`/user/view`, jsonHeader(userToken))
    .then((e) => {
      return e;
    })
    .catch((e) => {
      return e.response;
    });
  return data;
});

const initialState = {
  myViews: {},

  status: "idle",
  error: "",
};

const viewSlice = createSlice({
  name: "recentlyViewSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getViewApi.pending]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
    }),
    [getViewApi.fulfilled]: (state, { payload }) => ({
      ...initialState,
      myViews: payload.message,
      status: REQUEST_STATUS.FULFILLED,
    }),
    [getViewApi.rejected]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
    }),
  },
});

export default viewSlice.reducer;

export const recentlyViewed = (dispatch) => {
  dispatch(getViewApi());
};
