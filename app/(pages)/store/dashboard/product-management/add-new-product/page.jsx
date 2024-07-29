"use client";
import { useEffect, useState } from "react";
import { prodInnerList } from "@/app/data/store/innerList";
import { useSearchParams } from "next/navigation";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  SimpleDropDown,
  SizeComponent,
  QuantityComponent,
  ColorComponent,
} from "./components";
import FileUploader from "./dropZone";
import useSWR from "swr";
import { removeOrAddToArray } from "@/app/utils/arrayFunctions";
import { createProductHandler } from "@/app/redux/state/slices/shop/products/productSlice";
import { useDispatch } from "react-redux";
import { productBreadCrumb } from "../components";
import { editProductHandler } from "@/app/redux/state/slices/shop/products/updateProduct";
import IconifyIcon from "@/app/components/icon";
// no allow (),+,
const AddNewProduct = ({ params }) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const editID = searchParams.get("edit");
  const brk = theme.breakpoints.down;
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specId, setspecId] = useState(null);
  const [files, setFiles] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);
  const [delivery, selectDelivery] = useState(["pickup"]);
  const { data: getData, error } = useSWR("/store/collections/thread");
  const { data: toEdit } = useSWR(editID && `/products?productId=${editID}`);
  const { data: specData } = useSWR(
    specId && `/corisio/get-spec?specId=${specId}`
  );
  let specInfo = specData && specData?.data;
  const collections = getData ? getData?.data : [{}];
  const prodToEdit = toEdit ? toEdit.data?.result : [];
  const specWithSize = ["cloth_spec", "shoe_spec"];
  const reduxFuntion = editID ? editProductHandler : createProductHandler;
  const [formData, setFormData] = useState({
    prodName: "",
    prodPrice: "",
    prodKey: "",
    prodInfo: "",
    specifications: {},
    images: [],
    totInStock: "",
    collectionId: "",
    subCollection: "",
    subCollectionName: "",
    collectionName: "",
    category: "",
    subcategory: { sizes: selectedSizes },
    productGroup: "",
    delivery,
  });
  console.log(files);
  let fromCollection = collections.filter(
    (x) => x.collectionId === formData.collectionId
  )[0];

  useEffect(() => {
    if (toEdit) {
      const toEditData = prodToEdit[0] || {};
      setFormData(() => {
        return {
          prodName: toEditData.prodName,
          prodPrice: toEditData.prodPrice,
          video: toEditData.video,
          prodKey: toEditData.prodKey,
          prodInfo: toEditData.prodInfo,
          images: toEditData.images,
          totInStock: toEditData.totInStock,
          collectionId: toEditData.collectionId,
          subCollection: toEditData.subCollection,
          subCollectionName: toEditData.subCollectionName,
          collectionName: toEditData.collectionName,
          subcategory: toEditData.subcategory,
          productGroup: toEditData.productGroup,
          delivery: toEditData.delivery,
          specifications: toEditData.specifications?.variations || {},
          category: toEditData.categoryId,
          _id: toEditData._id,
        };
      });
      selectDelivery(toEditData.delivery);
      fromCollection = collections.filter(
        (x) => x.collectionId === toEditData.collectionId
      )[0];
    }
  }, [toEdit]);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event?.target?.value || "" });
  };

  const deliveryHandler = (value) => {
    removeOrAddToArray(value, delivery, selectDelivery);
  };

  const path = {
    ...params,
    sidebar: "product-management",
    sublist: "add-new-product",
  };

  const handleSubCateSelection = (event) => {
    const { _id, ...others } = event.target.value;
    setFormData({
      ...formData,
      ...others,
      subCollection: _id,
      collectionName: fromCollection.collectionName,
    });
    setspecId(null);
  };

  const handleProductGroupSelection = (event) => {
    const { _id, spec } = event.target.value;
    setFormData({
      ...formData,
      productGroup: _id,
    });
    setspecId(spec);
  };

  console.log(formData);
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      crumb={[
        ...productBreadCrumb,
        {
          text: editID ? "Edit Product" : "Add Product",
          link: "add-new-product",
        },
      ]}
    >
      <Box className="bg-white rounded-md md:px-5 pt-6 pb-8 !text-[13px]">
        <Grid container spacing={4} className="!px-3">
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontWeight: "bold", mb: 2.5 }}>
              Description
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
                Product Name
              </Typography>
              <TextField
                className="!mt-1 !mb-3"
                fullWidth
                size="small"
                value={formData.prodName}
                id="outlined-basic"
                onChange={handleChange("prodName")}
                // label="Product Name"
              />

              <Typography variant="caption" className="!mb-1">
                Product Description
              </Typography>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                multiline
                id="textarea-outlined"
                onChange={handleChange("prodInfo")}
                maxRows={7}
                value={formData.prodInfo}
                // placeholder="Product Description"
                minRows={6}
                // label="Product Description"
              />
            </Box>

            <Typography sx={{ fontWeight: "bold", my: 2.5 }}>
              Category
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 1.5 }}>
              <SimpleDropDown
                render={collections?.map((res, i) => (
                  <MenuItem key={i} value={res.collectionId}>
                    {res.collectionName}
                  </MenuItem>
                ))}
                defaultValue={fromCollection?.collectionId}
                onChange={handleChange("collectionId")}
                label="Product Category"
                sx={{ mb: 2 }}
              />
              <SimpleDropDown
                render={fromCollection?.sub_collections?.map((res, i) => (
                  <MenuItem key={i} value={res}>
                    {res.subCollectionName}
                  </MenuItem>
                ))}
                defaultValue={
                  fromCollection?.sub_collections?.filter(
                    (x) => x.subCollectionName == formData.subCollectionName
                  )[0]
                }
                onChange={handleSubCateSelection}
                label="Product Sub-Category"
                sx={{ mb: 2 }}
              />
              <SimpleDropDown
                render={fromCollection?.group?.map((res, i) => (
                  <MenuItem key={i} value={res}>
                    {res.label}
                  </MenuItem>
                ))}
                defaultValue={
                  fromCollection?.group?.filter(
                    (x) => x.spec == formData.subCollection
                  )[0]
                }
                onChange={handleProductGroupSelection}
                label="Product Class"
                sx={{ mb: 2 }}
              />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Pricing
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 2.5 }}>
              <TextField
                sx={{ mb: 0.5 }}
                onChange={handleChange("prodPrice")}
                type="number"
                value={formData.prodPrice}
                fullWidth
                size="small"
                id="outlined-basic"
                // label="Product Price"
              />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Total In Stock
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 2.5 }}>
              <TextField
                sx={{ mb: 0.5 }}
                onChange={handleChange("totInStock")}
                type="number"
                fullWidth
                value={formData.totInStock}
                size="small"
                id="outlined-basic"
                // label="Total in stock"
              />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Product Preference
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5" }}>
              <FormControlLabel
                value="Physical Pick-Up"
                control={
                  <Checkbox
                    checked={delivery?.includes("pickup")}
                    onChange={() => deliveryHandler("pickup")}
                    disabled={false}
                    name="pickup-checked"
                  />
                }
                label="Physical Pick-Up"
                labelPlacement="end"
              />
              <br />
              <FormControlLabel
                value="waybilling"
                control={
                  <Checkbox
                    checked={delivery?.includes("waybilling")}
                    onChange={() => deliveryHandler("waybilling")}
                    disabled={false}
                    name="waybilling-checked"
                  />
                }
                label="Waybilling"
                labelPlacement="end"
              />
              <br />
              <FormControlLabel
                value="Courier Service"
                control={
                  <Checkbox
                    checked={delivery?.includes("courier")}
                    onChange={() => deliveryHandler("courier")}
                    disabled={true}
                    name="courier-checked"
                  />
                }
                label="Courier Service"
                labelPlacement="end"
              />
            </Box>
          </Grid>
          {/* 




*/}
          <Grid item xs={12} md={7}>
            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Product Media
            </Typography>
            <Box className="pl-2 md:pl-4 mb-5">
              <Box className="flex flex-col md:flex-row items-start mb-5 p-3 bg-gray-50 border rounded">
                {formData.video && (
                  <video className=" w-full md:w-52 md:h-40 relative" controls>
                    <source
                      // src="https://www.w3schools.com/html/mov_bbb.mp4"
                      src={formData.video}
                      type="video/mp4"
                    />
                    <div
                      onClick={() => {}}
                      className="text-[6px] flex items-center z-50 justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                    >
                      <IconifyIcon icon="tabler:trash" fontSize={16} />
                    </div>
                  </video>
                )}
                <Box className="flex items-center flex-wrap">
                  {formData.images.map((each, i) => (
                    <Box className="relative w-16 h-16 m-3" key={i}>
                      <img
                        className="w-full h-full rounded-md"
                        alt={each.name}
                        src={each.image}
                      />
                      <div
                        onClick={() => {}}
                        className="text-[6px] flex items-center justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                      >
                        <IconifyIcon icon="tabler:trash" fontSize={12} />
                      </div>
                    </Box>
                  ))}
                </Box>
              </Box>
              <FileUploader
                files={files}
                setFiles={setFiles}
                localFiles={localFiles}
                setLocalFiles={setLocalFiles}
              />
              <Box className="flex items-center justify-between">
                <Typography variant="caption" className="!mt-2">
                  Supported formats: JPG, PNG, MP3
                </Typography>
                <Typography variant="caption" className="!mt-2">
                  Maximum length of video is 30 secs
                </Typography>
              </Box>
            </Box>

            {specWithSize?.includes(specInfo?.label) && (
              <>
                <Typography className="font-black mb-5">Select Size</Typography>
                <Box className="pl-2 md:pl-4 mb-4">
                  <SizeComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Quantity
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <QuantityComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Color
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <ColorComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>
              </>
            )}
            {specInfo && (
              <Box className="mt-4">
                <Box className="flex justify-center px-2 !mt-3 w-full">
                  <Box className="flex flex-col w-full">
                    <Autocomplete
                      options={Object.keys(specInfo?.spec)}
                      onChange={(e, newValue) => setNewSpec(newValue)}
                      value={newSpec}
                      onInputChange={(e, newValue) =>
                        newValue && setNewSpec(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select / Add Variation"
                          sx={{ border: 0 }}
                          value={newSpec}
                          onChange={() => {}}
                          size="small"
                          fullWidth
                          className="!w-full outline-0 !mb-4"
                        />
                      )}
                    />
                    <Box className="flex items-center w-full">
                      <Autocomplete
                        options={specInfo.spec[newSpec] || []}
                        className="!w-8/12 mr-3 mt-1 md:mt-0 outline-0 !mb-2"
                        value={specValue}
                        onChange={(e, newValue) => setSpecValue(newValue)}
                        onInputChange={(e, newValue) =>
                          newValue && setSpecValue(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select / Add Value"
                            sx={{ border: 0 }}
                            value={specValue}
                            onChange={() => {}}
                            size="small"
                            fullWidth
                            className="!w-full mr-3 outline-0"
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        className="!text-[12px] h-10  w-4/12 !shadow-none"
                        onClick={() => {
                          if (newSpec && specValue) {
                            setFormData({
                              ...formData,
                              specifications: {
                                ...formData.specifications,
                                [newSpec.replaceAll(" ", "_")]: specValue,
                              },
                            });
                            setNewSpec("");
                            setSpecValue("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box className="px-4 !mb-14">
                  {Object.keys(formData.specifications).map((val) => {
                    return (
                      <Box>
                        {val.replace("_", " ")} : {formData.specifications[val]}{" "}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Grid>
          {/* 



*/}
        </Grid>
        <Box className="flex items-center justify-center mt-6">
          <Button
            variant="contained"
            sx={{ mx: 0.4, px: brk("md") && 4, py: 0.5 }}
            className="bg-blue-900 text-xs md:px-6 !py-2 !w-full md:!w-48"
            onClick={() =>
              reduxFuntion(
                {
                  ...formData,
                  delivery,
                  specifications: {
                    sizes: selectedSizes,
                    variations: formData.specifications,
                  },
                  newImages: files,
                },
                dispatch
              )
            }
          >
            {editID ? "Update " : "Add "} Product
          </Button>
          {!editID && (
            <>
              {" "}
              <Button
                variant="contained"
                sx={{ mx: 0.4, px: brk("md") && 4, py: 0.5 }}
                className="bg-blue-900 mx-1 md:px-6"
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{ mx: 0.4, px: brk("md") && 4, py: 0.5 }}
                className="bg-blue-900 mx-1 md:px-6"
              >
                Discard
              </Button>
            </>
          )}
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default AddNewProduct;
