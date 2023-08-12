import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';

const forgotPass = createAsyncThunk('post/forgotPassword', async (payload) => {
    const { data } = await martApi
        .post('/user/forgot-password', payload, {})
        .then((res) => res)
        .catch((err) => err.response);

    return data;
});

export const forgotPassHandler = (formData, dispatch) => {
    dispatch(forgotPass(formData))
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
        })
        .catch((err) => {
            console.log(err.response);
        });
};
