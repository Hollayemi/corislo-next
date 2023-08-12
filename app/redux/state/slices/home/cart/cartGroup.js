import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { REQUEST_STATUS } from '../../constants';

const cartGroup = createAsyncThunk('post/cartGroup', async () => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get('/user/cart-group', jsonHeader(userToken))
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    groupData: {},
    status: 'idle',
    error: '',
};

const cartGroupSlice = createSlice({
    name: 'cartGroupSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [cartGroup.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [cartGroup.fulfilled]: (state, { payload }) => ({
            ...initialState,
            groupData: payload.data,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [cartGroup.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export default cartGroupSlice.reducer;

export const loadCartGroup = (dispatch) => {
    dispatch(cartGroup()).then(unwrapResult);
};
