export const jsonHeader = (token) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    };
    return config;
};
