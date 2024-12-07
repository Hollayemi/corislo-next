'use client'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { settingsInnerList } from '@/app/data/store/innerList'
import { Box, Button, Typography } from '@mui/material'
import { settingsBreadCrumb } from '../components'
import { TitleSubtitle } from '@/app/(pages)/user/components'
import AllPlans, { opp1, opp2 } from '@/app/components/cards/plans'
import { PlansComponents } from './plans.components'

const Plans = ({ params }) => {
  const path = {
    ...params,
    sidebar: 'settings',
    sublist: 'plans',
  }
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: 'Plans', link: 'billing' }]}
    >
      <Box className="h-ful w-full bg-white px-2 md:px-5 py-8 rounded-md">
        <TitleSubtitle
          title="Plans"
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
