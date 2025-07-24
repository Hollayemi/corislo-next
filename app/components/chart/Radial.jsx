'use clients'

import { hexToRGBA } from '@/app/utils/hex-to-rgba'
const { default: ReactApexcharts } = require('./react-apexcharts')
const { useTheme } = require('@emotion/react')

const RadialChart = ({
  label = '',
  height = 100,
  percentage = 0,
  dash = 10,
}) => {
  const theme = useTheme()

  const options = () => ({
    chart: {
      sparkline: { enabled: true },
    },
    stroke: { dashArray: dash },
    labels: [label],
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: [theme.palette.primary.main],
      },
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '40%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -15,
            fontSize: '12px',
            color: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
          },
          value: {
            offsetY: 1,
            fontWeight: 500,
            fontSize: '12px',
            formatter: (value) => `${value}%`,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
          },
        },
      },
    },
    grid: {
      padding: {
        top: -30,
        bottom: 12,
      },
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          grid: {
            padding: {
              left: 22,
            },
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          grid: {
            padding: {
              left: 0,
            },
          },
        },
      },
    ],
  })

  return (
    <ReactApexcharts
      type="radialBar"
      className="!p-0 !m-0 !w-fit !h-fit"
      height={height}
      options={options({ label })}
      series={[percentage]}
    />
  )
}

export default RadialChart
