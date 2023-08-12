import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
//
//
//
//
//
const listOrdersItemsApi = createAsyncThunk(
    'post/listOrdersItems',
    async () => {
        const xmartToken = localStorage.getItem('xmart_token');
        const { data } = await martApi
            .get('/xmart/order-request', jsonHeader(xmartToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const AllOrdersItems = (dispatch, setState) => {
    dispatch(listOrdersItemsApi())
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.data))
        .catch((err) => {});
};
