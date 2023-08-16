import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";

// Api to get all agents for admin
export const getAllAgents = createAsyncThunk(
  "post/allBuzz",
  async (payload) => {
    const xmartToken = tokens.corisio;
    const { data } = await martApi
      .post("/allAgents", payload.body, jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const fetchAllAgent = (dispatch, setTargetInfo, adminData, query) => {
  // fetch
  const payload = {
    body: {
      shopQuary: query,
    },
  };

  dispatch(getAllAgents(payload))
    .then(unwrapResult)
    .then((res) => {
      setTargetInfo(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

//
//

// Api to get all agents for admin
export const updateAgentApi = createAsyncThunk(
  "post/adminUpdateAgents",
  async (payload) => {
    const xmartToken = tokens.corisio;
    const { data } = await martApi
      .post("/adminUpdateAgents", payload.body, jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateAgent = (dispatch, setTargetInfo, adminData, query, id) => {
  // fetch
  const payload = {
    body: {
      query,
      id,
    },
  };

  dispatch(updateAgentApi(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res.message);
      setTargetInfo(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
//
//

// Api to get all agents for admin
export const acceptWithdrawApi = createAsyncThunk(
  "post/acceptWithdraw",
  async (payload) => {
    const xmartToken = tokens.corisio;
    const { data } = await martApi
      .post("/acceptWithdraw", { id: payload.id }, jsonHeader(xmartToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const acceptWithdraw = (dispatch, adminData, id) => {
  // fetch
  const payload = {
    id,
  };

  dispatch(acceptWithdrawApi(payload))
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && window.history.back();
    })
    .catch((err) => {
      console.log(err.response);
    });
};
