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
import { useRouter } from "next/navigation";

const VerifyAccount = () => {
  const router = useRouter()
  return (
    <Box className="w-[380px] md:w-[480px] !mt-4 flex flex-col items-center">
      <Image
        src="/images/misc/verify-cup.png"
        alt="verify"
        width={600}
        height={600}
        className="w-60 h-[220px]"
      />

      <Typography variant="caption" className="!text-[13px] !text-center">
        Congratulations! Your Corisio account has been successfully created.
        You're now part of our growing community of buyers and sellers. Start
        exploring the platform, discover great products, and connect with local
        businesses.
      </Typography>

      <Button
        variant="contained"
        className="w-80 !h-10 !rounded-full !text-gray-100 !text-[14px] !mt-6"
        onClick={() => router.push("/auth/login")}
      >
        Log In
      </Button>
    </Box>
  );
};

export default VerifyAccount;
