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
  let lastGrowth = 0
  data?.calcGrowth?.map((x) => {
    getSeries = [...getSeries, x.branchSale];
    lastGrowth = x.growth
    if (["daily", "monthly"].includes(data?.interval)) {
      const extract = data?.interval === "monthly" ? x._id.month : x._id;
      getLabels = [...getLabels, intervals[data?.interval][extract]];
    }
  });

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
    <Box className="w-1/2 h-full border-r !border-gray-100 relative">
      <Box className="flex items-start p-3">
        <Box className="w-1/2">
          <Typography
            className="!text-[12px] !text-gray-300 !font-bold"
            variant="body2"
          >
            NGN
          </Typography>
          <Typography
            className="!text-[19px] !text-gray-900 !font-extrabold !mt-1"
            variant="body2"
          >
            {reshapePrice(data?.totalSale)}
          </Typography>

          <Box className="absolute bottom-2 flex items-center">
            <Growth percentage={lastGrowth.toFixed(2)} />
            <Typography
              className="!text-[11px] !text-gray-500 !ml-2"
              variant="body2"
            >
              From last {correctInterval[interval.toLowerCase()]}
            </Typography>
          </Box>
        </Box>
        <Box className="w-1/2">
          <ReactApexcharts
            type="line"
            height={120}
            series={series}
            options={revenueOptions(theme, series, getLabels)}
          />
        </Box>
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
  const series = [{ data: [40, 20, 65, 50] }];
  const { data, isLoading } = useSWR(
    `/store/branch-sales?interval=${interval.toLowerCase()}`
  );

  const myBranches = data?.data?.branches?.map((x) => {
    const series = Object.values(x.sales).map((x) => x.sale || x);
    let labels = Object.keys(x.sales);
    if (["daily", "monthly"].includes(data?.interval)) {
      const extract = data?.interval === "monthly" ? x._id.month : x._id;
      labels = [...labels, intervals[data?.interval][extract]];
    }
    return (
      <Box className="w-72 p-3 border-r !border-gray-100 h-full flex items-start">
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
          <Itemize title="Items sold" info="200" />
          <Itemize title="Revenue" info={reshapePrice(x.TotalBranchSale)} />
          <Itemize title="Growth" info={<Growth percentage="20" />} />
        </Box>
      </Box>
    );
  });

  if (isLoading) {
    return (
      <Box className="w-72 h-60 border-r flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }
  return myBranches;
};
export const CategoriesGrowth = ({ interval = "monthly" }) => {
  const theme = useTheme();
  const series = [{ data: [32, 52, 72, 94, 116, 94, 72] }];

  const { data, isLoading } = useSWR(
    `/store/category-sales?interval=${interval.toLowerCase()}`
  );

  const myCategories = data?.data?.map((x) => {
    const series = Object.values(x.data).map((x) => x.sale || x);
    let labels = Object.keys(x.data);
    console.log(series);
    if (["daily", "monthly"].includes(data?.interval)) {
      const extract = data?.interval === "monthly" ? x._id.month : x._id;
      labels = [...labels, intervals[data?.interval][extract]];
    }
    return (
      <Box className="w-72 p-3 border-r !border-gray-100 h-full flex items-start">
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
          <Itemize title="Items sold" info="200" />
          <Itemize title="Revenue" info={reshapePrice(x.sales)} />
          <Itemize title="Growth" info={<Growth percentage="20" />} />
        </Box>
      </Box>
    );
  });

  console.log(data);

  if (isLoading) {
    return (
      <Box className="w-72 h-60 border-r flex justify-center items-center">
        <CircleLoader />
      </Box>
    );
  }
  return myCategories;
};
