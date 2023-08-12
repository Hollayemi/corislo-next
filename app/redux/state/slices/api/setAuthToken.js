import axios from 'axios';

const setAuthToken = (token, type) => {
    if (token) {
        if (type === 'store') {
            axios.defaults.headers.common['store_token'] = token;
        } else {
            axios.defaults.headers.common['user_token'] = token;
        }
    } else {
        delete axios.defaults.headers.common['auth_token'];
    }
};

export default setAuthToken;
