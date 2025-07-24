"use client";
import SuperLeftBar from "@/app/components/view/super/SuperLeftBar";
import { Box, Button, Typography } from "@mui/material";
import useSWR from "swr";
import { useState } from "react";
import PendingProduct from "./prod";

const SuperDashboard = ({ params }) => {
  const { data, error, isLoading } = useSWR("/super/waiting-products");
  const ids = data?.data || [];
  console.log(ids);
  const [rightOpen, setRightOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  console.log(data);

  
  return (
    <SuperLeftBar
      setRightOpen={setRightOpen}
      rightOpen={rightOpen}
      path={{ ...params, sidebar: "pending-products" }}
    >
      <Box>
        <Box className="flex items-center justify-between px-3 py-3 mb-4">
          <Typography variant="h5" className="!font-bold !text-sm md:!text-xl">
            {ids.length} Products Pending
          </Typography>
          <Box>
            <Button
              className="w-20 md:w-24 !px-0 !bg-white !text-black !rounded-lg !mr-2 md:!mr-5 !text-[12px] md:!text-[13px]"
              variant="contained"
              disabled={current === 0}
              onClick={() => setCurrent((curr) => curr - 1)}
            >
              Prev
            </Button>
            <Button
              className="w-24 md:w-24 !px-0  !text-white !rounded-lg !text-[12px] md:!text-[13px]"
              variant="contained"
              onClick={() => setCurrent((curr) => curr + 1)}
              disabled={current === ids.length}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      {ids[current] && (
        <Box className="shadow-md rounded-lg w-full">
          <PendingProduct productId={ids[current]._id} />
        </Box>
      )}
    </SuperLeftBar>
  );
};

export default SuperDashboard;
