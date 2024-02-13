import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";


const addCartApi = createAsyncThunk("post/myCart", async (payload) => {
  const { data } = await martApi
    .post("/user/cart", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});


export const addCartHandler = (payload, dispatch) => {
  dispatch(addCartApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/cart");
      }
    })
    .catch((e) => {});
};

const cartQuantityApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .get(`/user/cart-qty?id=${payload.id}&operator=${payload.operator}`, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const changeQuantity = (payload, dispatch, newQty) => {
  newQty((res) => (payload.operator === "+" ? res + 1 : res - 1));
  dispatch(cartQuantityApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/cart");
    })
    .catch((e) => {});
};


const deleteBulkCartApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .post(`/user/cart/delete-bulk`, payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const deleteBulkCart = (payload, dispatch) => {
  dispatch(deleteBulkCartApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/cart");
    })
    .catch((e) => {});
};
















const saveProductApi = createAsyncThunk("post/myCart", async (payload) => {
  const { data } = await martApi
    .post("/user/save-item", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const saveProduct = (payload, dispatch) => {
  dispatch(saveProductApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/user/saved-items/group");
      }
    })
    .catch((e) => {});
};


const savedQuantityApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .get(
        `/user/saved-item/qty?id=${payload.id}&operator=${payload.operator}`,
        jsonHeader()
      )
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const savedQuantity = (payload, dispatch, newQty) => {
  newQty((res) => (payload.operator === "+" ? res + 1 : res - 1));
  dispatch(savedQuantityApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/saved-items/group");
    })
    .catch((e) => {});
};



const deleteBulkSavedApi = createAsyncThunk(
  "post/cart-quantity",
  async (payload) => {
    const { data } = await martApi
      .post(`/user/saved-items/delete-bulk`, payload, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const deleteBulkSaved = (payload, dispatch) => {
  dispatch(deleteBulkSavedApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/user/saved-items/group");
    })
    .catch((e) => {});
};
