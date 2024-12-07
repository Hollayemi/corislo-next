'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { CircleLoader } from '@/app/components/cards/loader'
import { useRouter, useSearchParams } from 'next/navigation'
import { oAuthHandler } from '@/app/redux/state/slices/auth/Login'
import useSWR from 'swr'

const RefreshToken = () => {
  const searchParams = useSearchParams()
  const [redirected, setRedirected] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  // const { data, isLoading } = useSWR(`/auth/refresh-token?token=${searchParams.get("refresh")}`);
  useEffect(() => {
    // if (data && data?.user?.accessToken && !redirected) {
    //   const { accessToken } = data.user;
    //   localStorage.setItem("user_token", accessToken);
    //   router.push(`/`);
    //   setRedirected(true);
    // }
    oAuthHandler({ token: searchParams.get('refresh') }, router, dispatch)
  }, [router, dispatch, searchParams])

  return (
    <Box className="flex flex-col justify-center items-center h-[350px] w-full">
      <CircleLoader width={40} />
      <Typography variant="body2" className="!mt-2">
        Almost done
      </Typography>
    </Box>
  )
}
export default RefreshToken
