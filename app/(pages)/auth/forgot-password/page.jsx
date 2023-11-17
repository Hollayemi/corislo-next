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

const ForgotPassword = () => {
  const [openInput, setOpenInput] = useState(false);
  const [email, setEmail] = useState('');

  const buttonFunc = () => {
    if(!openInput){
      setOpenInput(true)
    }
  }

  return (
    <Box className="w-full max-w-[380px] md:w-[480px] !mt-16 flex flex-col items-center">
      {!openInput && (
        <Typography variant="caption" className="!text-[13px] !text-center">
          If you've forgotten your Corisio password, don't worry; we've got you
          covered. To reset your password and regain access to your account,
          Click the button below
        </Typography>
      )}

      {openInput && (
        <CustomInput
          title="Email Address"
          id="phone"
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            type: "email",
            value: email,
            placeholder: "Enter the email address assoiciated to your account",
          }}
        />
      )}

      <Button
        variant="contained"
        onClick={buttonFunc}
        className="w-80 !h-10 !rounded-full !text-gray-100 !text-[14px] !mt-6"
      >
        Reser your password
      </Button>
    </Box>
  );
};

export default ForgotPassword;
