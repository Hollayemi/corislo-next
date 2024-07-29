import { Box, Button, Typography } from "@mui/material";
import React from "react";
import IconifyIcon from "../icon";

const Plans = ({ opportunities, from, hideChoosePlan, price, name, prof }) => {
  return (
    <Box
      className={`w-full sm:w-1/2 lg:w-1/3 md:px-3 ${
        !prof && "md:mt-10"
      } md:py-10`}
    >
      <Box
        className={`relative w-full !rounded-xl  border py-8 md:m-2 my-4 ${
          prof ? "md:shadow-2xl" : "md:shadow-xl"
        }`}
      >
        <Box className="flex flex-col items-center">
          <Typography
            variant="body2"
            className="!text-xl !text-blue-800 !font-bold"
          >
            {name || "-"}
          </Typography>
          <Typography
            variant="body2"
            className="!text-4xl !py-5 !text-blue-800 !font-black"
          >
            ${price || 0}
          </Typography>

          {!hideChoosePlan && (
            <Button
              variant="outlined"
              className="!rounded-full w-48 h-11 !text-[14px] !text-blue-600 !bg-white !shadow-none"
            >
              Choose Plan
            </Button>
          )}
        </Box>
        <Box className="mt-10 px-8">
          <Typography
            variant="body2"
            className="!text-md !text-gray-600 !font-bold"
          >
            What you get
          </Typography>
          <br />
          {opportunities.map((each, i) => (
            <CheckList text={each} key={i} cancel={i > from} />
          ))}
        </Box>
        {prof && (
          <Box className="absolute top-0 -mt-4 w-full flex items-center justify-center">
            <Box className="w-40 text-[12px] rounded-full h-8 bg-blue-900 text-orange-200 !font-bold flex items-center justify-center">
              📢 20% OFF Yearly Plan
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CheckList = ({ cancel, text }) => (
  <Box className="flex items-start !mb-2">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor={cancel ? "gray-[50]" : "white"}
    >
      <IconifyIcon
        icon={cancel ? "tabler:x" : "tabler:check"}
        className="!text-[12px] !text-blue-500"
      />
    </Box>
    <Box className="ml-2">
      <Typography variant="caption" className="!text-[12px] !text-gray-500">
        {text}
      </Typography>
    </Box>
  </Box>
);

export const opp1 = [
  "Business profile creation",
  "limited product listings",
  "Basic analytics and insights",
  "Nested store branches",
  // "Unlimited access to store visitors",
  // "Priority support with SLAs",
  // "Detailed analytics, custom reports",
  // "Exclusive promotions and marketing opportunities",
];
export const opp2 = [
  "Business profile creation",
  "limited product listings",
  "Advanced analytics and insights",
  "Limited store branches",
  "Limited access to store visitors",
  "Limited promotions and marketing opportunities",
  // "Priority support with SLAs",
  // "Detailed analytics, custom reports",
];
export const opp3 = [
  "Business profile creation",
  "Unlimited product listings",
  "Professional analytics and insights",
  "Unlimited store branches",
  "Unlimited access to store visitors",
  "Priority support with SLAs",
  "Detailed analytics, custom reports",
  "Exclusive promotions and marketing opportunities",
];
const AllPlans = ({ hideChoosePlan }) => {
  return (
    <Box className="flex flex-col md:flex-row items-start overflow-auto">
      <Plans
        opportunities={opp1}
        from={3}
        hideChoosePlan
        price={0}
        name="Basic Plain"
      />

      <Plans
        opportunities={opp3}
        from={8}
        hideChoosePlan
        price={15}
        name="Professional Plan"
        prof
      />
      <Plans
        opportunities={opp2}
        from={5}
        hideChoosePlan
        price={5}
        name="Premium Plan"
      />
    </Box>
  );
};

export default AllPlans;
