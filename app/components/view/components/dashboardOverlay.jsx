'use client'
import { useStoreData } from '@/app/hooks/useData'
import Notification from './notification'
import AppSearch from './searchFilter'
import { useDispatch } from 'react-redux'

const {
  default: CreateCategory,
} = require('@/app/(pages)/dashboard/store/product-management/pops')
const {
  default: NewService,
} = require('@/app/(pages)/dashboard/services/new/page')
const { Box } = require('@mui/material')

const DashboardOverlay = () => {
  const { overLay, showOverlay } = useStoreData()

  const pages = {
    notification: <Notification showOverlay={showOverlay} />,
    newCollection: <CreateCategory showOverlay={showOverlay} />,
    newService: <NewService />,
    appSearch: <AppSearch showOverlay={showOverlay} />,
  }
  const setView = () => {}
  return (
    <Box className="w-full h-screen fixed z-50 top-0 left-0 overflow-hidden">
      <Box
        className="w-full h-full absolute bg-black opacity-75 top-0 left-0"
        onClick={showOverlay}
      ></Box>
      {pages[overLay]}
    </Box>
  )
}

export default DashboardOverlay
