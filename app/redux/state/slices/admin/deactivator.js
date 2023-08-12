import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';
//
//
//
//
//
const activationApi = createAsyncThunk(
    'post/accountActivation',
    async (payload) => {
        const xmartToken = localStorage.getItem('xmart_token');
        const { data } = await martApi
            .post('/activation', payload, jsonHeader(xmartToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const activation = (dispatch, data) => {
    dispatch(activationApi(data))
        .then(unwrapResult)
        .then((res) => {
            res.type === 'success' &&
                toaster.push(
                    <Message showIcon type="success">
                        {res.message}
                    </Message>,
                    {
                        placement: 'bottomCenter',
                    }
                ),
                window.history.back();
        })
        .catch((err) => {});
};
