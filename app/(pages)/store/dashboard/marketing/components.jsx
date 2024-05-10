import { useRouter } from "next/navigation";
import { DashboardCrumb } from "../components";
import Icon from "@/app/components/icon";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
// ** Third Party Imports
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const marketingBreadCrumb = [
  ...DashboardCrumb,
  {
    text: "Marketing",
    link: "marketing",
    icon: "shop",
  },
];

export const RightBreadCrumbChildren = ({
  setStartDate,
  startDate,
  SetEndDate,
  endDate,
}) => {
  const router = useRouter();
  return (
    <Box className="flex items-center">
      <Button
        variant="contained"
        startIcon={<Icon icon="tabler:plus" />}
        className="!shadow-none !px-6 !h-9 !text-[12px] !rounded-full"
        onClick={() => router.push("marketing/create")}
      >
        Create One
      </Button>
      <Box className=""></Box>
    </Box>
  );
};

export const CampaignTab = ({ title, caption, screen, setScreen }) => {
  const genCampReg = title.toLowerCase().split(" ").join("_");
  return (
    <Box
      className={`w-32 flex-shrink-0 h-24 m-2 flex shadow flex-col items-center justify-center cursor-pointer translation-all duration-300 bg-gray-100 rounded-md border ${
        screen !== genCampReg ? "border-gray-100" : "border-blue-800"
      } hover:border-blue-800`}
      onClick={() => setScreen(genCampReg)}
    >
      <Typography variant="body2" className="!text-[14px] !font-bold">
        {title}
      </Typography>
      <Typography variant="caption" className="!text-[11px]">
        {caption}
      </Typography>
      <Box
        className={`h-5 w-5 mt-4 rounded-full border-4 ${
          screen !== genCampReg ? "border-gray-200" : "border-blue-800"
        } flex items-center justify-center focus`}
      >
        <Box className="h-2 w-2 rounded-full bg-gray-200"></Box>
      </Box>
    </Box>
  );
};

export const LineChartStatistic = (props) => {
  // ** Hook
  const theme = useTheme();

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
        ticks: { display: true }, // remove x-axis labels
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.2)",
          borderDash: [9, 4],
          margin: {
            bottom: 50
          }
        },
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          display: true, // remove y-axis labels
        },
        grid: { display: false }, // remove y-axis grid
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
    labels: Array(30).fill().map((_, x) => x + 1),
    datasets: [
      {
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        label: "Discount",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: primary,
        backgroundColor: "rgba(128, 128, 128, 0.06)",
        pointHoverBorderWidth: 8,
        borderWidth: 2,
        pointHoverBorderColor: primary,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: primary,
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
      },
      {
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        label: "Flash Sale",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: warning,
        backgroundColor: "rgba(128, 128, 128, 0.06)",
        pointHoverBorderWidth: 8,
        borderWidth: 2,
        pointHoverBorderColor: warning,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: warning,
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280, 54
        ],
      }
      
    ],
  };

  return (
    <Box className="w-full !shadow-none">
      <Line data={data} width={"100%"} height={300} options={options} className="!border-b-6" />
    </Box>
  );
};

export const reshapePrice = (price) => {
  if (typeof parseInt(price) === "number") {
    return `₦ ${parseInt(price).toLocaleString()}`;
  }
};

export const GrowthCard = ({ title, growth, middle, count }) => {
  return (
    <Box
      className={`w-1/3 flex flex-col justify-center pl-4 h-28  bg-white hover:bg-gray-100 border-x-2 ${
        middle ? "border-gray-200 " : "border-white"
      }  hover:border-l-blue-800 cursor-pointer transition-all duration-500`}
    >
      <Box className="flex items-center">
        <Typography variant="body2" className="!text-[17px] !font-bold">
          {count}
        </Typography>
        <Box className="h-7 rounded-md bg-green-100 w-fit  ml-3 flex items-center justify-center px-2">
          <Typography
            variant="caption"
            className="!text-[13px] !text-green-700"
          >
            {growth}%
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        className="!text-[14px] !font-[400] !mt-1 !text-gray-500"
      >
        {title}
      </Typography>
    </Box>
  );
};
