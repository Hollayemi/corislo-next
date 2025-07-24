import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import { mutate } from "swr";

const createServiceApi = createAsyncThunk("post/createService", async (payload) => {
  const { data } = await martApi
    .post(`/spb/service/new`, payload, jsonHeader("store"))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const CreateService = (values, dispatch) => {
  dispatch(createServiceApi(values))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
      }
      mutate("/spb/service/grouped");
    })
    .catch((e) => {});
};

const updateServiceApi = createAsyncThunk("post/createService", async (payload) => {
  const { data } = await martApi
    .post(`/spb/service/update`, payload, jsonHeader("store"))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const UpdateService = (values, dispatch) => {
  dispatch(updateServiceApi(values))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
      }
      mutate("/spb/service/grouped");
    })
    .catch((e) => {});
};

const deleteServiceApi = createAsyncThunk("post/createService", async (payload) => {
  const { data } = await martApi
    .put(`/spb/service/delete`, payload, jsonHeader("store"))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const DeleteService = (id, dispatch) => {
  dispatch(deleteServiceApi(id))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
      }
      mutate("/spb/service/grouped");
    })
    .catch((e) => {});
};

//
//
//
//

const saveServiceApi = createAsyncThunk("post/services", async (payload) => {
  const { data } = await martApi
    .post("/user/save-service", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const saveService = (payload, dispatch) => {
  dispatch(saveServiceApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/saved-services");
        
      }
    })
    .catch((e) => {});
};
