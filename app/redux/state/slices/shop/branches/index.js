import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { userLogout } from '../../auth/Login';
import { getShopInfo } from '../shopInfo';

const createBranchApi = createAsyncThunk(
    'post/createBranch',
    async (payload) => {
        console.log(payload);
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .post(`/create/branch`, payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const createBranch = (formData, dispatch, setState, setReg) => {
    dispatch(createBranchApi(formData))
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
                fetchMyBranches(dispatch, setState);
                setReg(false);
            }
        })
        .catch((e) => {});
};

//
//
//
const fetchBranchApi = createAsyncThunk('post/fetchBranch', async () => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .get(`/branch/all`, jsonHeader(storeToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});
export const fetchMyBranches = (dispatch, setState) => {
    dispatch(fetchBranchApi())
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState(res.data);
            }
        })
        .catch((e) => {});
};

//
//
//
//
// connection file handler api

const connFileApi = createAsyncThunk('post/fetchBranch', async (fd) => {
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .post(`/connect/branch`, fd, jsonHeader(userToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const connFileHandler = (dispatch, fd, setLoading) => {
    setLoading(true);
    dispatch(connFileApi(fd))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setLoading(false);
                userLogout();
            } else {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message}
                    </Message>,
                    {
                        placement: 'topCenter',
                    }
                );
            }
            setLoading(false);
        })
        .catch((e) => {
            setLoading(false);
        });
};
//
//
//
//
// delete api

const deleteBranchApi = createAsyncThunk('post/fetchBranch', async (id) => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .delete(`/delete/branch/${id}`, jsonHeader(storeToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const deleteBranch = (dispatch, id, setState) => {
    dispatch(deleteBranchApi(id))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState(res.data);
            }
        })
        .catch((e) => {});
};

const updateBranchApi = createAsyncThunk(
    'post/updateBranch',
    async (payload) => {
        console.log(payload);
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .put(`/edit/branch`, payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const updateBranch = (formData, dispatch) => {
    dispatch(updateBranchApi(formData))
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
                dispatch(getShopInfo());
            }
        })
        .catch((e) => {});
};
