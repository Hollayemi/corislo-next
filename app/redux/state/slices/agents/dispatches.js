import { unwrapResult } from '@reduxjs/toolkit';
import { agent_info, withdrawApi } from './agentInfo';


//
//
export const withdraw = (dispatch, id, setState, navigate) => {
    const payload = {
        body: {
            id,
        },
    };

    dispatch(withdrawApi(payload))
        .then(unwrapResult)
        .then((res) => {
            setState(res.message);
            navigate('/agent');
        })
        .catch((err) => console.log(err));
};
