// ** MUI Imports
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";

// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import OptionsMenu from "@/app/components/option-menu";
import CustomOption from "../option-menu/option";
import { Button } from "@mui/material";
import IconifyIcon from "../icon";
import useSWR from "swr";
import { reshapePrice } from "@/app/(pages)/store/dashboard/marketing/components";
import { calculateDateDiff } from "@/app/utils/format";

const BranchSalesGrowth = ({ interval, selectedInterval }) => {
  const { data, isLoading } = useSWR(
    `/store/branch-sales?interval=yearly&startDate=${calculateDateDiff(
      interval.split(" ").join("_"),
      new Date(),
      "-",
      true
    )}`
  );
  const result = data?.data || {};

  console.log(result);

  const dayInterval = [
    "3 days",
    "7 days",
    "2 weeks",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ];

  const renderData = result.branches?.map((item, index) => (
    <Box
      key={index}
      sx={{ ...(index !== result.branches?.length - 1 && { mb: 4.5 }) }}
    >
      <Box
        sx={{
          mb: 0.5,
          gap: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontWeight: 500 }}
          className="!text-[15px] !text-gray-500"
        >
          {item.branch}
        </Typography>
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={item.chipColor}
          label={`${item.countItems} items sold`}
        />
      </Box>
      <Box
        sx={{
          gap: 2,
          mb: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography className="!text-[14px] !text-gray-500">
          {reshapePrice(item.TotalBranchSale)}
        </Typography>
        <Typography variant="body2" className="!text-[14px] !text-gray-500">
          {`${item.lastGrowth > 100 ? " > 100" : item.lastGrowth}%`}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={item.lastGrowth}
        className="!rounded-md"
        color={"info"}
        sx={{ height: 8 }}
      />
    </Box>
  ));

  return (
    <Card className="w-full !shadow-none h-full">
      <Box className="px-3 !py-3 !flex !items-center !justify-between">
        <Typography variant="caption" className="!text-[16px] !font-medium">
          Sales by Stores
        </Typography>

        <CustomOption
          icon={
            <Button
              className="!text-[15px]"
              endIcon={<IconifyIcon icon="tabler:chevron-down" />}
            >
              {interval}
            </Button>
          }
          options={dayInterval}
          clickFunction={(e) => selectedInterval(e)}
        />
      </Box>
      <CardContent>{renderData}</CardContent>
    </Card>
  );
};

export default BranchSalesGrowth;
