import AllPlans from "@/app/components/cards/plans";
import { Box, Typography } from "@mui/material";
import React from "react";

const Pricing = () => {
  return (
    <Box>
      <Typography
        variant="body1"
        className="!font-bold !text-2xl !text-center !my-6"
      >
        Choose your Plan
      </Typography>
      <AllPlans />
      <br />
      <br />
      <br />
    </Box>
  );
};

export default Pricing;
