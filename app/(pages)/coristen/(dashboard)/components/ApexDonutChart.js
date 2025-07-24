// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ReactApexcharts from '@/app/components/chart/react-apexcharts'
import { Box } from '@mui/material'
import useSWR from 'swr'
import { statusObj } from '@/app/(pages)/dashboard/store/order-management/components'



const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#1FD5EB',
  series5: '#ffa1a1'
}



const ApexDonutChart = () => {
  // ** Hook
  const theme = useTheme()
  const {data} = useSWR("/super/order-status")
  const realData = data?.data || {}
  const labels = Object.keys(realData)
  const chartData = Object.values(realData)
  console.log(labels)

  const totalSum = chartData.length && chartData.reduce((prev, cur) => prev + cur)

  const colors = labels.map((x) => statusObj.filter((f) => f.title === x.toLowerCase())[0].color)
  console.log(colors)
  const options = {
    stroke: { width: 0 },
    labels,
    colors: colors.map(x => theme.palette[x].main),
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Orders',
              formatter: () => totalSum,
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Box>
      
        <ReactApexcharts type='donut' height={300} options={options} series={chartData} />

    </Box>
  )
}

export default ApexDonutChart
