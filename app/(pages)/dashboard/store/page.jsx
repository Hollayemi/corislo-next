'use client'
import useSWR from 'swr'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Grid, Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { BranchesSales, TopCards, DashboardCrumb } from './components'
import DashboardLineChart from '@/app/components/chart/ChartjsLineChart'
import DashboardBubbleChart from '@/app/components/chart/ChartjsBubbleChart'
import 'chart.js/auto'
import OrderTable from '@/app/components/view/store/tables/OrderTable'
import {
  allOrderColumns,
  ordersColumns,
} from './order-management/components/columns'
import BranchSalesGrowth from '@/app/components/chart/Progress'
import { InfoRounded } from '@mui/icons-material'
import { calculateDateDiff, formatDate } from '@/app/utils/format'
import CategoriesSales from '@/app/components/chart/categorySale'
import { useStoreData } from '@/app/hooks/useData'

const DashboardOverview = ({ params }) => {
  const [interval, selectedInterval] = useState('7 days')
  const { staffInfo } = useStoreData()
  const router = useRouter()
  const {
    data: orderData,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR(`/branch/order-request`)

  const rows = orderData?.data || []
  const actionFunctions = (row, action) => {
    if (action === 'modify') {
      // selectRow(row);
      router.push(`/dashboard/store/order-management/review?order=${row._id}`)
    }

    if (action === 'message') {
      router.push(`/dashboard/store/chat?customer=${row.customerUsername}`)
    }
  }

  const cardsDateFrom = calculateDateDiff('30_days', new Date())

  return (
    <StoreLeftSideBar
      path={params}
      crumb={[
        ...DashboardCrumb,
        {
          text: 'Overview',
          link: '',
          icon: 'home',
        },
      ]}
    >
      <Box className="md:px-2">
        <Box>
          <Box className="md:px-3 flex items-center mb-1">
            <InfoRounded className="!text-gray-400 !mr-2 !text-[15px] cursor-pointer" />
            <Typography
              variant="caption"
              className="!text-[11px] !text-gray-400"
              noWrap
            >
              Month Rolling Interval e.g {cardsDateFrom} - {formatDate()}
            </Typography>
          </Box>
          <TopCards />
        </Box>
        <Box className="mt-4 flwx justify-center">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              {staffInfo.viewAsAdmin ? (
                <BranchSalesGrowth
                  interval={interval}
                  selectedInterval={selectedInterval}
                />
              ) : (
                <CategoriesSales
                  interval={interval}
                  selectedInterval={selectedInterval}
                />
              )}
            </Grid>
            <Grid item xs={12} md={5}>
              <DashboardLineChart interval={interval} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardBubbleChart interval={interval} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {rows.length ? (
        <Box className="bg-white !px-3 py-4 rounded-md my-6">
          <OrderTable columns={allOrderColumns(actionFunctions)} rows={rows} />
        </Box>
      ) : null}
    </StoreLeftSideBar>
  )
}

export default DashboardOverview
