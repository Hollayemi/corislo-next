"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CustomChip from "@/app/components/chip";
import {
  formatCurrency,
  formatDate,
  formatDateToMonthShort,
} from "@/app/utils/format";
import { OrderProductPrev } from "@/app/(pages)/order/pending-reviews/page";
import useSWR from "swr";
import { IconValue, OrderSummary, ProductPrev } from "./components";
import { DetailsDesign } from "../components";
import IconifyIcon from "@/app/components/icon";

const OrderReview = ({ params, searchParams }) => {
  const order = searchParams.order;
  const path = { ...params, sidebar: "order-management" };

  const {
    data: orderInfo,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR(`/branch/order-request?order=${order}`);

  console.log(orderInfo);

  const {
    data: prodInfo,
    error: prodErr,
    isLoading: prodLoading,
  } = useSWR(`/branch/order-product/${order}`);

  const row = (!orderLoading && !orderErr && orderInfo?.data[0]) || null;
  const products = (!prodLoading && !prodErr && prodInfo?.data) || [];
  console.log(row, products);
  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Box>
        <Box className="flex items-center">
          <Typography className="!font-black !mr-4">ORD-234234235</Typography>
          <CustomChip
            rounded
            size="small"
            skin="light"
            color={"warning"}
            label={"Pending"}
            sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
            className="flex-shrink-0 !rounded-sm"
          />
        </Box>
        <Typography variant="caption" className="!text-[12px]">
          {formatDateToMonthShort(new Date(), true, {
            month: "long",
            year: "numeric",
          })}{" "}
          from pending orders
        </Typography>

        <Box className="flex flex-col-reverse md:flex-row items-start mt-2">
          <Box className=" w-full md:w-7/12 pr-1">
            <Box className="w-full">
              <Box className="w-full px-3 py-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                <Typography className=" !text-[18px] !mb-2 !mr-4">
                  Order Items
                </Typography>
                <CustomChip
                  rounded
                  size="small"
                  skin="light"
                  color={"error"}
                  label={"Pending"}
                  sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
                  className="flex-shrink-0 !rounded-sm"
                />
                <br />
                <br />
                {products[0]?.products?.map((each, i) => (
                  <ProductPrev
                    quantity={each.qty}
                    prodPrice={each.price}
                    prodName={each.productName}
                    key={i}
                  />
                ))}
              </Box>
            </Box>

            <Box className="w-full px-3 py-4 mt-2 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[18px] !mb-2 !mr-4">
                Order Summary
              </Typography>
              <CustomChip
                rounded
                size="small"
                skin="light"
                color={"success"}
                label={"Paid"}
                sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
                className="flex-shrink-0 !rounded-sm"
              />
              <br />
              <br />
              <OrderSummary
                title="Subtotal"
                info={`${products[0]?.products?.length} items`}
                price={products[0]?.allSubTotal}
              />
              <OrderSummary
                title="Discount"
                info="No discount applied"
                price={0}
              />
              <OrderSummary title="Shipping" info="No shipment" price={0} />
              <Divider>...</Divider>
              <OrderSummary
                title="Total"
                bold
                price={products[0]?.allSubTotal}
              />
            </Box>
            <Box className="w-full px-3 py-4 mt-2 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[18px] !mb-2 !mr-4">
                Timeline
              </Typography>
              <CustomChip
                rounded
                avatar={
                  <Avatar
                    alt="Oluwasusi Stephen"
                    src="/static/images/avatar/1.jpg"
                  />
                }
                size="large"
                skin="light"
                color={"success"}
                label={"Oluwasusi Stephen"}
                sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
                className="flex-shrink-0"
              />
              <br />
              <TextField
                sx={{ mt: 4 }}
                fullWidth
                multiline
                id="textarea-outlined"
                onChange={() => {}}
                maxRows={6}
                placeholder="Leave a comment..."
                minRows={5}
              />
              <Box className="flex justify-end mt-4">
                <Button variant="contained" className="!shadow-none  w-28">
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="w-full md:w-5/12 pl-1">
            <Box className="w-full px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[18px] !mb-2 !mr-4">
                Customer
              </Typography>
              <Box className="mt-2">
                <IconValue icon="tabler:user" value="Oluwasusi Stephen" />
                <IconValue
                  icon="tabler:shopping-bag"
                  value={`${products[0]?.products?.length} items`}
                />
              </Box>
            </Box>

            <Box className="w-full mt-2 px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[18px] !mb-2 !mr-4">
                Contact Information
              </Typography>
              <Box className="mt-2">
                <IconValue
                  icon="tabler:mail"
                  value="stephanyemmitty@gmail.com"
                />
                <IconValue icon="tabler:phone-2" value="09087936299" />
              </Box>
            </Box>

            <Box className="w-full px-3 mt-2 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Box className="flex items-center justify-between">
                <Typography className=" !text-[18px] !mb-2 !mr-4">
                  Picker
                </Typography>
                <Box className="flex items-center ">
                  <IconifyIcon
                    icon="tabler:phone"
                    className="mr-2 !text-green-600 !text-[18px] cursor-pointer"
                  />
                  <IconifyIcon
                    icon="tabler:mail"
                    className="!text-blue-600 !text-[18px] cursor-pointer"
                  />
                </Box>
              </Box>
              <Box className="mt-2">
                <IconValue icon="tabler:user" value="Tolulope Gbenga" />
                <IconValue icon="tabler:hash" value="PIK-23516734673" />
                <IconValue icon="tabler:friends" value="Family" />
              </Box>
            </Box>

            <Box className="w-full mt-2 px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[18px] !mb-2 !mr-4">
                Way-billing Address
              </Typography>
              <Box className="mt-2">
                <IconValue icon="tabler:user" value="Tolulope Gbenga" />
                <IconValue value="78, Upper Sekpomaz" />
                <IconValue value="GRA,Oredo, Benin City" />
                <IconValue value="Edo State, Nigeria" />
                <IconValue icon="tabler:map" value="View Map" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default OrderReview;
