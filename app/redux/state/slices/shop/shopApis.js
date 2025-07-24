import { createAsyncThunk } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';

export const addNewShop = createAsyncThunk(
    'post/addNewShop',
    async (payload, auth) => {
        const data = await martApi.post('/newBusiness', { payload }, { auth });
        return data;
    }
);

export const otpHandler = createAsyncThunk(
    'post/otpHandler',
    async (payload) => {
        const data = await martApi.post(`/setOTP/${payload}`, {}, {});
        return data;
    }
);
