"use client";
import { useState } from "react";
import useSWR from "swr";
import { Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import OrderTable from "./components/orderTable";
import OrderDetails from "./components/orderDetails";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter, useSearchParams } from "next/navigation";

const OrderManagement = ({ params }) => {
  const [rightOpen, setRightOpen] = useState(false);
  const { data, error, isLoading } = useSWR("/branch/order-request");
  console.log(data, error, isLoading);
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order");

  const path = { ...params, sidebar: "order-management" };

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      rightOpen={rightOpen}
      setRightOpen={setRightOpen}
    >
      <Box className="-mt-4 md:px-3 py-3 rounded-md">
        <Box className="flex items-center">
          {orderId && (
            <Box
              className="flex items-center text-xs mr-5 cursor-pointer"
              onClick={() => router.push("/store/dashboard/order-management")}
            >
              <ChevronLeftIcon className="text-xs mr-2" /> Back
            </Box>
          )}
        </Box>
        {!orderId ? (
          <OrderTable
            selectRow={data}
            isLoading={isLoading}
            setRightOpen={setRightOpen}
          />
        ) : (
          <OrderDetails order={orderId} />
        )}
      </Box>
    </StoreLeftSideBar>
  );
};

export default OrderManagement;
