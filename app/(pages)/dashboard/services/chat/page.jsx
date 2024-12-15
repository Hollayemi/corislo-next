'use client'
import BusinessChat from '@/app/(pages)/dashboard/store/chat'
import dynamic from 'next/dynamic'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
const { Box } = require('@mui/material')
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const ServiceChat = ({ params }) => {
  const path = { ...params, sidebar: '/chat' }
  return (
    <ServiceRenderWrapper path={path}>
      <BusinessChat />
    </ServiceRenderWrapper>
  )
}

export default ServiceChat
