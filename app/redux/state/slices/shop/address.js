import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import toaster from "@/app/configs/toaster";
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
                toaster({message: "Couldn't get address", type: "error"})
            }
        })
        .catch((e) => {});
};
