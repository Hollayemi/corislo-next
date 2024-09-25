// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Imports
import { Bubble } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import useSWR from "swr";
import { calculateDateDiff } from "@/app/utils/format";
import { reshapePrice } from "@/app/(pages)/store/dashboard/marketing/components";
import { useEffect, useState } from "react";

const DashboardBubbleChart = ({ interval }) => {
  // ** Hook
  const theme = useTheme();
  // ** Props
  const startDate = calculateDateDiff(
    interval.split(" ").join("_"),
    new Date(),
    "-",
    true
  );

  const { data: swrData, isLoading } = useSWR(
    `/branch/buyer-chart?interval=daily&startDate=${startDate}`
  );

  const dataset = swrData?.data || {};


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
        // max: 140,
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
        // max: 400,
        type: "linear",
        grid: {
          color: borderColor,
          display: false, // remove y-axis labels
        },
        ticks: {
          stepSize: 100,
          color: labelColor,
          display: false, // remove y-axis labels
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: false,
        external: function (context) {
          // Get the tooltip model
          const tooltipModel = context.tooltip;
          let tooltipEl = document.getElementById("chartjs-tooltip");

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.borderRadius = "5px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.width = "auto";
            tooltipEl.style.height = "auto";
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set caret position
          tooltipEl.classList.remove("above", "below", "no-transform");
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add("no-transform");
          }

          // Set text
          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.dataPoints.map((bodyItem) => {
              const datasetLabel = bodyItem.dataset.label;
              const raw = bodyItem.raw;

              const innerHtml = `
              <div class="tooltipContainter">
              
              <div class='tooltipHeader'>
               <strong>${datasetLabel} Buyer</strong>
               <strong>Amount</strong>
              </div>
              <div class='tooltipItems mt10'>
                <h5>Total amount spent</h5>
                <disable>${reshapePrice(raw.totalSpent)} </disable>
              </div>
              <div class='tooltipItems mt10'>
                <h5>Total order made</h5>
                <disable>${raw.sum} </disable>
              </div> 
              <div class='tooltipItems mt10'>
                <h5>Total items bought</h5>
                <disable>${raw.quantity} </disable>
              </div> 
            </div>`;

              return innerHtml;
            });

            tooltipEl.innerHTML = `
              <div>
                
                ${bodyLines.join("")}
              </div>
            `;
          }

          // Display, position, and set styles for font
          const position = context.chart.canvas.getBoundingClientRect();
          const tooltipWidth = tooltipEl.offsetWidth;
          const tooltipHeight = tooltipEl.offsetHeight;
          console.log(window.pageXOffset, window.pageYOffset);
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = `${
            position.left +
            window.pageXOffset +
            tooltipModel.caretX -
            tooltipWidth
          }px`;
          tooltipEl.style.top = `${
            position.top + window.pageYOffset + tooltipModel.caretY + 6
          }px`;
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Frequent",
        borderColor: primary,
        backgroundColor: primary,
        data: dataset.recent || [
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
        label: "First time Buyers",
        borderColor: yellow,
        backgroundColor: yellow,
        data: dataset.firstTime || [
          { x: 30, y: 72, r: 5 },
          { x: 40, y: 110, r: 7 },
          { x: 20, y: 135, r: 6 },
          { x: 10, y: 160, r: 12 },
          { x: 50, y: 285, r: 5 },
          { x: 60, y: 235, r: 5 },
          { x: 70, y: 275, r: 7 },
          { x: 80, y: 290, r: 4 },
          { x: 90, y: 250, r: 10.3 },
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
        <Typography className="text-[13px] !font-bold">Buyers</Typography>
      </Box>
      <CardContent>
        <Bubble data={data} height={300} options={options} />
      </CardContent>
    </Card>
  );
};

export default DashboardBubbleChart;
