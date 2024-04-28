"use client";
import { Typography, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { customerBreadCrumb } from "./components/columns";
import { AllCustomers } from "./components/allCustomers";

const CustomerManagement = ({ params }) => {
  const path = { ...params, sidebar: "customer-management" };
  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...customerBreadCrumb,
        { text: "Customer listing", link: "customer-management" },
      ]}
    >
      <Box className="w-full">
        <Box className="bg-white rounded-md px-2 md:px-8 pt-6 w-full">
          <Box className="flex items-center !pb-5">
            <Typography className="!text-[16px] md:!text-md !font-bold">
              Customer List
            </Typography>
          </Box>

          <AllCustomers />
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default CustomerManagement;
