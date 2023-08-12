import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

const loadFeedback = createAsyncThunk(
    'post/loadFeedback',
    async (productId) => {
        const { data } = await martApi
            .get(`/product/feedback/${productId}`, {})
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const feedbackLoader = (payload, dispatch, setInfo) => {
    dispatch(loadFeedback(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setInfo(res.data[0]);
            }
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.text}
                </Message>,
                {
                    placement: 'bottomCenter',
                }
            );
        });
};
