'use client'
import { forwardRef, useEffect, useState } from 'react'
import { Typography, Box, Button } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import Icon from '@/app/components/icon'
import OptionsMenu from '@/app/components/option-menu'
import {
  analyticsBreadCrumb,
  TotalSaleGrowth,
  GeneatedLeadChart,
  CategoriesGrowth,
  StoreGrowth,
  GrowthCard,
} from './components'
import DatePickerWrapper from '@/app/styles/react-datepicker'
import {
  calculateDateDiff,
  dateNumericOption,
  formatDate,
  generateDateRange,
} from '@/app/utils/format'
import DatePicker from 'react-datepicker'
import { useStoreData } from '@/app/hooks/useData'

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? formatDate(props.start) : null
  const endDate = props.end !== null ? ` - ${formatDate(props.end)}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`

  return (
    <Box className="flex items-center !w-fit  bg-white leading-8 h-8 px-3 rounded-md border">
      <Box
        {...props}
        className=" w-full  !text-[12px] md:!text-[13px] !font-bold !text-gray-800"
      >
        {value}
      </Box>
      <Icon icon="tabler:chevron-down" className="!text-[17px] ml-2" />
    </Box>
  )
})

const StoreAnalysisPage = ({ params }) => {
  const path = { ...params, sidebar: 'store-analytics' }
  const { staffInfo } = useStoreData()
  const defaultInterval = {
    Daily: '10_days',
    Weekly: '5_weeks',
    Monthly: '5_months',
    Yearly: '4_years',
  }
  // states
  const [interval, setInterval] = useState('Monthly')
  const [dates, setDate] = useState({
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

  const label = generateDateRange(dates.startDate, dates.endDate, interval)

  const query = {
    startDate: formatDate(dates.startDate, dateNumericOption),
    endDate: formatDate(dates.endDate, dateNumericOption),
  }

  const queryString = new URLSearchParams(query).toString()

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
      subListBar={false}
      crumb={[...analyticsBreadCrumb]}
    >
      <Box className="relative px-2">
        <Box className="flex items-center justify-end -mt-8 md:-mt-10 mb-3 sticky top-[60px] z-50">
          <Box className="w-fit mr-2">
            <DatePickerWrapper>
              <DatePicker
                selectsRange
                startDate={dates.startDate || ''}
                endDate={dates.endDate || ''}
                selected={new Date()}
                maxDate={new Date()}
                id="date-range-picker"
                onChange={handleDateChange}
                shouldCloseOnSelect={false}
                customInput={
                  <CustomInput
                    label="Duration"
                    start={dates.startDate}
                    end={dates.endDate}
                  />
                }
              />
            </DatePickerWrapper>
          </Box>
          <OptionsMenu
            icon={
              <Button
                variant="outlined"
                className="!text-xs !border-gray-200 !rounded-md !h-8 !text-gray-800 !bg-white"
                endIcon={
                  <Icon
                    icon="tabler:arrows-exchange"
                    className="!text-[17px] rotate-90"
                  />
                }
              >
                {interval}
              </Button>
            }
            options={Object.keys(defaultInterval)}
            setOption={setInterval}
            iconButtonProps={{
              size: 'small',
              sx: { color: 'text.disabled', cursor: 'pointer' },
            }}
          />
        </Box>
        <Box className="md:h-52 flex flex-col md:flex-row">
          <Box className="mb-4 md:mb-10 w-full md:w-7/12 h-full md:pr-2">
            <Box className="h-52 w-full md:h-full flex flex-col md:flex-row bg-white rounded-xl shadow">
              <TotalSaleGrowth
                queryString={`${queryString}&interval=${interval.toLowerCase()}`}
                interval={interval}
                label={label}
              />
            </Box>
          </Box>
          <Box className="mb-10 w-full md:w-5/12 h-full md:pl-2">
            {/* <Box className="w-full h-full bg-white rounded-xl shadow p-3">
              <GeneatedLeadChart />
            </Box> */}
            <Box className=" w-full h-52 flex bg-white rounded-xl shadow ">
              <GrowthCard
                title="Total Sale Count"
                type="sales"
                interval={interval}
              />
              <GrowthCard
                title="Total Product"
                type="product"
                interval={interval}
              />
            </Box>
          </Box>
        </Box>

        {/* Store Sales Growth */}
        {staffInfo.viewAsAdmin && (
          <Box>
            <Box className="mt-6 flex items-center relative">
              <Typography
                variant="body2"
                className="!text-black !text[14px] !font-bold"
              >
                Branches Sales
              </Typography>
              <OptionsMenu
                icon={
                  <Button
                    variant="outlined"
                    className="!text-xs !border-gray-200 !rounded-full !text-gray-400 !bg-white !ml-3"
                    endIcon={
                      <Icon
                        icon="tabler:arrows-exchange"
                        className="!text-[17px] rotate-90"
                      />
                    }
                  >
                    {interval}
                  </Button>
                }
                options={Object.keys(defaultInterval)}
                setOption={setInterval}
                iconButtonProps={{
                  size: 'small',
                  sx: { color: 'text.disabled', cursor: 'pointer' },
                }}
              />
            </Box>

            <Box className="mt-2  flex-wrap w-full flex bg-white rounded-xl">
              <StoreGrowth
                queryString={`${queryString}&interval=${interval.toLowerCase()}`}
                interval={interval}
                label={label}
              />
            </Box>
          </Box>
        )}
        {/* Categories Sales Growth */}
        <Box>
          <Box className="mt-6 flex items-center relative">
            <Typography
              variant="body2"
              className="!text-black !text[14px] !font-bold"
            >
              Categories Sales
            </Typography>
            <OptionsMenu
              icon={
                <Button
                  variant="outlined"
                  className="!text-xs !border-gray-200 !rounded-full !text-gray-400 !bg-white !ml-3"
                  endIcon={
                    <Icon
                      icon="tabler:arrows-exchange"
                      className="!text-[17px] rotate-90"
                    />
                  }
                >
                  {interval}
                </Button>
              }
              options={Object.keys(defaultInterval)}
              setOption={setInterval}
              iconButtonProps={{
                size: 'small',
                sx: { color: 'text.disabled', cursor: 'pointer' },
              }}
            />
          </Box>

          <Box className="mt-2 h-auto min-h-[200px] flex-wrap w-full flex bg-white rounded-xl">
            <CategoriesGrowth
              queryString={`${queryString}&interval=${interval.toLowerCase()}`}
              interval={interval}
              label={label}
            />
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default StoreAnalysisPage
