import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';

// Api to get all Business for admin
export const getAllBusinesses = createAsyncThunk('post/allstores', async () => {
    const xmartToken = localStorage.getItem('xmart_token');
    const { data } = await martApi
        .get('/all-stores', jsonHeader(xmartToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const fetchAllStore = (dispatch, setData) => {
    dispatch(getAllBusinesses())
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            setData(res.message);
        })
        .catch((err) => err.response);
};
//
//
//
// Api to get all Business for admin
export const getStoreInfoApi = createAsyncThunk(
    'post/allBuzz',
    async (store) => {
        const xmartToken = localStorage.getItem('xmart_token');
        const { data } = await martApi
            .get(`/getStoreByStoreName/${store}`, jsonHeader(xmartToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const getStoreInfo = (dispatch, setInfo, setFiles, store) => {
    dispatch(getStoreInfoApi(store))
        .then(unwrapResult)
        .then((res) => {
            setInfo(res.shopInfo);
            setFiles(res.storeFiles[0]);
        })
        .catch((err) => {});
};
