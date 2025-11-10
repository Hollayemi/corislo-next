import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { authApi } from './slices/authSlice';
import { branchApi } from './slices/branchSlice';
import { campaignsDashboardApi } from './slices/campaignSlice';
import { chatApi } from './slices/chatSlice';
import { growthApi } from './slices/growthSlice';
import { ordersCustomersApi } from './slices/orderSlice';
import { productApi } from './slices/productSlice';
import { referralApi } from './slices/referralSlice';
import { staffApi } from './slices/staffSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [campaignsDashboardApi.reducerPath]: campaignsDashboardApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [growthApi.reducerPath]: growthApi.reducer,
        [ordersCustomersApi.reducerPath]: ordersCustomersApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [referralApi.reducerPath]: referralApi.reducer,
        [staffApi.reducerPath]: staffApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(
            authApi.middleware,
            branchApi.middleware,
            campaignsDashboardApi.middleware,
            chatApi.middleware,
            growthApi.middleware,
            ordersCustomersApi.middleware,
            productApi.middleware,
            referralApi.middleware,
            staffApi.middleware,
        ),
});

setupListeners(store.dispatch);