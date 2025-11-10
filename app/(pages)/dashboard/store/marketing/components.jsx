"use client";
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
      <Box
        className="!shadow-none !h-9 w-9 bg-blue-900 hover:bg-blue-600 cursor-pointer flex items-center justify-center  !text-[12px]  !rounded-full transition-all duration-300"
        onClick={() => router.push("marketing/create")}
      >
        <Icon icon="tabler:plus" className="!text-white" />
      </Box>
      <Box className=""></Box>
    </Box>
  );
};

export const CampaignTab = ({ title, caption, screen, setScreen, disabled }) => {
  const genCampReg = title.toLowerCase().split(' ').join('_')
  return (
    <Box
      className={`w-32 flex-shrink-0 h-24 m-2 flex shadow flex-col items-center justify-center cursor-pointer translation-all duration-300 bg-gray-100 rounded-md border ${screen !== genCampReg ? 'border-gray-100' : 'border-blue-800'
        } hover:border-blue-800`}
      onClick={() => !disabled && setScreen(genCampReg)}
    >
      <Typography variant="body2" className="!text-[14px] !font-bold">
        {title}
      </Typography>
      <Typography variant="caption" className="!text-[11px]">
        {disabled ? "(available soon)" : caption}
      </Typography>
      <Box
        className={`h-5 w-5 mt-4 rounded-full border-4 ${screen !== genCampReg ? 'border-gray-200' : 'border-blue-800'
          } flex items-center justify-center focus`}
      >
        <Box className="h-2 w-2 rounded-full bg-gray-200"></Box>
      </Box>
    </Box>
  )
}

export const LineChartStatistic = ({ label, discounts, flashsales }) => {
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
        ticks: { display: true, color: "rgba(0, 0, 0, 0.39)" }, // remove x-axis labels
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.09)",
          borderDash: [9, 4],
        },
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 100,
          display: false, // remove y-axis labels
        },
        grid: { display: false }, // remove y-axis grid
        scaleLabel: {
          display: true,
          labelString: "Value",
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
      tooltip: {
        // callbacks: {
        //   label: function (tooltipItem) {
        //     const item = discounts[tooltipItem.dataIndex]?.info[0] || {};
        //     return `
        //       Title: ${item.title}
        //       Code: ${item.code}
        //       Original Amount: ${item.originalAmount}
        //       Discount Amount: ${item.discountAmount}
        //       Discount: ${item.discount}%
        //       Discounted Price: ${item.discountedPrice ?? "N/A"}
        //       Payment Date: ${new Date(item.paymentDate).toLocaleString()}`;
        //   },
        // },

        enabled: false, // Disable the default tooltip
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
              const datasetIndex = bodyItem.datasetIndex;
              const dataIndex = bodyItem.dataIndex;
              const datasetLabel = bodyItem.dataset.label;
              const dataset = context.chart.data.datasets[datasetIndex];
              const items =
                datasetIndex === 0
                  ? discounts[dataIndex]?.info || []
                  : flashsales[dataIndex]?.info || [];

              const innerHtml = `
            <div class="tooltipContainter">
            
            <div class='tooltipHeader'>
             <strong>${datasetLabel}</strong>
             <strong>Discounted Amount</strong>
            </div>

            ${items.map(
                (item) =>
                  `
                <div class='tooltipItems'>
                  <h5>${item.title} (${item.discount}%)</h5>
                  <disable>${reshapePrice(item.originalAmount)} ${reshapePrice(
                    item.originalAmount - item.discountAmount
                  )}</disable>
                </div> 
              `
              )}

            <div class='tooltipItems' style='margin-top:20px;'>
                  <h5></h5>
                  <disable>${reshapePrice(
                items.reduce(
                  (sum, item) =>
                    item.originalAmount - item.discountAmount + sum,
                  0
                )
              )}</disable>
                </div> 
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
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = `${position.left +
            window.pageXOffset +
            tooltipModel.caretX -
            tooltipWidth / 2
            }px`;
          tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY + 6
            }px`;
        },

        backgroundColor: "rgba(0, 0, 0)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        footerFont: { size: 10 },
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        displayColors: false,
      },
    },
  };

  const data = {
    labels:
      label ||
      Array(30)
        .fill()
        .map((_, x) => x + 1),
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
        pointHoverBorderWidth: 0,
        borderWidth: 2,
        // pointBorderWidth: 0,
        pointHoverBorderColor: primary,
        pointBorderColor: primary,
        pointHoverBackgroundColor: primary,
        data: discounts?.map((item) => item?.value || 0) || [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375, 600,
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
        // pointBorderWidth: 0,
        borderWidth: 2,
        pointHoverBorderColor: warning,
        pointBorderColor: warning,
        pointHoverBackgroundColor: warning,
        data: flashsales?.map((item) => item.value || 0) || [
          800, 1250, 1050, 1300, 2150, 1195, 1140, 1160, 2300, 1300, 1220, 2170,
          1210, 1200, 800, 1250, 1050, 1300, 2150, 1195, 1140, 1160, 2300, 1300,
          1220, 2170, 1210, 1200, 1220, 2170, 1210, 1200,
        ],
      },
    ],
  };

  return (
    <Box className="w-full !shadow-none">
      <Line
        data={data}
        width={"100%"}
        height={300}
        options={options}
        className="!border-b-6"
      />
    </Box>
  );
};

export const reshapePrice = (price) => {
  if (typeof parseInt(price) === 'number') {
    return `₦ ${parseFloat(price).toLocaleString()}`
  }
}

export const GrowthCard = ({ title, growth, count, toExpire }) => {
  return (
    <Box className="w-1/2 p-1 mt-2 sm:w-1/4 sm:min-w-[180px] ">
      <Box
        className={`w-full flex flex-col justify-center p-2 md:pl-4 rounded-sm h-20 bg-gray-100 border-x-2 border-white border-l-blue-800 cursor-pointer transition-all duration-500`}
      >
        <Box className="flex items-center">
          <Typography
            variant="body2"
            className=" !text-[13px] md:!text-[17px] !font-bold"
          >
            {count}
          </Typography>
          {!toExpire ? (
            <Box className="h-7 rounded-md bg-green-100 w-fit  ml-3 flex items-center justify-center !px-2">
              <Typography
                variant="caption"
                className="!text-[13px] !text-green-700"
              >
                {growth}%
              </Typography>
            </Box>
          ) : (
            <Box className=" rounded-md bg-red-100 w-fit  ml-3 flex items-center justify-center p-1 !px-2">
              <Typography
                variant="body2"
                className="!text-[13px] !text-center !text-red-700"
              >
                {toExpire}
              </Typography>
            </Box>
          )}
        </Box>
        <Typography
          variant="caption"
          className="!text-[14px] !font-[400] !mt-1 !text-gray-500"
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
