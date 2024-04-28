"use client";
import { useState } from "react"
import { Typography, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import {
  analyticsBreadCrumb,
  RightBreadCrumbChildren,
  TotalSaleGrowth,
} from "./components";

const StoreAnalysisPage = ({ params }) => {
  const path = { ...params, sidebar: "store-analytics" };
  // states
  const [startDate, setStartDate] = useState();
  const [endDate, SetEndDate] = useState()
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      crumb={[...analyticsBreadCrumb]}
      // breadCrumbRIghtChildren={
      //   <RightBreadCrumbChildren
      //     startDate={startDate}
      //     setStartDate={setStartDate}
      //     endDate={endDate}
      //     SetEndDate={SetEndDate}
      //   />
      // }
    >
      <Box className="relative">
        <Box className="mb-10 py-2 h-40 flex ">
          <Box className="mb-10 w-8/12 h-full px-2">
            <Box className="w-full h-full bg-white rounded-md">
              <TotalSaleGrowth />
            </Box>
          </Box>
          <Box className="mb-10 w-4/12 h-full px-2">
            <Box className="w-full h-full bg-white rounded-md"></Box>
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default StoreAnalysisPage;
