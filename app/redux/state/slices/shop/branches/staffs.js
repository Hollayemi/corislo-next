import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { userLogout } from '../../auth/Login';
import { getShopInfo } from '../shopInfo';
import { storeLogout } from '../shopInfo';

const addStaffApi = createAsyncThunk('post/addStaff', async (payload) => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .post(`/branch/staff`, payload, jsonHeader(storeToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const addStaff = (formData, dispatch, setState) => {
    dispatch(addStaffApi(formData))
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
                fetchMyStaffs(dispatch, setState);
            }
        })
        .catch((e) => {});
};
//
//
//

const fetchStaffsApi = createAsyncThunk('post/fetchBranch', async () => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .get(`/branch-staffs/all`, jsonHeader(storeToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

const fetchStaffDetailsApi = createAsyncThunk(
    'post/fetchBranch',
    async (username) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .get(`/branch/staff/${username}`, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const fetchMyStaffs = (dispatch, setState) => {
    dispatch(fetchStaffsApi())
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState(res.data);
            }
        })
        .catch((e) => {});
};

export const fetchStaffDetails = (dispatch, username, setState, setLoading) => {
    setLoading(true);
    dispatch(fetchStaffDetailsApi(username))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState(res.data);
                setLoading(false);
            }
        })
        .catch((e) => {});
};

//
//
//
//
//
//
//
//
//
// delete api

const deleteStaffApi = createAsyncThunk('post/fetchBranch', async (id) => {
    const storeToken = localStorage.getItem('store_token');
    const { data } = await martApi
        .delete(`/delete/branch/${id}`, jsonHeader(storeToken))
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const deleteStaff = (dispatch, id, setState) => {
    dispatch(deleteStaffApi(id))
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
//
//
//
//
//
// delete api

const updateStaffStatusApi = createAsyncThunk(
    'post/fetchBranch',
    async (info) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .patch(
                `/branch/staff/${info.username}/${info.status}`,
                {},
                jsonHeader(storeToken)
            )
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const updateStaffStatus = (dispatch, username, status, setState) => {
    dispatch(updateStaffStatusApi({ username, status }))
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
//
//
//
//
//
// update details api

const updateStaffDetailsApi = createAsyncThunk(
    'post/fetchBranch',
    async (payload) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .patch(`/branch/staff`, payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const updateStaffDetails = (dispatch, payload) => {
    dispatch(updateStaffDetailsApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                toaster.push(
                    <Message showIcon delay={10000} type={res.type}>
                        Staff updated
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
                dispatch(storeLogout());
            }
        })
        .catch((e) => {});
};
//
//
//
//
//
//
//
//
//
// update staff auth api

const updateStaffAuthApi = createAsyncThunk(
    'post/fetchBranch',
    async (payload) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .put(`/branch/staff/change-auth`, payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const updateStaffAuth = (dispatch, payload) => {
    dispatch(updateStaffAuthApi(payload))
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
                dispatch(storeLogout());
            }
        })
        .catch((e) => {});
};
