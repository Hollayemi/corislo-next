"use client";
import IconifyIcon from "@/app/components/icon";
import { CartProductView } from "@/app/components/templates/productView";
import HomeWrapper from "@/app/components/view/home";
import { moreProducts } from "@/app/data/home/homepage";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import TimelineLeft, { OrderStages } from "../timeline";

const OrderDetails = ({ params }) => {
  console.log(params);
   const TitleValue = ({ title, value }) => (
     <Box className="flex items-center">
       <Typography variant="body2" className="!text-xs">
         {title} <span className="ml-2 !text-black">{value}</span>
       </Typography>
     </Box>
   );
  const emojis = ["Bad", "Poor", "Average", "Good", "Best"]
  return (
    <HomeWrapper>
      <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box className="">
              <Box className="bg-white rounded-md py-5 px-4 flex items-start justify-between">
                <Box>
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[20px]"
                  >
                    Completed Order
                  </Typography>
                  <Typography
                    variant="caption"
                    className="!text-black !text-[12px]"
                  >
                    as of today 12 November 2023.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  className="!rounded-full !text-[14px] !w-32 !shadow-none !mt-1"
                >
                  Return Order
                </Button>
              </Box>
              <Box className="bg-white w-full rounded-md py-5 px-2 md:px-4 mt-5">
                <Typography
                  variant="caption"
                  className="!text-black !text-[13px]"
                >
                  How was your experience with the seller?
                </Typography>
                <Box className="flex items-center mt-3">
                  {emojis.map((tag, i) => (
                    <EmojiRating name={tag} key={i} />
                  ))}
                </Box>

                <Box className="block md:flex md:items-start mt-4">
                  <textarea
                    placeholder="Write about your experience in this section"
                    className="w-full md:w-9/12 h-32 rounded bg-gray-100 px-5 py-3 resize-none outline-none border-blue-800 focus:border"
                  ></textarea>
                  <Button
                    variant="contained"
                    className="!rounded-full !text-[14px] !w-32 !shadow-none md:!mx-4"
                  >
                    Send
                  </Button>
                </Box>
              </Box>
              <Box className="bg-white w-full rounded-md py-5 px-2 md:px-4 mt-5">
                <Typography variant="body2" className="!font-bold !text-[14px]">
                  Product Details
                </Typography>
                <Box className="flex justify-between items-center mt-3 !mb-5">
                  <TitleValue title="Order date:" value="Aug 10, 2023" />
                  <TitleValue title="Order ID:" value="63728283747483829" />
                </Box>
                {moreProducts.map(
                  (each, i) =>
                    i < 4 && (
                      <Box key={i}>
                        <CartProductView
                          hideQtyFunc
                          hideCheckbox
                          prodName={each.prodName}
                          image={`/images/more/${i + 1}.png`}
                          prodPrice={each.prodPrice}
                        />
                      </Box>
                    )
                )}
                <Box className="w-full border-2 border-dashed border-gray-200 mt-7"></Box>
                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography variant="body2" className="!text-[12px]">
                    Sub total
                  </Typography>
                  <Typography variant="body2" className="!text-[12px]">
                    NGN54,200
                  </Typography>
                </Box>
                <Box className="w-full flex justify-between items-center !mt-2">
                  <Typography variant="body2" className="!text-[12px]">
                    Discount
                  </Typography>
                  <Typography
                    variant="body2"
                    className="!text-[12px] !text-red-500"
                  >
                    -NGN16,260
                  </Typography>
                </Box>

                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography
                    variant="body2"
                    className="!text-[13px] !font-bold"
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body2"
                    className="!text-[13px] !font-bold"
                  >
                    NGN37,940
                  </Typography>
                </Box>
              </Box>
              <Box className="bg-white rounded-md px-4 py-10 md:p-14 mt-6">
                <Typography variant="body2" className="!font-bold !text-[16px]">
                  Tracking Details
                </Typography>
                <Box>
                  <OrderStages
                    date={new Date()}
                    at={3}
                    status="completed"
                    price={500000}
                  />
                </Box>
                <br />
                <br />
                <TimelineLeft />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Box className="bg-white rounded-md py-5 px-4">
                <Typography
                  variant="body2"
                  className="!font-bold !text-[16px] !mb-5"
                >
                  Customer Delivery Details
                </Typography>
                <TitleWithValueUnder
                  title="Customer Name"
                  value="Creative Box"
                />
                <TitleWithValueUnder
                  title="Customer Phone Number"
                  value="+234 (901) 234 5678"
                />
                <TitleWithValueUnder
                  title="Delivery Address"
                  value="54, Adelubido crescent, opposite chicken republic (Ondo State, Nigeria)"
                />
              </Box>
              <Box className="bg-white rounded-md py-5 px-4 mt-4">
                <Typography
                  variant="body2"
                  className="!font-bold !text-[16px] !mb-5"
                >
                  Store Support (Sender)
                </Typography>
                <TitleWithValueUnder title="Store Name" value="Gourmet Store" />
                <TitleWithValueUnder
                  title="Store Phone Number"
                  value="+234 (901) 234 5678"
                />
                <TitleWithValueUnder
                  title="Delivery Address"
                  value="54, Adelubido crescent, opposite chicken republic (Ondo State, Nigeria)"
                />
                <TitleWithValueUnder
                  title="Store Support Email Address"
                  value="support@gourmet.shop"
                  link="mailto:support@gourmet.shop"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default OrderDetails;

const TitleWithValueUnder = ({ title, value, link }) => {
    return (
      <Box className="mb-5">
        <Typography
          variant="body2"
          className="!font-bold !text-black  !text-[11x]"
        >
          {title}
        </Typography>
        {!link ? (
          <Typography variant="caption" className="!text-[14px]">
            {value}
          </Typography>
        ) : (
          <Link href={link}>
            <Typography variant="caption" className="!text-[14px] !text-blue-700 underline">
              {value}
            </Typography>
          </Link>
        )}
      </Box>
    );
}

const EmojiRating = ({ name }) => {
    return (
      <Box className="flex flex-col items-center justify-center mx-2">
        <Image src={`/images/misc/emoji/${name.toLowerCase()}.png`} alt="emoji" width={100} height={100} className="w-10 h-10 !mb-2" />
        <Typography
          variant="caption"
          color="custom.sec"
          className="!text-[12px]"
        >
          {name}
        </Typography>
      </Box>
    );
}