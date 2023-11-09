'use client';
// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

import { CustomInput } from '@/app/components/cards/auth/components';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

const LoginV1 = () => {

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Box className=" w-[380px] !mt-16">
      <CustomInput
        title="First Name"
        id="firstname"
        inputProps={{ type: "text", placeholder: "Enter your email address" }}
      />
      <br />
      <CustomInput
        title="First Name"
        id="password"
        inputProps={{ type: "password", placeholder: "Password" }}
      />

      <Button
        variant="contained"
        className="w-full !h-10 !rounded-full !text-gray-100 !text-[17px] !mt-6"
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        className="w-full !h-10 !rounded-full !text-gray-600 !text-[17px] !mt-3"
      >
        <Image
          src="/images/logos/logos/google.png"
          alt="google"
          width={50}
          height={50}
          className="mr-5 w-5"
        />
        Continue with Google
      </Button>

      <Box className="flex justify-center">
        <Typography className='!text-[13px] !mt-2'>
          Don’t have an account? <Link href="/auth/register" color='custom.pri' className='!font-semibold'>Register</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginV1
