import { Typography, Box, Grid } from "@mui/material";
import { Summarize } from ".";
import useSWR from "swr";
import {
  formatSegmentation,
  formatDate,
  formatCurrency,
} from "@/app/utils/format";

export const CustomerDetails = ({ customer }) => {
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
  const info =
    (!customerLoading && !customerErr && customerInfo?.data[0]) || {};

  const history = (!historyLoading && !historyErr && historyInfo?.data) || {};


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
      {historyInfo?.data?.length && (
        <>
          <Typography variant="h5" className="!font-bold !text-sm pt-16">
            Customer Purchase History (52)
          </Typography>

          {/* <Table columns={customerColumns} rows={historyInfo.data} /> */}
        </>
      )}
    </Box>
  );
};
