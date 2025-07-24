'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import UploadFiles from './component/step1'
import CompleteReg from './component/step2'
import dynamic from 'next/dynamic'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const ServiceDashboard = () => {
  const dispatch = useDispatch()
  const [section, setSection] = useState(0)

  return (
    <ServiceRenderWrapper
    // popup={
    //   <BasicModal
    //     openModal={openModal}
    //     toggleModal={() => setOpenModal(false)}
    //     content={<Box className="md:w-[400px] h-[500px]"><SetLocation close={() => setOpenModal(false)} /></Box>}
    //   />
    // }
    >
      {section == 0 && <UploadFiles setSection={setSection} />}
      {section == 1 && <CompleteReg setSection={setSection} />}
    </ServiceRenderWrapper>
  )
}
export default ServiceDashboard
