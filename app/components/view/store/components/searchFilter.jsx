import { CancelOutlined } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const AppSearch = ({ showOverlay }) => {
  return (
    <Box className="flex w-full px-1 justify-center">
      <Box className="w-full md:w-[550px] h-[600px] md:h-[500px] mt-20 relative bg-white rounded-xl md:mr-10 flex flex-col">
        <Box className="flex justify-between items-center px-4 h-14 border-b !w-full flex-shrink-0">
          <Typography variant="body2" className="!font-bold">
            Search
          </Typography>
          <Box onClick={showOverlay}>
            <CancelOutlined />
          </Box>
        </Box>
        <Box className="flex-grow-1 h-[400px] max-h-[450px] mt-4 w-full !overflow-auto overflowStyle">
          <Box className="w-full flex justify-center">
            <TextField
              sx={{ mb: 0.5 }}
              className="w-5/6"
              size="small"
              id="outlined-basic"
              inputProps={{ className: "h-10" }}
              placeholder="Search."
            />
          </Box>
        </Box>
        <Box className="h-14 flex items-center justify-center !text-[12px] w-full text-center ">
          Load more
        </Box>
      </Box>
    </Box>
  );
};

export default AppSearch;
