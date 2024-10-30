'use client'
import { useStoreData } from '@/app/hooks/useData'
import DashboardOverview from './store/page'
import ServiceDashboard from './services'
import { CircleLoader } from '@/app/components/cards/loader'
import { Box } from '@mui/material'

const BusinessDashboard = () => {
  const {
    storeInfo: { business },
  } = useStoreData()
  return business ? (
    business.businessType === 'services' ? (
      <ServiceDashboard />
    ) : (
      <DashboardOverview />
    )
  ) : (
    <Box className="w-full h-full flex items-center justify-center">
      <CircleLoader width={50} />
    </Box>
  )
}

export default BusinessDashboard
