import { Box, TextField, Button, MenuItem } from "@mui/material";
import { SimpleDropDown } from "../add-new-product/components";
import useSWR from "swr";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrand } from "@/app/redux/state/slices/shop/brands/brands";

const CreateSubCollection = () => {
    const [values, setValues] = useState({
      subCollectionName: "",
      collectionId: "",
      category: null,
      subcategory: "",
      brandInfo: "",
    });
  const { data: cols, isLoading } = useSWR("/store/collections");
  const { data: subCates, isLoading: subCateLoading } = useSWR( values.category &&
    `corisio/all-sub-categories?category=${values.category}`
  );
  const dispatch = useDispatch();
  console.log(values);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

    const handleCollectionSelection = (event) => {
        
        const { _id, category } = event.target.value;
        setValues({ ...values, category, collectionId: _id })
    }
    
  const collections = cols?.data || [{}];
  const subCategories = subCates?.data || [{}];

  console.log(cols, subCates);
  return (
    <Box className="flex-grow-1 w-full !overflow-auto overflowStyle py-2">
      <SimpleDropDown
        label="Select Collection"
        render={collections?.map((res, i) => (
          <MenuItem key={i} value={res}>
            {res.collectionName}
          </MenuItem>
        ))}
        sx={{ mb: 1.5 }}
        onChange={handleCollectionSelection}
        inputProps={{ className: "!h-2" }}
      />
      <SimpleDropDown
        label="Select Sub Category"
        render={subCategories?.map((res, i) => (
          <MenuItem key={i} value={res._id}>
            {res.label}
          </MenuItem>
        ))}
        sx={{ mb: 1.5 }}
        onChange={handleChange("subcategory")}
        inputProps={{ className: "!h-2" }}
      />
      <TextField
        sx={{ mb: 1.5 }}
        className="w-5/6"
        onChange={handleChange("subCollectionName")}
        // size="small"
        fullWidth
        id="outlined-basic"
        inputProps={{ className: "!h-2" }}
        placeholder="Sub Collection Name"
      />
      <TextField
        sx={{ mb: 1.5 }}
        fullWidth
        multiline
        id="textarea-outlined"
        onChange={handleChange("brandInfo")}
        maxRows={6}
        placeholder="About Sub Collection"
        minRows={5}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => createBrand(values, dispatch)}
        className="!mt-2"
      >
        Create Sub-Collection
      </Button>
    </Box>
  );
};

export default CreateSubCollection;
