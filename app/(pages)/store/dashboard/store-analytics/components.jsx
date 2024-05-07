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
import { intervals, correctInterval } from "./interval";
import DatePicker from "react-datepicker";
import Icon from "@/app/components/icon";
import { CircleLoader } from "@/app/components/cards/loader";
import ReactApexcharts from "@/app/components/chart/react-apexcharts";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

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
  let getSeries = data
    ? Object.values(data?.salesGrowth).map((x) => x.branchSale || x)
    : [];
  let labels = data ? Object.keys(data?.salesGrowth).map((x) => x) : [];

  console.log(labels);
  if (["daily", "monthly"].includes(data?.interval)) {
    labels = labels.map((x) => intervals[data?.interval][parseInt(x)]);
    console.log(labels);
  }

  const theme = useTheme();
  const series = [{ data: getSeries }];

  if (isLoading) {
    return (
      <Box className="w-full h-full min-h-[180px] flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }

  return (
    <Box className="w-full md:w-5/12 h-full min-h-[180px] !border-gray-100 relative">
      <Box className="flex items-start p-3">
        <Box className="w-1/2">
          <Box
            className="!text-[12px] w-10 h-10 bg-green-200 rounded flex justify-center items-center"
            variant="body2"
          >
          <Icon icon="tabler:wallet" className="!text-[22px] !text-green-600" />
          </Box>
          <Typography
            className="!text-[17px] !text-gray-900 !font-bold !mt-2"
            variant="body2"
          >
            Total Sales
          </Typography>
          <Typography
            className="!text-[12px] !text-gray-500 !font-bold !mt-1"
            variant="body2"
          >
            {reshapePrice(data?.totalSale)}
          </Typography>
          <Typography
            className="!text-[12px] !text-gray-300 !mt-5"
            variant="body2"
          >
            {data?.countItem} items sold
          </Typography>

          <Box className="absolute bottom-2 flex items-center">
            <Growth percentage={data?.lastGrowth.toFixed(2)} />
            <Typography
              className="!text-[11px] !text-gray-500 !ml-2"
              variant="body2"
            >
              From last {correctInterval[interval.toLowerCase()]}
            </Typography>
          </Box>
        </Box>
        <Box className="w-8/12">
          <ReactApexcharts
            type="line"
            height={120}
            series={series}
            options={revenueOptions(theme, series, labels)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const GrowthCard = ({ title, type, interval = "monthly" }) => {
  const theme = useTheme();
  const fetch = {
    product: `/store/product-count?interval=${interval.toLowerCase()}`,
    sales: `/store/sales-count?interval=${interval.toLowerCase()}`,
  };

  const { data, isLoading } = useSWR(fetch[type]);
  const result = data?.data || {};

  const series = Object.values(result);
  let labels = Object.keys(result);
  console.log(labels);
  if (["daily", "monthly"].includes(interval.toLowerCase())) {
    labels = labels.map((x) => intervals[interval.toLowerCase()][parseInt(x)]);
  }

  if (isLoading) {
    return (
      <Box className="w-1/2 h-60 min-h-[180px] flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }

  return (
    <Box className="w-1/2 p-3 relative h-full min-h-[180px] flex flex-col border-l">
      <Typography
        className="!text-[14px] !text-gray-800 !font-bold"
        variant="body2"
      >
        {title}
      </Typography>
      <Typography className="!text-[11px] !text-gray-400 !mt-1" variant="body2">
        From last {interval.toLowerCase()}
      </Typography>
      <Box className=" !flex-grow">
        <ReactApexcharts
          type="area"
          height={80}
          series={[{ data: series }]}
          options={salesOptions(theme, series, labels)}
        />
      </Box>
      <Box className="flex justify-between items-center w-full">
        <Typography
          className="!text-[15px] !text-gray-900 !font-bold"
          variant="body2"
        >
          {series.reduce((sum, each) => sum + each, 0)}
        </Typography>
        <Growth percentage={20} />
      </Box>
    </Box>
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
      className={`flex items-center w-auto ${
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
        {parseInt(percentage).toFixed(1)}%
      </Typography>
    </Box>
  );
};

export const GeneatedLeadChart = () => {
  const theme = useTheme();
  const series = [32, 41, 41, 70];
  return (
    <Box className="w-full">
      <Typography
        className="!text-[14px] !text-gray-800 !font-bold"
        variant="body2"
      >
        Sales Conversion Rate
      </Typography>
      <Typography className="!text-[11px] !text-gray-400 !mt-1" variant="body2">
        Monthly Report
      </Typography>
      <Box className="flex items-center justify-between w-full">
        <Box className="flex flex-col justify-between">
          <Typography variant="body2" className="mb-1">
            Generated Leads
          </Typography>

          <Box className="mt-6">
            <Typography variant="h5" className="!mb-1.5 !text-[15px]">
              4,350
            </Typography>
            <Growth percentage={15.8} />
          </Box>
        </Box>
        <ReactApexcharts
          type="donut"
          width={150}
          height={170}
          series={series}
          options={generatedLeadOptions(theme, series)}
        />
      </Box>
    </Box>
  );
};

const Itemize = ({ title, info }) => (
  <Box className="flex flex-col items-end !mb-3">
    <Typography variant="body2" className="!text-[12px] !text-gray-400">
      {title}
    </Typography>
    <Typography variant="body2" className="!text-[13px] !font-[600] !mt-1.5">
      {info}
    </Typography>
  </Box>
);

export const StoreGrowth = ({ interval = "monthly" }) => {
  const theme = useTheme();
  const { data, isLoading } = useSWR(
    `/store/branch-sales?interval=${interval.toLowerCase()}`
  );
  const result = data?.data || {};

  const myBranches = result.branches?.map((x) => {
    const series = Object.values(x.sales).map((x) => x.sale || x);
    let labels = Object.keys(x.sales);
    console.log(labels);
    if (["daily", "monthly"].includes(interval.toLowerCase())) {
      labels = labels.map(
        (x) => intervals[interval.toLowerCase()][parseInt(x)]
      );
    }
    console.log(labels);
    return (
      <Box className="w-full sm:w-1/2 md:w-80 p-3 md:border-r !border-gray-100 h-full flex items-start">
        <Box className="w-8/12">
          <Typography variant="body2" className="!text-[12px] !font-[600]">
            {x.branch}
          </Typography>
          <ReactApexcharts
            type="area"
            height={150}
            series={[{ data: series }]}
            options={salesOptions(theme, series, labels)}
          />
        </Box>
        <Box className="flex flex-col justify-evenly w-4/12 h-full">
          <Itemize title="Items sold" info={x.countItems} />
          <Itemize title="Revenue" info={reshapePrice(x.TotalBranchSale)} />
          <Itemize title="Growth" info={<Growth percentage={x.lastGrowth} />} />
        </Box>
      </Box>
    );
  });

  if (isLoading) {
    return (
      <Box className="w-full sm:w-1/2 md:w-80 h-60 md:border-r flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }
  return myBranches;
};

export const CategoriesGrowth = ({ interval = "monthly" }) => {
  const theme = useTheme();

  const { data, isLoading } = useSWR(
    `/store/category-sales?interval=${interval.toLowerCase()}`
  );
  const result = data?.data || {};
  const myCategories = result.cate?.map((x) => {
    const series = Object.values(x.data).map((x) => x.sale || x);
    let labels = Object.keys(x.data);
    console.log(labels);
    if (["daily", "monthly"].includes(result.interval)) {
      labels = labels.map((x) => intervals[result.interval][parseInt(x)]);
      console.log(labels);
    }
    return (
      <Box className="w-full sm:w-1/2 md:w-80 p-3 md:border-r !border-gray-100 h-full flex items-start">
        <Box className="w-8/12">
          <Typography variant="body2" className="!text-[12px] !font-[600]">
            {x._id}
          </Typography>
          <ReactApexcharts
            type="bar"
            height={150}
            series={[{ data: series }]}
            options={categoryOptions(theme, series, labels)}
          />
        </Box>
        <Box className="flex flex-col justify-evenly w-4/12 h-full">
          <Itemize title="Items sold" info={x.count} />
          <Itemize title="Revenue" info={reshapePrice(x.sales)} />
          <Itemize title="Growth" info={<Growth percentage={x.lastGrowth} />} />
        </Box>
      </Box>
    );
  });

  console.log(data);

  if (isLoading) {
    return (
      <Box className="w-full sm:w-1/2 md:w-80 h-60 border-r flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }
  return myCategories;
};
