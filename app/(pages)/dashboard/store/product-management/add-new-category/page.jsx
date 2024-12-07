'use client'
import { useState } from 'react'
import { prodInnerList } from '@/app/data/store/innerList'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
// import CreateCollection from './collection'
const CreateCollection = dynamic(() => import('./collection'), { ssr: false })
// import CreateSubCollection from './subCollection'
const CreateSubCollection = dynamic(() => import('./subCollection'), {
  ssr: false,
})
import { Box, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const AddNewCategory = ({ params }) => {
  const [selectedSizes, setSelectedSizes] = useState([])
  const [value, setValue] = useState('0')

  const path = {
    ...params,
    sidebar: 'product-management',
    sublist: 'add-new-category',
  }

  return (
    <StoreLeftSideBar path={path} subListBar={true} InnerList={prodInnerList}>
      <Box className="bg-white rounded-md px-3 md:px-5 pt-3 pb-8 w-full grow">
        <TabContext value={value} className="w-full md:w-5/6">
          <TabList
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            className="border-b "
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="simple tabs example"
          >
            <Tab
              value={'0'}
              disableRipple
              label={
                <Typography
                  variant="body2"
                  className="!text-xs md:!w-full !font-bold !text-center"
                >
                  Create Category
                </Typography>
              }
              className="!text-[11px] !w-40 !px-0"
            />
            <Tab
              value={'1'}
              disableRipple
              label={
                <Typography
                  variant="body2"
                  className="!text-xs md:!w-full !font-bold !text-center"
                >
                  Create Sub-Category
                </Typography>
              }
              className="!text-[11px] !w-40 !px-0"
            />
          </TabList>

          <TabPanel value="0" className="!px-px">
            <Box
              className={`w-full !pb-1 !rounded-md`}
              bgcolor="custom.bodyLight"
            >
              <CreateCollection />
            </Box>
          </TabPanel>
          <TabPanel value="1" className="!px-px">
            <Box
              className={`w-full !pb-1 !rounded-md`}
              bgcolor="custom.bodyLight"
            >
              <CreateSubCollection />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </StoreLeftSideBar>
  )
}

export default AddNewCategory
