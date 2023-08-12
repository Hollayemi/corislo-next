"use client"
import { useEffect } from "react";
// import {  } from "react"
import { Typography, Grid, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { BranchesSales, TopCards } from "./components";
import DashboardLineChart from "@/app/components/chart/ChartjsLineChart";
import DashboardBubbleChart from "@/app/components/chart/ChartjsBubbleChart";
import "chart.js/auto";
import PurchaseHistory from "@/app/components/view/store/tables/purchaseHostory";
// import { StoreSalesApi } from "@/app/redux/state/slices/shop/overview/sales";

const DashboardOverview = ({ params }) => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //     dispatch(StoreSalesApi({time: "1_month"}));
  // },[])
  return (
    <StoreLeftSideBar path={params}>
      <Box>
        <TopCards />
      </Box>
      <Box className="mt-4">
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
      <Box
        className={`!overflow-auto w-[380] md:!w-[1250px] !relative !px-1 !md:px-4 !py-5 !mt-6 !rounded-md`}
        bgcolor="custom.bodyLight"
      >
        <PurchaseHistory />
      </Box>
    </StoreLeftSideBar>
  );
}

export default DashboardOverview