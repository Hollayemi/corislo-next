'use client'
import dynamic from 'next/dynamic'
import { useStoreData } from '@/app/hooks/useData'
// import DashboardOverview from './store/page'
// import ServiceDashboard from './services'
import { CircleLoader } from '@/app/components/cards/loader'
import { Box } from '@mui/material'
const ServiceDashboard = dynamic(() => import('./services'), { ssr: false })
const DashboardOverview = dynamic(() => import('./store/page'), { ssr: false })

const BusinessDashboard = () => {
  const {
    storeInfo: { business },
  } = useStoreData()
  console.log(business)
  return business ? (
    business.businessType === 'services' ? (
      <ServiceDashboard />
    ) : (
      <DashboardOverview />
    )
  ) : (
    <Box className="w-full h-screen flex items-center justify-center absolute top-0 left-0">
      <CircleLoader width={40} />
    </Box>
  )
}

export default BusinessDashboard
