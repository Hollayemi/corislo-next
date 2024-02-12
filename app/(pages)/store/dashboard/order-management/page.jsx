"use client";
import { useState } from "react";
import useSWR from "swr";
import { Typography, Box, Grid } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import OrderTable from "./components/orderTable";
import OrderDetails from "./components/orderDetails";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter, useSearchParams } from "next/navigation"
import tokens from "@/app/configs/tokens";

const OrderManagement = ({ params }) => {


  const { data, error, isLoading } = useSWR("/branch/order-request");
  console.log(data, error, isLoading);
  const router = useRouter()
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order");

  const path = { ...params, sidebar: "order-management" };

  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Box className="px-3 md:px-6 py-8 rounded-md" bgcolor="custom.bodyLight">
        <Box className="flex items-center !pb-5">
          {orderId && (
            <Box
              className="flex items-center text-xs mr-5 cursor-pointer"
              onClick={() => router.push("/store/dashboard/order-management")}
            >
              <ChevronLeftIcon className="text-xs mr-2" /> Back
            </Box>
          )}

          <Typography variant="h5" className="!font-bold text-sm">
            Order Details
          </Typography>
        </Box>
        {!orderId ? (
          !error && !isLoading && <OrderTable selectRow={data} />
        ) : (
          <OrderDetails order={orderId} />
        )}
      </Box>
    </StoreLeftSideBar>
  );
};

export default OrderManagement;
