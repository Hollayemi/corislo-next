'use client'
import { Typography, Box } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { customerBreadCrumb } from './components/columns'
import { AllCustomers } from './components/allCustomers'
import OverViewCard from './components/overview'

const CustomerManagement = ({ params }) => {
  const path = { ...params, sidebar: 'customer-management' }
  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...customerBreadCrumb,
        { text: 'Customer listing', link: 'customer-management' },
      ]}
    >
      <Box className="w-full">
        <Box className="">
          <Box className="!pb-5 bg-white rounded-md px-2 md:px-8 pt-6 w-full">
            <OverViewCard />
          </Box>

          <Box className="bg-white rounded-md px-2 md:px-8 pt-1 w-full mt-4">
            <AllCustomers />
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default CustomerManagement
