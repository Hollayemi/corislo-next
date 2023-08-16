import { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { OrderListComponents } from ".";

const OrderTable = ({ selectRow }) => {
    const [value, setValue] = useState("all");
    return (
      <>
        <Box className="md:px-5">
          <Typography variant="caption" className="text-xs">
            Access a comprehensive overview of orders, including customer
            details, dates, and status. Seamlessly update order statuses and
            perform essential actions like refunds and cancellations. Stay
            connected with customers through direct messaging for personalized
            support. Efficiently manage order processing and ensure timely
            fulfillment. Keep track of every order's progress for a smooth
            workflow. This page empowers you to deliver exceptional customer
            experiences and streamline your store's operations.
          </Typography>
        </Box>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box className="mt-6">
              <OrderListComponents
                value={value}
                rows={selectRow.data}
                setValue={setValue}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
}

export default OrderTable;