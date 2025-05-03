'use client'
// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'

import { CustomInput } from '@/app/components/cards/auth/components'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import validationRegisterSchema from './validation'
import { registerHandler } from '@/app/redux/state/slices/auth/Signup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import AccountTypeSwitch from './components'
import { StoreRegistrationForm } from '../../dashboard/(auth)/register/page'
import RegisterUserAccount from './userAccount'

const Register = ({ searchParams }) => {
  const { ref, p } = searchParams
  const [accountType, onToggle] = useState(false)
  const [stage, setStage] = useState(parseInt(p) || 0)
  return (
    <Box className="mt-5">
      <AccountTypeSwitch onToggle={(accountType) => onToggle(accountType)} />{' '}
      {accountType === 'business' ? (
        <Box className={` w-full md:w-[550px] !my-10 !mt-14 md:!mt-10 px-1`}>
          <StoreRegistrationForm
            stage={stage}
            setStage={setStage}
            page={p}
            referrer={ref}
          />
        </Box>
      ) : (
        <RegisterUserAccount />
      )}
    </Box>
  )
}

export default Register
