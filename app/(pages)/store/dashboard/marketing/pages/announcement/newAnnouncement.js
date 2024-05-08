// ** React Imports
import { useState, forwardRef } from "react";
import { addNewAnnouncement } from "@/app/redux/state/slices/shop/campaign";
import { useDispatch } from "react-redux";

// ** MUI Imports
import {
  Box,
  Typography,
  Grid,
  Checkbox,
  MenuItem,
  TextField,
  FormGroup,
  FormLabel,
  InputLabel,
  FormControl,
  FormControlLabel,
  Button,
  Select,
} from "@mui/material";
import ProfilePictureUploader from "@/app/components/cards/fileUpload";

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

const NewAnnouncement = ({ formData, setFormData, formHandler }) => {
  // ** State
  const dispatch = useDispatch();
  const [localFile, setLocalFiles] = useState("");
  const { startDate, notification, endDate } = formData;

  const handleDateChange = (dates) => {
    console.log(dates);
    if (dates) {
      const [start, end] = dates;
      setFormData((prev) => {
        return { ...prev, startDate: start, endDate: end };
      });
    }
  };

  const handleSetFiles = (event) => {
    setFormData((prev) => {
      return { ...prev, image: event };
    });
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6} className="md:!px-3">
        <TextField
          fullWidth
          label="Announcement Title"
          placeholder="e.g (New Product Arrival)"
          onChange={formHandler("title")}
          value={formData.title}
        />
        <TextField
          fullWidth
          multiline
          minRows={2}
          onChange={formHandler("brief")}
          value={formData.brief}
          className="!my-4"
          label="Brief Information"
          placeholder="Get up to 80% discount."
        />
        <TextField
          fullWidth
          label="URL"
          placeholder="Page to link to e.g (product page, category page, etc )"
          onChange={formHandler("url")}
          value={formData.url}
        />
        <DatePicker
          selectsRange
          className="!my-4"
          startDate={startDate || ""}
          endDate={endDate || ""}
          selected={new Date()}
          minDate={new Date()}
          id="date-range-picker"
          onChange={handleDateChange}
          shouldCloseOnSelect={false}
          customInput={
            <CustomInput
              label="Duration"
              start={formData.startDate}
              end={formData.endDate}
            />
          }
        />
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
          <FormGroup aria-label="position" row className="!mb-4">
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
      <Grid item xs={12} sm={6} className="md:!px-3">
        <FormControl fullWidth>
          <InputLabel id="select-deal-status">Campaign Status</InputLabel>
          <Select
            labelId="select-deal-status"
            label="Campaign Status"
            defaultValue=""
            value={formData.status}
            onChange={formHandler("status")}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
            {/* <MenuItem value="abandoned">Abandoned</MenuItem> */}
          </Select>
        </FormControl>
        <Box className="relative w-full flex justify-center mt-4">
          <ProfilePictureUploader
            setFiles={handleSetFiles}
            setLocalFiles={setLocalFiles}
            component={
              <Box className="relative w-60 h-60 flex justify-center">
                  <Box className="flex flex-col items-center border-2 border-dashed justify-center w-full h-full rounded-md absolute top-0 left-0 !text-white">
                    {localFile && (
                      <img
                        src={URL?.createObjectURL(localFile[0])}
                        alt="settings.png"
                        width={250}
                        height={250}
                        className="w-full h-full x absolute top-0 left-0"
                      />
                    )}
                    <Box className="w-full h-full z-30 rounded-md bg-black opacity-30 absolute top-0 left-0"></Box>
                    <img
                      className="w-16  z-50 h-16"
                      alt="Upload img"
                      src={`/images/misc/upload-cloud.png`}
                    />
                    <Typography
                      variant="caption"
                      className="!text-[10px] z-50 !text-white"
                    >
                      Drag and drop image
                    </Typography>
                  </Box>
                </Box>
             
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          className="!shadow-none !h-12 !mt-4 !text-[12px]"
          onClick={() => addNewAnnouncement(formData, dispatch)}
        >
          Create New Announcement
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewAnnouncement;
