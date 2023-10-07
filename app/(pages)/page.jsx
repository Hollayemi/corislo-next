"use client";

import { useSelector } from "react-redux";
import HomeWrapper from "../components/wrapper/Home/page";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "../components/icon";
import { SectionMiddleTitle } from "../components/cards/homeCards";
import { categoryData } from "../data/home/homepage";

const HomePage = () => {
  const info = useSelector((state) => state);
  console.log(info);

  return (
    <HomeWrapper>
      <Box className="!mb-20 mt-16 px-10 ">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box className="w-80 flex flex-col justify-end h-full">
              <Typography
                variant="body1"
                className="!text-6xl !font-black"
                color="primary"
              >
                Trendy
              </Typography>
              <Typography
                variant="body1"
                className="!text-6xl !font-black"
                color="secondary"
              >
                Collection
              </Typography>
              <br />
              <Typography
                variant="body2"
                className="!text-[13px] text-gray-500"
              >
                Prepare yourself for an extraordinary and highly personalized
                shopping journey that seamlessly connects you with the vibrant
                tapestry of your local stores.
              </Typography>

              <Button
                variant="contained"
                bgcolor="custom.sec"
                className="!text-[10px] !w-40 !h-10 !rounded-full !mt-10"
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box className="relative">
              <Box className="flex justify-center md:justify-start items-center relative h-[400px]">
                <Box
                  bgcolor="custom.pri"
                  className="!w-[200px] !h-[200px] lg:!w-[300px] lg:!h-[300px] rounded-full absolute -bottom-2 lg:-bottom-10 -left-20"
                ></Box>
                <Box
                  bgcolor="custom.sec"
                  className="!w-[300px] !h-[300px] lg:!w-[400px] lg:!h-[400px] rounded-full absolute top-0 left-0"
                ></Box>
                <Image
                  src="/images/more/home3-img.png"
                  alt="home"
                  width={800}
                  height={800}
                  className="w-[400px] lg:w-[500px] bottom-0 relative mt-16 -ml-24 z-30  left-0"
                />
              </Box>
              <Box className="bg-yellow-50 shadow-md !rounded-md p-2 h-28 w-36 absolute right-10 top-6">
                <Typography
                  variant="body1"
                  className="!text-4xl !font-black"
                  color="secondary"
                >
                  14K+
                </Typography>
                <Typography variant="caption" className="">
                  Worldwide Product Sales Per Year
                </Typography>
              </Box>
              <Button
                variant="outlined"
                className="!rounded-full p-2 h-10 w-40 !absolute !right-4 bottom-6"
                startIcon={<IconifyIcon icon="tabler:search" />}
              >
                Watch Video
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="!mt-28">
          <SectionMiddleTitle black="Shop by" blue="Categories" />
          <Box className="flex items-center justify-center">
            {categoryData.map((cate, i) => (
              <Box
                key={i}
                className="flex flex-col flex-shrink-0 w-24 h-24 items-center justify-center p-2 bg-white !m-2 !rounded-xl"
                bgcolor="custom.bodyLight"
              >
                <Image
                  src={cate.img}
                  alt="category"
                  width={200}
                  height={200}
                  className="w-10 h-10 mb-2"
                />
                <Typography variant="caption" className="!text-[11px] text-center">{cate.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default HomePage;
