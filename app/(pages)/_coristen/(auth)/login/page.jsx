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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import SuperAdminAuth from "@/app/components/layouts/superAdminAuth";
import { superLoginHandler } from "@/app/redux/state/slices/super/login";

const StoreLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SuperAdminAuth title="Sign in to dashboard" center>
      <Box className="!mt-4 w-full max-w-[480px] md:p-10 md:shadow-md rounded-md md:border md:border-blue-800">
        <CustomInput
          title="Email or Username"
          onChange={handleChange("email")}
          hideCheck={true}
          id="username"
          inputProps={{ type: "text", placeholder: "Enter your username" }}
        />
        <br />
        <CustomInput
          title="Password"
          onChange={handleChange("password")}
          hideCheck={true}
          id="password"
          inputProps={{ type: "password", placeholder: "Password" }}
        />

        <Button
          variant="contained"
          className="w-full !h-12 !rounded-md !bg-[#fcb415] !text-gray-100 !text-[17px] !mt-6"
          onClick={() => superLoginHandler(values, router, dispatch)}
        >
          Sign In
        </Button>

        <Box className="flex justify-center">
          <Typography className="!text-[13px] !text-gray-100 !mt-5">
            Forgot password?{" "}
            <Link
              href="/store/register"
              color="custom.sec"
              className="!font-semibold"
            >
              Reset password
            </Link>
          </Typography>
        </Box>
      </Box>
    </SuperAdminAuth>
  );
};

export default StoreLogin;
