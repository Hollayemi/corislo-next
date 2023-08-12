import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { jsonHeader } from '../api/setAuthHeaders';

const addPickupAgent = createAsyncThunk(
    'post/addPickupAgent',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .post('/user/pickup', payload.body, jsonHeader(userToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const addPickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        body: formData,
        auth,
    };
    dispatch(addPickupAgent(payload))
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
            res.type === 'success' && window.location.reload();
        })
        .catch((e) => {});
};

//
// delete pickup agent
const myPickupsApi = createAsyncThunk('post/deletePickup', async (payload) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get('/user/pickup', jsonHeader(userToken))
        .then((res) => res)
        .catch((e) => e);
    return data;
});

export const getPickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        id: formData,
        auth,
    };
    dispatch(myPickupsApi(payload))
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
            res.type === 'success' && setData(res.data);
        })
        .catch((e) => {});
};
//
//
//
//
// delete pickup agent
const deletePickupAgent = createAsyncThunk(
    'post/deletePickup',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .delete(`/user/pickup/${payload.id}`, jsonHeader(userToken))
            .then((res) => res)
            .catch((e) => e);
        return data;
    }
);

export const deletePickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        id: formData,
        auth,
    };
    dispatch(deletePickupAgent(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.status}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && window.location.reload();
        })
        .catch((e) => {});
};
