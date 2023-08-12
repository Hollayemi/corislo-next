import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { getAllAddress } from './fetch';

const addNewAddress = createAsyncThunk(
    'post/addNewAddress',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .post('/user/address', payload.body, jsonHeader(userToken))
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

const deleteAddHandler = createAsyncThunk('post/deleteAddress', async (id) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .delete('/deleteAddress/' + id, jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const newAddress = (payload, dispatch) => {
    dispatch(addNewAddress(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message.replace('_', ' ')}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                getAllAddress(payload, dispatch);
            }
        })
        .catch((e) => {});
};

//
export const deleteAddress = (id, dispatch, setState) => {
    dispatch(deleteAddHandler(id))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message.replace('_', ' ')}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                getAllAddress(payload, dispatch, setState);
            }
        })
        .catch((e) => {});
};
