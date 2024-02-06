import { CancelOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const Notification = ({ showOverlay }) => {
  return (
    <Box className="flex w-full px-1 justify-end">
      <Box className="w-full md:w-[420px] h-[600px] md:h-[500px] mt-20 relative bg-white rounded-xl md:mr-10 flex flex-col">
        <Box className="flex justify-between items-center px-4 h-14 border-b !w-full flex-shrink-0">
          <Typography variant="body2" className="!font-bold">
            Notification
          </Typography>
          <Box onClick={showOverlay}>
            <CancelOutlined />
          </Box>
        </Box>
        <Box className="flex-grow-1 h-[400px] max-h-[450px] w-full !overflow-auto overflowStyle"></Box>
        <Box className="h-14 flex items-center justify-center !text-[12px] w-full text-center border-t">
          See all notifications
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
