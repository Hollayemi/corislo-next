'use client'
import RolesComponent from '@/app/(pages)/dashboard/store/settings/role'
import ServiceRenderWrapper from '@/app/components/view/services/header'

const ServiceRole = () => {
  return (
    <ServiceRenderWrapper>
      <RolesComponent />
    </ServiceRenderWrapper>
  )
}

export default ServiceRole
