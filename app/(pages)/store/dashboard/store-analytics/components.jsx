import { forwardRef } from "react";
import useSWR from "swr"
import { Box, TextField } from "@mui/material";
import { DashboardCrumb } from "../components";
import { options } from "./chartOptions";
import DatePicker from "react-datepicker";
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
  endDate
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

export const TotalSaleGrowth = () => {
  return (
    <ReactApexcharts
      type="area"
      height={97}
      series={[{ data: [40, 20, 65, 50] }]}
      options={options}
    />
  );
}

const CategoryGrowth = () => {
  const {} = useSWR("/store/category-sales")
  return (
    <Box className="w-full h-full bg-white rounded-md">
      <Box></Box>
    </Box>
  );
}