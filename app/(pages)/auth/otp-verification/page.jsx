"use client";
// ** React Imports
import { useEffect, useState } from "react";

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
import OtpInput from "./component";

const OtpVerification = () => {
  const [openInput, setOpenInput] = useState(false);

  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [resendDisabled, setResendDisabled] = useState(false);

  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

  const buttonFunc = () => {
    if (!openInput) {
      setOpenInput(true);
    }
  };

  const handleResend = () => {
    // Handle OTP resend logic here
    // You can initiate the OTP resend process
    // and then reset the countdown timer
    setCountdown(60);
    setResendDisabled(true);
  };

  return (
    <Box className="w-[380px] md:w-[480px] !mt-10 flex flex-col items-center">
      <OtpInput />
      <br />
      <br />
      <Typography variant="caption" className="!text-[13px] !text-center">
        This code will expire will no longer be valid after 10 minutes, so
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
  );
};

export default OtpVerification;
