import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import adminReducer from './slices/admin/login';
import storeSlice from './slices/shop/shopInfo';

export const myReducers = combineReducers({
    loginReducer,
    storeSlice,
    adminReducer,
});
