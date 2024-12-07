'use client'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { Box } from '@mui/material'
import { pricingBreadCrumb } from './pricing.components'
import { TitleSubtitle } from '@/app/(pages)/user/components'
import AllPlans from '@/app/components/cards/plans'

const Plans = ({ params }) => {
  const path = {
    ...params,
    sidebar: 'pricing',
  }
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      crumb={[...pricingBreadCrumb, { text: 'Pricing', link: 'pricing' }]}
    >
      <Box className="h-ful w-full bg-white px-2 md:px-5 py-8 rounded-md">
        <TitleSubtitle
          title="Pricing"
          titleClass="!text-[17px]"
          subtitle="View and upgrade plans for your Corisio Store"
          subtitleClass="!text-[13px] !mt-2"
          className=""
        />

        <Box className="w-full py-6 px-4 border border-slate-50 rounded-xl mt-3">
          <AllPlans />
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default Plans
