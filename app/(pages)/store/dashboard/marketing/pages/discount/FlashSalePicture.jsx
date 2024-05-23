"use client";
import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProfilePictureUploader from "@/app/components/cards/fileUpload";

const FlashSalePicture = ({ setCampaignData }) => {
  const [localFile, setLocalFiles] = useState("");
  const handleSetFiles = (event) => {
    setCampaignData((prev) => {
      return { ...prev, image: event };
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="relative w-full">
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
      </Grid>
    </Grid>
  );
};

export default FlashSalePicture;
