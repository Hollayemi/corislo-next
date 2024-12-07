'use client'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import { useStoreData } from '@/app/hooks/useData'
import { CardsExplain, DashboardSlider } from './components'
import AppCalendar from '@/app/components/calendar'
import dynamic from 'next/dynamic'
const { Box, Typography, Button, Avatar } = require('@mui/material')
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)

const ServiceDashboard = () => {
  const { staffInfo, screenWidth = 0 } = useStoreData()
  return (
    <ServiceRenderWrapper>
      <Box className="flex flex-col w-full md:px-7 px-3 ">
        <Typography color="primary" className="!mb-5 !font-bold !text-2xl">
          Welcome back, {staffInfo.fullname || 'Staff Name'} 👋🏻
        </Typography>
      </Box>
      <Box className="flex flex-col md:flex-row items-start">
        <Box
          className={`flex-grow-0 w-full max-w-fit md:w-7/12  bg-white rounded-md`}
        >
          <Box className="h-[200px]">
            <ReactSlickSlider config={3} set={{ fade: false }} hideArrow>
              <DashboardSlider />
              <DashboardSlider />
              <DashboardSlider />
            </ReactSlickSlider>
          </Box>
        </Box>
        <Box className="flex justify-evenly h-[210px] md:h-[200px] w-5/12 pt-2 md:pt-0 md:pl-1">
          <CardsExplain title="Services" stat={50} />
          <Box className="px-0.5 md:hidden"></Box>
          <CardsExplain title="Users" stat={80} />
        </Box>
      </Box>
      <Box className="w-full h-14 rounded-md bg-white my-2"></Box>
      <AppCalendar />
    </ServiceRenderWrapper>
  )
}

export default ServiceDashboard
