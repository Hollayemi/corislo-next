'use client'
import { Box } from '@mui/material'
import React, { useState } from 'react'
// import SearchPage from "@/app/(pages)/explore/searchPage";
import { useUserData } from '@/app/hooks/useData'
import UserServiceHeader from './header'
import UserServiceFooter from './footer'

const UserServiceWrapper = ({
  children,
  bg,
  customersReview,
  noFooter,
  className,
  popup,
}) => {
  const [pinSearch, setPinSearch] = useState(false)
  const { overLay, popMap, shopNow, showOverlay } = useUserData()

  return (
    <Box className="flex justify-center bg-black">
      <Box
        sx={{ bgcolor: bg || 'custom.bodyGray' }}
        className="flex relative w-full max-w-[1700px] h-auto min-h-screen flex-col"
      >
        <Box
          sx={{ bgcolor: bg || 'white' }}
          className="flex-shrink-0 header-zindex fixed w-full left-0 top-0"
        >
          <UserServiceHeader />
        </Box>
        <Box className={`relative !flex-grow mt-32`}>
          <Box className={className}>{children}</Box>
        </Box>
        {!noFooter && (
          <>
            <br />
            <UserServiceFooter customersReview={customersReview} />
          </>
        )}
      </Box>
      {popup}
    </Box>
  )
}

export default UserServiceWrapper
