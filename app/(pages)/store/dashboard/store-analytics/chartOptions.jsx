export const options = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  tooltip: { enabled: false },
  dataLabels: { enabled: false },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
    padding: {
      top: 5,
      bottom: 20,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityTo: 0,
      opacityFrom: 1,
      shadeIntensity: 1,
      stops: [0, 100],
      colorStops: [
        [
          {
            offset: 0,
            opacity: 0.4,
            color: "green",
          },
          {
            opacity: 0,
            offset: 100,
            color: "red",
          },
        ],
      ],
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      shadeTo: "light",
      shadeIntensity: 1,
      color: "blue",
    },
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: { show: false },
};
