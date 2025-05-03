'use client'
import HomeWrapper from '@/app/components/view/home'
import { Box, Tab, Typography } from '@mui/material'
import Image from 'next/image'
import useSWR from 'swr'
import { LongServiceListing } from '../components'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import Policies, { Policy2 } from './policies'
import Review from '../../[store]/review'

const ServiceProviderDisplay = ({ params, searchParams }) => {
  const { data, isLoading } = useSWR(`/services?provider=${params.provider}`)
  const services = data?.data || []
  const [value, setTabValue] = useState('1')

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }
  const provider = services[0]?.provider || {}
  return (
    <HomeWrapper>
      <Box className="md:px-20">
        <Box className="!bg-white  px-4 md:px-12 py-4 md:py-8">
          <Box className="flex justify-center">
            <Box className="flex items-center p-2">
              <Box className="flex flex-col items-center mb-5">
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-800 !font-bold !text-[12px] md:!text-[15px]"
                >
                  {provider.businessName}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-500 !text-[11px]"
                >
                  {provider.city}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            variant="body2"
            className="!font-bold font-sans !text-[20px] md:!text-4xl lg:!text-center !text-black !text-pretty !w-full"
          >
            Innovation Meets Expertise In Our Range Of Service
          </Typography>
        </Box>
        <Box className="w-full h-28 md:h-56">
          <Image
            src="/images/misc/service-render.jpg"
            alt="service-render"
            width={1800}
            height={1800}
            className=" w-full h-full object-cover object-left-top"
          />
        </Box>

        <Box className="!bg-white px-2 md:px-4 py-6 ">
          <Typography
            variant="body2"
            className="!font-bold font-sans !text-[20px] !w-full"
          >
            Our Services And Works
          </Typography>

          <Box className="mt-6 border-b">
            {services.map((each, i) => (
              <LongServiceListing {...each} key={i} />
            ))}
          </Box>
          <Box className="w-full bg-white !rounded-md py-5 px-3 mt-5">
            <TabContext value={value}>
              <TabList
                orientation="horizontal"
                onChange={handleChangeTab}
                className="flex-shrink-0 border-b"
                aria-label="Product Page"
              >
                <Tab
                  value="1"
                  label={
                    <Typography
                      variant="body2"
                      className="!text-xs md:!w-44 !font-bold !text-left"
                    >
                      Terms and conditions
                    </Typography>
                  }
                />
                <Tab
                  value="2"
                  label={
                    <Typography
                      variant="body2"
                      className="!text-xs md:!w-44 !font-bold !text-left"
                    >
                      Customer Reviews
                    </Typography>
                  }
                />
                <Tab
                  value="3"
                  label={
                    <Typography
                      variant="body2"
                      className="!text-xs md:!w-44 !font-bold !text-left"
                    >
                      Specifications
                    </Typography>
                  }
                />
              </TabList>
              <TabPanel value="1" className="!px-3">
                {services && (
                  <Policies
                    store={params.provider}
                    branch={services[0]?.branch}
                    services={services.map((x) => x.subcategory)}
                  />
                )}
              </TabPanel>
              <TabPanel value="2">
                <Review
                  store={params.provider}
                  branch={services[0]?.branch}
                  searchParams={searchParams}
                />
              </TabPanel>
              <TabPanel value="3" className="!px-0">
                {/* <Specifications otherVariations={otherVariations} /> */}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default ServiceProviderDisplay
