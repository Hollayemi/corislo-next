// import ServiceRenderWrapper from '@/app/components/view/services/header'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const Service = () => {
  return (
    <ServiceRenderWrapper>
      <Box></Box>
    </ServiceRenderWrapper>
  )
}

export default Service
