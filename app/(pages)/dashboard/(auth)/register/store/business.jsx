"use client";
import React, { useState } from "react";
import { CustomInput } from "@/app/components/cards/auth/components";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createStoreHandler } from "@/app/redux/state/slices/shop/addShop";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const BusinessProfile = ({ handleStoreChange, errors, values, userValues, setStage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box className="px-2">
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
        {/* <Grid item xs={12} md={6}>
          <CustomInput
            title="Bussname Rendering Type"
            onChange={handleStoreChange("businessType")}
            error={values.businessType && errors.businessType}
            hideCheck={!values.businessType}
            id="busstype"
            inputProps={{
              value: values?.businessType || "",
              type: "select",
              values: [
                {
                  value: "goods",
                  display: "Goods only",
                },
                {
                  value: "goods/services",
                  display: "Goods & Services",
                },
                {
                  value: "services",
                  display: "Services only",
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
        </Grid> */}
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
      <Box className="w-full  !pb-20 md:pb-0 pt-8">
        <Button
          variant="contained"
          className="w-full !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !shadow-none"
          onClick={() =>
            createStoreHandler(
              { user: userValues, store: values },
              dispatch,
              router,
              setStage
            )
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessProfile;
