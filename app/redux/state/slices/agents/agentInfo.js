import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { REQUEST_STATUS } from '../constants';

export const agent_info = createAsyncThunk(
    'post/agentInfo',
    async (payload) => {
        const { data } = await martApi
            .post('/agentInfo', payload.body, {})
            .then((res) => res)
            .catch((err) => {
                console.log(err.response);
                return err.response;
            });
        return data;
    }
);

//
export const withdrawApi = createAsyncThunk(
    'post/withdraw',
    async (payload) => {
        const { data } = await martApi
            .post('/withdraw', payload.body, {})
            .then((res) => res)
            .catch((err) => {
                console.log(err.response);
                return err.response;
            });
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: {},
};

const agentInfo = createSlice({
    name: 'myAgentInfo',
    initialState,
    extraReducers: {
        [agent_info.pending]: (state, payload) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [agent_info.fulfilled]: (state, payload) => ({
            ...initialState,
            status: REQUEST_STATUS.FULFILLED,
            data: payload.payload,
        }),
        [agent_info.pending]: (state, payload) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),

        //
        //
    },
});

export const { agentInformation } = agentInfo.actions;
export default agentInfo.reducer;
/*

*/
