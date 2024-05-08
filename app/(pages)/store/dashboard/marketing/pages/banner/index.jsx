"use client";
import { useState, forwardRef } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
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

const Banner = ({ setCampaignData }) => {
  const [localFile, setLocalFiles] = useState("");
  const [formData, setFormData] = useState({
    url: "",
    startDate: null,
    endDate: null,
    image: [],
  });

  const formHandler =
    (prop) =>
    ({ target }) => {
      setFormData((prev) => {
        return { ...prev, [prop]: target.value };
      });
    };

  const handleSetFiles = (event) => {
    formHandler((prev) => {
      return { ...prev, image: event };
    });
  };

  const handleDateChange = (dates) => {
    console.log(dates);
    if (dates) {
      const [start, end] = dates;
      setFormData((prev) => {
        return { ...prev, startDate: start, endDate: end };
      });
    }
  };
  return (
    <Box className="relative w-full p-2 py-5">
      <Box className="w-full flex justify-center mb-4">
        <Box className="flex flex-col md:flex-row w-full md:w-10/12 items-center justify-center">
          <Box className="w-full md:w-1/2 p-2">
            <TextField
              label="URL"
              fullWidth
              placeholder="Link the banner a page (within corisio)"
              onChange={formHandler("url")}
              value={formData.url}
            />
          </Box>
          <Box className="w-full md:w-1/2 p-2">
            <DatePicker
              selectsRange
              className=""
              startDate={formData.startDate || ""}
              endDate={formData.endDate || ""}
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
          </Box>
        </Box>
      </Box>
      <Box className="relative flex justify-center w-full">
        <Box className="w-full md:w-10/12">
          <ProfilePictureUploader
            setFiles={handleSetFiles}
            setLocalFiles={setLocalFiles}
            component={
              <Box className="relative w-full h-40 md:h-64">
                {localFile && (
                  <img
                    src={URL?.createObjectURL(localFile[0])}
                    alt="settings.png"
                    width={250}
                    height={250}
                    className="w-full h-full "
                  />
                )}
                <Box className="flex flex-col items-center border-2 border-dashed justify-center w-full h-full rounded-md absolute top-0 left-0 !text-white">
                  <Box className="w-full h-full rounded-md bg-black opacity-10 absolute top-0 left-0"></Box>
                  <img
                    className="w-16 h-16"
                    alt="Upload img"
                    src={`/images/misc/upload-cloud.png`}
                  />
                  <Typography
                    variant="caption"
                    className="!text-[10px] z-50 !text-gray-400"
                  >
                    Drag and drop image
                  </Typography>
                </Box>
              </Box>
            }
          />
        </Box>
      </Box>
      <Box className="flex justify-center">
        <Button
          variant="contained"
          className="!shadow-none !h-12 !mt-6 !text-[12px] !w-full  md:!w-10/12"
          onClick={() => {}}
        >
          Upload Banner
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
