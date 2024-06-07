import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import { REQUEST_STATUS } from "../constants";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";

const UserLoginApi = createAsyncThunk("post/UserLogin", async (payload) => {
  const { data } = await martApi
    .post("/auth/login", {
      ...payload,
    })
    .then((res) => {
      const { accessToken } = res.data.user;
      localStorage.setItem("user_token", accessToken);
      return res;
    })
    .catch((err) => err.response);

  return data;
});

export const getAccount = createAsyncThunk("post/loginSlice", async () => {
  const { data } = await martApi
    .get(`/user/get-account`, jsonHeader())
    .then((res) => {
      console.log(res);
      const { accessToken } = res.data.user;
      localStorage.setItem("user_token", accessToken);
      return res;
    })
    .catch((e) => console.log(e.response));
  return data;
});

const initialState = {
  userData: {},
  loading: false,
  status: "idle",
  wasGoing: "no-where",
  error: {},
};

const UserSlice = createSlice({
  name: "Corisio Login",
  initialState,
  reducers: {
    userLogout: () => {
      localStorage.removeItem("user_token");
      localStorage.removeItem("store_token");
      window && window.location.replace("/");
      return initialState;
    },
  },
  extraReducers: {
    [getAccount.pending]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
      loading: true,
    }),
    [getAccount.fulfilled]: (state, { payload }) => ({
      ...initialState,
      userData: { ...payload.user },
      status: REQUEST_STATUS.FULFILLED,
      loading: false,
    }),
    [getAccount.rejected]: (state, error) => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
      loading: false,
      error,
    }),
  },
});

export const { setUsers, userLogout } = UserSlice.actions;

// export states
export default UserSlice.reducer;

/*

*/

export const loginHandler = (
  payload,
  router,
  dispatch,
  returnUrl,
  setLoading
) => {
  console.log(returnUrl);
  setLoading(true);
  dispatch(UserLoginApi(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      if (res.type === "success") {
        dispatch(getAccount())
          .then(unwrapResult)
          .then(() => {
            if (returnUrl) {
              router.push(`/${returnUrl}`);
            } else {
              router.push(`/`);
            }
          });
        setLoading(false);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      toaster({ message: "No Connection", type: "error" });
      setLoading(false);
    });
};

// providerApi
// google

const oAuth = createAsyncThunk("post/oAuth", async (payload) => {
  console.log(payload);
  const { data } = await martApi
    .get(`/auth/refresh-token?token=${payload.token}`)
    .then((res) => {
      console.log(res);
      const { accessToken } = res.data.user;
      localStorage.setItem("user_token", accessToken);
      return res;
    })
    .catch((e) => console.log(e.response));
  return data;
});
export const oAuthHandler = (payload, router, dispatch) => {
  console.log(payload, router, dispatch);
  dispatch(oAuth(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      if (res.type === "success") {
        dispatch(getAccount())
          .then(unwrapResult)
          .then(() => {});
        router.push(`/`);
        console.log("here afer redir");
      }
    })
    .catch((err) => {
      console.log(err);
      toaster({ message: "No Connection", type: "error" });
    });
};
