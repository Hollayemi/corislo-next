"use client";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { marketingBreadCrumb, CampaignTab } from "./components";
import DiscountWizard from "./pages/discount";
import AnnouncementWizard from "./pages/announcement";
import Banner from "./pages/banner";
import DatePickerWrapper from "@/app/styles/react-datepicker";

const MarketingPage = ({ params }) => {
  const [screen, setScreen] = useState("campaign");
  const path = { ...params, sidebar: "marketing" };
  const pages = {
    campaign: (
      <DatePickerWrapper>
        <DiscountWizard />
      </DatePickerWrapper>
    ),
    anouncement: (
      <DatePickerWrapper>
        <AnnouncementWizard />
      </DatePickerWrapper>
    ),
    banner: (
      <DatePickerWrapper>
        <Banner />
      </DatePickerWrapper>
    ),
  };
  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...marketingBreadCrumb,
        {
          text: "Overview",
          link: "marketing",
          icon: "shop",
        },
      ]}
    >
      <Box className="-mt-5 px-2">
        <Box className="w-full bg-white flex items-center md:justify-center mb-2 py-2 border-x-4 border-white rounded-xl !overflow-x-auto ">
          <CampaignTab
            title="Campaign"
            caption="caption here"
            screen={screen}
            setScreen={setScreen}
          />
          <CampaignTab
            title="Anouncement"
            caption="caption here"
            screen={screen}
            setScreen={setScreen}
          />
          <CampaignTab
            title="Banner"
            caption="caption here"
            screen={screen}
            setScreen={setScreen}
          />
          <CampaignTab
            title="Radius Reach"
            caption="caption here"
            screen={screen}
            setScreen={setScreen}
          />
        </Box>
        <Box className="w-full md:p-6 bg-white rounded-xl">{pages[screen]}</Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default MarketingPage;
