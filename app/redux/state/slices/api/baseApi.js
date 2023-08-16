import axios from "axios";
import tokens from "@/app/configs/tokens";
// import "dotenv"

// baseURL: 'http://localhost:5001/api/v1/',
// https://corisio.onrender.com/api/v1/

const requestHeaders = { "Content-Type": "application/json" };
const authToken = tokens.auth;

if (authToken) {
  requestHeaders.Authorization = `${authToken}`;
}
let server = "http://localhost:5001/api/v1/";
if (process.env.NODE_ENV === "production") {
  server = "https://corisio.onrender.com/api/v1/";
}
const Axios = axios.create({
  baseURL: server,
  headers: requestHeaders,
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // if (parseInt(error?.response?.status) === 406) {
    //   window.location.href = "/dashboard/account?section=plans";
    // }
    // if (parseInt(error?.response?.status) === 401) {
    //   window.location.href = "/login";
    // }
    // handleResponseError(error.response);
    return Promise.reject(error);
  }
);

export default Axios;
