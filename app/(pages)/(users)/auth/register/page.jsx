'use client'
// ** React Imports
import { use, useState } from 'react'

// ** Next Import

// ** MUI Components
import Box from '@mui/material/Box'

import AccountTypeSwitch from './components'
import { StoreRegistrationForm } from '../../../dashboard/(auth)/register/page'
import RegisterUserAccount from './userAccount'

const Register = ({ searchParams:searchParam }) => {
   const searchParams = use(searchParam)
  const { ref, p } = searchParams
  const [accountType, onToggle] = useState(false)
  const [stage, setStage] = useState(parseInt(p) || 0)
  return (
    <Box className="mt-5">
      <AccountTypeSwitch onToggle={(accountType) => onToggle(accountType)} />{' '}
      {accountType === 'business' ? (
        <Box className={` w-full md:w-[550px] !my-10 !mt-14 md:!mt-10 !px-1`}>
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
