"use client";
import { useState, forwardRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import OptionsMenu from "@/app/components/option-menu";
import {
  marketingBreadCrumb,
  LineChartStatistic,
  RightBreadCrumbChildren,
  GrowthCard,
  reshapePrice,
} from "./components";
import { columns, rows } from "./data";
import { DataGrid } from "@mui/x-data-grid";
import Icon from "@/app/components/icon";
import DatePicker from "react-datepicker";
import DatePickerWrapper from "@/app/styles/react-datepicker";
import { formatDate } from "@/app/utils/format";
import useSWR from "swr"

const CustomInput = forwardRef((props, ref) => {
  const startDate =
    props.start !== null ? formatDate(props.start) : new Date();
  const endDate =
    props.end !== null ? ` - ${formatDate(props.end)}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ""}`;

  return (
    <Box className="flex items-center !w-fit">
      <input
        inputRef={ref}
        {...props}
        value={value}
        size="small"
        placeholder="Enter date range"
        className="!w-56 outline-none !text-gray-800"
      />
      <Icon icon="tabler:chevron-down" className="!text-[17px] -ml-4" />
    </Box>
  );
});

const MarketingPage = ({ params }) => {
  const [interval, setInterval] = useState("Monthly");
  const path = { ...params, sidebar: "marketing" };
  const {data, isLoading} = useSWR("/branch/campaign")
  const all = data?.data || []
  const [intervals, setDate] = useState({
    startDate: null,
    endDate: null,
    interval,
  });

  console.log(all)


  const handleDateChange = (dates) => {
    console.log(dates);
    if (dates) {
      const [start, end] = dates;
      setDate((prev) => {
        return { ...prev, startDate: start, endDate: end };
      });
    }
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
      breadCrumbRIghtChildren={<RightBreadCrumbChildren />}
    >
      <DatePickerWrapper>
        <Box className="-mt-2 px-2">
          <Box className="!w-full bg-white p-4 rounded-xl">
            <Box className="flex items-center -mb-6">
              <Box className="!w-60">
                <DatePicker
                  selectsRange
                  startDate={intervals.startDate || ""}
                  endDate={intervals.endDate || ""}
                  selected={new Date()}
                  maxDate={new Date()}
                  id="date-range-picker"
                  onChange={handleDateChange}
                  shouldCloseOnSelect={false}
                  customInput={
                    <CustomInput
                      label="Duration"
                      start={intervals.startDate}
                      end={intervals.endDate}
                    />
                  }
                />
              </Box>
              <OptionsMenu
                icon={
                  <Button
                    variant="text"
                    className="!text-[13px]  !text-gray-800 !font-bold !bg-white !ml-2"
                    disableRipple
                    endIcon={
                      <Icon
                        icon="tabler:chevron-down"
                        className="!text-[17px]"
                      />
                    }
                  >
                    {interval}
                  </Button>
                }
                options={["Daily", "Weekly", "Monthly", "Yearly"]}
                setOption={setInterval}
                iconButtonProps={{
                  size: "small",
                  sx: { color: "text.disabled", cursor: "pointer" },
                }}
              />
            </Box>
            <LineChartStatistic />
            <Box className="flex justify-around items-center w-full mt-8">
              <GrowthCard title="Total Redemptions" growth="+92" count="645" />
              <GrowthCard
                title="New Redemptions"
                growth="+40"
                count="43"
                middle
              />
              <GrowthCard
                title="Redemption Amount"
                growth="+30"
                count={reshapePrice(2523000)}
              />
            </Box>
            <Box className="h-fit max-h-[660px] mt-8">
              <DataGrid
                columns={columns}
                rows={all}
                checkboxSelection
                className="!border-none"
              />
            </Box>
          </Box>
        </Box>
      </DatePickerWrapper>
    </StoreLeftSideBar>
  );
};

export default MarketingPage;
