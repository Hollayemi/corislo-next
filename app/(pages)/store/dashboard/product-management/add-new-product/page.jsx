"use client";
import { useState } from "react";
import { prodInnerList } from "@/app/data/store/innerList";
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

const AddNewProduct = ({ params }) => {
  const theme = useTheme();
  const brk = theme.breakpoints.down;
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specId, setspecId] = useState(null);
  const [delivery, selectDelivery] = useState(["pickup"]);
  const { data: getData, error } = useSWR("/store/collections/thread");
  const { data: specData } = useSWR(
    specId && `/corisio/get-spec?specId=${specId}`
  );
  const collections = getData ? getData?.data : [{}];
  const specInfo = specData && specData?.data;
  const specWithSize = ["cloth_spec", "shoe_spec"]; 
  const [formData, setFormData] = useState({
    prodName: "",
    prodPrice: "",
    prodKey: "",
    prodInfo: "",
    specifications: {},
    images: "",
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

  const fromCollection = collections.filter(
    (x) => x.collectionId === formData.collectionId
  )[0];

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

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      crumb={[
        ...productBreadCrumb,
        { text: "Add Product", link: "add-new-product" },
      ]}
    >
      <Box className="bg-white rounded-md md:px-5 pt-6 pb-8 !text-[13px]">
        <Grid container spacing={4} className="!px-3">
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontWeight: "bold", mb: 2.5 }}>
              Description
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 0.5 }}>
              <Typography sx={{ mb: 2 }}>Product Name</Typography>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                id="outlined-basic"
                onChange={handleChange("prodName")}
                label="Product Name"
              />

              <Typography sx={{ my: 2 }}>Product Description</Typography>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                multiline
                id="textarea-outlined"
                onChange={handleChange("prodInfo")}
                maxRows={7}
                placeholder="Product Description"
                minRows={6}
                label="Product Description"
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
                fullWidth
                id="outlined-basic"
                label="Product Price"
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
                id="outlined-basic"
                label="Total in stock"
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
                    checked={delivery.includes("pickup")}
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
                    checked={delivery.includes("waybilling")}
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
                    checked={delivery.includes("courier")}
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
              Product Image
            </Typography>
            <Box className="pl-2 md:pl-4 mb-5">
              <FileUploader />
              <Box className="flex items-center justify-between">
                <Typography variant="caption" className="!mt-2">
                  Supported formats: JPG, PNG, MP3
                </Typography>
                <Typography variant="caption" className="!mt-2">
                  Maximum length of video is 30 secs
                </Typography>
              </Box>
            </Box>

            {specWithSize.includes(specInfo?.label) && (
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
        <Box className="flex items-center justify-center">
          <Button
            variant="contained"
            sx={{ mx: 0.4, px: brk("md") && 4, py: 0.5 }}
            className="bg-blue-900 text-xs mx-1 md:px-6 py-2"
            onClick={() =>
              createProductHandler(
                {
                  ...formData,
                  delivery,
                  specifications: {
                    sizes: selectedSizes,
                    variations: formData.specifications,
                  },
                },
                dispatch
              )
            }
          >
            Add Product
          </Button>
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
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default AddNewProduct;
