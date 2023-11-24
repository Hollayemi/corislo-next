"use client"
import { useState } from "react";
import { Typography, Box, Grid, Paper, TextField, Button } from "@mui/material";
import Link from "next/link"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import Image from "next/image";
import themeConfig from "@/app/configs/themeConfig";

import {
  InputBoxWithSideLabel,
  FileUploader,
  OpeningHours,
  SocialMediaConponent,
} from "./component";
import Icon from "@/app/components/icon";
import { storeBottomBar, storeInnerList } from "@/app/data/store/innerList";
import { useStoreData } from "@/app/hooks/useData";

const StorePage = ({ params }) => {
  const { storeInfo } = useStoreData();
  const [openHours, setOpenHours] = useState({})
  const [socialMedia, setSocialMedia] = useState({});
  const [files, setFiles] = useState([]);
  const path={...params, sidebar: "stores"}

  const [inputValues, setValues] = useState({
    store: storeInfo?.profile?.store || "",
    address: storeInfo?.profile?.address || "",
    city: storeInfo?.profile?.city || "",
    bus_stop: storeInfo?.profile?.bus_stop || "",
    about_store: storeInfo?.profile?.about_store || "",
    social_media: "",
    opening_hours: openHours,
  });
  
  console.log(inputValues);
  console.log(storeInfo);
  
  const handleChange = (prop) => (event) => {
    setValues({ ...inputValues, [prop]: event.target.value });
  };

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={storeInnerList}
      BottomList={storeBottomBar}
    >
      <Box className="px-10 !hidden sm:!flex z-50 -mt-7">
        <Typography className="pb-1 border-b-2 cursor-pointer text-sm font-bold w-24 text-center border-blue-900">
          Store Profile
        </Typography>
        <Link href="/store/dashboard/stores/settings">
          <Typography className="pb-1 border-b-2 cursor-pointer text-sm font-bold w-28 !ml-6 text-center border-transparent">
            Store Settings
          </Typography>
        </Link>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4 !mt-4 !md:px-5 !pb-8">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Box className="flex items-center justify-between">
                <Typography className="font-bold text-sm">
                  Store Profile
                </Typography>
                <Button
                  variant="contained"
                  className=" bg-blue-900 md:hidden"
                  startIcon={<Icon icon="tabler:plus" />}
                >
                  Add Store
                </Button>
              </Box>
              <Typography variant="caption">
                Edit contact data that will not be visible on store’s profile
              </Typography>
            </Box>

            <Box className="mt-4">
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
                <Paper className="px-4 py-1.5 rounded-md cursor-pointer mr-3">
                  Change Photo
                </Paper>
                <Paper className="px-4 py-1.5 rounded-md cursor-pointer mr-3">
                  Delete
                </Paper>
              </Box>
            </Box>
            <Box className="!mt-8 !border-b !pb-3">
              <InputBoxWithSideLabel
                value={inputValues.store}
                onChange={handleChange("store")}
                label="Your Store Name"
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="font-bold text-sm">
                Store Address
              </Typography>
              <Typography variant="caption" className="">
                Where is your store situated
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={inputValues.city}
                onChange={handleChange("city")}
                label="City"
              />
              <InputBoxWithSideLabel
                value={inputValues.address}
                onChange={handleChange("address")}
                label="Address"
              />
              <InputBoxWithSideLabel
                value={inputValues.bus_stop}
                onChange={handleChange("bus_stop")}
                label="Closest Bus Stop or Landmark"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="font-bold text-sm">
                About the store
              </Typography>
              <Typography variant="caption" className="">
                Write a little bit about your store
              </Typography>
              <br />
              <br />
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
              <Typography className="font-bold text-sm">
                Store Gallery
              </Typography>
              <Typography variant="caption" className="">
                Your first picture will be automatically set as the main photo.
              </Typography>
              <br />
              <br />
              <FileUploader files={files} setFiles={setFiles} />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="font-bold text-sm">
                Social Media Integration
              </Typography>
              <Typography variant="caption" className="">
                Get to connect your store with your social media
              </Typography>
              <br />
              <br />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Facebook"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Instagram"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Twitter"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Tik Tok"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="font-bold text-sm">
                Opening Hours
              </Typography>

              <br />
              <br />
              <OpeningHours
                label="Monday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Tuesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Wednesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Thursday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Friday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Saturday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Sunday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="!py-2 !bg-blue-900"
              startIcon={<Icon icon="tabler:device-floppy" />}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="!hidden md:!flex justify-end mb-32">
              <Button
                variant="contained"
                className="mr-4 bg-blue-900"
                startIcon={<Icon icon="tabler:plus" />}
              >
                Add Store
              </Button>
            </Box>
            <Box className="h-[500px] bg-gray-50 ">
              <h3 className="text-center py-10"> Map here</h3>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StoreLeftSideBar>
  );
}

export default StorePage