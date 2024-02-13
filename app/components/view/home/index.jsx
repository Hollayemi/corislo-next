"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "./header";
import HomeFooter from "./footer";
import SearchPage from "@/app/(pages)/custom/searchPage";
import { Cancel, CancelOutlined } from "@mui/icons-material";
import { useUserData } from "@/app/hooks/useData";
import { OrderNotif } from "./Components/notication";
import { NotifData } from "@/app/data/home/notification";

const HomeWrapper = ({
  children,
  bg,
  customersReview,
  noFooter,
  className,
}) => {
  const [search, setSearch] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const { setOverflow, notifications } = useUserData();
  const page = {
    0: children,
    1: <SearchPage search={search} setSearch={setSearch} />,
  };
  let showing = 0;
  if (search) showing = 1;

  const showNotif = () => {
    if (openNotif) {
      setOverflow(false);
      setOpenNotif(false);
    } else {
      setOverflow(true);
      setOpenNotif(true);
    }
  };

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
            showNotif={showNotif}
            setOpenNotif={setOpenNotif}
            openNotif={openNotif}
          />
        </Box>
        <Box className={`relative !flex-grow mt-16`}>
          <Box className={className}>{page[showing]}</Box>
          {openNotif && (
            <Box className="w-full h-screen fixed z-50 top-0 left-0 overflow-hidden">
              <Box
                className="w-full h-full absolute bg-black opacity-75 top-0 left-0"
                onClick={showNotif}
              ></Box>
              <Box className="flex w-full px-1 justify-end">
                <Box className="w-full md:w-[420px] h-[600px] md:h-[500px] mt-20 relative bg-white rounded-xl md:mr-10 flex flex-col">
                  <Box className="flex justify-between items-center px-4 h-14 border-b !w-full flex-shrink-0">
                    <Typography variant="body2" className="!font-bold">
                      Notification
                    </Typography>
                    <Box onClick={showNotif}>
                      <CancelOutlined />
                    </Box>
                  </Box>
                  <Box className="flex-grow-1 h-auto h-[400px] max-h-[450px] w-full !overflow-auto overflowStyle">
                    {notifications.map((data, i) => (
                      <OrderNotif key={i} data={data} />
                    ))}
                    {/* <OrderNotif />
                    <OrderNotif /> */}
                  </Box>
                  <Box className="h-14 flex items-center justify-center !text-[12px] w-full text-center ">
                    See all notifications
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
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
