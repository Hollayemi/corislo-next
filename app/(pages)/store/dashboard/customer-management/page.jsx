"use client";
import { Typography, Box, Select, MenuItem } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { navigation } from "@/app/data/store/sidebarContents";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CustomerDetails } from "./components/customerDetails";
import { AllCustomers } from "./components/allCustomers";
import { useRouter } from "next/navigation";

const CustomerManagement = ({ params, searchParams }) => {
  const router = useRouter();
  
  const path = { ...params, sidebar: "customer-management" };
  return (
    <StoreLeftSideBar path={path}>
      <Box className="w-full">
        <Box className="bg-white rounded-md mt-4 px-8 pt-6 w-full">
          <Box className="flex items-center !pb-5">
            {searchParams.customer && (
              <Box
                className="flex items-center text-xs mr-5 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/store/dashboard${navigation.customer_management}`
                  )
                }
              >
                <ChevronLeftIcon className="text-xs mr-2" /> Back
              </Box>
            )}
            <Typography className="!text-[16px] md:!text-md !font-bold">
              Customer {!searchParams.customer ? "List" : "Details"}
            </Typography>
          </Box>

          <Box>
            {searchParams.customer ? (
              <CustomerDetails customer={searchParams.customer} />
            ) : (
              <AllCustomers />
            )}
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default CustomerManagement;
