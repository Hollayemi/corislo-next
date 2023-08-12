import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { loadCartGroup } from './cartGroup';
import { jsonHeader } from '../../api/setAuthHeaders';
import martApi from '../../api/baseApi';

const changeCartApi = createAsyncThunk('post/changeQty', async (payload) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .patch('/user/cart-func/Qty', payload, jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const changeQty = (payload, dispatch) => {
    console.log();
    dispatch(changeCartApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && loadCartGroup(dispatch))
        .catch((e) => {});
};

const removeCartApi = createAsyncThunk('post/changeCart', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/user/cart-func/remove', payload, {})
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const removeCartHandler = (payload, dispatch) => {
    dispatch(removeCartApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && loadCartGroup(dispatch))
        .catch((e) => {});
};
