import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import tokens from "@/app/configs/tokens";

export const allAddress = createAsyncThunk("post/allAddress", async () => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .get("/user/addresses", jsonHeader(userToken))
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});
const initialState = {
  data: {},
  status: "idle",
  error: "",
};

const addressSlice = createSlice({
  name: "address2",
  initialState,
  reducers: {},
  extraReducers: {
    [allAddress.pending]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
    }),
    [allAddress.fulfilled]: (state, { payload }) => ({
      ...initialState,
      data: payload,
      status: REQUEST_STATUS.FULFILLED,
    }),
    [allAddress.rejected]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
    }),
  },
});

export const { setShop } = addressSlice.actions;
export default addressSlice.reducer;

/*

*/

export const getAllAddress = (dispatch, setState) => {
  dispatch(allAddress())
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setState(res.message);
      }
    })
    .catch((e) => {});
};
