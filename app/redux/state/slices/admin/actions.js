import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { toaster, Message } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
import { getAwaitingProducts } from './dashboard';

const verifyProductApi = createAsyncThunk(
    'post/verifyProduct',
    async (payload) => {
        const xmartToken = localStorage.getItem('xmart_token');
        const { data } = await martApi
            .post('/verifyProduct', payload, jsonHeader(xmartToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

//
export const verifyAction = (
    dispatch,
    store,
    newStatus,
    name,
    _id,
    setData
) => {
    const payload = {
        store: store.toLowerCase(),
        newStatus,
        name,
        _id,
    };
    console.log(payload);
    dispatch(verifyProductApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                getAwaitingProducts(dispatch, setData, 1000);
            }
        })
        .catch((err) => {});
};
