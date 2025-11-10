import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { useRouter } from 'next/router';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// RTK Query API
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        createNewStore: builder.mutation({
            query: (payload) => ({
                url: '/store/new',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {
                    console.error('Account Creation Failed', error);
                }
            },
        }),

        verifyOtp: builder.mutation({
            query: (payload) => ({
                url: '/auth/verify',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken) {
                        dispatch(setCredentials({
                            accessToken: data.accessToken,
                            store: data.store
                        }));
                    }
                } catch (error) {
                    console.error('OTP verification failed:', error);
                }
            },
        }),

        resendOTP: builder.mutation({
            query: (payload) => ({
                url: '/new/otp',
                method: 'POST',
                data: payload,
            }),
        }),

        storeLogin: builder.mutation({
            query: (payload) => ({
                url: '/dashboard/login',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken) {
                        dispatch(setCredentials({
                            accessToken: data.accessToken,
                            store: data.store
                        }));
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),

        getStaffAccount: builder.query({
            query: () => ({
                url: "/store/get-account",
                method: "GET",
            }),
            providesTags: ['Auth'],
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (payload) => ({
                url: "/branch/staff/reset-password",
                method: "POST",
                data: payload,
            }),
        }),

        changePassword: builder.mutation({
            query: (payload) => ({
                url: "/branch/staff/change-password",
                method: "POST",
                data: payload,
            }),
        }),

        changeEmail: builder.mutation({
            query: (payload) => ({
                url: "/staff/change-email",
                method: "POST",
                data: payload,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch }) {
                dispatch(logoutUser());
            },
        }),
    }),
});

// Storage utilities for Next.js (using localStorage or cookies)
const storage = {
    getItem: (key) => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },
    setItem: (key, value) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    },
    removeItem: (key) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    },
    multiRemove: (keys) => {
        if (typeof window !== 'undefined') {
            keys.forEach(key => localStorage.removeItem(key));
        }
    }
};

const initializeAuthState = async () => {
    try {
        const token = storage.getItem('store_token');
        const storeDataString = storage.getItem('store_data');
        const storeData = storeDataString ? JSON.parse(storeDataString) : null;

        return {
            store: storeData,
            token,
            isAuthenticated: !!token,
            loading: false,
            error: null,
        };
    } catch (error) {
        return {
            store: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }
};

const initialState = {
    store: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, store } = action.payload;
            state.store = store;
            state.token = accessToken;
            state.isAuthenticated = true;
            state.error = null;

            storage.setItem('store_token', accessToken);
            storage.setItem('store_data', JSON.stringify(store));
        },

        logoutUser: (state) => {
            state.store = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            storage.multiRemove(['store_token', 'store_data']);

            // Router navigation will be handled in components
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
            }
        },

        clearError: (state) => {
            state.error = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        updateUser: (state, action) => {
            if (state.store) {
                state.store = { ...state.store, ...action.payload };
                storage.setItem('store_data', JSON.stringify(state.store));
            }
        },

        initializeAuth: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getStaffAccount.matchFulfilled,
                (state, action) => {
                    state.store = action.payload;
                    storage.setItem('store_data', JSON.stringify(action.payload));
                }
            )
            .addMatcher(
                authApi.endpoints.verifyOtp.matchFulfilled,
                (state, action) => {
                    if (action.payload.accessToken) {
                        state.token = action.payload.accessToken;
                        storage.setItem('store_token', action.payload.accessToken);
                    }
                }
            );
    },
});

export const {
    setCredentials,
    logoutUser,
    clearError,
    setLoading,
    setError,
    updateUser,
    initializeAuth
} = authSlice.actions;

export default authSlice.reducer;

export const {
    useCreateNewStoreMutation,
    useVerifyOtpMutation,
    useResendOTPMutation,
    useStoreLoginMutation,
    useGetStaffAccountQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useChangeEmailMutation,
    useLogoutMutation,
} = authApi;

export const selectCurrentUser = (state) => state.auth.store;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export const initializeAuthAsync = () => async (dispatch) => {
    const authState = await initializeAuthState();
    dispatch(initializeAuth(authState));
};