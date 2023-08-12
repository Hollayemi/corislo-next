import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';

const addOrderApi = createAsyncThunk('post/myOrder', async (body) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .post('/user/order', body, jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const addNewOrder = (body, dispatch) => {
    dispatch(addOrderApi(body))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message}
                    </Message>,
                    {
                        placement: 'topCenter',
                    }
                );
                FetchOrderHandler(body.userId, dispatch, null);
            }
        })
        .catch((e) => {});
};

const fetchOrder = createAsyncThunk('post/fetchOrder', async (payload) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get(`/user/order`, jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const FetchOrderHandler = (dispatch, setState) => {
    dispatch(fetchOrder())
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                setState && setState(res.message);
            }
        })
        .catch((e) => {});
};

const continueOrderApi = createAsyncThunk(
    'post/continueOrder',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .patch(`/user/continue-order/${payload}`, {}, jsonHeader(userToken))
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const continueOrder = (orderId, dispatch) => {
    dispatch(continueOrderApi(orderId))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                window.location.reload();
            }
        })
        .catch((e) => {});
};

const cancelOrderApi = createAsyncThunk(
    'patch/cancelOrder',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .patch(`/branch/cancel-order/${payload}`, {}, jsonHeader(userToken))
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const cancelOrder = (orderId, dispatch) => {
    dispatch(cancelOrderApi(orderId))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                window.location.reload();
            }
        })
        .catch((e) => {});
};
