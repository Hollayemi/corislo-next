"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Upload } from "@mui/icons-material";
import ProfilePictureUploader from "@/app/components/cards/fileUpload";
import { useDispatch } from "react-redux";
import { MyTextField, TitleSubtitle } from "@/app/(pages)/(users)/user/components";
import { useStoreData } from "@/app/hooks/useData";
import { updateStaff, updateStaffPicture } from "@/app/redux/state/slices/shop/branches/staffs";
import useSWR from "swr";

const StaffSettings = () => {
  const { setLoading, showSnackbar } = useStoreData()
  const { data } = useSWR(`branch/staff`);
  const myAccount = data?.data || {};
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [localFile, setLocalFiles] = useState("");


  const [staff, setStaffInfo] = useState({
    firstname: "",
    lastname: "",
    state: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      const splitFullname = myAccount?.fullname?.split(" ") || [];
      setStaffInfo({
        firstname: splitFullname[0] || "",
        lastname: splitFullname[1] || "",
        state: myAccount?.state || "",
        phone: myAccount.phone || "",
      });
    }
  }, [data]);

  const handleChange =
    (prop) =>
      ({ target }) => {
        setStaffInfo((prev) => {
          return { ...prev, [prop]: target.value };
        });
      };

  const updateBtn = () => {
    updateStaffPicture(
      { picture: files[0], state: "add" },
      dispatch,
      setLoading
    );
  };
  const deletePicBtn = () => {
    updateStaffPicture({ state: "remove" }, dispatch, setLoading);
  };
  return (
    <Box className="">
      <TitleSubtitle
        title="My Profile"
        subtitle="Get an oversee of your account and see if they are all correct"
      />
      <Box className="flex items-center my-6">
        <Box className="relative">
          <ProfilePictureUploader
            setFiles={setFiles}
            setLocalFiles={setLocalFiles}
            component={
              <Box className="relative w-24 h-24">
                <img
                  src={
                    localFile
                      ? URL?.createObjectURL(localFile[0])
                      : myAccount.picture || "/images/misc/no-profile.png"
                  }
                  alt="profile.png"
                  width={250}
                  height={250}
                  className="w-24 h-24 !rounded-full"
                />
                <Box className="flex items-center justify-center w-full h-full rounded-full absolute top-0 left-0 !text-white">
                  <Box className="w-full h-full rounded-full bg-black opacity-30 absolute top-0 left-0"></Box>
                  <Upload className="!text-white z-50" />
                </Box>
              </Box>
            }
          />

          <Typography variant="caption" noWrap className="!text-[10px]">
            Drag and drop image
          </Typography>
        </Box>
        <Box className="ml-6">
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[15px]"
          >
            Profile Picture
          </Typography>
          <Typography variant="body2" className="!text-[10px] !text-gray-500">
            PNG, JPEG under 2mb
          </Typography>
          <Box className="flex items-center mt-3">
            <Button
              className="!w-24 !h-7 !mr-2 !rounded-full !shadow-none !text-[10px]"
              variant="contained"
              onClick={updateBtn}
            >
              Upload New
            </Button>
            <Button
              className="!w-20 !h-7 !mr-2 !rounded-full !shadow-none !text-[10px]"
              variant="outlined"
              onClick={deletePicBtn}
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
            value={staff.firstname || ""}
            PClassName="w-full md:w-auto"
            onChange={handleChange("firstname")}
          />
          <MyTextField
            title="Last Name"
            value={staff.lastname || ""}
            PClassName="w-full md:w-auto"
            onChange={handleChange("lastname")}
          />
          <MyTextField
            title="Phone number"
            value={staff?.phone}
            PClassName="w-full md:w-auto"
            onChange={handleChange("phone")}
          />
        </Box>
        <Box className="flex items-center justify-between flex-wrap">
          <MyTextField
            title="State"
            value={staff?.state}
            PClassName="w-full md:w-auto"
            onChange={handleChange("state")}
          />
          {/* <SelectCities /> */}
          <Button
            className="!w-full md:!w-60 !h-10 !rounded !shadow-none !text-[14px]"
            variant="contained"
            onClick={() =>
              updateStaff(
                dispatch,
                {
                  phone: staff.phone,
                  state: staff.state,
                  fullname: `${staff.lastname} ${staff.firstname}`,
                },
                showSnackbar
              )
            }
          >
            Update Data
          </Button>
        </Box>
      </Box>
      {/* <Box className="mt-8 w-full md:w-[370px] bg-red-100 md:bg-transparent border md:border-0 py-4 !px-2">
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
      </Box> */}
    </Box>
  );
};

export default StaffSettings;
