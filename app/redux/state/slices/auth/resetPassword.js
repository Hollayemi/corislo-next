import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import toaster from "@/app/configs/toaster";
import martApi from '../api/baseApi';
import { jsonHeader } from "../api/setAuthHeaders";

const resetPasswordApi = createAsyncThunk('post/RP', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/user/reset-password', payload, {})
        .then((res) => res)
        .catch((err) => err.response);

    return data;
});

export const ResetPasswordHandler = (formData, router, dispatch) => {
    dispatch(resetPasswordApi(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                router.push('/login');
            }
        })
        .catch((err) => {
        });
};


const changePasswordApi = createAsyncThunk('post/changePassword', async (payload) => {
    console.log(payload);
    const { data } = await martApi
      .patch("/auth/change-password", payload, jsonHeader())
      .then((res) => res)
      .catch((err) => err.response);

    return data;
});

export const changePasswordHandler = (payload, dispatch) => {
    dispatch(changePasswordApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster(res)
        })
        .catch((err) => {
        });
};
