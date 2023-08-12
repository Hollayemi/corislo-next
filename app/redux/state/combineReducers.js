import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import agentReducer from './slices/agents/agentInfo';
import adminReducer from './slices/admin/login';
import waitingProducts from './slices/admin/dashboard';
import storeSlice from './slices/shop/shopInfo';
import myBusinessFile from './slices/shop/display/displayAll';
import myNewProduct from './slices/shop/products/productSlice';
import cartedProduct from './slices/home/cart/fetchCart';
import cartGroupSlice from './slices/home/cart/cartGroup';
import addressSlice from './slices/home/checkout/fetch';
import viewReducer from './slices/home/view/view';

export const myReducers = combineReducers({
    loginReducer,
    storeSlice,
    myBusinessFile,
    myNewProduct,
    agentReducer,
    adminReducer,
    cartedProduct,
    cartGroupSlice,
    addressSlice,
    waitingProducts,
    viewReducer,
});
