import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { REQUEST_STATUS } from '../../constants';
import { FetchCartHandler } from './fetchCart';

export const addCart = createAsyncThunk('post/myCart', async (payload) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .post('/user/cart', payload.body, jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    cartData: { message: [] },
    status: 'idle',
    error: '',
};

const addNewCart = createSlice({
    name: 'newShop',
    initialState,
    reducers: {},
    extraReducers: {
        [addCart.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [addCart.fulfilled]: (state, { payload }) => ({
            ...initialState,
            cartData: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [addCart.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export default addNewCart.reducer;

/*

*/

export const cartHandler = (payload, dispatch, setHideCart) => {
    dispatch(addCart(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.text}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
                FetchCartHandler(dispatch);
                setHideCart('block');
            } else {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.text}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
        })
        .catch((e) => {});
};
