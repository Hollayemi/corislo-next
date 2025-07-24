'use client'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import ServiceAccount from '.'
import dynamic from 'next/dynamic'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const ServiceChat = () => {

  return (
    <ServiceRenderWrapper>
      <ServiceAccount />
    </ServiceRenderWrapper>
  )
}

export default ServiceChat
