// ** React Imports
"use client";
import { useState } from "react";
import UserWrapper from "@/app/components/view/user";
import { Box, Tab, Typography } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { TermsOfService } from "./tabs";


const TermsAndConditions = ({ searchParams }) => {
  // ** State
  const [value, setValue] = useState(searchParams.tab || "2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <UserWrapper>
      <Box className="w-full flex items-center pl-10 md:pl-20 md:-mt-16 !mb-10 h-14 md:h-[200px] bg-gradient-to-br from-pink-100 via-pink-200  to-violet-100">
        <Typography variant="body1" className="!font-black !text-3xl !mt-4">Legal</Typography>
      </Box>

      <TabContext value={value}>
        <Box className="flex justify-center">
          <Box className="flex flex-col md:flex-row md:w-3/5 relative">
            <Typography
              variant="caption"
              className="!text-md !text-left absolute -top-6 left-4"
            >
              ON THIS PAGE
            </Typography>

            <TabList
              orientation={
                typeof window !== "undefined"
                  ? window < 760
                    ? "horizpntal"
                    : "vertical"
                  : "vertical"
              }
              onChange={handleChange}
              className="flex-shrink-0"
              aria-label="Terms and conditions"
            >
              <Tab
                value="1"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Privacy Policy
                  </Typography>
                }
              />
              <Tab
                value="2"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Terms of Service
                  </Typography>
                }
              />
              <Tab
                value="3"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Acceptance Use Policy
                  </Typography>
                }
              />
            </TabList>
            <TabPanel value="1">
              <Typography>
                Cake apple pie chupa chups biscuit liquorice tootsie roll
                liquorice sugar plum. Cotton candy wafer wafer jelly cake
                caramels brownie gummies.
              </Typography>
            </TabPanel>
            <TabPanel value="2">
              <TermsOfService />
            </TabPanel>
            <TabPanel value="3">
              <Typography>
                Danish tiramisu jujubes cupcake chocolate bar cake cheesecake
                chupa chups. Macaroon ice cream tootsie roll carrot cake gummi
                bears.
              </Typography>
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </UserWrapper>
  );
};

export default TermsAndConditions;
