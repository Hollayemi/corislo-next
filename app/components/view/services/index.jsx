"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./header";

const ServiceDashboardWrapper = ({ children, bg, hideHeader, popup }) => {
  return (
    <Box className="flex justify-center bg-black">
      <Box
        sx={{ bgcolor: bg || "custom.bodyGray" }}
        className="flex relative w-full max-w-[1700px] h-auto min-h-screen flex-col !overflow-hidden"
      >
        {!hideHeader && (
          <Box
            sx={{ bgcolor: bg || "white" }}
            className="flex-shrink-0 header-zindex fixed w-full left-0 top-0"
          >
            {/* <Header
              search={search}
              setSearch={setSearch}
              setPinSearch={setPinSearch}
            /> */}
          </Box>
        )}
        {children}
      </Box>
      {popup}
    </Box>
  );
};

export default ServiceDashboardWrapper;
