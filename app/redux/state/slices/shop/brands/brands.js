import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import {
  Corisio_Specifications,
  martCategories,
} from "../../../../components/SellerComponents/Info/Categories";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import { deleteHandler } from "../delete";
import { myBusinessFiles, storeFiles } from "../display/displayAll";
import { updateInstance } from "../settings/genApi";
import tokens from "@/app/configs/tokens";

export const createBrandApi = createAsyncThunk(
  "post/createBrand",
  async (payload) => {
    const storeToken = tokens.store;
    const { data } = await martApi
      .post(`/store/brand`, payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

// export const updateInstance = createAsyncThunk(
//     'post/collectionInstance',
//     async (payload) => {
//         const { data } = await martApi
//             .post(`/use`, payload, {})
//             .then((res) => {
//                 return res;
//             })
//             .catch((e) => {
//                 return e.response;
//             });
//         return data;
//     }
// );

//
//
//
//

export const createBrand = (formData, neededInfo, dispatch) => {
  if (neededInfo.authStatus === REQUEST_STATUS.VERIFIED) {
    dispatch(createBrandApi(formData))
      .then(unwrapResult)
      .then((res) => {
        toaster({ ...res });
        neededInfo.reFetchData();
        if (res.type === "success") {
        }
      })
      .catch((e) => {});
  }
};

//
//
//
//

export const deleteBrand = (splited, reFetchData, eventFunc, dispatch) => {
  const payload = {
    delCase: "brand",
    _id: splited[2],
    name: splited[0],
  };
  dispatch(deleteHandler(payload))
    .then(unwrapResult)
    .then((resr) => {
      dispatch(myBusinessFiles());
      toaster({ ...res });
      reFetchData();
      eventFunc("");
    })
    .catch((e) => {});
};

export const loadChildren = (cate) => {
  const theArray = [];
  const forArr = (array) => {
    for (let i = 0; i < array.length; i++) {
      const holl = {
        label: array[i].value,
        value: array[i].value,
      };
      theArray.push(holl);
      const element = array[i].children;
      if (element.length > 0) {
        forArr(element);
      }
    }
  };
  martCategories[0].children.map((res, index) => {
    if (res.label === cate) {
      forArr(res.children);
    }
  });
  return theArray;
};

export const loadCategories = (cate) => {
  const theArray = [];
  const forArr = (array) => {
    for (let i = 0; i < array.length; i++) {
      const holl = {
        label: array[i].value,
        value: array[i].value,
        spec: array[i].spec,
      };
      theArray.push(holl);
    }
  };
  martCategories[0].children.map((res, index) => {
    if (res.label === cate) {
      forArr(res.children);
    }
  });
  return theArray;
};

export const loadSubCategories = (cate, subCategory) => {
  const theArray = [];
  const forArr = (array) => {
    for (let i = 0; i < array.length; i++) {
      const holl = {
        label: array[i].label,
        value: array[i].value,
        children: array[i].children,
      };
      theArray.push(holl);
      // const element = array[i].children;
      // if (element.length > 0) {
      //     theArray.push();
      // }
    }
  };
  martCategories[0].children.map((res, index) => {
    if (res.label === cate) {
      res.children.map((res, index) => {
        if (res.label === subCategory) {
          forArr(res.children);
        }
      });
    }
  });
  return theArray;
};

export const loadSpecifications = (cate, subCategory, group) => {
  const theArray = {};
  const forArr = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (group === array[i].label) {
        if (array[i].children[0] && array[i].children[0].label) {
          const prodSpec = Corisio_Specifications[array[i].children[0].label];
          theArray.spec = prodSpec;
        } else {
          theArray.spec = {};
        }
      }
    }
  };
  martCategories[0].children.map((res, index) => {
    if (res.label === cate) {
      res.children.map((res, index) => {
        if (res.label === subCategory) {
          forArr(res.children);
        }
      });
    }
  });
  return theArray;
};
