"use client";
import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import useSWR from "swr";
import { CalendarMonth } from "@mui/icons-material";
import { statusObj, DetailsDesign, Summarize } from ".";
import CustomChip from "@/app/components/chip";
import Icon from "@/app/components/icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OrderProductList from "./OrderProductList";
import tokens from "@/app/configs/tokens";
import {
  calculateDateDiff,
  formatCurrency,
  formatDate,
  formatShippingAddress,
} from "@/app/utils/format";

const OrderDetails = ({ order }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openSub = Boolean(subAnchorEl);

  const {
    data: orderInfo,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR({
    endPoint: `/branch/order-request?order=${order}`,
    token: tokens.store,
  });

  const {
    data: prodInfo,
    error: prodErr,
    isLoading: prodLoading,
  } = useSWR({
    endPoint: `/user/order-product/${order}`,
    token: tokens.store,
  });

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
  };

  const handleMenuItemClick = (action) => () => {
    // Handle action here
    console.log(`Action "${action}" clicked for row with ID:`);
    if (action === "updateStatus") {
      setSubAnchorEl(true);
    } else {
      setAnchorEl(null);
      setSubAnchorEl(null);
    }
  };

  const customizeStatus = (text) => {
    const status = statusObj.filter((e) => e.title === text.toLowerCase())[0];

    return (
      <CustomChip
        rounded
        size="small"
        skin="light"
        color={status?.color}
        label={status?.title}
        sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
      />
    );
  };

  const renderMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      className="left-0"
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuItemClick("updateStatus")}
        className="flex items-center  justify-between w-full"
      >
        Update Order Status{" "}
        <ChevronRightIcon className="text-[15px] ml-5 md:ml-8" />
      </MenuItem>
      <MenuItem
        onClick={handleMenuItemClick("Edit")}
        className="text-orange-500"
      >
        Refund
      </MenuItem>
      <MenuItem onClick={handleMenuItemClick("Edit")} className="text-red-500">
        Cancel Order
      </MenuItem>
    </Menu>
  );

  const renderSubMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={openSub}
      onClose={handleMenuClose}
      className={` w-full ml-56 py-4 px-4`}
    >
      <MenuItem
        onClick={handleMenuItemClick("Processing")}
        className="flex items-center justify-between w-full"
      >
        Processing
      </MenuItem>
      <MenuItem onClick={handleMenuItemClick("Delivery")}>
        Out for Delivery
      </MenuItem>
      <MenuItem onClick={handleMenuItemClick("On Hold")}>On Hold</MenuItem>
      <MenuItem onClick={handleMenuItemClick("Received")}>Received</MenuItem>
    </Menu>
  );
  const row = (!orderLoading && !orderErr && orderInfo?.data[0]) || null;
  const products = (!prodLoading && !prodErr && prodInfo?.data) || null;
  console.log(row, products);
  return (
    <Box className="">
      {!orderLoading && !orderErr && (
        <Box className="">
          <Grid container spacing={3} className="md:px-5">
            <Grid item xs={6} md={3} className="md:px-5">
              <Typography
                variant="h5"
                className="!text-xs !font-bold !leading-10 !flex !items-center"
              >
                Order ID: <b className="ml-3">{row.orderId}</b>
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} className="md:px-5">
              <Typography
                variant="h5"
                className="!text-xs !font-bold !flex !items-center !leading-10"
              >
                <CalendarMonth className="text-[15px]" />{" "}
                <b className="ml-2 md:ml-3">{formatDate(row.dateAdded)}.</b>
                <b className="ml-2 md:ml-3">10:00 am</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} className="md:!px-5">
            <Grid item xs={12} md={6} className="md:!px-5">
              <Typography
                variant="h5"
                className="!text-xs !leading-10 !flex !items-center"
              >
                <b className="font-bold mr-4">Status:</b>{" "}
                {customizeStatus(row.status)}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className="mt-3">
              <Grid container spacing={1} className="">
                <Grid item xs={6} md={6}>
                  <Button
                    fullWidth
                    onClick={handleButtonClick}
                    className="!flex !items-center !justify-between px-4 !text-gray-300 !bg-gray-500"
                  >
                    Change Status{" "}
                    {open ? (
                      <ExpandLessIcon className="text-[15px]" />
                    ) : (
                      <ExpandMoreIcon className="text-[15px]" />
                    )}
                  </Button>
                  {/* <div className="relative"> */}
                  {open && renderMenu()}
                  {openSub && renderSubMenu()}
                  {/* </div> */}
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    className=""
                    disabled
                    startIcon={<Icon icon="tabler:device-floppy" />}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    className=""
                    disabled
                    startIcon={<Icon icon="tabler:printer" />}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box className="flex flex-wrap items-start justify-between md:justify-evenly mt-10">
            <DetailsDesign
              icon="tabler:user"
              title="Customer"
              color="green"
              info={[
                {
                  key: "First Name",
                  value: row.customerName,
                },
                { key: "Email", value: row.email },
                { key: "Phone", value: row.phone },
              ]}
              btnText="View User"
              btnFunc={() => {}}
            />

            <DetailsDesign
              icon="tabler:shopping-cart"
              color="red"
              title="Order Info"
              info={[
                { key: "Delivery Medium", value: row.deliveryMedium },
                {
                  key: "Order Total Price",
                  value: formatCurrency(row.totalPrice),
                },
                {
                  key: "Est Delivery Date",
                  value: calculateDateDiff(
                    row.deliveryDateSpan,
                    row.dateAdded,
                    "+"
                  ),
                },
              ]}
            />

            <DetailsDesign
              icon="tabler:truck-delivery"
              color="blue"
              title="Deliver To"
              info={[
                {
                  key: "Address",
                  value: formatShippingAddress(row.address),
                },
              ]}
              btnText="Show Map"
              btnFunc={() => {}}
            />
          </Box>
        </Box>
      )}

      <Grid container spacing={3} className="px-5">
        <Grid item xs={12} md={5}></Grid>
        <Grid item xs={12} md={7}>
          <TextField
            sx={{ mt: 4 }}
            fullWidth
            multiline
            id="textarea-outlined"
            maxRows={6}
            placeholder="Type some notes"
            minRows={5}
            label="Note"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" className="!font-bold !pb-4  mt-10 px-5 text-sm">
        Products
      </Typography>
      {!prodLoading && !prodErr && (
        <Box className="w-full !overflow-auto md:!overflow-auto">
          <OrderProductList rows={products[0].products} />
        </Box>
      )}
      {!orderLoading && !orderErr && !prodLoading && !prodErr && (
        <Box className="flex justify-end pr-6 mt-8">
          <Box>
            <Summarize
              info={[
                {
                  key: "Sub-Total",
                  value: `+ ${formatCurrency(products[0].allSubTotal)}`,
                },
                {
                  key: "Way-Billing Fee",
                  value: `+ ${formatCurrency(row.deliveryFee)}`,
                },
                {
                  key: "Discount",
                  value: `- ${formatCurrency(row.discount)}`,
                },
                {
                  key: "Total",
                  value: `= ${formatCurrency(
                    products[0].allSubTotal + row.deliveryFee - row.discount
                  )}`,
                  bold: true,
                },
                {
                  key: "Status",
                  value: customizeStatus(row.status),
                },
              ]}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetails;
