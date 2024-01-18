import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

// const sendMessageApi = createAsyncThunk(
//   "post/sendMessageApi",
//   async (payload) => {
//     const { data } = await martApi
//       .post("/chat/message/new", payload, jsonHeader())
//       .then((res) => res)
//       .catch((e) => e.response);
//     return data;
//   }
// );

// export const sendMessage = (payload, dispatch) => {
//   dispatch(sendMessageApi(payload))
//     .then(unwrapResult)
//     .then((res) => {
//       toaster({ ...res });
//       mutate("/chat/message");
//     })
//     .catch((e) => {});
// };
