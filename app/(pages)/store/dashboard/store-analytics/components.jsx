"use client";
import { forwardRef } from "react";
import { useTheme } from "@emotion/react";
import useSWR from "swr";
import { Box, Typography, TextField } from "@mui/material";
import { DashboardCrumb } from "../components";
import {
  revenueOptions,
  generatedLeadOptions,
  salesOptions,
  categoryOptions,
} from "./chartOptions";
import { intervals } from "./interval";
import DatePicker from "react-datepicker";
import Icon from "@/app/components/icon";
import { CircleLoader } from "@/app/components/cards/loader";
import ReactApexcharts from "@/app/components/chart/react-apexcharts";

const PickersComponent = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props;
  return (
    <TextField
      inputRef={ref}
      {...props}
      label={label || ""}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  );
});

export const analyticsBreadCrumb = [
  ...DashboardCrumb,
  {
    text: "Analytics",
    link: "store-analytics",
    icon: "shop",
  },
];

export const RightBreadCrumbChildren = ({
  setStartDate,
  startDate,
  SetEndDate,
  endDate,
}) => {
  return (
    <Box className="flex items-center">
      <Box className="">
        <DatePicker
          selected={startDate}
          id="basic-input"
          onChange={(date) => setStartDate(date)}
          placeholderText="Click to select a date"
          customInput={<PickersComponent label="Basic" />}
        />
      </Box>
      <Box className="">
        <DatePicker
          selected={endDate}
          id="basic-input"
          onChange={(date) => SetEndDate(date)}
          placeholderText="Click to select a date"
          customInput={<PickersComponent label="Basic" />}
        />
      </Box>
    </Box>
  );
};

export const TotalSaleGrowth = ({ interval = "monthly" }) => {
  const { data, isLoading } = useSWR(
    `/store/growth?interval=${interval.toLowerCase()}`
  );
  let getSeries = [];
  let getLabels = [];
  console.log(data);
  data?.calcGrowth?.map((x) => {
    console.log(x);
    getSeries = [...getSeries, x.branchSale];
    if(["daily", "monthly"].includes(data?.interval)){
      const extract = data?.interval === "monthly" ? x._id.month : x._id
      getLabels = [...getLabels, intervals[data?.interval][extract]];
    }
    console.log(getLabels)
  });

  console.log(getSeries, getLabels);

  const theme = useTheme();
  const series = [{ data: getSeries }];

  if (isLoading) {
    return (
      <Box className="w-full h-full flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }

  return (
    <ReactApexcharts
      type="line"
      height={120}
      series={series}
      options={revenueOptions(theme, series, getLabels)}
    />
  );
};

export const reshapePrice = (price) => {
  if (typeof parseInt(price) === "number") {
    return `₦ ${parseInt(price).toLocaleString()}`;
  }
};

export const Growth = ({ percentage }) => {
  return (
    <Box
      className={`flex items-center w-16 ${
        parseInt(percentage) < 0
          ? "!text-red-600 bg-red-200"
          : "!text-green-600 bg-green-200"
      }  rounded px-1`}
    >
      <Icon
        icon={
          parseInt(percentage) < 0 ? "tabler:chevron-down" : "tabler:chevron-up"
        }
        fontSize="1.22rem"
      />
      <Typography
        sx={{ fontWeight: 500 }}
        variant="body2"
        className="!text-[12px]"
      >
        {percentage}%
      </Typography>
    </Box>
  );
};

export const GeneatedLeadChart = () => {
  const theme = useTheme();
  const series = [32, 41, 41, 70];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
    >
      <Box className="flex flex-col justify-between pb-2.5">
        <div>
          <Typography variant="h6" className="mb-1">
            Generated Leads
          </Typography>
          <Typography variant="body2">Monthly Report</Typography>
        </div>
        <div className="mt-6">
          <Typography variant="h5" className="!mb-1.5 !text-[15px]">
            4,350
          </Typography>
          <Growth percentage={15.8} />
        </div>
      </Box>
      <ReactApexcharts
        type="donut"
        width={150}
        height={170}
        series={series}
        options={generatedLeadOptions(theme, series)}
      />
    </Box>
  );
};

export const StoreGrowth = () => {
  const theme = useTheme();
  const series = [{ data: [40, 20, 65, 50] }];

  const Itemize = ({ title, info }) => (
    <Box className="flex flex-col items-end">
      <Typography variant="body2" className="!text-[12px] !text-gray-400">
        {title}
      </Typography>
      <Typography variant="body2" className="!text-[13px] !font-[600] !mt-1.5">
        {info}
      </Typography>
    </Box>
  );
  const {} = useSWR("/store/category-sales");
  return (
    <Box className="w-72 p-3 border-r !border-gray-100 h-full flex items-start">
      <Box className="w-8/12">
        <Typography variant="body2" className="!text-[12px] !font-[600]">
          Ondo Branch
        </Typography>
        <ReactApexcharts
          type="area"
          height={150}
          series={series}
          options={salesOptions(theme, series)}
        />
      </Box>
      <Box className="flex flex-col justify-evenly w-4/12 h-full">
        <Itemize title="Items sold" info="200" />
        <Itemize title="Revenue" info={reshapePrice(43000)} />
        <Itemize title="Growth" info={<Growth percentage="20" />} />
      </Box>
    </Box>
  );
};
export const CategoriesGrowth = () => {
  const theme = useTheme();
  const series = [{ data: [32, 52, 72, 94, 116, 94, 72] }];

  const Itemize = ({ title, info }) => (
    <Box className="flex flex-col items-end">
      <Typography variant="body2" className="!text-[12px] !text-gray-400">
        {title}
      </Typography>
      <Typography variant="body2" className="!text-[13px] !font-[600] !mt-1.5">
        {info}
      </Typography>
    </Box>
  );

  return (
    <Box className="w-72 p-3 border-r !border-gray-100 h-full flex items-start">
      <Box className="w-8/12">
        <Typography variant="body2" className="!text-[12px] !font-[600]">
          Ondo Branch
        </Typography>
        <ReactApexcharts
          type="bar"
          height={150}
          series={series}
          options={categoryOptions(theme, series)}
        />
      </Box>
      <Box className="flex flex-col justify-evenly w-4/12 h-full">
        <Itemize title="Items sold" info="200" />
        <Itemize title="Revenue" info={reshapePrice(43000)} />
        <Itemize title="Growth" info={<Growth percentage="-50" />} />
      </Box>
    </Box>
  );
};
