import { Typography, Box, Grid, MenuItem } from "@mui/material";
import { Summarize } from ".";
import Table from "@/app/components/view/store/tables/OrderTable";
import { customerColumns } from "./columns";
import { purchaseHistoryRow, allCustomers } from "./rows";
import {
  formatShippingAddress,
  formatSegmentation,
  formatDate,
} from "@/app/utils/format";

export const CustomerDetails = () => {
  const info = allCustomers.data[0]
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Summarize
            info={[
              { key: "Total Orders Made", value: info.no_of_orders },
              { key: "Total Amount Spent", value: `₦ ${info.totalAmountSpent}` },
              { key: "Last Order Date", value: formatDate(info.lastPurchase) },
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
        </Grid>
      </Grid>
      {/* <br /> */}
      <Typography variant="h5" className="!font-bold !text-sm pt-16">
        Customer Purchase History (52)
      </Typography>
      {/* <Box> */}
      <Table columns={customerColumns} rows={purchaseHistoryRow.data} />
      {/* </Box> */}
    </Box>
  );
};
