import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
import { REQUEST_STATUS } from '../constants';
import tokens from '@/app/configs/tokens';

const Overview = createAsyncThunk('post/xmartOverview', async (payload) => {
    const xmartToken = tokens.corislo
    const { data } = await martApi
        .post('/xmartOverview/', payload, jsonHeader(xmartToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const xmartOverview = (dispatch, setTargetInfo, query) => {
    // fetch
    const payload = {
        shopQuary: query,
    };
    dispatch(Overview(payload))
        .then(unwrapResult)
        .then((res) => {
            setTargetInfo(res.message[0]);
        })
        .catch((err) => {});
};
/*

*/
const awaitingProducts = createAsyncThunk(
    'post/xmartOverview',
    async (payload) => {
        const xmartToken = tokens.corislo;
        const { data } = await martApi
            .post('/awaitingProducts', payload, jsonHeader(xmartToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: [],
};

const waitingProducts = createSlice({
    name: 'getBrands_Categories',
    initialState,
    reducers: {},
    extraReducers: {
        [awaitingProducts.pending]: () => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [awaitingProducts.fulfilled]: (state, { payload }) => ({
            ...initialState,
            data: payload.type !== 'error' ? payload.message : null,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [awaitingProducts.rejected]: () => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export default waitingProducts.reducer;

export const getAwaitingProducts = (dispatch, setData, query) => {
    // fetch
    const payload = {
        limit: query,
    };
    dispatch(awaitingProducts(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type === 'success' && setData(res.message);
        })
        .catch((err) => {});
};
