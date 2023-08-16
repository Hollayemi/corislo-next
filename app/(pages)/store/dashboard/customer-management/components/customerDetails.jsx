import { Typography, Box, Grid, MenuItem } from "@mui/material";
import { Summarize } from ".";
import useSWR from "swr";
import Table from "@/app/components/view/store/tables/OrderTable";
import { customerColumns } from "./columns";
import { purchaseHistoryRow, allCustomers } from "./rows";
import {
  formatShippingAddress,
  formatSegmentation,
  formatDate,
  formatCurrency,
} from "@/app/utils/format";
import tokens from "@/app/configs/tokens";
// import LineLoading from "@/app/(pages)/loading";

export const CustomerDetails = ({ customer }) => {
  const {
    data: customerInfo,
    error: customerErr,
    isLoading: customerLoading,
  } = useSWR({
    endPoint: `/branch/customers?customer=${customer}`,
    token: tokens.store,
  });

  const {
    data: historyInfo,
    error: historyErr,
    isLoading: historyLoading,
  } = useSWR({
    endPoint: `/branch/customers/history?customer=${customer}`,
    token: tokens.store,
  });
  const info =
    (!customerLoading && !customerErr && customerInfo?.data[0]) || null;

  const history =
    (!historyLoading && !historyErr && historyInfo?.data) || null;

  console.log(history);;

  return (
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
                  {
                    key: "Billing Address",
                    value: formatShippingAddress(info.address),
                  },
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
      {!historyErr && !historyLoading && (
        <>
          <Typography variant="h5" className="!font-bold !text-sm pt-16">
            Customer Purchase History (52)
          </Typography>

          <Table columns={customerColumns} rows={history} />
        </>
      )}
    </Box>
  );
};
