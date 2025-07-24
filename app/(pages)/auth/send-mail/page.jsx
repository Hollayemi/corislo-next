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
import { Button, Typography } from "@mui/material";
import Image from "next/image";

const SendMail = () => {
  return (
    <Box className=" w-full max-w-[380px] !mt-4 flex flex-col items-center">
      <Image
        src="/images/misc/verify-email.png"
        alt="verify"
        width={600}
        height={600}
        className="w-60 h-[220px]"
      />

      <Typography variant="caption" className="!text-[13px] !text-center">
        Welcome to Corisio! To complete your registration and secure your
        account, please enter the following OTP that was sent to your mail
        sam*****@gmail.com in the input provided in the next page
      </Typography>

      <Button
        variant="contained"
        className="w-80 !h-10 !rounded-full !text-gray-100 !text-[14px] !mt-6"
      >
        Verify Email Address
      </Button>
    </Box>
  );
};

export default SendMail;
