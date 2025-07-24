import AllPlans from '@/app/components/cards/plans'
import { createStoreHandler } from '@/app/redux/state/slices/shop/addShop'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { SetLocation } from '@/app/(pages)/dashboard/services/setup/component'

const MapSelection = ({ setStage, userValues, storeValues }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <Box className="w-full flex flex-col justify-center items-center">
      <Box className="w-full md:w-[600px] h-[400px]">
        <SetLocation close={() => {}} />
      </Box>
      <br />
      <Box className="w-80  mb- md:pb-0 flex justify-center mt-6 px-4">
        <Button
          variant="contained"
          className="w-full !h-10 !rounded-md !text-gray-100 !text-[17px] !mt-3 !shadow-none"
          onClick={() => router.push('/dashboard')}
        >
          Finish Setup
        </Button>
      </Box>
    </Box>
  )
}

export default MapSelection
