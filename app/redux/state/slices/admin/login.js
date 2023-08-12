import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';

const admin_signin = createAsyncThunk('post/admin_signin', async (payload) => {
    const data = await martApi
        .post('/adminLogin', payload, {})
        .then((res) => {
            const { accessToken, ...others } = res.data;
            localStorage.setItem('xmart_token', accessToken);
            return others;
        })
        .catch((err) => err.response.data);
    return data;
});

const initialState = {
    adminData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const adminSlice = createSlice({
    name: 'xMartAdminLogin',
    initialState,
    reducers: {
        wasGoing: (state, { payload }) => ({
            ...initialState,
            wasGoing: payload,
        }),
    },
    extraReducers: {
        [admin_signin.pending]: (state) => ({
            ...initialState,
            loading: true,
            status: REQUEST_STATUS.PENDING,
        }),
        [admin_signin.fulfilled]: (state, { payload }) => ({
            ...initialState,
            loading: false,
            adminData: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [admin_signin.rejected]: (state, error) => ({
            ...initialState,
            loading: false,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { Admin, wasGoing } = adminSlice.actions;

// export states
export default adminSlice.reducer;

/*

*/

export const adminLogin = (formData, dispatch, navigate) => {
    dispatch(admin_signin(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            if (res.type === 'success') {
                navigate(`/admin/dashboard?access=${res.name}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
