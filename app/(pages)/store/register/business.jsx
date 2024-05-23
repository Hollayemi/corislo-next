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
            hideCheck={!values.businessName}
            id="bussname"
            inputProps={{
              value: values?.businessName || "",
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
            hideCheck={!values.store}
            id="store"
            inputProps={{
              value: values?.store || "",
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
            hideCheck={!values.businessType}
            id="busstype"
            inputProps={{
              value: values?.businessType || "",
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
            hideCheck={!values.businessRegNum}
            id="bussRegNumber"
            inputProps={{
              value: values?.businessRegNum || "",
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
            hideCheck={!values.businessEmail}
            id="emailAddress"
            inputProps={{
              value: values?.businessEmail || "",
              type: "email",
              placeholder: "email address",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Businesss Address"
            onChange={handleStoreChange("address")}
            error={values.address && errors.address}
            hideCheck={!values.address}
            id="buzzAddress"
            inputProps={{
              value: values?.address || "",
              type: "text",
              placeholder: "Business location",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="city"
            onChange={handleStoreChange("city")}
            error={values.city && errors.city}
            hideCheck={!values.city}
            id="city"
            inputProps={{
              value: values?.city || "",
              type: "text",
              placeholder: "City",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State/ Region"
            onChange={handleStoreChange("state")}
            error={values.state && errors.state}
            hideCheck={!values.state}
            id="state"
            inputProps={{
              value: values?.state || "",
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
            hideCheck={!values.about_store}
            id="state"
            multiline
            inputProps={{
              value: values?.about_store || "",
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
