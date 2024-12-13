'use client'
// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import OtpInput from './component'
import { useUserData } from '@/app/hooks/useData'
import { verifyOtp, resendOtp } from '@/app/redux/state/slices/auth/otp'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const OtpVerification = ({ searchParams, email, account, callback }) => {
  console.log(searchParams, email, account)
  const { userInfo } = useUserData()
  const dispatch = useDispatch()
  const router = useRouter()
  console.log(userInfo)
  const theEmail = email || userInfo.email

  // usestate hooks
  const [openInput, setOpenInput] = useState(false)
  const [countdown, setCountdown] = useState(60) // Initial countdown value in seconds
  const [resendDisabled, setResendDisabled] = useState(false)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  console.log(searchParams)
  const otpValues = inputValues.join('')

  useEffect(() => {
    let intervalId

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else {
      setResendDisabled(false)
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [countdown])

  const buttonFunc = () => {
    verifyOtp({ email, otp: otpValues }, dispatch, callback, router)
    if (!openInput) {
      setOpenInput(true)
    }
  }

  const handleResend = () => {
    resendOtp(
      { email: theEmail, action: { to: 'email-verification', account } },
      dispatch
    )
    setInputValues(['', '', '', '', '', ''])
    setCountdown(60)
    setResendDisabled(true)
  }

  return (
    <Box className="w-full max-w-[380px] md:w-[480px] !mt-10 flex flex-col items-center">
      <OtpInput inputValues={inputValues} setInputValues={setInputValues} />
      <br />
      <br />
      <Typography variant="caption" className="!text-[13px] !text-center">
        This code will expire will no longer be valid after 30 minutes, so
        please enter it promptly. If you did not request this OTP, please ignore
        this message.
      </Typography>

      <Box className="flex justify-center !my-8">
        {resendDisabled ? (
          <Typography className="!text-[13px] !mt-2">
            Resend (
            <b color="custom.pri" className="!font-semibold">
              {countdown} Secs
            </b>
            )
          </Typography>
        ) : (
          <Button
            variant="outlined"
            className="!w-32 !h-8 !rounded-full !text-gray-600 !text-[12px]"
            onClick={handleResend}
            disabled={resendDisabled}
          >
            Resend
          </Button>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={buttonFunc}
        className="w-80 !h-10 !rounded-full !text-gray-100 !text-[14px] !mt-6"
      >
        Verify
      </Button>
    </Box>
  )
}

export default OtpVerification
