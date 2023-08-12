import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { REQUEST_STATUS } from '../../constants';

export const editProduct = createAsyncThunk(
    'post/editProduct',
    async (payload) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .put('/editProduct', payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const editProductHandler = (formData, dispatch, neededInfo) => {
    if (neededInfo.authStatus === REQUEST_STATUS.VERIFIED) {
        const payload = {
            ...formData,
            shopID: neededInfo.shopData._id,
        };
        dispatch(editProduct(payload))
            .then(unwrapResult)
            .then((res) => {
                console.log(res);
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message
                            .replace('prod', 'Product ')
                            .replace(
                                'Vari" must be an array',
                                ' specifications" must be selected '
                            )}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );

                neededInfo.reFetchData();
            })
            .catch((e) => {
                console.log(e);
            });
    }
};
