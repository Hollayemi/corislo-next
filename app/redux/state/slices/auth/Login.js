import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { editShopAuth } from '../shop/settings/editShop';
import { clearCart } from '../home/cart/fetchCart';
import { otpHandler } from '../shop/setOtp';
import { jsonHeader } from '../api/setAuthHeaders';

const kem_signin = createAsyncThunk('post/kem_signin', async (payload) => {
    const { data } = await martApi
        .post('/user/login', {
            ...payload,
        })
        .then((res) => {
            const { accessToken } = res.data.user;
            localStorage.setItem('user_token', accessToken);
            return res;
        })
        .catch((err) => err.response);

    return data;
});

export const getAccount = createAsyncThunk('post/loginSlice', async (from) => {
    from && localStorage.setItem('redirected_from', from);
    const userToken = localStorage.getItem('user_token');
    const { data } = await martApi
        .get(`/user/get-account`, jsonHeader(userToken))
        .then((res) => {
            console.log(res);
            const { accessToken } = res.data.user;
            localStorage.setItem('user_token', accessToken);
            return res;
        })
        .catch((e) => console.log(e.response));
    return data;
});

const initialState = {
    userData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const UserSlice = createSlice({
    name: 'Corisio Login',
    initialState,
    reducers: {
        userLogout: () => {
            clearCart();
            localStorage.removeItem('user_token');
            localStorage.removeItem('store_token');
            localStorage.removeItem('downloadPwa');
            localStorage.removeItem('redirected_from');
            return initialState;
        },
    },
    extraReducers: {
        [getAccount.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
            loading: true,
        }),
        [getAccount.fulfilled]: (state, { payload }) => ({
            ...initialState,
            userData: { ...payload.user },
            status: REQUEST_STATUS.FULFILLED,
            loading: false,
        }),
        [getAccount.rejected]: (state, error) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
            loading: false,
            error,
        }),
    },
});

export const { setUsers, userLogout } = UserSlice.actions;

// export states
export default UserSlice.reducer;
export { kem_signin };

/*

*/

export const myLogin = (formData, navigate, dispatch, wasGoing) => {
    dispatch(kem_signin(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                dispatch(getAccount())
                    .then(unwrapResult)
                    .then((res) => {
                        if (localStorage.getItem('redirected_from')) {
                            const goTo =
                                localStorage.getItem('redirected_from');
                            localStorage.removeItem('redirected_from');
                            if (
                                goTo === '/seller/dashboard' &&
                                res.user.store_entryMode === 'otp'
                            ) {
                                dispatch(otpHandler())
                                    .then(unwrapResult)
                                    .then((res) => {
                                        console.log(res);
                                        navigate('/seller/dashboard/auth');
                                    });
                            }
                            console.log(goTo);
                            navigate(goTo);
                        } else {
                            if (!res.user.username) {
                                navigate('/site/user/account');
                            }
                            navigate('/site/user/account');
                        }
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            toaster.push(
                <Message showIcon type="error">
                    No Connection
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
        });
};
