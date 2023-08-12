import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { jsonHeader } from '../../api/setAuthHeaders';
import { REQUEST_STATUS } from '../../constants';
import { deleteHandler } from '../delete';
import { myBusinessFiles, storeFiles } from '../display/displayAll';

export const allCollections = createAsyncThunk(
    'post/allCollections',
    async (payload) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = martApi
            .post(`/store/collection`, payload, jsonHeader(storeToken))
            .then((res) => res.response)
            .catch((e) => e.response);
        return data;
    }
);

export const createCollection = createAsyncThunk(
    'post/createCollection',
    async (payload) => {
        const storeToken = localStorage.getItem('store_token');
        const { data } = await martApi
            .post(`/store/collection`, payload, jsonHeader(storeToken))
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

//
//
//
//
export const createHandler = (
    status,
    formData,
    selectedCate,
    dispatch,
    setFiles,
    reFetchData
) => {
    if (status === REQUEST_STATUS.VERIFIED) {
        const payload = {
            collectionName: formData.collectionName,
            category: selectedCate,
            collectionInfo: formData.collectionInfo,
        };
        dispatch(createCollection(payload))
            .then(unwrapResult)
            .then((res) => {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message.replace('buzz_', 'business ')}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
                if (res.type === 'success') {
                }
                storeFiles(dispatch, setFiles);
                reFetchData();
            })
            .catch((e) => {});
    } else {
        toaster.push(
            <Message showIcon type="error">
                ERROR
            </Message>,
            {
                placement: 'topEnd',
            }
        );
    }
};

//
//
//

export const deleteCol = (splited, dispatch, eventFunc, reFetchData) => {
    const payload = {
        delCase: 'collection',
        _id: splited[2],
        name: splited[3],
    };
    // setOpen(true);
    dispatch(deleteHandler(payload))
        .then(unwrapResult)
        .then((resr) => {
            dispatch(myBusinessFiles())
                .then(unwrapResult)
                .then(() => {
                    toaster.push(
                        <Message showIcon type={resr.type}>
                            {resr.message}
                        </Message>,
                        {
                            placement: 'topEnd',
                        }
                    );
                    reFetchData();
                });
            eventFunc('');
        })
        .catch((e) => {});
};
