"use client";
import { Box } from "@mui/material";
import React from "react";
import Header from "./header";
import HomeFooter from "./footer";

const  HomeWrapper = ({ children, bg, customersReview }) => {
  return (
    <Box
      sx={{ bgcolor: bg || "custom.bodyGray" }}
      className="flex relative h-auto min-h-screen flex-col"
    >
      <Box
        sx={{ bgcolor: bg || "white" }}
        className="flex-shrink-0 z-50 sticky top-0"
      >
        <Header />
      </Box>
      <Box className="relative  !flex-grow">{children}</Box>

      <br />
      <br />
      <HomeFooter customersReview={customersReview} />
    </Box>
  );
}

export default HomeWrapper;
