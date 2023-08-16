import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

const SearchApi = createAsyncThunk("post/aggrSearch", async (payload) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .post("/search", payload)
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});
export const RedirectSearch = (result) => {
  window.location.replace(`/search/${result}`);
};
export const Search = (dispatch, search, setData) => {
  dispatch(SearchApi(search))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setData(res.message);
      }
    })
    .catch((err) => err.response);
};

//get my searches

const getSearchApi = createAsyncThunk("post/aggrSearch", async (payload) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .get("/user/search", jsonHeader(userToken))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const getSearched = (dispatch, setData) => {
  dispatch(getSearchApi())
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      if (res.type === "success") {
        setData(res.data.searches);
      }
    })
    .catch((err) => err.response);
};
