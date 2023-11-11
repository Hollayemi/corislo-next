"use client";
import React from "react";
import { CustomInput } from "@/app/components/cards/auth/components";
import { Box, Grid } from "@mui/material";
const PersonalProfile = () => {
  return (
    <Box className="">
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
    </Box>
  );
};

export default PersonalProfile;
