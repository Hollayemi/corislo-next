import { CancelOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateCollection from "../add-new-category/collection";
import CreateSubCollection from "../add-new-category/subCollection";

const CreateCategory = ({ showOverlay }) => {
  const [value, setTabValue] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box className="flex w-full px-2 justify-center h-[550px] overflowStyle">
      <Box className="w-full md:w-[750px] h-[550px] overflow-y-auto overflowStyle mt-20 relative bg-white rounded-xl md:mr-10 flex flex-col">
        <Box className="w-full !rounded-md pt-2 px-3">
          <TabContext value={value}>
            <TabList
              orientation="horizontal"
              onChange={handleChangeTab}
              className="flex-shrink-0 border-b"
              aria-label="Product Page"
            >
              <Tab
                value="1"
                className="w-1/2"
                disableRipple
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-full !font-bold !text-left"
                  >
                    Create Collection
                  </Typography>
                }
              />
              <Tab
                value="2"
                className="w-1/2"
                disableRipple
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-full !font-bold !text-left"
                  >
                    Create Sub-Collection
                  </Typography>
                }
              />
            </TabList>
            <TabPanel value="1" className="!px-3">
              <CreateCollection />
            </TabPanel>
            <TabPanel value="2" className="!px-3 h-fit">
              <CreateSubCollection />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  )
};

export default CreateCategory;
