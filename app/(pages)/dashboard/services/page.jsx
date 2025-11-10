// import ServiceRenderWrapper from '@/app/components/view/services/header'
'use client'
import { Box, Button, Tab, Typography } from '@mui/material'
import { EachService, Service } from './components'
import dynamic from 'next/dynamic'
import IconifyIcon from '@/app/components/icon'
import { useStoreData } from '@/app/hooks/useData'
import { IconImage } from '@/app/components/view/home/header'
import { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import NewService from './new/page'
import { BasicModal } from '@/app/components/cards/popup'
import useSWR from 'swr'
import Link from 'next/link'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)

const Services = ({ params }) => {
  const { data } = useSWR('/spb/services/grouped')
  const [search, setSearch] = useState('')
  const [toEdit, setEdit] = useState('')
  const [value, setTabValue] = useState('1')
  const [open, setOpen] = useState(false)
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }
  const path = { ...params, sidebar: '/' }
  const grouped = data?.data || []
  console.log(grouped)
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: 'Action Confirmation',
    acceptFunctionText: 'Yes, Delete',
    acceptButtonClass: ' !bg-red-500',
    acceptFunction: () => { },
  })

  useEffect(() => {
    {
      updateDialogInfo((prev) => {
        return {
          ...prev,
          open: open === 'delete',
          alert: `Are you sure you want to delete this service, if deleted, it cannot be reverted`,
        }
      })
    }
  }, [open])

  return (
    <ServiceRenderWrapper
      path={path}
      popup={
        <BasicModal
          openModal={open === 'service'}
          toggleModal={() => {
            setOpen(false)
          }}
          content={
            <NewService
              close={() => {
                setOpen(false)
                setEdit(false)
              }}
              toEdit={toEdit}
            />
          }
        />
      }
      closeDialog={() => setOpen(false)}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      rightOpenWidth="5000px"
    >
      <Box>
        <Typography
          variant="body2"
          className="hidden md:block !text-black !font-bold !text-[13px] md:!text-[20px]"
        >
          Services
        </Typography>

        <Box className="flex items-center justify-between mt-4">
          <Box className="relative md:mr-4 w-full md:w-80 !px-2 md:!px-0">
            <input
              type="text"
              placeholder="Search for name"
              value={search}
              className="w-full pr-8 md:pr-12 text-[13px] pl-3 md:pl-5 h-10 md:h-10 border-none rounded-md transition-all outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconImage
              image="search"
              className="w-3 md:w-5 absolute top-3 -mt-0.5 right-2 mr-3 cursor-pointer"
            />
          </Box>
          <Box>
            <Box className="flex items-center">
              <Box className="w-8 h-8 flex items-center justify-center bg-white rounded-md !mx-1">
                <IconifyIcon icon="tabler:history" />
              </Box>
              <Button
                className="!h-8 !shadow-none !rounded-md !text-[12px] !text-white !mx-1"
                startIcon={<IconifyIcon icon="tabler:list" />}
                variant="contained"
                onClick={() => setOpen('service')}
              >
                New Service
              </Button>
              <Button
                className="!h-8 !shadow-none !rounded-md !text-[12px] !text-white !mx-1"
                startIcon={<IconifyIcon icon="tabler:folder-plus" />}
                variant="contained"
              >
                Add Service
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="bg-white p-5 rounded-xl mt-5">
          <TabContext value={value}>
            <TabList
              orientation="horizontal"
              onChange={handleChangeTab}
              className="flex-shrink-0 border-b"
              aria-label="Product Page"
            >
              <Tab
                value="1"
                className={`w-fit ${value === '1' ? '!text-blue-700' : '!text-black'
                  }`}
                disableRipple
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-full !font-bold !text-left"
                  >
                    Services
                  </Typography>
                }
              />
              <Tab
                value="2"
                className={`w-fit ${value === '2' ? '!text-blue-700' : '!text-black'
                  }`}
                disableRipple
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-full !font-bold !text-left"
                  >
                    Categories
                  </Typography>
                }
              />
            </TabList>
            <TabPanel value="1" className="!px-3">
              {grouped.map((res, i) => (
                <Box key={i}>
                  <Link
                    href={`/dashboard/services/${res.services[0].category}`}
                  >
                    <Typography
                      variant="body2"
                      className="!text-[18px] md:!w-full !font-bold !text-left my-5"
                    >
                      {res._id}
                    </Typography>
                  </Link>
                  <Box>
                    {res.services.map((service, i) => (
                      <Service
                        key={i}
                        data={service}
                        edit={() => {
                          setOpen('service')
                          setEdit(service)
                        }}
                        del={() => {
                          setOpen('delete')
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </TabPanel>
            <TabPanel value="2" className="!px-3 h-fit"></TabPanel>
          </TabContext>
        </Box>
      </Box>
    </ServiceRenderWrapper>
  )
}
export default Services

const BreadcrumbRightEle = () => {
  const { showOverlay } = useStoreData()
  return (
    <Box className="flex items-center -mr-6 md:mr-0">
      <Button
        variant="contained"
        className="!mr-4 !bg-blue-900 !shadow-none !text-[12px] !rounded-full"
        startIcon={<IconifyIcon icon="tabler:plus" />}
        onClick={() => showOverlay('newService')}
      >
        <span className="hidden md:block mr-2">Create New </span> Service
      </Button>
    </Box>
  )
}
