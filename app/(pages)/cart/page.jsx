"use client";
import { SectionTitle } from "@/app/components/cards/homeCards";
import IconifyIcon from "@/app/components/icon";
import {
  HotDeal,
  PopularProduct,
} from "@/app/components/templates/productTemplates";
import { CartProductView } from "@/app/components/templates/productView";
import HomeWrapper from "@/app/components/view/home";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { useRouter } from "next/navigation";
import { hotDealData, popularProducts } from "@/app/data/home/homepage";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useUserData } from "@/app/hooks/useData";
import { deleteBulkCart } from "@/app/redux/state/slices/home/cart";
import { useDispatch } from "react-redux";
import CustomOption from "@/app/components/option-menu/option";
import Link from "next/link";
import useSWR from "swr";

const UserCart = () => {
  const dispatch = useDispatch();
  const { data: addrs } = useSWR("/user/addresses");
  const addresses = addrs?.data || [];
  const { cartData, cartedProds, userInfo, temp, addTemp } = useUserData();
  const [selected, selectCart] = useState([]);
  const router = useRouter();
  const address = temp.address || userInfo?.selectedAddress || null;
  return (
    <HomeWrapper>
      <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box className="">
              <Box className="bg-white rounded-md py-5 px-4">
                <Typography variant="body2" className="!font-bold !text-[20px]">
                  Shopping Cart ({cartedProds.length})
                </Typography>
                <Box className="w-full flex justify-between items-center !mt-2">
                  <FormControlLabel
                    className="!mt-2"
                    label={
                      <Box>
                        <Typography variant="caption" className="">
                          Select all items
                        </Typography>
                      </Box>
                    }
                    control={
                      <Checkbox
                        checked={selected.length === cartedProds.length}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          selectCart(() => (checked ? cartedProds : []));
                        }}
                        disabled={false}
                        name="basic-checked"
                      />
                    }
                  />
                  <Button
                    variant="text"
                    className={`!text-[12px] !text-blue-700 !mt-1 ${
                      !selected.length > 0 && "cursor-cancel"
                    }`}
                    disabled={!selected.length > 0}
                    onClick={() => deleteBulkCart(selected, dispatch)}
                  >
                    Delete selected items
                  </Button>
                </Box>
                <Box className="w-full flex justify-between !text-blue-700 px-4 py-1 bg-blue-50 items-center !mt-2">
                  <Typography variant="body2" className="!text-[11px]">
                    You have a discount voucher for this products
                  </Typography>
                  <IconifyIcon
                    icon="tabler:chevron-right"
                    className="text-[14px]"
                  />
                </Box>
              </Box>
              <Box className="bg-white w-full rounded-md py-5 px-2 md:px-4 mt-5">
                {cartData?.products &&
                  cartData?.products.map(
                    (each, i) =>
                      i < 4 && (
                        <Box key={i}>
                          <CartProductView
                            store={each.store}
                            selected={selected}
                            selectCart={selectCart}
                            branch={each.branch}
                            cartId={each._id}
                            productId={each.product._id}
                            colors={each.product?.specifications?.colors}
                            prodName={each.product.prodName}
                            image={`/images/more/${i + 1}.png`}
                            prodPrice={each.product.prodPrice}
                            quantity={each.quantity}
                          />
                          {cartData.products.length > i + 1 && (
                            <Box className="w-full border-[1px] border-gray-100 my-5"></Box>
                          )}
                        </Box>
                      )
                  )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Box className="bg-white rounded-md py-5 px-4">
                <Typography variant="body2" className="!font-bold !text-[15px]">
                  Summary
                </Typography>
                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography variant="body2" className="!text-[12px]">
                    Sub total
                  </Typography>
                  <Typography variant="body2" className="!text-[12px]">
                    NGN {cartData?.sum_price?.toLocaleString()}
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
                    -NGN 1,260
                  </Typography>
                </Box>

                <Box className="w-full border-2 border-dashed border-black mt-4"></Box>
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
                    NGN {cartData?.sum_price?.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box className="bg-white rounded-md py-5 px-4 mt-4">
                <Typography variant="body2" className="!font-bold !text-[15px]">
                  Delivery Address
                </Typography>
                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography variant="body2" className="!text-[11px] w-8/12">
                    {(address &&
                      `${address.address}, ${address.state}, ${address.city} (${address.postal_code})`) ||
                      "No address selected"}
                  </Typography>
                  <CustomOption
                    addBtn={
                      <Link href="/user" className="!w-full">
                        <Typography
                          variant="body2"
                          className="!text-[15px] !text-blue-800 mt-5"
                        >
                          <span className="mr-3 !text-[17px]">+</span> Add
                          address
                        </Typography>
                      </Link>
                    }
                    icon={
                      <Button
                        variant="outlined"
                        className="w-20 h-6 !rounded-full !border !border-blue-500 !text-[12px] !text-blue-600"
                      >
                        {address ? "Change" : "Select"}
                      </Button>
                    }
                    options={addresses.map(
                      (e) =>
                        `${e?.address}, ${e?.state}, ${e?.city} (${e?.postal_code})`
                    )}
                    butPush={addresses.map((e) => e)}
                    clickFunction={(e) =>
                      addTemp((prev) => {
                        return { ...prev, address: e };
                      })
                    }
                  />
                </Box>
              </Box>
              <Box className="bg-white rounded-md py-5 px-4 mt-4">
                <Typography variant="body2" className="!font-bold !text-[15px]">
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
                <Box className="flex justify-center mt-4">
                  <Box className="w-full relative !overflow-hidden">
                    <input
                      type="text"
                      value=""
                      placeholder="Enter the discount coupon code"
                      onChange={() => {}}
                      className="h-10 w-full bg-blue-50 rounded-full pl-12 pr-8 focus outline-none border-blue-200 focus:border"
                    />
                    <IconifyIcon
                      icon="tabler:search"
                      className="absolute top-[12px] left-4 text-[16px]"
                    />
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => router.push("/checkout")}
                className="w-full !mt-6 h-12 !rounded-full !border-none !text-[14px] !text-white"
              >
                Checkout (5)
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box className="mt-16">
          <SectionTitle black="More items from this seller" />
          <ReactSlickSlider>
            {popularProducts.map((prod, i) => (
              <PopularProduct
                key={i}
                small
                image={prod.image}
                prodName={prod.prodName}
                price={prod.price}
              />
            ))}
          </ReactSlickSlider>
        </Box>
        <Box className="mt-8">
          <SectionTitle black="You may also like" />
          <ReactSlickSlider>
            {hotDealData.map((prod, i) => (
              <HotDeal
                key={i}
                small
                image={prod.image}
                prodName={prod.prodName}
                price={prod.price}
                unit={prod.unit}
                of={prod.of}
              />
            ))}
          </ReactSlickSlider>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default UserCart;
