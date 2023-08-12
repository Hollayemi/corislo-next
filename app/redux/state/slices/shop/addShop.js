import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
import { REQUEST_STATUS } from '../constants';
import { otpHandler } from './setOtp';
import { getShopInfo } from './shopInfo';
import { getAccount } from '../auth/Login';
// import { editShopInfo } from './settings/editShop';

export const createNewStore = createAsyncThunk(
    'post/addNewShop',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .post('/store/newBusiness', payload, jsonHeader(userToken))
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const shopConfig = createAsyncThunk(
    'post/shopInstance',
    async (payload) => {
        const { data } = await martApi
            .post('/store/default', { payload }, {})
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const createHandler = (payload, dispatch, navigate) => {
    dispatch(createNewStore(payload))
        .then(unwrapResult)
        .then((shop_res) => {
            if (shop_res.type === 'success') {
                dispatch(otpHandler())
                    .then(unwrapResult)
                    .then(async (res) => {
                        alert(res.op);
                        await dispatch(getAccount('/seller/dashboard/auth'));
                        toaster.push(
                            <Message showIcon type={res.type}>
                                {res.message.replace('buzz_', 'business ')}
                            </Message>,
                            {
                                placement: 'topEnd',
                            }
                        );
                        if (res.type === 'success') {
                            navigate('/seller/dashboard/auth');
                        }
                    });
            } else {
                toaster.push(
                    <Message showIcon type={shop_res.type}>
                        {shop_res.message.replace('buzz_', 'business ')}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
        })
        .catch((e) => {});
};

export const fetchShopInfo = (dispatch, setState) => {
    dispatch(getShopInfo())
        .then(unwrapResult)
        .then((res) => {
            res.type == 'success' && setState(res.data);
        });
};

export const toDashboard = (dispatch, navigate) => {
    dispatch(otpHandler())
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                alert(res.op);
                navigate('/seller/dashboard/auth');
            }
        })
        .catch((e) => {});
};
