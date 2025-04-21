import { unwrapResult } from '@reduxjs/toolkit';
import {  withdrawApi } from './agentInfo';
import toaster from '@/app/configs/toaster';
import { mutate } from 'swr';


//
//
export const withdraw = (dispatch, payload) => {
    console.log(payload);
    dispatch(withdrawApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster({ ...res });
            mutate('/all/agent');
        })
        .catch((err) => console.log(err));
};
