import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import agentReducer from './slices/agents/agentInfo';
import adminReducer from './slices/admin/login';
import storeSlice from './slices/shop/shopInfo';

export const myReducers = combineReducers({
    loginReducer,
    storeSlice,
    agentReducer,
    adminReducer,
});
