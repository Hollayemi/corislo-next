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

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState("");

  const buttonFunc = () => {
    
  };

  return (
    <Box className="w-[380px] md:w-[480px] !mt-16 flex flex-col items-center">
      <CustomInput
        title="New Password"
        id="pass"
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{
          type: "password",
          value: password,
          placeholder: "Enter your new password",
        }}
      />
      <br />
      <CustomInput
        title="Confirm New Password"
        id="confPass"
        onChange={(e) => setConfPass(e.target.value)}
        inputProps={{
          type: "password",
          value: confPass,
          placeholder: "Enter your new password again to confirm",
        }}
      />

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

export default ResetPassword;
