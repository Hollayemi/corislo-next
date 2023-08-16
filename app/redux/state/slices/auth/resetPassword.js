import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import toaster from "@/app/configs/toaster";
import martApi from '../api/baseApi';

const resetPasswordApi = createAsyncThunk('post/RP', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/user/reset-password', payload, {})
        .then((res) => res)
        .catch((err) => err.response);

    return data;
});

export const ResetPasswordHandler = (formData, navigate, dispatch) => {
    dispatch(resetPasswordApi(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                navigate('/login');
            }
        })
        .catch((err) => {
            toaster({ message: "No Connection", type: "error" });
        });
};
