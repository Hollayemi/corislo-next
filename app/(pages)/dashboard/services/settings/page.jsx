'use client'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
import dynamic from 'next/dynamic'
import ServiceAccount from './account'

const DefaultSettingLanding = () => {
  return (
    <ServiceRenderWrapper>
      <ServiceAccount />
    </ServiceRenderWrapper>
  )
}

export default DefaultSettingLanding
