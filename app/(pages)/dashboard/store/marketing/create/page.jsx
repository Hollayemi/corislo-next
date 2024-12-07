'use client'
import { useState } from 'react'
import { Typography, Box } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { marketingBreadCrumb, CampaignTab } from '../components'
import DiscountWizard from '../pages/discount'
import AnnouncementWizard from '../pages/announcement'
import Banner from '../pages/banner'
import DatePickerWrapper from '@/app/styles/react-datepicker'

const MarketingPage = ({ params }) => {
  const [screen, setScreen] = useState('campaign')
  const path = { ...params, sidebar: 'marketing' }
  const pages = {
    campaign: (
      <DatePickerWrapper>
        <DiscountWizard />
      </DatePickerWrapper>
    ),
    anouncement: (
      <DatePickerWrapper>
        <AnnouncementWizard />
      </DatePickerWrapper>
    ),
    banner: (
      <DatePickerWrapper>
        <Banner />
      </DatePickerWrapper>
    ),
  }
  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...marketingBreadCrumb,
        {
          text: 'Create',
          link: 'marketing/create',
          icon: 'shop',
        },
      ]}
    >
      <Box className="px-2">
        <Box className="w-full bg-white flex items-center md:justify-center mb-2 py-2 border-x-4 border-white rounded-xl !overflow-x-auto ">
          <CampaignTab
            title="Campaign"
            caption="Special Offers"
            screen={screen}
            setScreen={setScreen}
          />
          <CampaignTab
            title="Anouncement"
            caption="Brand Awareness"
            screen={screen}
            setScreen={setScreen}
            disabled
          />
          <CampaignTab
            title="Banner"
            caption="Promote via flyer"
            screen={screen}
            setScreen={setScreen}
            disabled
          />
          <CampaignTab
            title="Radius Reach"
            caption="Increase Visibility"
            screen={screen}
            setScreen={setScreen}
            disabled
          />
        </Box>
        <Box className="w-full md:p-6 bg-white rounded-xl">{pages[screen]}</Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default MarketingPage
