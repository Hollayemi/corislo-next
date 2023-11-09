"use client";

import { useSelector } from "react-redux";
import HomeWrapper from "../components/view/home";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "../components/icon";
import {
  FlashSale,
  PopularAds,
  SectionMiddleTitle,
  SectionTitle,
  TopStores,
} from "../components/cards/homeCards";
import {
  categoryData,
  hotDealData,
  moreProducts,
  popularAdsData,
  popularProducts,
  topStoresData,
} from "../data/home/homepage";
import ReactSlickSlider from "../components/wrapper/react-slick";
import {
  HotDeal,
  PopularProduct,
  ProductOnShowcase,
} from "../components/templates/productTemplates";
import CountdownTimer from "../components/cards/countDown";

const HomePage = () => {
  const info = useSelector((state) => state);
  console.log(info);

  return (
    <HomeWrapper>
      <Box className="!mb-20 mt-6 md:mt-16">
        <Grid container spacing={2} className="px-4 md:px-10">
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
            <Box className="relative md:ml-20">
              <Box className="flex justify-center md:justify-start items-center relative h-[400px]">
                <Image
                  src="/images/more/landingpage.png"
                  alt="home"
                  width={1200}
                  height={1200}
                  className="w-[700px] md:w-[650px] md:-ml-60 bottom-0 relative -mt-28 md:mt-16 z-30  left-0"
                />
              </Box>
              <Box className="bg-yellow-50 shadow-md !rounded-md p-2 h-24 w-52 md:h-28 md:w-36 absolute !z-30 left-0 md:left-auto md:!right-10 -bottom-2">
                <Typography
                  variant="body1"
                  className="!text-2xl md:!text-4xl !font-black !z-30 relative"
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
                className="!rounded-full p-2 h-10 w-40 !z-30 !absolute !right-2 -top-14"
                bgcolor="custom.bodyLight"
                startIcon={<IconifyIcon icon="tabler:player-play-filled" />}
              >
                Watch Video
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="!mt-28 px-2 md:px-10">
          <SectionMiddleTitle black="Shop by" blue="Categories" />
          <Box className="flex items-center justify-center overflow-auto pb-5">
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
                <Typography
                  variant="caption"
                  className="!text-[11px] text-center"
                >
                  {cate.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="!my-8 px-2 md:px-10 ">
          <SectionTitle black="Popular" blue="Products" />
          <ReactSlickSlider>
            <Box className="w-56 h-28 md:w-[500px] md:h-auto">
              <Image
                src="/images/misc/flyer2.png"
                alt="flyer"
                width={500}
                height={500}
                className="!w-full !h-full"
              />
            </Box>
            <Box className="w-56 h-28 md:w-[500px] md:h-auto">
              <Image
                src="/images/misc/flyer2.png"
                alt="flyer"
                width={500}
                height={500}
                className="!w-full !h-full"
              />
            </Box>
          </ReactSlickSlider>
        </Box>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="px-2 md:px-10">
          <SectionTitle black="Popular" blue="Products" />
          <ReactSlickSlider>
            <br />
            {popularProducts.map((prod, i) => (
              <PopularProduct
                key={i}
                image={prod.image}
                prodName={prod.prodName}
                price={prod.price}
              />
            ))}
          </ReactSlickSlider>
        </Box>
        {/*  */}
        {/* Flash Sale */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="mt-14">
          <Box className="px-2 md:px-10 mt-4 ">
            <SectionTitle black="Flash" blue="Sale" />
            <br />
            <CountdownTimer initialDate={new Date()} daysToCount={5} />
            <br />
          </Box>

          <Box className="bg-yellow-50 mt-8 py-16">
            <ReactSlickSlider>
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
              <FlashSale />
            </ReactSlickSlider>
          </Box>
        </Box>
        {/*  */}
        {/* Hot Deal */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="mt-14">
          <Box className="px-2 md:px-10 ">
            <SectionTitle black="Hot" blue="Deal" />

            <ReactSlickSlider>
              {hotDealData.map((prod, i) => (
                <HotDeal
                  key={i}
                  image={prod.image}
                  prodName={prod.prodName}
                  price={prod.price}
                  unit={prod.unit}
                  of={prod.of}
                />
              ))}
            </ReactSlickSlider>
          </Box>
        </Box>
        {/*  */}
        {/* Popular Ads */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="mt-14">
          <Box className="px-2 md:px-10 ">
            <SectionTitle black="Popular" blue="Ads" />
            <Box className="!mt-6">
              <ReactSlickSlider>
                {popularAdsData.map((ad, i) => (
                  <PopularAds
                    store={ad.store}
                    key={i}
                    image={ad.image}
                    title={ad.title}
                    discount={ad.discount}
                  />
                ))}
              </ReactSlickSlider>
            </Box>
          </Box>
        </Box>
        {/*  */}
        {/* More Products */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="mt-14">
          <Box className="px-3 md:px-10">
            <SectionTitle black="More" blue="Products" />
            <Box className="!mt-6 flex flex-wrap justify-center">
              {moreProducts.map((prod, i) => (
                <ProductOnShowcase
                  key={i}
                  prodName={prod.prodName}
                  prodPrice={prod.prodPrice}
                  image={`/images/more/${i + 1}.png`}
                  star={prod.star}
                  store={prod.store}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {/*  */}
        {/* Top selling Stores */}
        {/*  */}
        {/*  */}
        {/*  */}

        <Box className="mt-14">
          <Box className="px-3 md:px-10">
            <SectionTitle black="Top" blue="Selling Stores" />
            <Box className="!mt-6 flex flex-col md:flex-row justify-center">
              <Box className="w-full md:w-2/6">
                <Typography
                  variant="body2"
                  className="!text-xl !font-extrabold"
                  color="primary"
                >
                  Discover Our <br /> Best-Selling Stores
                </Typography>
                <br />
                <Typography variant="caption" className="" color="black">
                  Explore a curated selection of top-rated stores offering the
                  finest products and exceptional service.
                </Typography>
                <br />
                <Button
                  variant="contained"
                  className="!mt-4 !shadow-none !text-[11px] !h-10 !w-28 !rounded-full"
                >
                  Shop Now
                </Button>
              </Box>
              <Box className="w-full md:w-4/6 mt-10 md:mt-0">
                <ReactSlickSlider>
                  {topStoresData.map((store, i) => (
                    <TopStores
                      name={store.name}
                      key={i}
                      followers={store.followers}
                      rating={store.rating}
                      image={store.image}
                    />
                  ))}
                </ReactSlickSlider>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex justify-center my-16 w-full px-2">
          <Box
            className="flex flex-col md:flex-row items-center p-4 py-10 md:w-3/5 !rounded-xl"
            bgcolor="custom.pri"
          >
            <Box className="flex-shrink-0 flex justify-center w-full md:w-auto">
              <Image
                src="/images/misc/storeImage.png"
                alt="flyer"
                width={400}
                height={400}
                className="w-full md:!w-[500px] md:h-[400px] md:-ml-16 -mb-14 !rounded-full flex-shrink-0 -mt-6"
              />
            </Box>
            <Box className="mt-16 md:mt-0">
              <Typography
                variant="body2"
                className="!text-2xl !font-black"
                color="white"
              >
                Join our <br className="hidden md:block" /> Community of
              </Typography>
              <Typography
                variant="body2"
                className="!text-2xl !font-black !mb-3"
                color="secondary"
              >
                Sellers!
              </Typography>

              <Typography
                variant="caption"
                className="!text-[11px]"
                color="white"
              >
                Are you a local business owner with a burning ambition to take
                your business to the next level? Do you dream of reaching a
                broader audience and sharing your unique products with the
                world?
              </Typography>
              <br />

              <Button
                variant="contained"
                className="!text-[10px] !bg-yellow-600 h-10 !mt-5 w-36 !shadow-none !rounded-full"
              >
                Become a Seller
              </Button>
              <Button
                variant="outlined"
                className="!text-[9px] !text-white !mt-5 w-32 !shadow-none"
              >
                How it works
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default HomePage;
