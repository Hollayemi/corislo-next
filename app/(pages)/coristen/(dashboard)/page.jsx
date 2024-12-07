"use client";
import { OrderBoxes } from "@/app/components/cards/homeCards";
import SuperLeftBar from "@/app/components/view/super/SuperLeftBar";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";

const SuperDashboard = ({ params }) => {
  const { data } = useSWR("/super/dashboard-cards");
  const cards = data ? data.data : {}
  console.log(data);
  return (
    <SuperLeftBar path={{ ...params }}>
      <Box>
        <Box
          className="w-full h-48 md:px-10 flex items-center justify-between rounded-2xl p-5 py-7"
          bgcolor="custom.pri"
        >
          <Box className="w-7/12">
            <Typography
              variant="body1"
              className="!font-black !text-white !text-[15px] sm:!text-xl md:!text-3xl"
            >
              Fetch Order for Pickers
            </Typography>
            <Typography
              variant="body1"
              className="!text-[11px] md:!text-[12px]  !text-gray-300 !leading-4"
            >
              Access a comprehensive overview of orders, including picker's
              details, dates, and status.
            </Typography>
            <br />
            <Button
              className="!shadow-none w-36 md:!mt-4 !px-0 !bg-white !text-blue-900 !rounded-md"
              variant="contained"
              onClick={() => {}}
            >
              Check By Picker
            </Button>
          </Box>
          <Image
            src="/images/misc/store-picker.png"
            className=" -ml-12 md:ml-0 -mt-8"
            width={400}
            height={400}
            alt="Image"
          />
        </Box>
        <br />
        <Box className="flex items-center flex-wrap">
          <OrderBoxes
            image="/images/misc/all-orders.png"
            title="Users"
            value={cards.user?.sum || 0}
            color="#D65C48"
          />
          <OrderBoxes
            image="/images/misc/cancel-orders.png"
            title="Agents"
            value={cards.agent?.sum || 0}
            color="#9736BE"
          />
          <OrderBoxes
            image="/images/misc/ongoing-orders.png"
            title="Businesses"
            value={cards.business?.sum || 0}
            color="#2FA794"
          />
          <OrderBoxes
            image="/images/misc/completed-orders.png"
            title="Orders"
            value={cards.order?.sum || 0}
            color="#3B47AF"
          />
          <OrderBoxes
            image="/images/misc/ongoing-orders.png"
            title="Views"
            value={cards.views?.sum || 0}
            color="#2FA794"
          />
          <OrderBoxes
            image="/images/misc/completed-orders.png"
            title="Cart"
            value={cards.cartAndSaved?.sum || 0}
            color="#3B47AF"
          />
        </Box>
      </Box>
    </SuperLeftBar>
  );
};

export default SuperDashboard;
