// ** React Imports
import { useState, Fragment, forwardRef } from "react";
import useSWR from "swr";
// ** MUI Imports
import {
  Grid,
  OutlinedInput,
  Select,
  Box,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Autocomplete,
} from "@mui/material";
// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import { CircleLoader } from "@/app/components/cards/loader";

const StepProducts = ({ campaignData, setCampaignData, formHandler }) => {
  const { data, isLoading } = useSWR("/products?limit=50");
  const options = data ? data.data : [];
  const [newOptions, setNewOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  console.log(options, search);
  const filtered = options.filter((x) =>
    x.prodName.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductChange = (event, newValue) => {
    const selectedIds = newValue.map((x) => x._id);
    setCampaignData((prev) => {
      return { ...prev, products: selectedIds };
    });
    setNewOptions(() => newValue);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12}>
        <Autocomplete
          id="asynchronous-demo"
          multiple
          fullWidth
          onChange={handleProductChange}
          open={open}
          value={newOptions}
          options={search ? filtered : options}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.prodName === value.prodName
          }
          getOptionLabel={(option) =>
            // <Box className="flex items-center">
            //   <img
            //     src="/images/more/1.png" // option.images[0].image
            //     alt="imgd"
            //     width={50}
            //     height={50}
            //     className="w-7 h-7 rounded-full"
            //   />
            //   <Typography>{option.prodName}</Typography>
            // </Box>
            option.prodName
          }
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              key={() => Math.random(15)}
              // onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label="Search for products"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isLoading ? <CircleLoader /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="select-user-type">User Type</InputLabel>
          <Select
            labelId="select-user-type"
            label="User Type"
            defaultValue=""
            value={campaignData.userType}
            onChange={formHandler("userType")}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="new-customers">New Customers</MenuItem>
            <MenuItem value="frequent-buyers">Frequent buyers</MenuItem>
            <MenuItem value="high-spenders">High Spenders</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          onChange={formHandler("minCartAmount")}
          value={campaignData.minCartAmount}
          label="Minimum Cart Amount"
          placeholder="₦0 (for any amount)"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch />}
          label="Limit this discount to a single-use per customer?"
        />
      </Grid>
      */}
    </Grid>
  );
};

export default StepProducts;
