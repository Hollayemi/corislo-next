// 1. Store configuration (store/index.js)
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authApi } from './userSlices/authSlice';
import { cartApi } from './userSlices/cartSlice';
import { chatApi } from './userSlices/chatSlice';
import { followingApi } from './userSlices/followSlice';
import { homeApi } from './userSlices/homeSlice';
import { orderApi } from './userSlices/orderSlice';
import { savedItemsApi } from './userSlices/saveItemSlice';
import { userApi } from './userSlices/userSlice';
import { viewsApi } from './userSlices/viewSlice';
import { pickupApi } from './userSlices/pickupSlice';
import { addressApi } from './userSlices/addressSlice';
import { storeApi } from './userSlices/storeSlice';
import { referralApi } from './userSlices/referralSlice';
import { feedbackApi } from './userSlices/feedbackSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [viewsApi.reducerPath]: viewsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [pickupApi.reducerPath]: pickupApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [referralApi.reducerPath]: referralApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [savedItemsApi.reducerPath]: savedItemsApi.reducer,
    [followingApi.reducerPath]: followingApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(homeApi.middleware)
      .concat(cartApi.middleware)
      .concat(chatApi.middleware)
      .concat(viewsApi.middleware)
      .concat(pickupApi.middleware)
      .concat(orderApi.middleware)
      .concat(storeApi.middleware)
      .concat(referralApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(addressApi.middleware)
      .concat(savedItemsApi.middleware)
      .concat(followingApi.middleware)
});

export default store;