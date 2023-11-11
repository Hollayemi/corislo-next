"use client";
import React from 'react'
import { CustomInput } from "@/app/components/cards/auth/components";
import { Box, Grid } from "@mui/material";
const BusinessProfile = () => {
  return (
    <Box className="">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Bussname Name"
            id="bussname"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "Enter your business name",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Bussname Type"
            hideCheck
            id="busstype"
            inputProps={{
              type: "text",
              placeholder: "Enter your business type",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Business registration Number"
            id="emailAddress"
            hideCheck
            inputProps={{
              type: "email",
              placeholder: "Enter your email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Businesss Address"
            id="buzzAddress"
            hideCheck
            inputProps={{
              type: "password",
              placeholder: ".......",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="city"
            id="city"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "Enter your phone number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State/ Region"
            id="state"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "Enter your state",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="State/ Region"
            id="state"
            multiline
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "Enter your state",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BusinessProfile