import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { MyTextField, TitleSubtitle } from "./components";
import { useUserData } from "@/app/hooks/useData";

const AccountingSettings = () => {
  const { userInfo } = useUserData();
  console.log(userInfo);
  const splitFullname = userInfo?.fullname?.split(" ");
  return (
    <Box className="">
      <TitleSubtitle
        title="My Profile"
        subtitle="Get an oversee of your account and see if they are all correct"
      />
      <Box className="flex items-center my-6">
        <Image
          src="/images/avatar/1.png"
          alt="settings.png"
          width={250}
          height={250}
          className="w-24 h-24 !rounded-full"
        />
        <Box className="ml-6">
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[15px]"
          >
            Profile Picture
          </Typography>
          <Typography variant="body2" className="!text-[10px] !text-gray-500">
            PNG, JPEG under 10mb
          </Typography>
          <Box className="flex items-center mt-3">
            <Button
              className="!w-24 !h-7 !mr-2 !rounded-full !shadow-none !text-[10px]"
              variant="contained"
            >
              Upload New
            </Button>
            <Button
              className="!w-20 !h-7 !mr-2 !rounded-full !shadow-none !text-[10px]"
              variant="outlined"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="w-full lg:w-10/12">
        <Box className="flex items-center justify-between flex-wrap w-full">
          <MyTextField
            title="First Name"
            value={splitFullname[0] || ""}
            PClassName="w-full md:w-auto"
          />
          <MyTextField
            title="Last Name"
            value={splitFullname[1] || ""}
            PClassName="w-full md:w-auto"
          />
          <MyTextField
            title="Email Address"
            value={userInfo?.email}
            PClassName="w-full md:w-auto"
          />
        </Box>
        <Box className="flex items-center justify-between flex-wrap">
          <MyTextField
            title="Phone number"
            value={userInfo?.phoneNumber}
            PClassName="w-full md:w-auto"
          />
          <MyTextField title="City" PClassName="w-full md:w-auto" />
          <Button
            className="!w-full md:!w-60 !h-10 !rounded !shadow-none !text-[14px]"
            variant="contained"
          >
            Update Data
          </Button>
        </Box>
      </Box>
      <Box className="mt-8 w-full md:w-[370px] bg-red-100 md:bg-transparent border md:border-0 py-4 px-2">
        <Typography
          variant="body2"
          className="!font-bold !text-black !text-[16px]"
        >
          Delete Account
        </Typography>
        <Typography
          variant="body2"
          className="!text-[11px] !text-gray-400 !mt-1"
        >
          When you delete your account, you loose access to your account
          services, and we permanently delete your personal data, You can cancel
          the deletion for 14 days.
        </Typography>
        <Button
          className="!w-full md:!w-32 !h-8 !bg-red-500 !text-white !rounded-full !shadow-none md:!text-[10px] !mt-3"
          variant="contained"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default AccountingSettings;
