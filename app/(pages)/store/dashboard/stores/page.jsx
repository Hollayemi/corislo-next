"use client"
import { Typography, Box, Grid, Paper, Button } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import Image from "next/image";
import themeConfig from "@/app/configs/themeConfig";

const StorePage = ({ params }) => {
  const path={...params, sidebar: "stores"}
  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Box className="w-full bg-white !rounded-md !px-5">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography className="font-bold text-sm">
                Store Profile
              </Typography>
              <Typography variant="caption">
                Edit contact data that will not be visible on store’s profile
              </Typography>
            </Box>

            <Box className="mt-4">
              <Paper
                elevation={0}
                className="border border-dashed rounded-md p-3 w-24 h-24 flex items-center justify-center"
              >
                <Image
                  src={themeConfig.profile}
                  alt="Profile"
                  height="70"
                  width="70"
                  className="!rounded-full"
                />
              </Paper>
              <Typography className="!text-[12px] !text-gray-400 !mt-2">
                JPG, GIF or PNG, Max size of 500kb
              </Typography>
              <Box className="flex item-center mt-4">
                <Paper className="px-4 py-1.5 rounded-md cursor-pointer mr-3">Change Photo</Paper>
                <Paper className="px-4 py-1.5 rounded-md cursor-pointer mr-3">Delete</Paper>
              </Box>
            </Box>
            <Box>
              <Typography></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </Box>
    </StoreLeftSideBar>
  );
}

export default StorePage