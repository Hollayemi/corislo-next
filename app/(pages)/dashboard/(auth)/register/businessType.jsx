import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const BusinessType = ({ setStage, setStoreValues, values }) => {

  const { businessType } = values;

  const OptionBox = ({ tabType, title, caption = "" }) => (
    <Box
      className={`w-44 flex-shrink-0 h-32 m-2 flex shadow flex-col items-center justify-center cursor-pointer translation-all duration-300 bg-white rounded-md border ${businessType !== tabType ? "border-white" : "border-blue-800"
        } hover:border-blue-100`}
      onClick={() =>
        setStoreValues((prev) => {
          return { ...prev, businessType: tabType };
        })
      }
    >
      <Typography
        variant="body2"
        className="!text-[14px] !font-bold !text-center"
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        className="!text-[10px] !px-2 text-center !mt-1"
      >
        {caption}
      </Typography>
      <Box
        className={`h-5 w-5 mt-4 rounded-full border-4 ${businessType !== tabType ? "border-gray-200" : "border-blue-800"
          } flex items-center justify-center focus`}
      >
        <Box className="h-2 w-2 rounded-full bg-gray-200"></Box>
      </Box>
    </Box>
  );
  return (
    <Box>
      <Box className="flex items-center">
        <Box>
          <OptionBox
            tabType="goods"
            title="You Sell Goods"
            caption="You sell something and people buy it"
          />
        </Box>
        <Box>
          <OptionBox
            tabType="services"
            title="You Render Services"
            caption="You help people to do something and get paid for it"
          />
        </Box>
      </Box>
      <Box className="w-full  !px-4 md:pb-0 mt-24">
        <Button
          variant="contained"
          disabled={!Boolean(businessType)}
          className="w-full !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !shadow-none"
          onClick={() => setStage(1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessType;
