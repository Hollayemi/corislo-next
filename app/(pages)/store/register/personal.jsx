"use client";
import React from "react";
import { CustomInput } from "@/app/components/cards/auth/components";
import { Box, Grid } from "@mui/material";
const PersonalProfile = ({
  handleUserChange,
  errors,
  values,
  confPas,
  setConfPass,
  readyToNext,
}) => {
  return (
    <Box className="">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Full Name"
            id="fullname"
            error={
              readyToNext ? errors.fullname : values.fullname && errors.fullname
            }
            name="fullname"
            onChange={handleUserChange("fullname")}
            inputProps={{
              value: values.fullname || "",
              type: "text",
              placeholder: "Enter your full name",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Username"
            error={
              readyToNext ? errors.username : values.username && errors.username
            }
            onChange={handleUserChange("username")}
            id="username"
            name="username"
            inputProps={{
              value: values.username || "",
              type: "text",
              placeholder: "Enter your username",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="Email Address"
            error={readyToNext ? errors.email : values.email && errors.email}
            onChange={handleUserChange("email")}
            id="email"
            name="email"
            inputProps={{
              value: values.email || "",
              type: "email",
              placeholder: "Enter your email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Phone Number"
            onChange={handleUserChange("phoneNumber")}
            id="phoneNumber"
            name="phoneNumber"
            error={
              readyToNext
                ? errors.phoneNumber
                : values.phoneNumber && errors.phoneNumber
            }
            inputProps={{
              value: values.phoneNumber || "",
              type: "number",
              placeholder: "Enter your phone number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State"
            id="state"
            name="state"
            onChange={handleUserChange("state")}
            inputProps={{
              type: "text",
              placeholder: "Enter your state",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Password"
            onChange={handleUserChange("password")}
            error={
              readyToNext ? errors.password : values.password && errors.password
            }
            id="password"
            name="password"
            inputProps={{
              value: values.password || "",
              type: "password",
              placeholder: ".......",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Confirm Password"
            id="confPass"
            error={values.password !== confPas ? "Password not match" : false}
            name="confPass"
            onChange={(e) => setConfPass(e.target.value)}
            inputProps={{
              value: confPas || "",
              type: "password",
              placeholder: ".......",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalProfile;
