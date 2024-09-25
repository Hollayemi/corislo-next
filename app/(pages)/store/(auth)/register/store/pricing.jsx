import AllPlans from "@/app/components/cards/plans";
import { createStoreHandler } from "@/app/redux/state/slices/shop/addShop";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Pricing = ({ setStage, userValues, storeValues }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box>
      <AllPlans />
      <br />
      <Box className="w-full  mb-8 md:pb-0 flex justify-center">
        <Button
          variant="contained"
          className="w-full md:w-2/4 !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !shadow-none"
          onClick={() =>
            createStoreHandler(
              { user: userValues, store: storeValues },
              dispatch,
              router,
              setStage
            )
          }
        >
          Finish Setup
        </Button>
      </Box>
    </Box>
  );
};

export default Pricing;
