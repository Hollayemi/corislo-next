'use client'
import { useState, useEffect, forwardRef } from 'react'
import { Box, Button } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import OptionsMenu from '@/app/components/option-menu'
import {
  marketingBreadCrumb,
  LineChartStatistic,
  RightBreadCrumbChildren,
  GrowthCard,
  reshapePrice,
} from './components'
import { columns } from './data'
import { DataGrid } from '@mui/x-data-grid'
import Icon from '@/app/components/icon'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from '@/app/styles/react-datepicker'
import {
  calculateDateDiff,
  dateNumericOption,
  formatDate,
  generateDateRange,
  mySubstring,
} from '@/app/utils/format'
import useSWR from 'swr'
import Image from 'next/image'
import { FileDownloadOutlined } from '@mui/icons-material'

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? formatDate(props.start) : null
  const endDate = props.end !== null ? ` - ${formatDate(props.end)}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`

  return (
    <Box className="flex items-center !w-fit">
      <input
        // inputref={ref}
        {...props}
        value={value}
        size="small"
        placeholder="Enter date range"
        className="!w-48 outline-none !text-[12px] md:!text-[13px] !font-bold !text-gray-800"
      />
      <Icon icon="tabler:chevron-down" className="!text-[17px] -ml-4" />
    </Box>
  )
})

const MarketingPage = ({ params }) => {
  const [interval, setInterval] = useState('Daily')
  const [searchQuery, setSearchQuery] = useState('')
  const [filtered, setFiltered] = useState()
  const [status, setStatus] = useState('')

  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: 'Action Confirmation',
    alert: `Are you sure you want to ${status?.toLowerCase()?.split('-')[0]
      } the campaign status to?`,
    acceptFunctionText: 'Yes, Continue',
    acceptFunction: () => { },
  })

  useEffect(() => {
    {
      updateDialogInfo((prev) => {
        return {
          ...prev,
          open: Boolean(status),
          alert: `Are you sure you want to ${status?.toLowerCase()?.split('-')[0]
            } the campaign status?`,
        }
      })
    }
  }, [status])

  const path = { ...params, sidebar: 'marketing' }

  const { data, isLoading } = useSWR(`/branch/campaign`)
  const all = data?.data || []

  const defaultInterval = {
    Daily: '30_days',
    Weekly: '9_weeks',
    Monthly: '5_months',
    Yearly: '4_years',
  }

  const handleFilter = (input) => {
    setSearchQuery(input)
    if (all.length) {
      let lowerInput = input.toLowerCase()
      const searchFilterFunction = (campaign) =>
        campaign.title.toLowerCase().includes(lowerInput) ||
        campaign.campaignType.toLowerCase().includes(lowerInput) ||
        campaign.discount.toString().includes(lowerInput)
      const filteredArray = all.filter(searchFilterFunction)
      setFiltered(filteredArray)
    }
  }

  const [intervals, setDate] = useState({
    startDate: calculateDateDiff(
      defaultInterval[interval],
      new Date(),
      '-',
      true
    ),
    endDate: new Date(),
  })

  useEffect(
    () =>
      setDate((prev) => {
        return {
          ...prev,
          startDate: calculateDateDiff(
            defaultInterval[interval],
            new Date(),
            '-',
            true
          ),
        }
      }),
    [interval]
  )
  const daee = new Date()
  console.log(daee, new Date().toLocaleString(), new Date(daee))

  const query = {
    startdate: formatDate(intervals.startDate, dateNumericOption),
    enddate: formatDate(intervals.endDate, dateNumericOption),
  }

  console.log(query)

  const queryString = new URLSearchParams(query).toString()
  const { data: statData, isLoading: statLoading } = useSWR(
    `/branch/campaign/stats?${queryString}&interval=${interval.toLowerCase()}`
  )
  const series = statData?.data || {}

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates
      setDate((prev) => {
        return { ...prev, startDate: start, endDate: end }
      })
    }
  }
  return (
    <StoreLeftSideBar
      path={path}
      crumb={[
        ...marketingBreadCrumb,
        {
          text: 'Overview',
          link: 'marketing',
          icon: 'shop',
        },
      ]}
      breadCrumbRIghtChildren={<RightBreadCrumbChildren />}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
    >
      <DatePickerWrapper>
        <Box className="pl-1 md:!px-2">
          <Box className="!w-full bg-white p-2 md:p-4 rounded-xl">
            <Box className="flex justify-between md:justify-start items-center md:-mb-6">
              <Box className="!w-60">
                <DatePicker
                  selectsRange
                  startDate={intervals.startDate || ''}
                  endDate={intervals.endDate || ''}
                  selected={new Date()}
                  maxDate={new Date()}
                  id="date-range-picker"
                  onChange={handleDateChange}
                  shouldCloseOnSelect={false}
                  customInput={
                    <CustomInput
                      label="Duration"
                      start={intervals.startDate}
                      end={intervals.endDate}
                    />
                  }
                />
              </Box>
              <OptionsMenu
                icon={
                  <Button
                    variant="text"
                    className="!text-[13px]  !text-gray-800 !font-bold !bg-white !ml-2"
                    disableRipple
                    endIcon={
                      <Icon
                        icon="tabler:chevron-down"
                        className="!text-[17px]"
                      />
                    }
                  >
                    {interval}
                  </Button>
                }
                options={['Daily', 'Weekly', 'Monthly']}
                setOption={setInterval}
                iconButtonProps={{
                  size: 'small',
                  sx: { color: 'text.disabled', cursor: 'pointer' },
                }}
              />
            </Box>
            <LineChartStatistic
              flashsales={Object.values(series?.flashsales || {})}
              discounts={Object.values(series?.discounts || {})}
              label={generateDateRange(
                intervals.startDate,
                intervals.endDate,
                interval
              )}
            />
            <Box className="flex justify-around flex-wrap items-center w-full mt-8">
              <GrowthCard
                title="Total Redemptions"
                growth="+92"
                count={series.totalRedemption}
              />
              <GrowthCard
                title="New Redemptions"
                growth="+40"
                count={series.newRedemptions}
                middle
              />
              <GrowthCard
                title="Redemption Amount"
                growth="+30"
                count={reshapePrice(series?.redemptionAmount)}
              />
              <GrowthCard
                title="Next to expire"
                toExpire={mySubstring(series.nearEndDate?.title, 20)}
                count={
                  series?.nearEndDate?.date &&
                  formatDate(series?.nearEndDate?.date)
                }
              />
            </Box>
            <Box className="mt-10 relative">
              <Image
                src={`/images/misc/search.png`}
                alt="image"
                width={700}
                height={700}
                className="w-4 absolute top-6 left-6"
              />
              <input
                className="w-full border-y h-16 py-4 p-14 !text-[18px] outline-none"
                placeholder="Search by name or discount or code..."
                value={searchQuery}
                onChange={(e) => handleFilter(e.target.value)}
              />
              <Button
                endIcon={<FileDownloadOutlined />}
                className="!w-10 md:!w-40 !absolute !top-4 !right-6"
              >
                <span className="hidden md:block">Export-</span>CSV
              </Button>
            </Box>
            <Box className="h-fit max-h-[660px]">
              <DataGrid
                columns={columns(setStatus)}
                rows={filtered ? filtered : all}
                checkboxSelection
                className="!border-none !h-auto !min-h-[300px]"
              />
            </Box>
          </Box>
        </Box>
      </DatePickerWrapper>
    </StoreLeftSideBar>
  )
}

export default MarketingPage
