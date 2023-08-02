"use client";
import { useState } from 'react'
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  SimpleDropDown,
  SizeComponent,
  QuantityComponent,
  ColorComponent,
} from "./components";
import FileUploader from './dropZone';

const AddNewProduct = ({ params }) => {
  const theme = useTheme()
  const brk = theme.breakpoints.down;
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  
  const path={...params, sidebar: "product-management", sublist: "add-new-product"}

    return (
      <StoreLeftSideBar path={path} subListBar={true} InnerList={prodInnerList}>
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
                  label="Product Name"
                />

                <Typography sx={{ my: 2 }}>Product Description</Typography>
                <TextField
                  sx={{ mb: 0.5 }}
                  fullWidth
                  multiline
                  id="textarea-outlined"
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
                <SimpleDropDown label="Product Category" sx={{ mb: 2 }} />
                <SimpleDropDown label="Product Sub-Category" sx={{ mb: 2 }} />
                <SimpleDropDown label="Product Class" sx={{ mb: 2 }} />
              </Box>

              <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
                Pricing
              </Typography>
              <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 2.5 }}>
                <TextField
                  sx={{ mb: 0.5 }}
                  type="number"
                  fullWidth
                  id="outlined-basic"
                  label="Product Price"
                />
              </Box>

              <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
                Product Preference
              </Typography>
              <Box sx={{ pl: 0.2, pl: brk("md") && "0.5" }}>
                <FormControlLabel
                  value="Physical Pick-Up"
                  control={<Checkbox />}
                  label="Physical Pick-Up"
                  labelPlacement="end"
                />
                <br />
                <FormControlLabel
                  value="Courier Service"
                  control={<Checkbox />}
                  label="Courier Service"
                  labelPlacement="end"
                />
                <br />
                <FormControlLabel
                  value="Waybilling"
                  control={<Checkbox />}
                  label="Waybilling"
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
                  <Typography
                    color="custom.bodyGray"
                    sx={{ fontWeight: "bold", fontSize: "10px", mb: 0.5 }}
                  >
                    Supported formats: JPG, PNG, MP3
                  </Typography>
                  <Typography
                    color="custom.bodyGray"
                    sx={{ fontWeight: "bold", fontSize: "10px", mb: 0.5 }}
                  >
                    Maximum length of video is 30 secs
                  </Typography>
                </Box>
              </Box>
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
            </Grid>
            {/* 



*/}
          </Grid>
          <Box className="flex items-center justify-center">
            <Button
              variant="contained"
              sx={{ mx: 0.4, px: brk("md") && 4, py: 0.5 }}
              className="bg-blue-900 text-xs mx-1 md:px-6 py-2"
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
}


export default AddNewProduct