"use client";
import IconifyIcon from "@/app/components/icon";
import { GroupCartProducts } from "@/app/components/templates/productView";
import HomeWrapper from "@/app/components/view/home";
import { userGroupCartData } from "@/app/data/home/homepage";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const Checkout = () => {
  const { data: carts, error } = useSWR("/user/cart-group");
  const groupedCart = carts ? carts.data : [];

  console.log(groupedCart);

  return (
    <HomeWrapper>
      <Box>
        <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box className="bg-white rounded-md py-5 px-4">
                <Typography variant="body2" className="!font-bold !text-[16px]">
                  Delivery Address
                </Typography>
                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography variant="body2" className="!text-[11px] w-8/12">
                    54, Adelubido crescent, opposite chicken republic (Ondo
                    State, Nigeria)
                  </Typography>
                  <Button
                    variant="outlined"
                    className="w-20 h-6 !rounded-full !border !border-blue-500 !text-[12px] !text-blue-600"
                  >
                    Change
                  </Button>
                </Box>
                <Box className="w-full flex justify-between !text-black px-4 py-3 !rounded-md bg-red-100 items-center !mt-8">
                  <Typography variant="body2" className="!text-[11px]">
                    Before making an order, make sure the address is correct and
                    matches your expected delivery location.
                  </Typography>
                  <IconifyIcon
                    icon="tabler:chevron-right"
                    className="text-[14px]"
                  />
                </Box>
              </Box>
              <Box className="bg-white rounded-md py-5 px-4 mt-5">
                {groupedCart.map((each, i) => (
                  <Box key={i}>
                    <GroupCartProducts
                      store={each._id.store}
                      branchPrice={each.branchCheckout}
                      branch={each.fromBranch}
                    />

                    {groupedCart.length > i + 1 && (
                      <Box className="w-full border-[1px] my-5"></Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Box className="bg-white rounded-md py-5 px-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Summary
                  </Typography>
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
                  <Box className="w-full flex justify-between items-center !mt-2">
                    <Typography variant="body2" className="!text-[12px]">
                      Way-Billing
                    </Typography>
                    <Typography variant="body2" className="!text-[12px]">
                      NGN9,500
                    </Typography>
                  </Box>

                  <Box className="w-full h-0.5 border-dashed border border-black mt-7"></Box>
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
                <Box className="bg-white rounded-md py-5 px-4 mt-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Voucher
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Typography variant="body2" className="!text-[11px] w-3/5">
                      FREE4ALL%15%NOW
                    </Typography>
                    <Box className="flex justify-between float-right items-center w-2/5">
                      <Typography variant="body2" className="!text-[11px]">
                        All Products
                      </Typography>
                      <Typography variant="body2" className="!text-[11px]">
                        30%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="bg-white rounded-md py-5 px-4 mt-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Payment Option
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Box className="flex items-center">
                      <input type="radio" />
                      <Image
                        src="/images/misc/visa.png"
                        width={150}
                        height={150}
                        className="w-14 h-10 ml-3"
                      />
                    </Box>
                    <Box className="flex justify-between items-center w-2/3">
                      <Typography variant="body2" className="!text-[12px]">
                        4253********4356
                      </Typography>
                      <Typography variant="body2" className="!text-[12px]">
                        05/24
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    className="!text-[11px] !text-blue-800 mt-5"
                  >
                    <span className="mr-3 !text-[15px]">+</span> Add new payment
                    option
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  className="w-full !mt-6 !h-12 !rounded-full !border-none !text-[14px] !text-white"
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default Checkout;
