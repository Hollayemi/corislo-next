"use client";
import { Box } from "@mui/material";
import React, { forwardRef, useState } from "react";
import Header from "./header";
import HomeFooter from "./footer";
// import SearchPage from "@/app/(pages)/explore/searchPage";
import { useUserData } from "@/app/hooks/useData";
import UserOverlay from "./Components/userOverlay";
import MapOverlay from "./Map";
import UserSideBar from "./Components/sidebar";

const HomeWrapper = ({
  children,
  bg,
  customersReview,
  noFooter,
  className,
  popup,
}) => {
  const [pinSearch, setPinSearch] = useState(false);
  const { overLay, popMap, shopNow, showOverlay } = useUserData();

  // const page = {
  //   0: children,
  //   1: <SearchPage search={search} setSearch={setSearch} />,
  // };
  // let showing = 0;
  // if ((search || pinSearch, shopNow)) showing = 1;

  return (
    <Box className="flex justify-center bg-black">
      <Box
        sx={{ bgcolor: bg || "custom.bodyGray" }}
        className="flex relative w-full max-w-[1700px] h-auto min-h-screen flex-col !overflow-hidden"
      >
        <Box
          sx={{ bgcolor: bg || "white" }}
          className="flex-shrink-0 header-zindex fixed w-full left-0 top-0"
        >
          <Header />
        </Box>
        <Box className={`relative !flex-grow mt-16`}>
          <Box className={className}>{children}</Box>
          {popMap && <MapOverlay />}
          {overLay && <UserOverlay />}
          <UserSideBar />
         
        </Box>

        {!noFooter && (
          <>
            <br />
            <HomeFooter customersReview={customersReview} />
          </>
        )}
      </Box>
      {popup}
    </Box>
  );
};

export default HomeWrapper;
