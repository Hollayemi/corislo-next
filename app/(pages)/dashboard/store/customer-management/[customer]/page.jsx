"use client";

import { Typography, Box, Grid, MenuItem } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { Summarize } from "../components";
import useSWR from "swr";
import Table from "@/app/components/view/store/tables/OrderTable";
import { customerBreadCrumb, customerColumns } from "../components/columns";
import {
  formatShippingAddress,
  formatSegmentation,
  formatDate,
  formatCurrency,
} from "@/app/utils/format";
// import LineLoading from "@/app/(pages)/loading";

const CustomerDetails = ({ params }) => {
  const customer = params.customer;
  const {
    data: customerInfo,
    error: customerErr,
    isLoading: customerLoading,
  } = useSWR(`/branch/customers?customer=${customer}`);

  const {
    data: historyInfo,
    error: historyErr,
    isLoading: historyLoading,
  } = useSWR(`/branch/customers/history?customer=${customer}`);
  const info = customerInfo?.data[0] || {};

  const path = { ...params, sidebar: "customer-management" };



  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...customerBreadCrumb,
        { text: info.customer, link: "customer-management" },
      ]}
    >
      <Box className="w-full">
        <Box className="bg-white rounded-md px-2 md:px-8 pt-6 w-full">
          <Box className="flex items-center !pb-5"></Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {!customerErr && !customerLoading && (
                  <Box className=" md:flex items-center justify-evenly">
                    <Box className="w-28 !mb-8 md:!mb-0 shrink-0">
                      <img
                        src="/images/avatar/7.png"
                        alt="myImage"
                        className="w-28 h-28 rounded-full"
                      />
                    </Box>
                    <Summarize
                      info={[
                        { key: "Name", value: info.customer },
                        { key: "Email Address", value: info.email },
                        // {
                        //   key: "Billing Address",
                        //   value: formatShippingAddress(info.address),
                        // },
                        { key: "Phone Number", value: info.phone },
                      ]}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                {!customerErr && !customerLoading && (
                  <Summarize
                    info={[
                      { key: "Total Orders Made", value: info.no_of_orders },
                      {
                        key: "Total Amount Spent",
                        value: formatCurrency(info.totalAmountSpent),
                      },
                      {
                        key: "Last Order Date",
                        value: formatDate(info.lastPurchase),
                      },
                      {
                        key: "Segmentation",
                        value: formatSegmentation(
                          info.no_of_orders,
                          info.totalAmount,
                          info.lastPurchase
                        ),
                      },
                    ]}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          {historyInfo?.data?.length && (
            <>
              <Typography variant="h5" className="!font-bold !text-sm pt-16">
                Customer Purchase History ({historyInfo.data.length})
              </Typography>

              <Table columns={customerColumns} rows={historyInfo.data} />
            </>
          )}
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default CustomerDetails;
