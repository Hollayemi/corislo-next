"use client";
import HomeWrapper from "@/app/components/view/home";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import AccountingSettings from "./accountingSettings";
import BillingAndAddress from "./billingAndAddress";
import NotificationPref from "./notificationPref";
import SecuritySettings from "./securitySettings";
import HelpAndSupport from "./helpAndSupport";

const UserSettings = () => {
  const [value, setTabValue] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const tabs = [
    "Account Settings",
    "Billing and Address",
    "Notification Preferences",
    "Security Settings",
    "Help and Support",
  ];
  const tabContents = {
      "0": AccountingSettings,
      "1": BillingAndAddress,
      "2": NotificationPref,
      "3": SecuritySettings,
      "4": HelpAndSupport,
  };
  return (
    <HomeWrapper noFooter className="md:flex md:justify-center">
      <Box className="px-3 md:w-10/12">
        <Box className="flex items-center my-6">
          <Image
            src="/images/misc/settingsIcon.png"
            alt="settings.png"
            width={50}
            height={50}
            className="w-14 h-14"
          />
          <Box className="ml-4">
            <Typography
              variant="body2"
              className="!font-bold !text-black !text-[20px]"
            >
              Settings
            </Typography>
            <Typography variant="body2" className="!text-[13px] !text-gray-500">
              You get to customize and set your preferred choices
            </Typography>
          </Box>
        </Box>

        <TabContext value={value}>
          <TabList
            orientation="horizontal"
            onChange={handleChangeTab}
            className="flex-shrink-0 border-b"
            aria-label="Product Page"
          >
            {tabs.map((each, i) => (
              <Tab
                value={i.toString()}
                key={i}
                disableRipple
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-full !font-bold !text-left"
                  >
                    {each}
                  </Typography>
                }
              />
            ))}
          </TabList>
          {tabs.map((each, i) => {
            const Content = tabContents[i.toString()];
            return (
              <TabPanel value={i.toString()} key={i} className="!py-4 !px-0">
                <Box className="bg-white w-full px-3 py-5 md:p-8 !rounded-xl">
                  <Content />
                </Box>
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </HomeWrapper>
  );
};

export default UserSettings;
