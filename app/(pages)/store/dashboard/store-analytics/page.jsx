"use client";
import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import ReactApexcharts from "@/app/components/chart/react-apexcharts";
import Icon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import {
  analyticsBreadCrumb,
  RightBreadCrumbChildren,
  TotalSaleGrowth,
  GeneatedLeadChart,
  CategoriesGrowth,
  StoreGrowth,
  reshapePrice,
  Growth,
} from "./components";

const StoreAnalysisPage = ({ params }) => {
  const path = { ...params, sidebar: "store-analytics" };
  // states
  const [startDate, setStartDate] = useState();
  const [endDate, SetEndDate] = useState();
  const [interval, setInterval] = useState("Monthly");
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      crumb={[...analyticsBreadCrumb]}
      breadCrumbRIghtChildren={
        <OptionsMenu
          icon={
            <Button
              variant="outlined"
              className="!text-xs !border-gray-200 !rounded-full !text-gray-400 !bg-white !ml-3"
              endIcon={
                <Icon
                  icon="tabler:arrows-exchange"
                  className="!text-[17px] rotate-90"
                />
              }
            >
              {interval}
            </Button>
          }
          options={["daily", "Weekly", "Monthly", "Yearly"]}
          setOption={setInterval}
          iconButtonProps={{
            size: "small",
            sx: { color: "text.disabled", cursor: "pointer" },
          }}
        />
      }
    >
      <Box className="relative ">
        <Box className="h-44 flex -mt-2">
          <Box className="mb-10 w-8/12 h-full pr-2">
            <Box className="w-full h-full flex bg-white rounded-xl">
              <TotalSaleGrowth interval={interval} />
              <Box className="w-1/2 flex h-full">
                <Box className="w-1/2 p-3 relative border-r !border-gray-100 h-full">
                  <Typography
                    className="!text-[12px] !text-gray-300 !font-bold"
                    variant="body2"
                  >
                    Total Sale Count
                  </Typography>
                  <Typography
                    className="!text-[19px] !text-gray-900 !font-extrabold !mt-1"
                    variant="body2"
                  >
                    {reshapePrice(540000)}
                  </Typography>
                  <Box className="absolute bottom-0 mb-2 flex items-center">
                    <Growth percentage={200} />
                    <Typography
                      className="!text-[11px] !text-gray-500 !ml-2"
                      variant="body2"
                    >
                      From last month
                    </Typography>
                  </Box>
                </Box>
                <Box className="w-1/2 p-3 relative  h-full">
                  <Typography
                    className="!text-[12px] !text-gray-300 !font-bold"
                    variant="body2"
                  >
                    Total Sale Count
                  </Typography>
                  <Typography
                    className="!text-[19px] !text-gray-900 !font-extrabold !mt-1"
                    variant="body2"
                  >
                    {reshapePrice(127000)}
                  </Typography>
                  <Box className="absolute bottom-0 mb-2 flex items-center">
                    <Growth percentage={200} />
                    <Typography
                      className="!text-[11px] !text-gray-500 !ml-2"
                      variant="body2"
                    >
                      From last month
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="mb-10 w-4/12 h-full pl-2">
            <Box className="w-full h-full bg-white rounded-xl p-3">
              <Typography
                className="!text-[12px] !text-gray-300 !font-bold"
                variant="body2"
              >
                Sales Conversion Rate
              </Typography>
              <GeneatedLeadChart />
            </Box>
          </Box>
        </Box>

        {/* Store Sales Growth */}
        <Box>
          <Box className="mt-8 flex items-center relative">
            <Typography
              variant="body2"
              className="!text-black !text[14px] !font-bold"
            >
              Branches Sales
            </Typography>
            <OptionsMenu
              icon={
                <Button
                  variant="outlined"
                  className="!text-xs !border-gray-200 !rounded-full !text-gray-400 !bg-white !ml-3"
                  endIcon={
                    <Icon
                      icon="tabler:arrows-exchange"
                      className="!text-[17px] rotate-90"
                    />
                  }
                >
                  {interval}
                </Button>
              }
              options={["daily", "Weekly", "Monthly", "Yearly"]}
              setOption={setInterval}
              iconButtonProps={{
                size: "small",
                sx: { color: "text.disabled", cursor: "pointer" },
              }}
            />
          </Box>

          <Box className="mt-3  flex-wrap w-full flex bg-white rounded-xl">
            <StoreGrowth interval={interval} />
          </Box>
        </Box>
        {/* Categories Sales Growth */}
        <Box>
          <Box className="mt-8 flex items-center relative">
            <Typography
              variant="body2"
              className="!text-black !text[14px] !font-bold"
            >
              Categories Sales
            </Typography>
            <OptionsMenu
              icon={
                <Button
                  variant="outlined"
                  className="!text-xs !border-gray-200 !rounded-full !text-gray-400 !bg-white !ml-3"
                  endIcon={
                    <Icon
                      icon="tabler:arrows-exchange"
                      className="!text-[17px] rotate-90"
                    />
                  }
                >
                  {interval}
                </Button>
              }
              options={["daily", "Weekly", "Monthly", "Yearly"]}
              setOption={setInterval}
              iconButtonProps={{
                size: "small",
                sx: { color: "text.disabled", cursor: "pointer" },
              }}
            />
          </Box>

          <Box className="mt-3 h-auto min-h-[200px] flex-wrap w-full flex bg-white rounded-xl">
            <CategoriesGrowth interval={interval} />
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default StoreAnalysisPage;
