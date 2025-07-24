import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const newCampaign = createAsyncThunk("post/campaign", async (payload) => {
  const { data } = await martApi
    .post("/branch/campaign", payload, jsonHeader("store"))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const addNewCampaign = (payload, dispatch) => {
  dispatch(newCampaign(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/branch/campaign");
    })
    .catch((e) => {});
};


const updateCampaignApi = createAsyncThunk(
  "store/campaign/update",
  async (payload) => {
    const { data } = await martApi
      .post("/store/campaign/update", payload, jsonHeader("store"))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateCampaign = (payload, dispatch) => {
  dispatch(updateCampaignApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/store/campaign");
    })
    .catch((e) => {});
};













const newAnnouncement = createAsyncThunk("post/Announcement", async (payload) => {
  const { data } = await martApi
    .post("/branch/announcement", payload, jsonHeader("store"))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const addNewAnnouncement = (payload, dispatch) => {
  dispatch(newAnnouncement(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/branch/announcement");
    })
    .catch((e) => {});
};