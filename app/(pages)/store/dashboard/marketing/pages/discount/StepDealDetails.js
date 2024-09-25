// ** React Imports
import { useState, forwardRef } from "react";

// ** MUI Imports
import {
  Box,
  Grid,
  Checkbox,
  MenuItem,
  TextField,
  FormGroup,
  FormLabel,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Select,
} from "@mui/material";



// ** Third Party Imports
import format from "date-fns/format";
import DatePicker from "react-datepicker";



const CustomInput = forwardRef((props, ref) => {
  const startDate =
    props.start !== null ? format(props.start, "MM/dd/yyyy") : "";
  const endDate =
    props.end !== null ? ` - ${format(props.end, "MM/dd/yyyy")}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ""}`;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      label={props.label || ""}
      {...props}
      value={value}
    />
  );
});

const StepDealDetails = ({ campaignData, setCampaignData, formHandler }) => {
  // ** State
  const now = new Date()
  const { startDate, notification, endDate } = campaignData;
  
  const handleDateChange = (dates) => {
    console.log(dates);
    if (dates) {
      const [start, end] = dates;
      setCampaignData((prev) => {
        return { ...prev, startDate: start, endDate: end };
      });
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Deal Title"
          placeholder="Black Friday sale, 25% off"
          onChange={formHandler("title")}
          value={campaignData.title}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Deal Code"
          placeholder="25PEROFF"
          onChange={formHandler("code")}
          value={campaignData.code}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          onChange={formHandler("description")}
          value={campaignData.description}
          label="Deal Description"
          sx={{ "&, & .MuiInputBase-root": { height: "100%" } }}
          placeholder="To sell or distribute something as a business deal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* <FormControl fullWidth>
          <InputLabel id="select-cart-condition">Cart Condition</InputLabel>
          <Select
            labelId="select-cart-condition"
            label="Cart Condition"
            defaultValue=""
          >
            <MenuItem value="all">
              Cart must contain all selected Downloads
            </MenuItem>
            <MenuItem value="any">
              Cart needs one or more of the selected Downloads
            </MenuItem>
          </Select>
        </FormControl> */}
        <FormControl fullWidth className="!mb-4">
          <InputLabel id="select-deal-status">Campaign Status</InputLabel>
          <Select
            labelId="select-deal-status"
            label="Campaign Status"
            defaultValue=""
            value={campaignData.status}
            onChange={formHandler("status")}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
            {/* <MenuItem value="abandoned">Abandoned</MenuItem> */}
          </Select>
        </FormControl>
        <DatePicker
          selectsRange
          endDate={endDate || ""}
          selected={new Date()}
          startDate={startDate || ""}
          minDate={campaignData.status === "active" ? now : now.setDate(new Date().getDate() + 1)}
          id="date-range-picker"
          onChange={handleDateChange}
          shouldCloseOnSelect={false}
          customInput={
            <CustomInput
              label="Deal Duration"
              start={campaignData.status === "active" ? now : campaignData.startDate}
              end={campaignData.endDate}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          onChange={formHandler("usageLimit")}
          type="number"
          label="Max Users"
          
          value={campaignData.usageLimit}
          placeholder="500"
        />
        
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
          <FormLabel
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: "21px",
              letterSpacing: "0.1px",
            }}
          >
            Notify Users
          </FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="email"
              label="Email"
              onChange={formHandler("notification")}
              control={<Checkbox checked={notification === "email"} />}
            />
            {/* <FormControlLabel
              value="sms"
              disabled
              label="SMS"
              control={<Checkbox disabled />}
            /> */}

            <FormControlLabel
              control={
                <Checkbox checked={notification === "push-notification"} />
              }
              value="push-notification"
              onChange={formHandler("notification")}
              label="Push Notification"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default StepDealDetails;
