"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

import { CustomInput } from "@/app/components/cards/auth/components";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const RegisterAccount = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Box className="w-[380px] md:w-[550px] !mt-8">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="First Name"
            id="firstname"
            inputProps={{
              type: "text",
              placeholder: "Enter your first name",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Last Name"
            error
            id="lastname"
            inputProps={{
              type: "text",
              placeholder: "Enter your last name",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="Email Address"
            id="emailAddress"
            inputProps={{
              type: "email",
              placeholder: "Enter your email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Phone Number"
            id="phone"
            error
            inputProps={{
              type: "number",
              placeholder: "Enter your phone number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State"
            id="state"
            inputProps={{
              type: "text",
              placeholder: "Enter your state",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Password"
            id="password"
            inputProps={{
              type: "password",
              placeholder: ".......",
            }}
          />
          <ul className="list-disc !text-[13px] mb-5 ml-8 mt-2">
            <li className="mb-2">Min of 8 characters</li>
            <li className="mb-2">Must have an Upper Letter</li>
            <li className="mb-2">Must have a unique symbol</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Confirm Password"
            id="confPass"
            error
            inputProps={{
              type: "password",
              placeholder: ".......",
            }}
          />
        </Grid>
      </Grid>

      <Box className="flex items-center !mt-6 md:!mt-1">
        <input type="radio" id="tandc" />
        <label htmlFor="tandc" className="ml-4">
          I agree with the{" "}
          <Link href="/terms" color="custom.pri" className="!font-semibold">
            terms and conditions
          </Link>
        </label>
      </Box>

      <Button
        variant="contained"
        className="w-full !h-10 !rounded-full !text-gray-100 !text-[17px] !mt-3"
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
        <Typography className="!text-[13px] !mt-2">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            color="custom.pri"
            className="!font-semibold"
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterAccount;
