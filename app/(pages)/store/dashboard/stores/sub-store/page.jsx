"use client";
import { useState } from "react";
import { Typography, Box, Grid, Paper, TextField, Button } from "@mui/material";
import Link from "next/link";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import Image from "next/image";
import themeConfig from "@/app/configs/themeConfig";

import {
  InputBoxWithSideLabel,
  FileUploader,
  OpeningHours,
  SocialMediaConponent,
  StoreBreadCrumb,
  BreadcrumbRightEle,
} from "../component";
import Icon from "@/app/components/icon";
import { storeBottomBar, storeInnerList } from "@/app/data/store/innerList";
import { useStoreData } from "@/app/hooks/useData";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { addSubStore } from "@/app/redux/state/slices/shop/settings/editShop";
import MapGraph from "@/app/components/view/home/Map/map";

const StorePage = ({ params }) => {
  const { storeInfo } = useStoreData();
  const dispatch = useDispatch();
  const { data } = useSWR("/branch/all?sidelist=true");
  const InnerList = data?.data ? data.data : [];
  const path = { ...params, sidebar: "stores" };

  const [inputValues, setValues] = useState({
    branchName: "",
    branchEmail: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    about_store: "",
  });

  const [adminValues, setAdminValues] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...inputValues, [prop]: event.target.value });
  };

  const handleAdminChange = (prop) => (event) => {
    setAdminValues({ ...adminValues, [prop]: event.target.value });
  };

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={{ title: "Store List", content: InnerList }}
      BottomList={storeBottomBar}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[...StoreBreadCrumb, { text: "New Sub-Stores", link: "" }]}
    >
      <Box className="w-full bg-white !rounded-md !px-4 !md:px-5 mt-3 !pb-8 relative">
        <Grid container spacing={2}>
          <Grid item sm={12} md={7} className="md:!pr-16">
            <Box>
              <Box className="flex items-center justify-between">
                <Typography className="font-bold !text-gray-800 text-sm">
                  Creating a Sub-Store
                </Typography>
              </Box>
              <Typography variant="caption" className="!mt-1">
                Edit contact data that will not be visible on store’s profile
              </Typography>
            </Box>

            <Box className="mt-8">
              <Paper
                elevation={0}
                className="border border-dashed w relative rounded-md p-3 w-24 h-24 flex items-center justify-center"
              >
                <Image
                  src={themeConfig.profile}
                  alt="Profile"
                  height="70"
                  width="70"
                  className="!rounded-full"
                />
                <Box
                  className="absolute !bottom-2 !right-4 !rounded-full p-0.5 cursor-pointer text-xs"
                  bgcolor="custom.bodyLight"
                >
                  <Icon icon="tabler:camera" className="text-[15px]" />
                </Box>
              </Paper>
              <Typography className="!text-[12px] !text-gray-400 !mt-2">
                JPG, GIF or PNG, Max size of 500kb
              </Typography>
              <Box className="flex item-center mt-4">
                <Paper className="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                  Change Photo
                </Paper>
                <Paper className="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                  Delete
                </Paper>
              </Box>
            </Box>
            <Box className="!mt-8 !border-b !pb-3">
              <InputBoxWithSideLabel
                value={storeInfo?.profile?.store || ""}
                inputProps={{
                  disabled: true,
                }}
                onChange={() => {}}
                label="Your Store Name"
              />

              <InputBoxWithSideLabel
                value={inputValues.branchName}
                onChange={handleChange("branchName")}
                label="Branch Name"
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Sub-Store Address
              </Typography>
              <Typography variant="caption" className="">
                Is it different from the location of the main store?
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={inputValues.city}
                onChange={handleChange("city")}
                label="City"
              />
              <InputBoxWithSideLabel
                value={inputValues.state}
                onChange={handleChange("state")}
                label="State"
              />
              <InputBoxWithSideLabel
                value={inputValues.address}
                onChange={handleChange("address")}
                label="Address"
              />
              <InputBoxWithSideLabel
                value={inputValues.landmark}
                onChange={handleChange("landmark")}
                label="Closest Bus Stop or Landmark"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Sub-Store Details
              </Typography>
              <Typography variant="caption" className="">
                Describe your sub-store in few words
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={inputValues.branchEmail}
                onChange={handleChange("branchEmail")}
                label="Branch Email"
              />
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                multiline
                value={inputValues.about_store}
                onChange={handleChange("about_store")}
                // defaultValue="About Store: Welcome to Sport Zone, your ultimate destination for all things sports and fitness. We are dedicated to providing athletes and fitness enthusiasts with top-notch sports equipment, apparel, and accessories to help you excel in your game and achieve your fitness goals. At Sport Zone, we understand the importance of having the right gear to enhance your performance. Our extensive collection features top brands and high-quality products that cater to a wide range of sports, including basketball, soccer, tennis, running, and more. Whether you're a professional athlete, a weekend warrior, or a fitness enthusiast, we have everything you need to unleash your full potential."
                id="textarea-outlined"
                maxRows={12}
                minRows={10}
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Sub-Store Admin
              </Typography>
              <Typography variant="caption" className="">
                Set branch admin account
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={adminValues.fullname}
                onChange={handleAdminChange("fullname")}
                label="Fullname"
              />
              <InputBoxWithSideLabel
                value={adminValues.username}
                onChange={handleAdminChange("username")}
                label="Username"
              />
              <InputBoxWithSideLabel
                value={adminValues.email}
                onChange={handleAdminChange("email")}
                label="Email"
              />
              <InputBoxWithSideLabel
                value={adminValues.phoneNumber}
                onChange={handleAdminChange("phoneNumber")}
                label="Phone Number"
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={5} className="!relative !pl-5">
            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Set Map Location
              </Typography>
              <Typography variant="caption" className="">
                Zoom to pin the location of the store
              </Typography>
            </Box>
            {/* <Box className="h-[500px] bg-gray-50 !sticky top-0 md:mt-32">
              <MapGraph
                markers={[
                  {
                    lat: 7.1762595,
                    lng: 4.7260668,
                    info: "Coristen",
                    branchId: "65ac80101cc3db0407fa00c9",
                  },
                ]}
              />
              <h3 className="text-center py-10 hidden"> Map here</h3>
            </Box> */}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="!py-2 !bg-blue-900"
          startIcon={<Icon icon="tabler:device-floppy" />}
          onClick={() =>
            addSubStore(dispatch, {
              staff: adminValues,
              branch: inputValues,
            })
          }
        >
          Create Sub-Store
        </Button>
      </Box>
    </StoreLeftSideBar>
  );
};

export default StorePage;
