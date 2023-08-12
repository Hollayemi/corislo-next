import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/addressApi';

const getAddressApi = createAsyncThunk(
    'post/getAddressApi',
    async (payload) => {
        const { data } = await martApi
            .get(
                `/json?key=${payload.key}&q=${payload.lat}0%2C${payload.lon}&pretty=1`,
                {},
                {}
            )
            .then((res) => res)
            .catch((err) => err.response);
        return data;
    }
);

export const getAddress = (payload, dispatch, setData) => {
    dispatch(getAddressApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.status.code === 200) {
                setData({
                    component: res.results[0].components,
                    formatted: res.results[0].formatted,
                });
            } else {
                toaster.push(
                    <Message showIcon type="error">
                        Could'nt get address
                    </Message>,
                    {
                        placement: 'topCenter',
                    }
                );
            }
        })
        .catch((e) => {});
};
