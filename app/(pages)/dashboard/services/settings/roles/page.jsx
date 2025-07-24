'use client'
import RolesComponent from '@/app/(pages)/dashboard/store/settings/role'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import dynamic from 'next/dynamic'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const ServiceRole = () => {
  return (
    <ServiceRenderWrapper>
      <RolesComponent />
    </ServiceRenderWrapper>
  )
}

export default ServiceRole
