import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';

export const RegNewUser = createAsyncThunk(
    'post/RegNewUser',
    async (payload) => {
        console.log(payload);
        const { data } = await martApi
            .post('/user/create-account', payload, {})
            .then((e) => {
                console.log(e);
                return e;
            })
            .catch((err) => {
                console.log(err);
                return err.response;
            });
        return data;
    }
);
