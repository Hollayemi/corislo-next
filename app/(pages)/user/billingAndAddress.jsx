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
import useSWR from "swr";
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
import {
  deleteAddress,
  saveNewAddress,
} from "@/app/redux/state/slices/users/address";
import {
  deleteBilling,
  saveBilling,
} from "@/app/redux/state/slices/users/billing";
import { selectAsDefault } from "@/app/redux/state/slices/users";
import { useDispatch } from "react-redux";
import { useUserData } from "@/app/hooks/useData";

const BillingAndAddress = () => {
  const { userInfo } = useUserData();
  const { data: addrs } = useSWR("/user/addresses");
  const { data: cards } = useSWR("/user/billings");
  const addresses = addrs?.data || [];
  const billings = cards?.data || [];
  const [newCard, openNewCard] = useState(false);
  const [newAddress, openNewAddress] = useState(false);
  const [cardPayload, setCardData] = useState({
    number: "",
    cvv: "",
    expiry: "",
    name: "",
  });
  const [addressPayload, setAddressData] = useState({
    address: "",
    state: "",
    city: "",
    postal_code: "",
  });
  const dispatch = useDispatch();
  const handleAddressData =
    (prop) =>
    ({ target }) => {
      setAddressData((data) => {
        return { ...data, [prop]: target.value };
      });
    };
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
              <Button
                onClick={() => saveBilling(cardPayload, dispatch)}
                fullWidth
                variant="contained"
                className="!h-10 !w-full"
              >
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
            {billings.map((each, i) => (
              <FormControlLabel
                key={i}
                className="!w-full !mb-2"
                onChange={(e) => {}}
                label={
                  <CardTemplate
                    cardType={detectCardType(each?.openDigits[0])}
                    name={each.name}
                    openDigits={each?.openDigits}
                    id={each?._id}
                    expiry={each.expiry}
                  />
                }
                control={
                  <Radio
                    onClick={() =>
                      selectAsDefault({ field: "card", data: each }, dispatch)
                    }
                    checked={userInfo?.selectedBilling?._id === each._id}
                  />
                }
              />
            ))}
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
          {newAddress && (
            <Box className="lg:pr-10">
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="Enter your shipping address"
                  value={addressPayload.address}
                  onChange={handleAddressData("address")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
                <MyTextField
                  title="State"
                  value={addressPayload.state}
                  onChange={handleAddressData("state")}
                  type="text"
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
              </Box>
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="City"
                  value={addressPayload.city}
                  onChange={handleAddressData("city")}
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
                <MyTextField
                  title="Zip Code"
                  value={addressPayload.postal_code}
                  onChange={handleAddressData("postal_code")}
                  type="text"
                  PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
                />
              </Box>
              <Button
                onClick={() => saveNewAddress(addressPayload, dispatch)}
                fullWidth
                variant="contained"
                className="!h-10 !w-full"
              >
                Save Address
              </Button>
            </Box>
          )}
          <br />
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[13px] !mt-10"
          >
            Added Addresses
          </Typography>

          <Box className="mt-4 w-full">
            {addresses.map((each, i) => (
              <FormControlLabel
                className="!w-full !mb-5"
                key={i}
                label={
                  <Box className="flex !w-full justify-between items-start">
                    <TitleSubtitle
                      title={each.address}
                      subtitle={`${each.state}, Nigeria, ${each.postal_code}"`}
                      titleClass="!text-[13px]"
                    />
                    <IconifyIcon
                      icon="tabler:trash"
                      onClick={() => deleteAddress(each._id, dispatch)}
                      className="!text-red-500 !text-[16px] md:!text-[18px] !ml-2 md:!ml-6"
                    />
                  </Box>
                }
                control={
                  <Radio
                    onClick={() =>
                      selectAsDefault(
                        { field: "address", data: each },
                        dispatch
                      )
                    }
                    checked={userInfo?.selectedAddress?._id === each._id}
                  />
                }
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingAndAddress;

export const CardTemplate = ({
  cardType,
  name,
  openDigits,
  id,
  expiry,
  hideDelete,
}) => {
  const dispatch = useDispatch();
  const expiryDate = expiry.split("/");
  const currDate = new Date();
  const status =
    currDate.getMonth() + 1 <= expiryDate[0] &&
    parseInt(expiryDate[1]) + 2000 >= currDate.getFullYear()
      ? "Active"
      : "Expire";
  return (
    <Box className="flex items-center justify-evenly !w-full">
      <Image
        src={`/images/misc/others/${cardType.toLowerCase()}.png`}
        alt="mastercard"
        width={200}
        height={200}
        className="w-6 h-6 md:w-10 md:h-10 !mx-1 md:!mr-2.5"
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
        {`${openDigits[0]}****${openDigits[0]}`}
      </Typography>
      <Typography
        variant="body2"
        className="!text-black !text-[12px] md:!text-[13px] !mx-1 md:!mx-2.5"
      >
        {expiry}
      </Typography>
      {!hideDelete && <Chip
        rounded
        size="small"
        skin="light"
        color={status === "Active" ? "success" : "error"}
        label={status}
        className="!mx-1 md:!mx-2.5 !w-16"
        sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
      />
      }
      {!hideDelete && (
        <IconifyIcon
          icon="tabler:trash"
          onClick={() => deleteBilling(id, dispatch)}
          className="!text-red-500 !text-[16px] md:!text-[18px] md:!mx-2 !flex-shrink-0"
        />
      )}
    </Box>
  );
};

const selectedAddressTemplate = () => {
  return (
    <FormControlLabel
      className="!w-full !mb-5"
      key={i}
      label={
        <Box className="flex !w-full justify-between items-start">
          <TitleSubtitle
            title={each.address}
            subtitle={`${each.state}, Nigeria, ${each.postal_code}"`}
            titleClass="!text-[13px]"
          />
          <IconifyIcon
            icon="tabler:trash"
            onClick={() => deleteAddress(each._id, dispatch)}
            className="!text-red-500 !text-[16px] md:!text-[18px] !ml-2 md:!ml-6"
          />
        </Box>
      }
      control={
        <Radio
          onClick={() =>
            selectAsDefault({ field: "address", data: each }, dispatch)
          }
          checked={userInfo?.selectedAddress?._id === each._id}
        />
      }
    />
  );
};
