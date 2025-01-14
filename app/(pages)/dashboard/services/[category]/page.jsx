// import ServiceRenderWrapper from '@/app/components/view/services/header'
'use client'
import AppCalendar from '@/app/components/calendar'
import { CircleLoader } from '@/app/components/cards/loader'
import { mySubstring } from '@/app/utils/format'
import { Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import useSWR from 'swr'
import { reshapePrice } from '../../store/store-analytics/components'
import { useState } from 'react'
import { BasicModal } from '@/app/components/cards/popup'
import AddEventComponent from '@/app/components/calendar/AddEvent'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
const Service = ({ params, searchParams }) => {
  const [addEventOpen, setAddEventOpen] = useState(false)
  const { category: cateId } = params
  const { sub = 0 } = searchParams
  const { data, error } = useSWR(
    `/spb/services/subcategories?category=${cateId}`
  )
  const { subcategories = [], category = {} } = data?.data || {}
  const path = { ...params, sidebar: '/' }
  const content = subcategories?.map((each, i) => ({
    name: each._id,
    path: `/${cateId}?sub=${i}`,
    on: i === parseInt(sub),
  }))
  const innerList = {
    title: `${category?.label} ${category?.iconImage}`,
    content: content,
  }
  console.log(subcategories)
  const selectedSub =
    (subcategories[sub] && subcategories[sub].services[0]) || {}

  const handleAddEventToggle = () => setAddEventOpen(!addEventOpen)

  return (
    <ServiceRenderWrapper
      path={path}
      InnerList={innerList}
      popup={
        <BasicModal
          openModal={addEventOpen}
          toggleModal={() => {
            setAddEventOpen(false)
          }}
          content={<AddEventComponent close={() => setAddEventOpen(false)} />}
        />
      }
    >
      <Box className="h-80 rounded-md bg-white mb-3 p-5">
        <Typography
          variant="body2"
          className="!text-[18px] md:!w-full !font-bold !text-left"
        >
          {selectedSub?.subcategory}
        </Typography>
        <Box className="flex items-start mt-5">
          <Box className="w-2/6">
            <Image
              src="/images/more/service2.png"
              alt="serv1"
              width={500}
              height={500}
              className="w-56 h-52 rounded-md"
            />
          </Box>
          <Box className="w-4/6">
            <Box className="flex justify-evenly flex-wrap">
              <TitleValue
                title="Service Name:"
                value={selectedSub.service_name}
              />
              <TitleValue
                title="Collection:"
                value={selectedSub?.collectionName}
              />
              <TitleValue title="Category:" value={category.label} />
              <TitleValue
                title="Duration:"
                value={`${selectedSub.hours} Hours ${selectedSub.minutes} Minutes`}
              />
              <TitleValue
                title="Expectation:"
                value={selectedSub.total_in_a_day}
              />
              <TitleValue
                title="Charge:"
                value={`${reshapePrice(selectedSub.priceFrom)} - ${reshapePrice(
                  selectedSub.priceTo
                )}`}
              />
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </Box>
      <Box className="bg-white rounded-md">
        <Typography
          variant="body2"
          className="!text-[18px] md:!w-full !font-bold !text-left !p-4"
        >
          Bookings
        </Typography>
        <Box className="">
          <AppCalendar
            handleAddEventToggle={handleAddEventToggle}
            addEventOpen={addEventOpen}
          />
        </Box>
      </Box>
    </ServiceRenderWrapper>
  )
}

export default Service

const TitleValue = ({ title, value }) => (
  <Box className="w-fit md:w-1/2 flex items-center mb-2">
    <Box className="md:w-32">
      <Typography
        variant="body2"
        noWrap
        className="!text-[15px] !text-gray-500 !leading-5"
      >
        {title}
      </Typography>
    </Box>
    <Box>
      <Typography
        variant="body2"
        noWrap
        className="!text-black !text-[16px] w-full !leading-5 !ml-2 md:!ml-0 !mr-5 md:!mr-0 "
      >
        {value ? mySubstring(value, 25) : <CircleLoader />}
      </Typography>
    </Box>
  </Box>
)
