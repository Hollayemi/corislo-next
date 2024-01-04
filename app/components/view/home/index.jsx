"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./header";
import HomeFooter from "./footer";
import SearchPage from "@/app/(pages)/custom/searchPage";

const HomeWrapper = ({ children, bg, customersReview, noFooter }) => {
  const [search, setSearch] = useState("");
  const page = {
    0: children,
    1: <SearchPage search={search} setSearch={setSearch} />,
  };
  let showing = 0;
  if (search) showing = 1;
  return (
    <Box className="flex justify-center bg-black">
      <Box
        sx={{ bgcolor: bg || "custom.bodyGray" }}
        className="flex relative w-full max-w-[1500px] h-auto min-h-screen flex-col"
      >
        <Box
          sx={{ bgcolor: bg || "white" }}
          className="flex-shrink-0 z-50 sticky top-0"
        >
          <Header search={search} setSearch={setSearch} />
        </Box>
        <Box className="relative !flex-grow">{page[showing]}</Box>

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
