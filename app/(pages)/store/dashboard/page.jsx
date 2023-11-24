"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography, Grid, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { BranchesSales, TopCards } from "./components";
import DashboardLineChart from "@/app/components/chart/ChartjsLineChart";
import DashboardBubbleChart from "@/app/components/chart/ChartjsBubbleChart";
import "chart.js/auto";
import PurchaseHistory from "@/app/components/view/store/tables/purchaseHostory";
import { StoreSalesApi } from "@/app/redux/state/slices/shop/overview/sales";

const DashboardOverview = ({ params }) => {
  const dispatch = useDispatch();
  return (
    <StoreLeftSideBar path={params}>
      <Box className="px-2">
        <Box>
          <TopCards />
        </Box>
        <Box className="mt-4 flwx justify-center">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BranchesSales />
            </Grid>
            <Grid item xs={12} md={5}>
              <DashboardLineChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardBubbleChart />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <OrderTable
          columns={allOrderColumns(actionFunctions)}
          rows={sortBy()}
        /> */}
    </StoreLeftSideBar>
  );
};

export default DashboardOverview;
