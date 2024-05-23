"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";

import { CustomInput } from "@/app/components/cards/auth/components";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import validationRegisterSchema from "./validation";
import { registerHandler } from "@/app/redux/state/slices/auth/Signup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const RegisterAccount = () => {
  // hooks
  const router = useRouter()
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    state: "",
    phoneNumber: "",
  });

  const [confPass, setConfPass] = useState("")

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    state: "",
    phoneNumber: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    validationRegisterSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((validationErrors) => {
        const newErrors = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);
      });
  }, [values]);


  return (
    <Box className="w-[360px] md:w-[550px] !my-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Full Name"
            id="fullname"
            hideCheck={!values.fullname}
            error={values.fullname && errors.fullname}
            name="fullname"
            onChange={handleChange("fullname")}
            inputProps={{
              type: "text",
              value: values.fullname,
              placeholder: "Enter your full name",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Username"
            error={values.username && errors.username}
            onChange={handleChange("username")}
            id="username"
            hideCheck={!values.username}
            name="username"
            inputProps={{
              type: "text",
              value: values.username,
              placeholder: "Enter your username",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="Email Address"
            error={values.email && errors.email}
            hideCheck={!values.email}
            onChange={handleChange("email")}
            id="email"
            name="email"
            inputProps={{
              type: "email",
              value: values.email,
              placeholder: "Enter your email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Phone Number"
            onChange={handleChange("phoneNumber")}
            id="phoneNumber"
            hideCheck={!values.phoneNumber}
            name="phoneNumber"
            error={values.phoneNumber && errors.phoneNumber}
            inputProps={{
              type: "number",
              value: values.phoneNumber,
              placeholder: "Enter your phone number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State"
            id="state"
            name="state"
            hideCheck={!values.state}
            onChange={handleChange("state")}
            inputProps={{
              type: "text",
              value: values.state,
              placeholder: "Enter your state",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Password"
            onChange={handleChange("password")}
            error={values.password && errors.password}
            hideCheck={!values.password}
            id="password"
            name="password"
            inputProps={{
              type: "password",
              value: values.password,
              placeholder: ".......",
            }}
          />
          {/* <ul className="list-disc !text-[13px] mb-5 ml-8 mt-2">
            <li className="mb-2">Min of 8 characters</li>
            <li className="mb-2">Must have an Upper Letter</li>
            <li className="mb-2">Must have a unique symbol</li>
          </ul> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Confirm Password"
            id="confPass"
            error={values.password !== confPass}
            name="confPass"
            hideCheck={!confPass}
            onChange={(e) => setConfPass(e.target.value)}
            inputProps={{
              type: "password",
              placeholder: ".......",
            }}
          />
        </Grid>
      </Grid>

      <Box className="flex items-center !mt-6">
        <input type="radio" id="tandc" name="tandc" />
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
        onClick={() => registerHandler(values, router, dispatch)}
      >
        Sign Up
      </Button>
      <Button
        variant="outlined"
        className="w-full !h-10 !rounded-full !text-gray-600 !text-[17px] !mt-5"
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
        <Typography className="!text-[13px] !mt-2 !mb-10">
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
