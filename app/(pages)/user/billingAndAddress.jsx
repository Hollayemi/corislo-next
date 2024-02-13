"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MyTextField, TitleSubtitle } from "./components";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import {
  detectCardType,
  formatCVC,
  formatCreditCardNumber,
  formatExpirationDate,
  mySubstring,
} from "@/app/utils/format";
import Chip from "@/app/components/chip";
import IconifyIcon from "@/app/components/icon";
import Payment from "payment";

const BillingAndAddress = () => {
  const [newCard, openNewCard] = useState(false);
  const [newAddress, openNewAddress] = useState(false);
  const [cardPayload, setCardData] = useState({
    number: "",
    cvv: "",
    expiry: "",
    name: "",
  });
  const handleInputChange =
    (prop) =>
    ({ target }) => {
      if (prop === "number") {
        target.value = formatCreditCardNumber(target.value, Payment);
        setCardData({ ...cardPayload, [prop]: target.value });
      } else if (prop === "expiry") {
        target.value = formatExpirationDate(target.value);
        setCardData({ ...cardPayload, [prop]: target.value });
      } else if (prop === "cvv") {
        target.value = formatCVC(target.value, cardPayload.number, Payment);
        setCardData({ ...cardPayload, [prop]: target.value });
      } else {
        setCardData({ ...cardPayload, [prop]: target.value });
      }
    };
  console.log(cardPayload);
  const AddBtn = ({ btnText, click }) => (
    <Button
      variant="text"
      className="!text-black !w-32 !h-7 !shadow-none !bg-gray-200 !text-[12px] !my-4"
      startIcon={btnText === "Close" ? <Remove /> : <Add />}
      onClick={() => click((prev) => !Boolean(prev))}
    >
      {btnText}
    </Button>
  );
  const cardType = detectCardType(cardPayload.number);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TitleSubtitle
            title="Payment Method"
            subtitle="GUpdate your card and billing details"
          />
          <AddBtn
            btnText={newCard ? "Close" : "Add card"}
            click={openNewCard}
          />

          {newCard && (
            <Box className="lg:pr-10">
              <Box className="h-10 max-h-10 w-full">
                {cardType && (
                  <Image
                    src={`/images/misc/others/${cardType}.png`}
                    alt="mastercard"
                    width={200}
                    height={200}
                    className="w-10 md:h-10 !mx-1 md:!mx-2.5"
                  />
                )}
              </Box>
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="Name on card"
                  value={cardPayload.name}
                  onChange={handleInputChange("name")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
                <MyTextField
                  title="Card Number"
                  value={cardPayload.number}
                  placeholder="_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _"
                  type="text"
                  onChange={handleInputChange("number")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
              </Box>
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="Expiry Date"
                  value={cardPayload.expiry}
                  type="text"
                  placeholder="MM/YYY"
                  onChange={handleInputChange("expiry")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
                <MyTextField
                  title="CVV"
                  value={cardPayload.cvv}
                  type="number"
                  placeholder="_ _ _"
                  onChange={handleInputChange("cvv")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
              </Box>
              <Button fullWidth variant="contained" className="!h-10 !w-full">
                Save Card
              </Button>
              <br />
            </Box>
          )}
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[13px] !mt-8"
          >
            Added Cards
          </Typography>

          <Box className="mt-4 w-full">
            <FormControlLabel
              className="!w-full !mb-2"
              onChange={(e) => {}}
              label={
                <CardTemplate
                  cardType="Visa"
                  name="Creative Box"
                  first4={2342}
                  last4={6796}
                  status="Expired"
                />
              }
              control={<Radio name="holla" size="small" />}
            />

            <FormControlLabel
              className="!mb-2 w-full"
              onChange={(e) => {}}
              label={
                <CardTemplate
                  cardType="mastercard"
                  name="Oluwasusi Stephen"
                  first4={3343}
                  last4={2323}
                  status="Active"
                />
              }
              control={<Radio name="holla" size="small" />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="!mt-10 md:!mt-0">
          <TitleSubtitle
            title="Shipping Address"
            subtitle="Update your shipping address for easy drop location"
          />
          <AddBtn
            btnText={newAddress ? "Close" : "Add Address"}
            click={openNewAddress}
          />
          <br />
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[13px] !mt-10"
          >
            Added Addresses
          </Typography>

          <Box className="mt-4 w-full">
            <FormControlLabel
              className="!w-full !mb-3"
              onChange={(e) => {}}
              label={
                <TitleSubtitle
                  title="Flat 23, Obamukuro Estate, Lekki"
                  subtitle="Lagos State, Nigeria, 345292"
                  titleClass="!text-[13px]"
                />
              }
              control={<Radio name="holla" size="small" label="sddfds" />}
            />

            <FormControlLabel
              className="!mb-3"
              onChange={(e) => {}}
              label={
                <TitleSubtitle
                  title="No 35, Omuaran Street, Magodo"
                  subtitle="Lagos State, Nigeria, 345292"
                  titleClass="!text-[13px]"
                />
              }
              control={<Radio name="holla" size="small" />}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingAndAddress;

const CardTemplate = ({
  cardType,
  name,
  first4,
  last4,
  date = new Date(),
  status = "Active",
}) => (
  <Box className="flex items-center justify-evenly w-full mb-2">
    <Image
      src={`/images/misc/others/${cardType.toLowerCase()}.png`}
      alt="mastercard"
      width={200}
      height={200}
      className="w-6 h-6 md:w-10 md:h-10 !mx-1 md:!mx-2.5"
    />
    <Typography
      variant="body2"
      noWrap
      className="!text-black w- !text-[12px] md:!text-[13px] !mx-1 md:!mx-2.5"
    >
      {mySubstring(name, 7)}
    </Typography>
    <Typography
      variant="body2"
      className="!text-black !text-[12px] md:!text-[13px] !mx-1 md:!mx-2.5"
    >
      {`${first4}****${last4}`}
    </Typography>
    <Typography
      variant="body2"
      className="!text-black !text-[12px] md:!text-[13px] !mx-1 md:!mx-2.5"
    >
      {`${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .substring(2, 4)}`}
    </Typography>
    <Chip
      rounded
      size="small"
      skin="light"
      color={status === "Active" ? "success" : "error"}
      label={status}
      className="!mx-1 md:!mx-2.5 !w-16"
      sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
    />
    <IconifyIcon
      icon="tabler:trash"
      className="!text-red-500 !text-[16px] md:!mx-2"
    />
  </Box>
);
