import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import CustomChip from "@/app/components/chip";
import { productSizes } from "@/app/data/store/productData";
import InputAdornment from "@mui/material/InputAdornment";
// ** Icon Imports
import Icon from "@/app/components/icon";

export const SimpleDropDown = ({
  label,
  onChange,
  sx,
  render,
  inputProps,
  defaultValue,
}) => {
  return (
    <FormControl fullWidth sx={{ ...sx }}>
      <Typography variant="caption" className="!mb-1">
        {label}
      </Typography>
      <Select
        fullWidth
        // label={label}
        placeholder="hol"
        value={defaultValue || ""}
        id="demo-simple-select-outlined"
        size="small"
        labelId="demo-simple-select-outlined-label"
        onChange={onChange}
        {...inputProps}
      >
        {render}
      </Select>
    </FormControl>
  );
};

export const SizeComponent = ({ selectedSizes, setSelectedSizes }) => {
  // ** State
  const [sizeType, setSizeType] = useState("EU");
  const [ourSizes, setOurSizes] = useState(productSizes);

  const handleChange = (event) => {
    setOurSizes(productSizes);
    setSizeType(event.target.value);
  };
  const filteredSizes = ourSizes.filter(
    (obj) => obj.size.split("-")[0] === sizeType
  );

  const selectSize = (id) => {
    const removed = filteredSizes.splice(id, 1);

    setSelectedSizes((old) => [...old, ...removed]);
    setOurSizes(() => [...filteredSizes]);
  };

  const unSelectSize = (id) => {
    const removed = selectedSizes.splice(id, 1);

    setSelectedSizes((old) => [...selectedSizes]);
    setOurSizes((old) => [...old, ...removed]);
  };

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12}>
          {selectedSizes.length && (
            <Box className="p-1 border border-gray-500">
              {selectedSizes.map((each, i) => {
                return (
                  <CustomChip
                    onClick={() => unSelectSize(i)}
                    sx={{ margin: 0.5, borderRadius: "5px" }}
                    label={
                      <Box className="flex items-center">
                        {each.size}
                        <Icon icon="tabler:x" fontSize={20} className="ml-2" />
                      </Box>
                    }
                    key={i}
                    skin="light"
                    color="primary"
                  />
                );
              })}
            </Box>
          )}
          <RadioGroup
            row
            aria-label="controlled"
            name="controlled"
            onChange={handleChange}
            value={sizeType}
          >
            <FormControlLabel
              value="EU"
              control={<Radio />}
              label="European Size"
            />
            <FormControlLabel value="US" control={<Radio />} label="US Size" />
            <FormControlLabel value="UK" control={<Radio />} label="Uk Size" />
          </RadioGroup>
        </Grid>
      </Grid>
      <br />
      {filteredSizes.map((each, i) => {
        return (
          <CustomChip
            onClick={() => selectSize(i)}
            sx={{ margin: 0.3, borderRadius: "5px" }}
            label={each.size}
            key={i}
            skin="light"
            color="primary"
          />
        );
      })}
    </Box>
  );
};

export const QuantityComponent = ({ setSelectedSizes, selectedSizes }) => {
  const handleQualityChange = (size, qty) => {
    const updated = selectedSizes.map((each) => {
      if (each.size === size) {
        return { ...each, quantity: qty };
      } else {
        return each;
      }
    });
    setSelectedSizes(() => [...updated]);
  };
  return (
    <Grid container spacing={1}>
      {selectedSizes.map((size, i) => {
        return (
          <Grid item xs={6} sm={4} key={i}>
            <TextField
              fullWidth
              id="icons-start-adornment"
              type="number"
              defaultValue={1}
              size="small"
              className="text-center"
              onChange={(e) => handleQualityChange(size.size, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{size.size}:</InputAdornment>
                ),
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const ColorComponent = ({ setSelectedSizes, selectedSizes }) => {
  const handleQualityChange = (size, color) => {
    const updated = selectedSizes.map((each) => {
      if (each.size === size) {
        let colorUpdate;
        if (each.colors.includes(color)) {
          colorUpdate = each.colors.filter((e) => e !== color);
        } else {
          colorUpdate = [...each.colors, color];
        }
        return { ...each, colors: colorUpdate };
      } else {
        return each;
      }
    });
    setSelectedSizes(() => [...updated]);
  };
  return (
    <Grid container spacing={1}>
      {selectedSizes.map((size, i) => (
        <Grid item xs={6} sm={4} key={i}>
          <div className="relative flex flex-col border rounded-md p-1.5">
            <div className="flex items-center">
              <h5 className="shrink-0">{size.size}</h5>
              <div className="w-5 h-5 mx-3 shrink-0 rounded-md border-none overflow-hidden">
                <input
                  id="colorInput"
                  type="color"
                  list="colorOptions"
                  onChange={(e) =>
                    handleQualityChange(size.size, e.target.value)
                  }
                  className="border-none h-10 w-16 -ml-2 -mt-1 bg-transparen appearnce-none"
                />
              </div>
            </div>
            <Box className="flex flex-wrap">
              {size.colors.map((color, key) => (
                <Box
                  bgcolor={color}
                  key={key}
                  className="h-6 w-6 shrink-0 shadow m-0.5 rounded-full"
                ></Box>
              ))}
            </Box>
            <datalist id="colorOptions">
              <option value="Red" />
              <option value="Green" />
              <option value="Blue" />
              <option value="Yellow" />
            </datalist>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
