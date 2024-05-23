"use client";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Grid, Box } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { BranchesSales, TopCards, DashboardCrumb } from "./components";
import DashboardLineChart from "@/app/components/chart/ChartjsLineChart";
import DashboardBubbleChart from "@/app/components/chart/ChartjsBubbleChart";
import "chart.js/auto";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { ordersColumns } from "./order-management/components/columns";

const DashboardOverview = ({ params }) => {
  const router = useRouter();
  const {
    data: orderData,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR(`/branch/order-request`);

  const rows = orderData?.data || [];

  const actionFunctions = (row, action) => {
    if (action === "modify") {
      // selectRow(row);
      router.push(`/store/dashboard/order-management?order=${row._id}`);
    }

    if (action === "message") {
      router.push(`/store/chat?customer=${row.customerUsername}`);
    }
  };
  return (
    <StoreLeftSideBar
      path={params}
      crumb={[
        ...DashboardCrumb,
        {
          text: "Overview",
          link: "",
          icon: "home",
        },
      ]}
    >
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
      {rows.length && (
        <Box className="bg-white !px-3 py-4 rounded-md my-6">
          <OrderTable columns={ordersColumns(actionFunctions)} rows={rows} />
        </Box>
      )}
    </StoreLeftSideBar>
  );
};

export default DashboardOverview;
