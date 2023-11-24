"use client";
import React, { useState } from "react";
import { CustomInput } from "@/app/components/cards/auth/components";
import { Box, Grid } from "@mui/material";
const BusinessProfile = ({ handleStoreChange, errors, values }) => {

  return (
    <Box className="">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Bussname Name"
            onChange={handleStoreChange("businessName")}
            error={values.businessName && errors.businessName}
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
            title="Store"
            onChange={handleStoreChange("store")}
            error={values.store && errors.store}
            id="store"
            // hideCheck
            inputProps={{
              type: "text",
              placeholder: "Set your store a name",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Bussname Type"
            onChange={handleStoreChange("businessType")}
            error={values.businessType && errors.businessType}
            hideCheck
            id="busstype"
            inputProps={{
              type: "select",
              values: [
                {
                  value: "private company",
                  display: "Limited Liability Company",
                },
                {
                  value: "Cooperate Company",
                  display: "Cooperate Company",
                },
              ],
              placeholder: "Enter your business type",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Business registration Number"
            onChange={handleStoreChange("businessRegNum")}
            error={values.businessRegNum && errors.businessRegNum}
            id="bussRegNumber"
            hideCheck
            inputProps={{
              type: "number",
              placeholder: "Enter your registration number",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Business email address"
            onChange={handleStoreChange("businessEmail")}
            error={values.businessEmail && errors.businessEmail}
            id="emailAddress"
            hideCheck
            inputProps={{
              type: "email",
              placeholder: "email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Businesss Address"
            onChange={handleStoreChange("address")}
            error={values.address && errors.addressame}
            id="buzzAddress"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "Business location",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="city"
            onChange={handleStoreChange("city")}
            error={values.city && errors.cityllname}
            id="city"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "City",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State/ Region"
            onChange={handleStoreChange("state")}
            error={values.state && errors.statelname}
            id="state"
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "State/Region",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="About"
            onChange={handleStoreChange("about_store")}
            error={values.about_store && errors.about_store}
            id="state"
            multiline
            hideCheck
            inputProps={{
              type: "text",
              placeholder: "About your business",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessProfile;
