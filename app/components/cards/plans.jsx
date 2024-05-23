import { Box, Button, Typography } from "@mui/material";
import React from "react";
import IconifyIcon from "../icon";

const Plans = ({ opportunities, from, price, name }) => {
  return (
    <Box className="w-full sm:w-72 !rounded-xl bg-gradient-to-b from-blue-700 via-blue-500 to-blue-700 py-8 m-1 my-4">
      <Box className="flex flex-col items-center">
        <Typography variant="body2" className="!text-xl !text-white !font-bold">
          {name || "-"}
        </Typography>
        <Typography
          variant="body2"
          className="!text-4xl !py-5 !text-white !font-black"
        >
          ${price || 0}
        </Typography>

        <Button
          variant="contained"
          className="!rounded-full w-48 h-11 !text-[14px] !text-blue-600 !bg-white !shadow-none"
        >
          Choose Plan
        </Button>
      </Box>
      <Box className="mt-10 px-8">
        <Typography variant="body2" className="!text-md !text-white !font-bold">
          What you get
        </Typography>
        <br />
        {opportunities.map((each, i) => (
          <CheckList text={each} key={i} cancel={i > from} />
        ))}
      </Box>
    </Box>
  );
};

const CheckList = ({ cancel, text }) => (
  <Box className="flex items-start !mb-2">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor={cancel ? "custom.sec" : "white"}
    >
      <IconifyIcon
        icon={cancel ? "tabler:x" : "tabler:check"}
        className="!text-[12px] !text-blue-500"
      />
    </Box>
    <Box className="ml-2">
      <Typography variant="caption" className="!text-[10px] !text-gray-50">
        {text}
      </Typography>
    </Box>
  </Box>
);

const AllPlans = () => {
  const opp1 = [
    "Business profile creation",
    "limited product listings",
    "Basic analytics and insights",
    "Nested store branches",
    "Unlimited access to store visitors",
    "Priority support with SLAs",
    "Detailed analytics, custom reports",
    "Exclusive promotions and marketing opportunities",
  ];
  const opp2 = [
    "Business profile creation",
    "limited product listings",
    "Advanced analytics and insights",
    "Limited store branches",
    "Limited access to store visitors",
    "Limited promotions and marketing opportunities",
    "Priority support with SLAs",
    "Detailed analytics, custom reports",
  ];
  const opp3 = [
    "Business profile creation",
    "Unlimited product listings",
    "Professional analytics and insights",
    "Unlimited store branches",
    "Unlimited access to store visitors",
    "Priority support with SLAs",
    "Detailed analytics, custom reports",
    "Exclusive promotions and marketing opportunities",
  ];
  return (
    <Box className="flex flex-wrap items-start">
      <Plans opportunities={opp1} from={3} price={0} name="Basic Plain" />
      <Plans opportunities={opp2} from={5} price={5} name="Premium Plan" />
      <Plans opportunities={opp3} from={8} price={15} name="Professional Plan" />
    </Box>
  );
};

export default AllPlans;