"use client";
// ** MUI Imports
import { calculateDateDiff, generateDateRange } from "@/app/utils/format";
import { Card, Box, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// ** Third Party Imports
import { Line } from "react-chartjs-2";
import useSWR from "swr";

const DashboardLineChart = ({ interval }) => {
  // ** Hook
  const theme = useTheme();
  const startDate = calculateDateDiff(
    interval.split(" ").join("_"),
    new Date(),
    "-",
    true
  );

  const { data: swrData, isLoading } = useSWR(
    `/branch/increment-chart?interval=daily&startDate=${startDate}`
  );

  const dataset = swrData?.data || {}

  const label = generateDateRange(startDate, new Date(), "Daily");
  // ** Props
  // const { white, primary, success, warning, labelColor, borderColor, legendColor } = props

  const white = "#ffffff";
  const success = "#d4e157";
  const primary = "#8479F2";
  const warning = "#ff9800";
  const borderColor = theme.palette.divider;
  const labelColor = theme.palette.text.disabled;
  const legendColor = theme.palette.text.secondary;
  {
    labelColor;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: borderColor,
        },
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 100,
          color: labelColor,
          display: false, // remove y-axis labels
        },
        grid: {
          display: false, // remove y-axis labels
          color: borderColor,
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        position: "top",
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true,
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Carts",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: primary,
        data: Object.values(dataset.cart || {})
      },
      {
        fill: false,
        tension: 0.5,
        label: "Orders",
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: warning,
        backgroundColor: warning,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: warning,
        data: Object.values(dataset.order || {}) 
      },
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Appearance",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: success,
        backgroundColor: success,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: success,
        data: Object.values(dataset.view || {})
      },
    ],
  };

  return (
    <Card className="w-full !shadow-none">
      <Box className="!px-3 !py-3 w-full">
        <Typography className="text-[13px] font-bold">
          Income Statement Chart
        </Typography>
      </Box>

      <CardContent>
        <Line data={data} width={"100%"} height={300} options={options} />
      </CardContent>
    </Card>
  );
};

export default DashboardLineChart;
