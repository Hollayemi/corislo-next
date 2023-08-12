import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { getAccount } from '../../auth/Login';

export const storeAuthHandler = () => <></>;
export const editShopAuth = () => <></>;

const editEntryModeApi = createAsyncThunk(
    'post/fetchBranch',
    async (payload) => {
        const userToken = localStorage.getItem('user_token');
        const { data } = await martApi
            .patch(`/user/update-account`, payload, jsonHeader(userToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const editEntryModeHandler = (dispatch, payload) => {
    dispatch(editEntryModeApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon delay={10000} type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                dispatch(getAccount());
                // dispatch(storeLogout());
            }
        })
        .catch((e) => {});
};
