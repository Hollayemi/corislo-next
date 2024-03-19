"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./header";
import HomeFooter from "./footer";
import SearchPage from "@/app/(pages)/custom/searchPage";
import { useUserData } from "@/app/hooks/useData";
import UserOverlay from "./Components/userOverlay";
import MapOverlay from "./Map"


const HomeWrapper = ({
  children,
  bg,
  customersReview,
  noFooter,
  className,
}) => {
  const [search, setSearch] = useState("");
  const [pinSearch, setPinSearch] = useState(false);
  const { overLay, popMap } = useUserData();
  const page = {
    0: children,
    1: <SearchPage search={search} setSearch={setSearch} />,
  };
  let showing = 0;
  if (search || pinSearch) showing = 1;


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
          <Header
            search={search}
            setSearch={setSearch}
            setPinSearch={setPinSearch}
          />
        </Box>
        <Box className={`relative !flex-grow mt-16`}>
          <Box className={className}>{page[showing]}</Box>
          {popMap && <MapOverlay />}
          {overLay && <UserOverlay />}
          {/* {openNotif && (
            <Box className="w-full h-screen fixed z-50 top-0 left-0 overflow-hidden">
              <Box className="flex w-full px-1 justify-end">
                
              </Box>
            </Box>
          )} */}
        </Box>

        {!noFooter && (
          <>
            <br />
            <HomeFooter customersReview={customersReview} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomeWrapper;
