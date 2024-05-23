// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Imports
import { Bubble } from 'react-chartjs-2'
import { useTheme } from "@mui/material/styles";
// ** Custom Components Imports
import CustomChip from "@/app/components/chip";

const DashboardBubbleChart = props => {
  // ** Hook
  const theme = useTheme();
  // ** Props

  const white = "#ffffff";
  const yellow = "#d4e157";
  const primary = "#8479F2";
  const warning = "#ff9800";
  const borderColor = theme.palette.divider;
  const labelColor = theme.palette.text.disabled;
  const legendColor = theme.palette.text.secondary;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 2000 },
    scales: {
      x: {
        min: 0,
        max: 140,
        type: "linear",
        grid: {
          color: borderColor,
        },
        ticks: {
          stepSize: 10,
          color: labelColor,
        },
      },
      y: {
        min: 0,
        max: 400,
        type: "linear",
        grid: {
          color: borderColor,
        },
        ticks: {
          stepSize: 100,
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const data = {
    datasets: [
      {
        label: "Dataset 1",
        borderColor: primary,
        backgroundColor: primary,
        data: [
          { x: 20, y: 74, r: 10 },
          { x: 10, y: 110, r: 5 },
          { x: 30, y: 165, r: 7 },
          { x: 40, y: 200, r: 20 },
          { x: 90, y: 185, r: 7 },
          { x: 50, y: 240, r: 7 },
          { x: 60, y: 275, r: 10 },
          { x: 70, y: 305, r: 5 },
          { x: 80, y: 325, r: 4 },
          { x: 100, y: 310, r: 5 },
          { x: 110, y: 240, r: 5 },
          { x: 120, y: 270, r: 7 },
          { x: 130, y: 300, r: 6 },
        ],
      },
      {
        label: "Dataset 2",
        borderColor: yellow,
        backgroundColor: yellow,
        data: [
          { x: 30, y: 72, r: 5 },
          { x: 40, y: 110, r: 7 },
          { x: 20, y: 135, r: 6 },
          { x: 10, y: 160, r: 12 },
          { x: 50, y: 285, r: 5 },
          { x: 60, y: 235, r: 5 },
          { x: 70, y: 275, r: 7 },
          { x: 80, y: 290, r: 4 },
          { x: 90, y: 250, r: 10 },
          { x: 100, y: 220, r: 7 },
          { x: 120, y: 230, r: 4 },
          { x: 110, y: 320, r: 15 },
          { x: 130, y: 330, r: 7 },
        ],
      },
    ],
  };

  return (
    <Card className="!shadow-none">
      <Box className="!p-3">
        <Typography className="text-[13px] font-bold">New buyer</Typography>
      </Box>
      <CardContent>
        <Bubble data={data} height={300} options={options} />
      </CardContent>
    </Card>
  );
}

export default DashboardBubbleChart
