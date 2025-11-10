// ** MUI Imports
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomChip from '@/app/components/chip'
import OptionsMenu from '@/app/components/option-menu'
import CustomOption from '../option-menu/option'
import { Button } from '@mui/material'
import IconifyIcon from '../icon'
import useSWR from 'swr'
import { reshapePrice } from '@/app/(pages)/dashboard/store/marketing/components'
import { calculateDateDiff } from '@/app/utils/format'

const BranchSalesGrowth = ({ interval, selectedInterval }) => {
  const { data, isLoading } = useSWR(
    `/store/branch-sales?interval=monthly&startDate=${calculateDateDiff(
      interval.split(' ').join('_'),
      new Date(),
      '-',
      true
    )}`
  )

  const result = data?.data || {}

  const dayInterval = [
    '3 days',
    '7 days',
    '2 weeks',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
  ]

  const renderData = result.branches?.map((item, index) => (
    <Box
      key={index}
      className="flex items-start justify-between bg-gray-50 rounded p-2.5"
      sx={{ ...(index !== result.branches?.length - 1 && { mb: 2 }) }}
    >
      <Box className="">
        <Typography
          sx={{ fontWeight: 500 }}
          noWrap
          className="!text-[14px] !text-gray-500 !w-60 md:!w-32"
        >
          {item.branch}
        </Typography>
        <Typography className="!text-[12px] !text-gray-500 mt-2">
          {reshapePrice(item.TotalBranchSale)}
        </Typography>
      </Box>
      <Box className="flex flex-col items-end">
        <Typography className="!text-[13px] !text-gray-500 !mr-2 mb-1">
          {item.countItems} items sold
        </Typography>
        <Box className="flex items-center">
          <CustomChip
            size="small"
            skin="light"
            className="!rounded-sm !w-14 ml-2"
            color={item.growth > 5 ? 'success' : 'error'}
            label={
              <div className="flex items-center">
                <IconifyIcon
                  fontSize="0.8rem"
                  className="shrink-0"
                  icon={
                    item.growth > 0
                      ? 'tabler:arrow-narrow-up'
                      : 'tabler:arrow-narrow-down'
                  }
                />
                {parseFloat(item.lastGrowth).toFixed(0)}%
              </div>
            }
          />
        </Box>
      </Box>
      {/* <LinearProgress
        variant="determinate"
        value={item.lastGrowth}
        className="!rounded-md"
        color={"info"}
        aria-controls="lkslk"
        sx={{ height: 8 }}
      /> */}
    </Box>
  ))

  return (
    <Card className="w-full !shadow-none h-full">
      <Box className="!px-2 !flex !items-center !justify-between">
        <Typography className="text-[13px] !font-bold">
          Sales by Stores
        </Typography>

        <CustomOption
          icon={
            <Button
              name="sdfd"
              className="!text-[13px] mt-1"
              endIcon={<IconifyIcon icon="tabler:chevron-down" />}
            >
              {interval}
            </Button>
          }
          options={dayInterval}
          clickFunction={(e) => selectedInterval(e)}
        />
      </Box>
      <CardContent>{renderData}</CardContent>
    </Card>
  )
}

export default BranchSalesGrowth
