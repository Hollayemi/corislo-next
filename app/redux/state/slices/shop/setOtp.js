import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
import { REQUEST_STATUS } from '../constants';
import { myBusinessFiles } from './display/displayAll';
import { getShopInfo } from './shopInfo';
import { getAccount } from '../auth/Login';

export const otpHandler = createAsyncThunk('post/otpHandler', async () => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get(`/set-otp`, jsonHeader(userToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const getOTP = createAsyncThunk('post/getotp', async (numbers) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .post('/get-otp', { otp: numbers }, jsonHeader(userToken))
        .then((res) => {
            return res;
        })
        .catch((e) => e.response);
    return data;
});

export const getOTPhandler = (dispatch, numbers, navigate) => {
    dispatch(getOTP(numbers))
        .then(unwrapResult)
        .then(async (res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'bottomCenter',
                }
            );
            if (res.type === 'success') {
                const { accessToken } = res;
                console.log(accessToken);
                localStorage.setItem('store_token', accessToken);
                await dispatch(getShopInfo());
                await dispatch(myBusinessFiles());
                navigate('/seller/dashboard');
            }
        })
        .catch((e) => {});
};
