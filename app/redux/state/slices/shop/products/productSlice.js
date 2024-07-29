import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import { updateInstance } from "../settings/genApi";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";
// add product
export const createNewProduct = createAsyncThunk(
  "post/store/product",
  async (payload) => {
    const { data } = await martApi
      .post("/store/product/new", payload, jsonHeader("store"))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const createProductHandler = (formData, dispatch) => {
  dispatch(createNewProduct(formData))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      if (res.type === "success") {
        mutate("/store/products");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
/*

*/

export const removeBg = (imgUrl, setImgData) => {
  axios({
    url: "https://api.remove.bg/v1.0/removebg",
    method: "post",
    data: {
      image_url: imgUrl,
      // 'http://res.cloudinary.com/xmart/image/upload/v1654572183/62796a8870e04f2804626fde/Bolato/pydh6xpnwzjhub2jlsxh.jpg',
      size: "auto",
      format: "auto",
      type: "auto",
    },
    headers: {
      "X-Api-Key": "sMy4sR7AsoQNHLSNCZQEGL7r",
    },
    responseType: "blob",
    encoding: null,
  })
    .then((response) => {
      setImgData(URL.createObjectURL(response.data), "image");
      // setIsLoading(false);
    })
    .catch((e) => console.log(e.response, "something missing"));
};
