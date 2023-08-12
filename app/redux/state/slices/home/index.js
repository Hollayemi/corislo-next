import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { addNewView } from './view/view';

export const fetchProduct = createAsyncThunk(
    'post/product-query',
    async (payload) => {
        const { data } = await martApi
            .patch('/fetch-product', payload, {})
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e.response;
            });
        return data;
    }
);

export const productQueryFetch = (dispatch, query, setState) => {
    dispatch(fetchProduct(query))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.message);
            setState(res.message);
        })
        .catch();
};
/*





*/

const getOneProduct = createAsyncThunk('post/fetchProduct', async (payload) => {
    const { data } = await martApi
        .post('/getOneProduct', payload.body, {})
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const getOneProductHandler = (
    dispatch,
    query,
    setInfo,
    viewProduct,
    userData
) => {
    const payload = {
        body: {
            ...query,
        },
    };
    dispatch(getOneProduct(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setInfo(res.message);
                const viewPayload = {
                    productId: res.message._id,
                    store: res.message.store,
                    branch: res.message.branch.shortId,
                };
                viewProduct &&
                    userData?._id &&
                    addNewView(viewPayload, dispatch);
            }
        })
        .catch((err) => {});
};

export const getOnebyId = async (dispatch, id, setInfo = null) => {
    const payload = {
        body: {
            query: { _id: id },
        },
    };

    const response = await dispatch(getOneProduct(payload))
        .then(unwrapResult)
        .then((res) => {
            setInfo && setInfo(res.message);
            return res.message;
        })
        .catch();
    return response;
};

/*

homeSliderLink
this is for shortcut links

*/

const homeSliderLink = createAsyncThunk('post/homeSliderLink', async () => {
    const { data } = await martApi
        .post('/homeSliderLink', {})
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const sliderLinkHandler = (dispatch, setInfo) => {
    dispatch(homeSliderLink())
        .then(unwrapResult)
        .then((res) => {
            setInfo(res.message);
        });
};
