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
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { CalendarMonth } from "@mui/icons-material";
import { statusObj, DetailsDesign, Summarize } from ".";
import CustomChip from "@/app/components/chip";
import Icon from "@/app/components/icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OrderProductList from "./OrderProductList";

const OrderDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openSub = Boolean(subAnchorEl);

  const row = {
      _id: "64971c66468d71b0610abc11",
      discount: 300,
      deliveryFee: 1000,
      store: "corisio",
      branch: "kayY3g",
      userId: "643adb961051dda89beff797",
      status: "pending",
      totalAmount: "16000",
      picker: {
        id: "643adcee1051dda89beff7c4",
        name: "Oluwasusi  Ola (Friend)",
      },
      voucher: "voucher",
      size: 4,
      createdAt: "2023-06-24T16:40:06.258Z",
      updatedAt: "2023-06-24T16:40:06.258Z",
      __v: 0,
      strId: "64971c66468d71b0610abc11",
      more: {
        _id: "64971c66468d71b0610abc13",
        storeProducts: [
          {
            name: "Maine coon Long_haired cat",
            id: "6482886b2b9f393000c22c0a",
            quantity: 1,
            color: ["As displayed"],
            size: ["As displayed"],
          },
          {
            name: "Intermediate Adult German Shepherd ",
            id: "648287a42b9f393000c22bf5",
            quantity: 1,
            color: ["As displayed"],
            size: ["As displayed"],
          },
          {
            name: "My Loving Cockatiels Bird",
            id: "648288082b9f393000c22c03",
            quantity: 1,
            color: ["As displayed"],
            size: ["As displayed"],
          },
          {
            name: "Intermediate Adult German Shepherd ",
            id: "648287432b9f393000c22bee",
            quantity: 1,
            color: ["As displayed"],
            size: ["As displayed"],
          },
        ],
        paymentInfo: {
          redirurl: "redirurl",
          tnxref: "tnxref",
        },
        shippingAddress: {
          selected: false,
          _id: "643adcc11051dda89beff7bb",
          title: "Home",
          surname: "OlaOluwasusi ",
          first_name: "Stephanyemmitty ",
          last_name: "Ola",
          phone_number: 9098976757,
          city: "Ondo",
          state: "Ondo State",
          address: "76, Olorunsogo",
          postal_code: "351102",
          userId: "643adb961051dda89beff797",
          createdAt: "2023-04-15T17:20:01.426Z",
          updatedAt: "2023-04-15T17:20:01.426Z",
          __v: 0,
        },
        userId: "643adb961051dda89beff797",
        orderId: "64971c66468d71b0610abc11",
        store: "corisio",
        picker: {
          id: "643adcee1051dda89beff7c4",
          name: "Oluwasusi  Ola (Friend)",
        },
        createdAt: "2023-06-24T16:40:06.267Z",
        updatedAt: "2023-06-24T16:40:06.267Z",
        __v: 0,
      },
    }

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

  const handleSubAnchorBack = (event) => () => {
    // Handle action here
    setSubAnchorEl();
    console.log("i click this");
  };

  console.log(subAnchorEl);
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
      {/* <MenuItem onClick={handleSubAnchorBack()} className="!text-[13px]">
        <ChevronLeftIcon className="text-[15px] mr-3" /> Back
      </MenuItem> */}
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

  return (
    <Box className="">
      <Box className="">
        <Grid container spacing={3} className="md:px-5">
          <Grid item xs={6} md={3} className="md:px-5">
            <Typography
              variant="h5"
              className="!text-xs !font-bold !leading-10 !flex !items-center"
            >
              Order ID: <b className="ml-3">XYZSJWE388</b>
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} className="md:px-5">
            <Typography
              variant="h5"
              className="!text-xs !font-bold !flex !items-center !leading-10"
            >
              <CalendarMonth className="text-[15px]" />{" "}
              <b className="ml-2 md:ml-3">2023-07-12 </b>
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
        <Box className="flex flex-wrap items-center justify-between md:justify-evenly mt-10">
          <DetailsDesign
            icon="tabler:user"
            title="Customer"
            info={[
              { key: "First Name", value: row.picker.name },
              { key: "Email", value: "Johndoes@gmail.com" },
              { key: "Phone", value: "+23481335939" },
            ]}
            btnText="View User"
            btnFunc={() => {}}
          />

          <DetailsDesign
            icon="tabler:shopping-cart-filled"
            title="Order Info"
            info={[
              { key: "Delivery Medium", value: "Way-billing" },
              {
                key: "Order Total Price",
                value: "₦" + row.totalAmount,
              },
              {
                key: "Est Delivery Date",
                value: "2023-07-10(10 days)",
              },
            ]}
          />

          <DetailsDesign
            icon="tabler:truck-delivery"
            title="Deliver To"
            info={[
              {
                key: "Address",
                value: row.more.shippingAddress.address,
              },
            ]}
            btnText="Show Map"
            btnFunc={() => {}}
          />
        </Box>
      </Box>

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
      <Box className="w-full !overflow-scroll md:!overflow-auto">
        <OrderProductList />
      </Box>
      <Box className="flex justify-end pr-6 mt-8">
        <Box>
          <Summarize
            info={[
              { key: "Sub-Total", value: "₦125,000.00" },
              {
                key: "Way-Billing Fee",
                value: "₦5,000.00 ",
              },
              {
                key: "Discount",
                value: "₦0.00 ",
              },
              {
                key: "Total",
                value: "₦149,000.00 ",
                bold: true,
              },
              {
                key: "Status",
                value: customizeStatus("pending"),
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetails;
