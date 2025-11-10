import { formatDateToMonthShort } from "@/app/utils/format";

export const dashboardChart = (theme, series, labels) => {
    return {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: true },
            sparkline: { enabled: true },
        },
        stroke: { width: 3 },
        tooltip: { enabled: true },
        dataLabels: { enabled: true },
        colors: [theme.palette.primary.main],
        markers: {
            size: 2.5,
            strokeWidth: 2,
            strokeColors: "transparent",
            colors: [theme.palette.primary.main],
        },
        grid: {
              row: {
      colors: ['#e5e5e5', 'transparent'],
      opacity: 0.5
  }, 
  column: {
      colors: ['#f8f8f8', 'transparent'],
  }, 
border:true,
            borderWidth: 3,
            // borderColor: theme.palette.divider,
            xaxis: {
                lines: { show: true },
            },
            yaxis: {
                lines: { show: true },
            },
            padding: {
                top: 5,
                left: 0,
                right: 0,
                bottom: 35,
            },
        },
        

        xaxis: {
            categories: labels.map((x) => formatDateToMonthShort(x)) || [
                "Jan",
                "Feb",
                "Mar",
                "April",
            ],
            labels: {
                show: true,
                style: {
                    fontSize: "10px",
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                },
            },
            axisTicks: { show: true },
            axisBorder: { show: true },
        },
        yaxis: {
            labels: { show: false },
        },
    };
};

export const realData = {
  chartLabels: [
    '2024-11-16',
    '2024-11-17',
    '2024-11-18',
    '2024-11-19',
    '2024-11-20',
    '2024-11-21',
    '2024-11-22',
    '2024-11-23',
    '2024-11-24',
    '2024-11-25',
    '2024-11-26',
    '2024-11-27',
    '2024-11-28',
    '2024-11-29',
    '2024-11-30',
    '2024-12-01',
    '2024-12-02',
    '2024-12-03',
    '2024-12-04',
    '2024-12-05',
    '2024-12-06',
    '2024-12-07',
    '2024-12-08',
    '2024-12-09',
    '2024-12-10',
    '2024-12-11',
    '2024-12-12',
    '2024-12-13',
    '2024-12-14',
    '2024-12-15',
    '2024-12-16',
  ],
  chartData1: [
    378, 455, 433, 694, 559, 667, 585, 501, 268, 397, 591, 606, 405, 661, 509,
    338, 385, 634, 192, 188, 200, 80, 105, 143, 187, 504, 178, 413, 131, 93, 49,
  ],
  chartData2: [
     338, 385, 634, 192, 188, 200, 80, 105, 143, 187, 504, 178, 413, 131, 93, 49,
    378, 455, 433, 694, 559, 667, 585, 501, 268, 397, 591, 606, 405, 661, 509,
   
  ],
}

export const newOptions = (theme) => {
    
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

  return  {
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
}

export const data =(theme) => ({
    labels: realData.chartLabels,
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Users",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: "#8479F2",
        backgroundColor: "#8479F2",
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: "#fff",
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: "#8479F2",
        data: realData.chartData1
      },
      {
        fill: false,
        tension: 0.5,
        label: "Businesses",
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: "#ff9800",
        backgroundColor: "#ff9800",
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: "#fff",
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: "#ff9800",
        data: realData.chartData2
      },
    ],
  }
)