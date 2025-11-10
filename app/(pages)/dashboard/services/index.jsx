'use client'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import { useStoreData } from '@/app/hooks/useData'
import { CardsExplain, DashboardSlider, Like } from './components'
import AppCalendar from '@/app/components/calendar'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import IconifyIcon from '@/app/components/icon'
const {
  Box,
  Typography,
  Button,
  Avatar,
  LinearProgress,
} = require('@mui/material')
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
      <Box className="w-full md:!px-7 !px-3 ">
        <Box className="flex items-center">
          <Box className="w-1/2 pr-4">
            <Box className="bg-orange-200 rounded-2xl p-6 h-40 flex items-center">
              <Box>
                <Typography
                  color="primary"
                  className="!mb-2 !font-bold !text-xl"
                >
                  Welcome back, {staffInfo.fullname || 'Staff Name'} 👋🏻
                </Typography>
                <Typography variant="caption" className="!mb-5 !text-[12px]">
                  Welcome to your dashboard! Showcase your expertise, attract
                  clients, and stay on top of your business effortlessly.
                </Typography>
              </Box>
              <Image
                src="/images/services/sewing-machine.png"
                className="w-40"
                alt="image"
                width={500}
                height={500}
              />
            </Box>
          </Box>
          <Box className="w-1/2 pl-4">
            <Box className="bg-white rounded-2xl p-6 h-40 flex items-center">
              <Box>
                <Typography className="!mb-1 !font-bold !text-md">
                  Invite fellow service render or store owner to Corisio
                </Typography>
                <Typography variant="caption" className="!mb-5 !text-[12px]">
                  Reward yourself and join our Corisio community! Get coins for
                  every inviited businesses! Everyonee a job{' '}
                </Typography>
                <Box className="flex items-center mt-1">
                  <Box className="w-12 h-5 rounded bg-orange-100 flex items-center justify-center">
                    <IconifyIcon
                      icon="tabler:coins"
                      className="text-[14px] text-orange-500 mr-px"
                    />
                    <Typography
                      variant="caption"
                      className="!text-[12px] !text-orange-500"
                    >
                      50
                    </Typography>
                  </Box>
                  <Button
                    endIcon={
                      <IconifyIcon
                        icon="tabler:chevron-right"
                        className="!text-[16px]"
                      />
                    }
                    className="ml-5 !text-[12px]"
                  >
                    Send invite
                  </Button>
                </Box>
              </Box>
              <Image
                src="/images/misc/Business-referral.png"
                className="w-40"
                alt="image"
                width={500}
                height={500}
              />
            </Box>
          </Box>
        </Box>

        <Box className="flex justify-between items-center">
          <Typography color="primary" className="!my-6 !font-bold !text-xl">
            Popular Services
          </Typography>
          <Typography color="primary" className="!my-6 !text-[12px]">
            See all
          </Typography>
        </Box>

        <ReactSlickSlider config={1} set={{ fade: false }} hideArrow>
          <ServicePreview
            title="Fashion Designer"
            emoji="👗"
            likeCount={10}
            followingCount={30}
            engagement={90}
          />
          <ServicePreview
            title="Fashion Designer"
            emoji="👗"
            likeCount={30}
            followingCount={60}
            engagement={50}
          />
        </ReactSlickSlider>

        <Box className="flex items-start">
          <Box className="w-3/5 pr-5">
            <Box className="flex items-center justify-between">
              <Typography color="primary" className="!my-6 !font-bold !text-xl">
                Bookings & Reservations
              </Typography>
              <Typography color="primary" className="!my-6 !text-[12px]">
                view in calendar
              </Typography>
            </Box>
            <Box className="bg-white h-48 rounded-xl flex flex-col items-center justify-center">
              <IconifyIcon icon="tabler:history" className="mb-2" />
              <Typography className="!text-[14px]">
                No booking history
              </Typography>
            </Box>
          </Box>
          <Box className="w-2/5 pl-4">
            <Box>
              <Typography color="primary" className="!my-6 !font-bold !text-xl">
                Overview
              </Typography>
            </Box>
            <Box className="flex justify-evenly h-[210px] md:h-[200px] pt-2 md:pt-0">
              <CardsExplain title="Services" stat={50} />
              <Box className="!px-0.5 md:hidden"></Box>
              <CardsExplain title="Users" stat={80} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box></Box>
    </ServiceRenderWrapper>
  )
}

export default ServiceDashboard

const ServicePreview = ({
  emoji,
  title = '',
  likeCount = '',
  followingCount = '',
  engagement = 0,
}) => (
  <Box className="bg-white p-4 h-32 w-64 rounded-xl mr-3">
    <Box className="flex items-center">
      <Box className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-blue-100">
        <Typography variant="body2" className="!text-[20px]">
          {emoji}
        </Typography>
      </Box>
      <Typography variant="body2" className="!text-[15px] !font-bold !ml-4">
        {title}
      </Typography>
    </Box>
    <Box className="flex items-center mt-1">
      <Like count={likeCount} />
      <Like icon="users" color="#3B47AF" count={followingCount} />
    </Box>
    <Box className="mt-5">
      <LinearProgress
        variant="determinate"
        value={engagement}
        color={'success'}
        sx={{ height: 4 }}
      />
    </Box>
  </Box>
)
