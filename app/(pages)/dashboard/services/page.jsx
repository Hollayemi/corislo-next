// import ServiceRenderWrapper from '@/app/components/view/services/header'
"use client"
import { Box, Button, Typography } from '@mui/material'
import { EachService } from './components'
import dynamic from 'next/dynamic'
import IconifyIcon from '@/app/components/icon'
import { useStoreData } from '@/app/hooks/useData'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)

const Services = ({ params }) => {
  const path = { ...params, sidebar: '/' }
  return (
    <ServiceRenderWrapper
      path={path}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
    >
      <Box className="w-full bg-white !rounded-md !px-4 md:!px-8 !py-4 relative">
        <Box className=" !mb-3">
          <Typography
            variant="body2"
            className="!text-gray-800 !font-bold !text-[16px] !leading-6 mt-3"
          >
            Services
          </Typography>
          <Typography
            variant="body2"
            className="!text-gray-500 !text-[12px] !leading-6"
          >
            List of services and their reactions
          </Typography>
        </Box>
        <Box className=" flex flex-wrap">
          <EachService id={0} />
          <EachService id={1} />
          <EachService id={2} />
          <EachService id={3} />
          <EachService id={4} />
          <EachService id={5} />
          <EachService id={6} />
          <EachService id={7} />
        </Box>
      </Box>
    </ServiceRenderWrapper>
  )
}
export default Services


const BreadcrumbRightEle = () => {
  const { showOverlay } = useStoreData()
  return (
    <Box className="flex items-center -mr-6 md:mr-0">
      <Button
        variant="contained"
        className="!mr-4 !bg-blue-900 !shadow-none !text-[12px] !rounded-full"
        startIcon={<IconifyIcon icon="tabler:plus" />}
        onClick={() => showOverlay('newService')}
      >
        <span className="hidden md:block mr-2">Create New </span> Service
      </Button>
    </Box>
  )
}
