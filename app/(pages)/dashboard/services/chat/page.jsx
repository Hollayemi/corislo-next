'use client'
import BusinessChat from '@/app/(pages)/dashboard/store/chat'
import ServiceRenderWrapper from '@/app/components/view/services/header'
const { Box } = require('@mui/material')

const ServiceChat = () => {
  return (
    <ServiceRenderWrapper>
      <BusinessChat />
    </ServiceRenderWrapper>
  )
}

export default ServiceChat
