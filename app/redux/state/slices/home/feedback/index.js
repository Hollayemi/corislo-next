import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { REQUEST_STATUS } from "../../constants";
import { jsonHeader } from "../../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

const newFeedback = createAsyncThunk("post/newFeedback", async (payload) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .post("/product/feedback", payload.body, jsonHeader(userToken))
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

const initialState = {
  feedback: { message: [] },
  status: "idle",
  error: "",
};

const addNewFeedback = createSlice({
  name: "newFeedback",
  initialState,
  reducers: {},
  extraReducers: {
    [newFeedback.pending]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
    }),
    [newFeedback.fulfilled]: (state, { payload }) => ({
      ...initialState,
      feedback: payload,
      status: REQUEST_STATUS.FULFILLED,
    }),
    [newFeedback.rejected]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
    }),
  },
});

export const { setShop } = addNewFeedback.actions;
export default addNewFeedback.reducer;

export const feedbackHandler = (payload, dispatch, setState) => {
  dispatch(newFeedback(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      if (res.type === "success") {
        setState(res.data[0]);
      }
    })
    .catch((e) => {});
};
