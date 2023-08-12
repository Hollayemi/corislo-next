import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
import { REQUEST_STATUS } from '../constants';

export const getShopInfo = createAsyncThunk('post/getShopInfo', async () => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .get(`/store`, jsonHeader(storeToken))
        .then((res) => {
            const { accessToken } = res.data;
            localStorage.setItem('store_token', accessToken);
            return res;
        })
        .catch((e) => e.response);
    return data;
});

const initialState = {
    authStatus: REQUEST_STATUS.NOT_VERIFIED,
    error: '',
    data: [],
};

const myStore = createSlice({
    name: 'storeSlice',
    initialState,
    reducers: {
        storeLogout: () => {
            localStorage.removeItem('store_token');
            return initialState;
        },
        defaultOTP: () => ({
            ...initialState,
            wasGoing: REQUEST_STATUS.NOT_VERIFIED,
        }),
    },
    extraReducers: {
        [getShopInfo.pending]: () => ({
            ...initialState,
            authStatus: REQUEST_STATUS.PENDING,
        }),
        [getShopInfo.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                data: payload.data,
                authStatus: REQUEST_STATUS.VERIFIED,
            };
        },
        [getShopInfo.rejected]: (state) => ({
            ...initialState,
            authStatus: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { storeLogout, defaultOTP } = myStore.actions;
export default myStore.reducer;

export const briefShopApi = createAsyncThunk('post/getShopInfo', async () => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get(`brief/store`, jsonHeader(userToken))
        .then((res) => {
            const { accessToken } = res.data;
            localStorage.setItem('store_token', accessToken);
            return res;
        })
        .catch((e) => e.response);
    return data;
});

export const briefShop = (dispatch, setState) => {
    dispatch(briefShopApi())
        .then(unwrapResult)
        .then((res) => {
            res.type == 'success' && setState(res.data);
        });
};

const editShopApi = createAsyncThunk('post/editShopInfo', async (payload) => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .put(`/store/edit`, payload, jsonHeader(storeToken))
        .then((res) => {
            return res;
        })
        .catch((e) => e.response);
    return data;
});

export const editShop = (dispatch, payload) => {
    console.log(payload);
    dispatch(editShopApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                storeLogout();
            }
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
        });
};
