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
import AuthLayout from "@/app/components/layouts/AuthLayouts";
import { storeLoginHandler } from "@/app/redux/state/slices/shop/auth/storeLogin";

const StoreLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    store: "",
    password: "",
    username: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <AuthLayout title="Sign in to your store" center>
      <Box className="!mt-16 w-full max-w-[380px]">
        <CustomInput
          title="Store / Business Email Address"
          onChange={handleChange("store")}
          hideCheck={true}
          id="email"
          inputProps={{ type: "text", placeholder: "Enter your email address" }}
        />
        <br />
        <CustomInput
          title="Username"
          onChange={handleChange("username")}
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
          className="w-full !h-10 !rounded-full !text-gray-100 !text-[17px] !mt-6"
          onClick={() => storeLoginHandler(values, router, dispatch)}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
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
            Don’t have an account?{" "}
            <Link
              href="/dashboard/register"
              color="custom.pri"
              className="!font-semibold"
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default StoreLogin;
