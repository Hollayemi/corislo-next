import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { REQUEST_STATUS } from '../../constants';

export const myCart = createAsyncThunk('post/getMyCarts', async () => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get('/user/cart', jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    cartData: {},
    status: 'idle',
    error: '',
};

const myCartSlice = createSlice({
    name: 'myCartSlice',
    initialState,
    reducers: {
        clearCart: () => {
            return initialState;
        },
    },
    extraReducers: {
        [myCart.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [myCart.fulfilled]: (state, { payload }) => ({
            ...initialState,
            cartData: payload.data,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [myCart.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { clearCart } = myCartSlice.actions;
export default myCartSlice.reducer;

export const FetchCartHandler = (dispatch, setState) => {
    dispatch(myCart())
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState && setState(res.data);
            }
        })
        .catch((e) => {});
};
