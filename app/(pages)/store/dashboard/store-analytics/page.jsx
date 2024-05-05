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
  GrowthCard,
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
      <Box className="relative px-2">
        <Box className="md:h-44 flex flex-col md:flex-row -mt-2">
          <Box className="mb-4 md:mb-10 w-full md:w-8/12 h-full md:pr-2">
            <Box className="w-full md:h-full flex flex-col md:flex-row bg-white rounded-xl shadow">
              <TotalSaleGrowth interval={interval} />
              <Box className=" w-full md:w-8/12 flex h-full">
                <GrowthCard
                  title="Total Sale Count"
                  type="sales"
                  interval={interval}
                />
                <GrowthCard
                  title="Total Product"
                  type="product"
                  interval={interval}
                />
              </Box>
            </Box>
          </Box>
          <Box className="mb-10 w-full md:w-4/12 h-full md:pl-2">
            <Box className="w-full h-full bg-white rounded-xl shadow p-3">
              <GeneatedLeadChart />
            </Box>
          </Box>
        </Box>

        {/* Store Sales Growth */}
        <Box>
          <Box className="mt-6 flex items-center relative">
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

          <Box className="mt-2  flex-wrap w-full flex bg-white rounded-xl">
            <StoreGrowth interval={interval} />
          </Box>
        </Box>
        {/* Categories Sales Growth */}
        <Box>
          <Box className="mt-6 flex items-center relative">
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

          <Box className="mt-2 h-auto min-h-[200px] flex-wrap w-full flex bg-white rounded-xl">
            <CategoriesGrowth interval={interval} />
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default StoreAnalysisPage;
