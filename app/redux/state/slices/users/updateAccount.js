import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';

const updateAccountApi = createAsyncThunk(
    'post/updateUserAccount',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .post('/user/update-account', payload.body, jsonHeader(userToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const updateUserAccount = (formData, auth, dispatch, navigate) => {
    const payload = {
        body: formData,
        auth,
    };
    dispatch(updateAccountApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && navigate('/login');
        })
        .catch((e) => {});
};
