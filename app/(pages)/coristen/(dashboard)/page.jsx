'use client'
import IconifyIcon from '@/app/components/icon'
import { IconImage } from '@/app/components/view/home/header'
import SuperLeftBar from '@/app/components/view/super/SuperLeftBar'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import DashboardLineChart from './components/ChartjsLineChart'
import ApexDonutChart from './components/ApexDonutChart'
import ApexColumnChart from './components/ApexColumnChart'
import AnalyticsSalesByCountries from './components/AnalyticsSalesByCountries'
import useSWR from 'swr'

const Dashboard = () => {
  const theme = useTheme()
  const [search, setSearch] = useState('')
 const { data } = useSWR('/super/dashboard-cards')
 const cards = data ? data.data : {}
 console.log(data)
  return (
    <SuperLeftBar>
      <Box className="flex justify-between items-center">
        <Typography
          variant="body2"
          className="!text-black !font-bold !text-[18px]"
        >
          Overview
        </Typography>
        <Box className="flex items-center">
          <Box className="relative md:mr-4 w-full md:w-44 px-2 md:px-0">
            <input
              type="text"
              placeholder="Search "
              value={search}
              className="w-full pl-8 md:pl-10 text-[13px] bg-transparent pr-2 h-9 md:h-9 border border-gray-300 rounded-xl transition-all outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconImage
              image="search"
              className="w-4 md:w-5 absolute top-3 -mt-0.5 left-2 ml-1 cursor-pointer"
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<IconifyIcon icon="tabler:filter" />}
            endIcon={<IconifyIcon icon="tabler:chevron-down" />}
            className="!h-9 !shadow-none !rounded-xl !text-gray-600 !text-[13px] border border-gray-300 w-28"
          >
            Filter
          </Button>
        </Box>
      </Box>

      <Box className="bg-white flex justify-evenly px-4 py-5 rounded-md mt-4 ">
        <Stats title="Users" stat={cards.user?.sum || 0} />
        <Stats title="Ambassadors" stat="4000" />
        <Stats title="Agents" stat={cards.agent?.sum || 0} />
        <Stats title="Stores" stat={cards.sellers?.sum || 0} />
        <Stats
          title="Service Providers"
          stat={cards.sevicesProviders?.sum || 0}
        />
        <Stats title="Services" stat={cards.services?.sum || 0} />
        <Stats title="Products" stat={cards.services?.sum || 0} />
        <Stats
          title="Total Transactions"
          className="border-none"
          stat={cards.transactions?.sum || 0}
        />
      </Box>

      <Box className="flex items-start mt-4">
        <Box className="w-8/12 pr-2">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Users
            </Typography>
            <DashboardLineChart />
          </Box>
        </Box>
        <Box className="w-4/12 pl-2">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Order Fulfilments
            </Typography>
            <ApexDonutChart />
          </Box>
        </Box>
      </Box>

      <Box className="flex items-start mt-4">
        <Box className="w-8/12 pr-2">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Transaction Overview
            </Typography>
            <ApexColumnChart />
          </Box>
        </Box>
        <Box className="w-4/12 pl-2">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Service Bookings
            </Typography>
            <ApexDonutChart />
          </Box>
        </Box>
      </Box>
      <Box className="flex items-start mt-4">
        <Box className="w-1/3">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Top 10 active user
            </Typography>
            <AnalyticsSalesByCountries />
          </Box>
        </Box>
        <Box className="w-1/3 px-2">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Top requested service
            </Typography>
            <AnalyticsSalesByCountries />
          </Box>
        </Box>
        <Box className="w-1/3">
          <Box className="h-full bg-white rounded-md p-3">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[14px]"
            >
              Ratings
            </Typography>
            <AnalyticsSalesByCountries />
          </Box>
        </Box>
      </Box>
    </SuperLeftBar>
  )
}

export default Dashboard

const Stats = ({ title, stat = 244, br, className }) => (
  <Box className={`w-1/6 border-r pl-2 ${className}`}>
    <Typography
      noWrap
      variant="body2"
      className="!text-gray-400 text-[13px] mb-1"
    >
      {title}
    </Typography>

    <Typography
      noWrap
      variant="body2"
      className="!text-gray-700 text-[15px] !font-bold"
    >
      {parseInt(stat).toLocaleString()}
    </Typography>
  </Box>
)
