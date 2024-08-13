"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
import {
  CustomizeStatus,
  IconValue,
  OrderSummary,
  ProductPrev,
  renderMenu,
  renderSubMenu,
} from "./components";
import { DetailsDesign } from "../components";
import IconifyIcon from "@/app/components/icon";
import { useRouter, useSearchParams } from "next/navigation";
import { storeUpdateOrder } from "@/app/redux/state/slices/shop/order";
import ModalHook from "@/app/hooks/modalHook";
import Link from "next/link";

const OrderReview = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [payload, setPayload] = useState({ orderId: order });
  const { dialogInfo, updateDialogInfo } = ModalHook(payload);
  const path = { ...params, sidebar: "order-management" };

  const {
    data: orderInfo,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR(`/branch/order-request?order=${order}`);

  const {
    data: prodInfo,
    error: prodErr,
    isLoading: prodLoading,
  } = useSWR(`/branch/order-product/${order}`);

  const row = (!orderLoading && !orderErr && orderInfo?.data[0]) || null;
  const products = (!prodLoading && !prodErr && prodInfo?.data)[0] || {};
  const picker = (products?.picker && products.picker[0]) || {};
  const open = Boolean(anchorEl);
  const openSub = Boolean(subAnchorEl);
  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
  };

  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event?.target?.value });
  };

  const handleChange2 = (prop, aux) => {
    setPayload({
      ...payload,
      [prop]: aux?.replaceAll(" ", "_"),
    });
  };

  const handleMenuItemClick = (action) => (e) => {
    handleChange2("status", action);
    // Handle action here
    if (action === "") {
      setSubAnchorEl(true);
    } else {
      setAnchorEl(null);
      setSubAnchorEl(null);
    }
  };
  const saveData = () => {
    updateDialogInfo((prev) => {
      return {
        ...prev,
        open: true,
        alert: `Are you sure to change order status to ${payload.status}. The buyer will be notified instantly.`,
        acceptFunction: () => storeUpdateOrder(dispatch, payload),
      };
    });
  };
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
    >
      <Box className="py-2">
        <Box className="flex justify-between">
          <Box className="flex items-center">
            <IconifyIcon
              icon="tabler:chevron-left"
              className="text-[30px] mr-2 cursor-pointer"
              onClick={() => router.push("/store/dashboard/order-management")}
            />
            <Box className="">
              <Box className="flex items-center">
                <Typography
                  noWrap
                  className="!font-black !mr-4 w-40 max-w-40"
                  title={row?.orderId}
                >
                  {row?.orderId}
                </Typography>
                <CustomizeStatus text={row?.status || "..."} />
                <CustomizeStatus text={"Pending"} />
              </Box>
              <Typography variant="caption" className="!text-[12px] !mb-6 italic">
                {formatDateToMonthShort(
                  new Date(row?.dateAdded || null),
                  true,
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}{" "}
                from {row?.status?.toLowerCase()} orders
              </Typography>
            </Box>
          </Box>

          <Box className="hidden items-center md:flex">
            <Button
              onClick={handleButtonClick}
              variant="contained"
              className="!flex !items-center !shadow-none !justify-between px-4 !text-white"
            >
              {payload.status || "Status"}
              {open ? (
                <IconifyIcon icon="tabler:chevron-up" className="text-[18px]" />
              ) : (
                <IconifyIcon
                  icon="tabler:chevron-down"
                  className="text-[15px]"
                />
              )}
            </Button>
            <Button
              variant="contained"
              className="!shadow-none !ml-3"
              onClick={() => saveData()}
              disabled={!(payload.status || payload.comment)}
              startIcon={<IconifyIcon icon="tabler:device-floppy" />}
            >
              Save
            </Button>
          </Box>

          {/* </div> */}
        </Box>

        <Box className="flex flex-col-reverse md:flex-row items-start mt-2">
          <Box className=" w-full md:w-7/12 md:pr-1">
            <Box className="w-full">
              <Box className="w-full px-3 py-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all mt-4 md:mt-0">
                <Typography className=" !text-[15px] !mb-2 !mr-4">
                  Order Items
                </Typography>
                <CustomizeStatus text={"Pending"} />
                <br />
                <br />
                {products?.products?.map((each, i) => (
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
              <Typography className=" !text-[15px] !mb-2 !mr-4">
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
                info={`${products?.products?.length} items`}
                price={products?.allSubTotal}
              />
              <OrderSummary
                title="Discount"
                info="No discount applied"
                price={0}
              />
              <OrderSummary title="Shipping" info="No shipment" price={0} />
              <Divider>...</Divider>
              <OrderSummary title="Total" bold price={products?.allSubTotal} />
            </Box>
            <Box className="w-full px-3 py-4 mt-2 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[15px] !mb-2 !mr-4">
                Timeline
              </Typography>
              <CustomChip
                rounded
                avatar={<Avatar alt={row?.customerName} src={row?.picture} />}
                size="large"
                skin="light"
                color={"success"}
                label={row?.customerName}
                sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
                className="flex-shrink-0"
              />
              <br />
              <h5 className="!text-[10px] mt-4 mb-1 text-right text-gray-400">
                Minimum of 20 characters
              </h5>
              <TextField
                className=""
                fullWidth
                multiline
                label="Leave a comment...."
                id="textarea-outlined"
                defaultValue={row?.comment?.comment || ""}
                onChange={handleChange("comment")}
                maxRows={6}
                placeholder="Timeline comment..."
                minRows={5}
              />

              <Box className="flex justify-center mt-4">
                <Box className="flex items-center">
                  <Button
                    onClick={handleButtonClick}
                    variant="contained"
                    className="!flex !items-center !shadow-none !justify-between px-4 !text-white w-40"
                  >
                    {payload.status || "Status"}
                    {open ? (
                      <IconifyIcon
                        icon="tabler:chevron-up"
                        className="text-[15px]"
                      />
                    ) : (
                      <IconifyIcon
                        icon="tabler:chevron-down"
                        className="text-[15px]"
                      />
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    className="!shadow-none !ml-3 w-40"
                    onClick={() => saveData()}
                    disabled={!(payload.status || payload?.comment?.length)}
                    startIcon={<IconifyIcon icon="tabler:device-floppy" />}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full md:w-5/12 md:pl-1">
            <Box className="w-full px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[15px] !mb-2 !mr-4">
                Customer
              </Typography>
              <Box className="mt-2">
                {row?.picture && (
                  <img
                    src={row?.picture}
                    className="w-12 h-12 rounded-full mb-2"
                    alt="picture"
                  />
                )}
                <IconValue icon="tabler:user" value={row?.customerName} />
                <IconValue
                  icon="tabler:shopping-bag"
                  value={`${products?.products?.length} items`}
                />
              </Box>
            </Box>

            <Box className="w-full mt-2 px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[15px] !mb-2 !mr-4">
                Contact Information
              </Typography>
              <Box className="mt-2">
                <IconValue icon="tabler:mail" value={row?.email} />
                <IconValue icon="tabler:phone" value={row?.phone} />
              </Box>
            </Box>

            {row?.deliveryMedium === "pickup" && (
              <Box className="w-full px-3 mt-2 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
                <Box className="flex items-center justify-between">
                  <Typography className=" !text-[15px] !mb-2 !mr-4">
                    Picker
                  </Typography>
                  <Box className="flex items-center ">
                    <Link href={`tel:${picker?.phone || row.phone}`}>
                      <IconifyIcon
                        icon="tabler:phone"
                        className="mr-2 !text-green-600 !text-[15px] cursor-pointer"
                      />
                    </Link>
                    <Link href={`mail:${picker.email || row.email}`}>
                      <IconifyIcon
                        icon="tabler:mail"
                        className="!text-blue-600 !text-[15px] cursor-pointer"
                      />
                    </Link>
                  </Box>
                </Box>
                {picker.name ? (
                  <Box className="mt-2">
                    <IconValue icon="tabler:user" value={picker.name} />
                    <IconValue icon="tabler:hash" value={picker.slug} />
                    <IconValue
                      icon="tabler:friends"
                      value={picker.relationship}
                    />
                  </Box>
                ) : (
                  <IconValue value="Self-Pickup (Buyer is the picker)" />
                )}
              </Box>
            )}

            <Box className="w-full mt-2 px-3 py-4 shadow-sm rounded-xl bg-white hover:shadow-md transition-all">
              <Typography className=" !text-[15px] !mb-2 !mr-4">
                Way-billing Address
              </Typography>
              <Box className="mt-2">
                <IconValue icon="tabler:user" value={row?.customerName} />
                <IconValue value={`${row?.address?.address},`} />
                <IconValue value={`${row?.address?.city},`} />
                <IconValue value={`${row?.address?.state}, Nigeria.`} />
                <IconValue
                  icon="tabler:map"
                  value="View Map"
                  className="cursor-pointer !text-blue-500 hover:!text-blue-700 mt-6"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {open &&
          renderMenu({
            handleMenuItemClick,
            anchorEl,
            open,
            handleMenuClose,
          })}
        {openSub &&
          renderSubMenu({
            anchorEl,
            openSub,
            row,
            handleMenuClose,
            handleMenuItemClick,
          })}
      </Box>
    </StoreLeftSideBar>
  );
};

export default OrderReview;
