import { Box } from "@mui/material";
import React from "react";
import Header from "./header";
import HomeFooter from "./footer";

function HomeWrapper({ children, bg }) {
  return (
    <Box
      sx={{ bgcolor: bg || "custom.bodyGray" }}
      className="flex relative h-auto min-h-screen flex-col"
    >
      <Box
        sx={{ bgcolor: bg || "custom.bodyGray" }}
        className="flex-shrink-0 z-50 sticky top-0"
      >
        <Header />
      </Box>
      <Box className="relative !flex-grow">{children}</Box>

      <HomeFooter />
    </Box>
  );
}

export default HomeWrapper;
