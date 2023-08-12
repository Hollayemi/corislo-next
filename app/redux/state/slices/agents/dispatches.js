import { unwrapResult } from '@reduxjs/toolkit';
import { agent_info, withdrawApi } from './agentInfo';

export const getAgentInfo = (dispatch, userID, setInfo) => {
    const payload = {
        body: {
            userID,
        },
    };

    dispatch(agent_info(payload))
        .then(unwrapResult)
        .then((res) => setInfo(res))
        .catch((err) => console.log(err));
};

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
