import { Box, TextField, Button, MenuItem } from "@mui/material";
import { SimpleDropDown } from "../add-new-product/components";
import useSWR from "swr";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createHandler } from "@/app/redux/state/slices/shop/collections/createCollection";

const CreateCollection = () => {
  const { data, isLoading } = useSWR("/corisio/all-categories");
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    collectionName: "",
    category: "",
    collectionInfo: "",
  });
  console.log(values);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const categories = data?.data || [{}];

  console.log(data);
  return (
    <Box className="flex-grow-1 w-full !overflow-auto overflowStyle py-3">
      <SimpleDropDown
        label="Select Category"
        render={categories?.map((res, i) => (
          <MenuItem key={i} value={res._id}>
            {res.label}
          </MenuItem>
        ))}
        sx={{ mb: 2 }}
        onChange={handleChange("category")}
        inputProps={{ className: "!h-2" }}
      />
      <TextField
        sx={{ mb: 2 }}
        className="w-5/6"
        onChange={handleChange("collectionName")}
        // size="small"
        fullWidth
        id="outlined-basic"
        inputProps={{ className: "!h-2" }}
        placeholder="Collection Name"
      />
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        multiline
        id="textarea-outlined"
        onChange={handleChange("collectionInfo")}
        maxRows={7}
        placeholder="About Collection"
        minRows={6}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => createHandler(values, dispatch)}
        className="!mt-4"
      >
        Create Collection
      </Button>
    </Box>
  );
};

export default CreateCollection;
