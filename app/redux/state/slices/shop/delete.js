import { createAsyncThunk } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

export const deleteHandler = createAsyncThunk(
  "post/deleteHandler",
  async (payload) => {
    const storeToken = tokens.store;
    const { data } = await martApi
      .post(`/store/file/delete`, payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => {
        console.log(e.response);
        return e;
      });
    return data;
  }
);

// //
// const initialState = {
//     status: 'idle',
// };

// //
// //
// //
// const getBrands_Categories = createSlice({
//     name: 'getBrands_Categories',
//     initialState,
//     reducers: {},
//     extraReducers: {
//         [getInfo.pending]: () => {
//             return { ...initialState, status: REQUEST_STATUS.pending };
//         },
//         [getInfo.fulfilled]: (state, { payload }) => {
//             console.log(payload);
//             return {
//                 ...initialState,
//                 data: payload,
//                 status: REQUEST_STATUS.fulfilled,
//             };
//         },
//         [getInfo.rejected]: () => {
//             return { ...initialState, status: REQUEST_STATUS.rejected };
//         },
//     },
// });

// export const { getTheInfo } = getBrands_Categories.actions;
// export default getBrands_Categories.reducer;
