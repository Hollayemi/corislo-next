"use client";
import { Box, Tab, Typography } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { settingsInnerList } from "@/app/data/store/innerList";
import { settingsBreadCrumb } from "./components";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import StaffSettings from "./pages/accountingSettings";
import SecuritySettings from "./pages/securitySettings";
import Activities from "./pages/activities";

const StoreSettings = ({ params }) => {
  const path = { ...params, sidebar: "settings" };
  const [value, setTabValue] = useState("0");
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = ["Account Settings", "Password Management", "Activities"];
  const tabContents = {
    0: StaffSettings,
    1: SecuritySettings,
    2: Activities,
  };

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[
        ...settingsBreadCrumb,
        { text: "Account Settings", link: "product-management" },
      ]}
    >
      <Box className="h-ful w-full bg-white">
        <TabContext value={value}>
          <TabList
            orientation="horizontal"
            variant="scrollable"
            onChange={handleChangeTab}
            className="flex-shrink-0 border-b overflow-x-auto"
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
    </StoreLeftSideBar>
  );
};

export default StoreSettings;
