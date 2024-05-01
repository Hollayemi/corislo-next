import { hexToRGBA } from "@/app/utils/hex-to-rgba";
export const revenueOptions = (theme, series, labels) => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: { width: 2 },
    tooltip: { enabled: true },
    dataLabels: { enabled: false },
    colors: [theme.palette.info.main],
    markers: {
      size: 3.5,
      strokeWidth: 3,
      strokeColors: "transparent",
      colors: [theme.palette.info.main],
    },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: false },
      },
      padding: {
        top: 5,
        left: -4,
        right: 8,
        bottom: 25,
      },
    },
    xaxis: {
      categories: [(labels)] || [("Jan", "Feb", "Mar", "April")], 
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
  };
};

export const generatedLeadOptions = (theme, series) => {
  return {
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.5),
      hexToRGBA(theme.palette.primary.main, 0.16),
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: ["Electronic", "Sports", "Decor", "Fashion"],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18,
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: "73%",
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              fontSize: "1.75rem",
              formatter: (val) => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
            },
          },
        },
      },
    },
  };
};

export const salesOptions = (theme, series) => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: true },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      show: false,
      padding: {
        top: 5,
        bottom: 25,
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
              opacity: 1,
              color: theme.palette.secondary.main,
            },
            {
              opacity: 0,
              offset: 100,
              color: theme.palette.secondary.main,
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
        color: theme.palette.secondary.main,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thur"], // Set your x-axis labels here
      labels: { show: true }, // Set show labels to true
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false },
  };
};

export const categoryOptions = (theme, series) => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: "42%",
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA(theme.palette.primary.main, 0.16),
      hexToRGBA(theme.palette.primary.main, 0.16),
    ],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    grid: {
      show: false,
      padding: {
        top: -4,
        left: -10,
        right: -8,
        bottom: -12,
      },
    },
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: "on",
      labels: {
        style: {
          fontSize: "14px",
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
        },
      },
    },
    yaxis: { show: false },
  };
};
