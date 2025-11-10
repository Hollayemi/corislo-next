"use client";
// ** MUI Imports
import { Card, Box, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// ** Third Party Imports
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import useSWR from "swr";
import { calculateDateDiff, formatDateToMonthShort, generateDateRange } from "@/app/utils/format";

// Register required Chart.js modules
ChartJS.register(...registerables);

const DashboardLineChart = ({ interval="30_days" }) => {
  const theme = useTheme();
const startDate = calculateDateDiff(
    interval.split(" ").join("_"),
    new Date(),
    "-",
    true
  );
  const { data } = useSWR(`/super/growth-chart?startDate=${startDate}`)

  const realData = data?.data || {}
  console.log(realData)

   const label = generateDateRange(startDate, new Date(), "Daily");

  const fakeData = {
    chartLabels: [
      "2024-12-06",
      "2024-12-07",
      "2024-12-08",
      "2024-12-09",
      "2024-12-10",
      "2024-12-11",
      "2024-12-12",
      "2024-12-13",
      "2024-12-14",
      "2024-12-15",
      "2024-12-16",
    ],
    chartData1: [
      378, 455, 433, 694, 559, 667, 585, 501, 268, 397, 591, 606, 405, 661, 509,
      338, 385, 634, 192, 188, 200, 80, 105, 143, 187, 504, 178, 413, 131, 93, 49,
    ],
    chartData2: [
      338, 385, 634, 192, 188, 200, 80, 105, 143, 187, 504, 178, 413, 131, 93, 49,
      378, 455, 433, 694, 559, 667, 585, 501, 268, 397, 591, 606, 405, 661, 509,
    ],
    chartData3: [
      667, 585, 501, 268, 397, 361, 509,  591, 606, 404, 178, 413, 131, 93, 49,338, 385, 634, 559, 
      378, 455, 433, 694, 405,192, 188, 200, 80, 105, 143, 187,
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.disabled,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 100,
          color: theme.palette.text.disabled,
          display: false, // Hide y-axis labels
        },
        grid: {
          display: true, // Hide y-axis grid
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        position: "top",
        labels: {
          padding: 5,
          margin:2,
          boxWidth: 10,
          color: theme.palette.text.secondary,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  // Add a custom plugin for vertical line
  const customPlugin = {
    id: "verticalLine",
    beforeDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const x = chart.tooltip._active[0].element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.palette.divider;
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const chartData = {
    labels: realData.chartLabels?.map((x) => formatDateToMonthShort(x.replace(".","-"))),
    datasets: [
      {
        label: "Users",
        data: realData.countUsers,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.primary.main,
        fill: false,
      },
      {
        label: "Service Providers",
        data: realData.SPs,
        borderColor: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.main,
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.warning.main,
        fill: false,
      },
      {
        label: "Sellers",
        data: realData.countStores,
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.main,
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.info.main,
        fill: false,
      },
    ],
  };

  return (
    <Box className="w-full !shadow-none">
     
        <Line data={chartData} options={options} plugins={[customPlugin]} height={300} />
      
    </Box>
  );
};

export default DashboardLineChart;
