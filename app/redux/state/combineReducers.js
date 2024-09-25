import { combineReducers } from '@reduxjs/toolkit';
import storeSlice from './slices/shop/shopInfo';

export const myReducers = combineReducers({
    storeSlice,
});
