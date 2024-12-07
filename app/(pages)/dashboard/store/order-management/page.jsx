'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import OrderTable from './components/orderTable'
import { useRouter, useSearchParams } from 'next/navigation'

const OrderManagement = ({ params }) => {
  const [rightOpen, setRightOpen] = useState(false)
  const { data, error, isLoading } = useSWR('/branch/order-request')
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderId = searchParams.get('order')

  const path = { ...params, sidebar: 'order-management' }

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      rightOpen={rightOpen}
      setRightOpen={setRightOpen}
    >
      <Box className="-mt-4 md:px-3 py-3 rounded-md">
        <OrderTable
          selectRow={data}
          isLoading={isLoading}
          setRightOpen={setRightOpen}
        />
      </Box>
    </StoreLeftSideBar>
  )
}

export default OrderManagement
