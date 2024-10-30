'use client'
import SecuritySettings from '@/app/(pages)/dashboard/store/settings/pages/securitySettings'
import StaffSettings from '@/app/(pages)/dashboard/store/settings/pages/accountingSettings'
import Activities from '@/app/(pages)/dashboard/store/settings/pages/activities'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
const { Box, Tab, Typography } = require('@mui/material')

const ServiceAccount = () => {
  const [value, setTabValue] = useState('0')
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const tabs = ['Account Settings', 'Password Management', 'Activities']
  const tabContents = {
    0: StaffSettings,
    1: SecuritySettings,
    2: Activities,
  }

  return (
    <Box className="h-ful w-full bg-white">
      <TabContext value={value}>
        <TabList
          orientation="horizontal"
          variant="scrollable"
          onChange={handleChangeTab}
          className="flex-shrink-0 border-b overflow-x-auto"
          aria-label="Product Page"
        >
          {tabs.map((each, i) => (
            <Tab
              value={i.toString()}
              key={i}
              disableRipple
              label={
                <Typography
                  variant="body2"
                  className="!text-xs md:!w-full !font-bold !text-left"
                >
                  {each}
                </Typography>
              }
            />
          ))}
        </TabList>
        {tabs.map((each, i) => {
          const Content = tabContents[i.toString()]
          return (
            <TabPanel value={i.toString()} key={i} className="!py-4 !px-0">
              <Box className="bg-white w-full px-3 py-5 md:p-8 !rounded-xl">
                <Content />
              </Box>
            </TabPanel>
          )
        })}
      </TabContext>
    </Box>
  )
}

export default ServiceAccount
