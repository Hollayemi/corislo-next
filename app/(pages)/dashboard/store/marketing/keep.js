import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";

export const LineChartStatistic = ({ label, discounts, flashsales }) => {
  console.log(discounts, flashsales);
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
            const data =
              context.chart.data.datasets[0].data[
                tooltipModel.dataPoints[0].dataIndex
              ];
            console.log(data);
            const items =
              discounts[tooltipModel.dataPoints[0].dataIndex]?.info || [];
            const innerHtml = `
            <div class="tooltipContainter">
            
            <div class='tooltipHeader'>
             <strong>Title</strong>
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
            </div>
          `;
            tooltipEl.innerHTML = innerHtml;
          }

          // Display, position, and set styles for font
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
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
        pointHoverBorderColor: primary,
        pointBorderColor: "transparent",
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
        borderWidth: 2,
        pointHoverBorderColor: warning,
        pointBorderColor: "transparent",
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
