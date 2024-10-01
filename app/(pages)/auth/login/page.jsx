"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";

import { CustomInput } from "@/app/components/cards/auth/components";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { loginHandler, oAuth } from "@/app/redux/state/slices/auth/Login";
import { server } from "@/app/redux/state/slices/api/baseApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useUserData } from "@/app/hooks/useData";
import { isMobile, osName, osVersion } from 'react-device-detect'


const LoginV1 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnurl");
  const { setLoading } = useUserData();
  const [values, setValues] = useState({
    password: '',
    email: false,
    meta: {
      device: `${osName} ${osVersion}`,
      location: '...',
      via: 'Website',
      isMobile,
    },
  })

  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   console.log(data);
  //   // Handle the JSON data returned by the server
  // })
  // .catch(error => {
  //   console.error('There was a problem with your fetch operation:', error);
  //   // Handle errors
  // });

  // ** Hook

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = () => {
    if(window) window.location.href = `${server}auth/google`; // Redirect to the backend authentication route
  };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  return (
    <Box className="!mt-10 mb-16 w-full max-w-[380px]">
      <CustomInput
        title="Email Adderess"
        onChange={handleChange('email')}
        hideCheck={true}
        id="email"
        inputProps={{ type: 'text', placeholder: 'Enter your email address' }}
      />
      <br />
      <CustomInput
        title="Password"
        onChange={handleChange('password')}
        id="password"
        hideCheck={true}
        inputProps={{ type: 'password', placeholder: 'Password' }}
      />

      <Button
        variant="contained"
        className="w-full !h-10 !rounded-full !text-gray-100 !text-[17px] !mt-6"
        onClick={() =>
          loginHandler(values, router, dispatch, returnUrl, setLoading)
        }
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        onClick={handleLogin}
        className="w-full !h-10 !rounded-full !text-gray-600 !text-[17px] !mt-6"
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
        <Typography className="!text-[13px] !mt-5">
          Don’t have an account?{' '}
          <Link
            href="/auth/register"
            color="custom.pri"
            className="!font-semibold"
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  )
};

export default LoginV1;
