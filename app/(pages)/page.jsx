'use client'
import HomeWrapper from '../components/view/home'
import React, { useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import IconifyIcon from '@/app/components/icon'
import {
  FlashSale,
  PopularAds,
  SectionMiddleTitle,
  SectionTitle,
  TopStores,
} from '@/app/components/cards/homeCards'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import {
  HotDeal,
  PopularProduct,
  ProductOnShowcase,
} from '@/app/components/templates/productTemplates'
import CountdownTimer from '@/app/components/cards/countDown'
import {
  TestimonialsComponent,
  WhoIsWaiting,
} from '@/app/components/view/home/Components/Footer'
import useSWR from 'swr'
import { NumberExplained } from '../components/cards/sellerCards'
import useSWRWithCoordinates from '../hooks/fetchWithCoordinates'
import { CircleLoader } from '../components/cards/loader'
import { useRouter } from 'next/navigation'
import { BasicModal } from '../components/cards/popup'
import { WatchVideo } from '../components/cards/watchVideo'

const HomePage = ({ params }) => {
  const [openModal, setOpenModal] = useState(false)
  const {
    data: prods,
    isLoading: prodsLoading,
    status: prodsStatus,
    lat,
    lng,
  } = useSWRWithCoordinates('/products?limit=30')

  const { data: nearStores } = useSWRWithCoordinates(
    '/home/near-stores?limit=20'
  )
  const { data: ads } = useSWR('/home/ads')
  const { data: cates, isLoading: cateLoading } = useSWR(
    '/corisio/all-categories'
  )
  const categories = cates ? cates.data : []
  const products = prods ? prods.data : []
  const popularAds = ads ? ads.data : []
  const stores = nearStores ? nearStores.data : []
  const router = useRouter()

  const [hasContent, hideTitle] = useState({})

  console.log(stores)

  const adImages = {
    follow: 'followers.png',
    url: 'discover-product.png',
    'view-business': 'storeImage.png',
  }

  return (
    <HomeWrapper
      shopMode={params.sm}
      popup={
        <BasicModal
          openModal={openModal}
          toggleModal={() => setOpenModal(false)}
          content={<WatchVideo close={() => setOpenModal(false)} />}
        />
      }
    >
      <Box className="!mb-20 mt-6 md:mt-16">
        <Grid container spacing={2} className="px-4 md:px-10">
          <Grid item xs={12} md={5}>
            <Box className="w-80 flex flex-col justify-end h-full">
              <Typography
                variant="body1"
                className="!text-5xl md:!text-6xl !font-black"
                color="primary"
              >
                Trendy
              </Typography>
              <Typography
                variant="body1"
                className="!text-5xl md:!text-6xl !font-black"
                color="secondary"
              >
                Collection
              </Typography>
              <br />
              <Typography
                variant="body2"
                className="!text-[13px] text-gray-600"
              >
                Prepare yourself for an extraordinary and highly personalized
                shopping journey that seamlessly connects you with the vibrant
                tapestry of your local stores.
              </Typography>

              <Button
                variant="contained"
                onClick={() => router.push('/explore')}
                className="!text-[12px] !text-white !bg-[#fcb415] hover:!bg-[#c99628] transition-all duration-500 !w-40 !h-10 !rounded-full !mt-8 !shadow-none"
              >
                Shop Now
              </Button>

              <Box className="flex items-center !my-6">
                <NumberExplained parent="100K+" small info="Happy Customers" />
                <Box className=""></Box>
                <NumberExplained parent="230" small info="Store Owners" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box className="relative mt-6 md:ml-20">
              <Box className="flex justify-center md:justify-start items-center relative h-[400px]">
                <Image
                  src="/images/more/landingpage.png"
                  alt="home"
                  width={1200}
                  height={1200}
                  className="w-[700px] md:w-[650px] md:-ml-60 bottom-0 relative -mt-28 md:mt-16 z-30  left-0"
                />
              </Box>
              <Box className="bg-yellow-50 shadow-md !rounded-2xl p-2 h-24 w-36 md:h-28 md:w-44 z-40 !absolute !right-0 -top-16">
                <Typography
                  variant="body1"
                  className="!text-2xl md:!text-4xl !font-black !z-30 relative"
                  color="secondary"
                >
                  14K+
                </Typography>
                <Typography
                  variant="caption"
                  className="!text-blue-900 !font-medium !text-[14px] !leading-6"
                >
                  Worldwide Product Sales Per Year
                </Typography>
              </Box>
              <Button
                variant="outlined"
                className="!rounded-full p-2 h-10 w-40 !z-40 !-mr-20 md:!mr-0 !absolute mt-10 !right-1/2 md:!right-2 bottom-0"
                bgcolor="custom.bodyLight"
                startIcon={<IconifyIcon icon="tabler:player-play-filled" />}
                onClick={() => setOpenModal(true)}
              >
                Watch Video
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <Box className="sm:px-5 md:px-14">
          <Box className="!mt-20 lg:!mt-32 px-2 md:px-10">
            <SectionMiddleTitle black="Shop by" blue="Categories" />
            {/* <Box className="flex items-center md:justify-cente overflow-auto pb-5"> */}
            <ReactSlickSlider>
              {categories.map((cate, i) => (
                <Box
                  key={i}
                  className="!flex !flex-col cursor-pointer flex-shrink-0 w-24 py-5 max-w-24 min-w-24 h-[110px] !items-center !text-center !justify-center p-2 bg-white !m-2 !rounded-xl"
                  bgcolor="custom.bodyLight"
                  onClick={() => router.push(`/category/${cate._id}`)}
                >
                  <Image
                    src={cate.icon}
                    alt="category"
                    width={200}
                    height={200}
                    className="w-12 h-12 mb-2 rounded-md"
                  />
                  <Typography
                    variant="caption"
                    className="!text-[11px] text-center !leading-1 !h-6"
                  >
                    {cate.label}
                  </Typography>
                </Box>
              ))}
            </ReactSlickSlider>
            {/* </Box> */}
          </Box>
          <Box className="!my-12 px-2 md:px-10 hidden">
            <ReactSlickSlider config={2}>
              <Box className="w-56 h-40 md:w-[500px] md:h-[350px]">
                <Image
                  src="/images/misc/flyer2.png"
                  alt="flyer"
                  width={500}
                  height={500}
                  className="!w-full !h-full"
                />
              </Box>
              <Box className="w-56 h-40 md:w-[500px] md:h-[350px]">
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
          {/* <Box className="!my-12 px-2 md:px-10">
            <SectionTitle
              black="Professional"
              blue="Services"
              right={
                <Link
                  href="/services"
                  className="!text-[14px] underline underline-offset-4 mb-3"
                >
                  See More
                </Link>
              }
            />

            <ServicesSlider noPopup />
          </Box> */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <Box className="px-2 mt-16 md:px-10">
            <SectionTitle black="Popular" blue="Products" />
            <PopularProduct />
          </Box>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* Flash Sale */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
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
              <ReactSlickSlider config={2}>
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
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* Hot Deal */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <Box className="mt-14">
            <Box className="px-2 md:px-10 ">
              <SectionTitle black="Hot" blue="Deal" />
              <HotDeal />
            </Box>
          </Box>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* Popular Ads */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <Box className="mt-14">
            <Box className="px-2 md:px-10 ">
              {popularAds.length > 0 && (
                <SectionTitle black="Popular" blue="Ads" />
              )}
              <Box className="!mt-6">
                <ReactSlickSlider>
                  {popularAds.map((ad, i) => (
                    <PopularAds
                      store={ad.store}
                      key={i}
                      image={`/images/misc/${adImages[ad.purpose]}`}
                      title={ad.title}
                      brief={ad.brief}
                    />
                  ))}
                </ReactSlickSlider>
              </Box>
            </Box>
          </Box>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* More Products */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <Box className="mt-14">
            <Box className="px-3 md:px-10">
              <SectionTitle black="More" blue="Products" />
              <Box className="!mt-6 flex flex-wrap justify-center">
                {!prodsLoading ? (
                  products?.result?.map((prod, i) => (
                    <ProductOnShowcase
                      key={i}
                      prodName={prod.prodName}
                      prodPrice={prod.prodPrice}
                      image={prod?.images[0]?.image || prod?.images[0]}
                      // image={`/images/more/${i + 1}.png`}
                      star={prod.star}
                      store={prod.store}
                      branch={prod.branch}
                      others={{ ...prod }}
                    />
                  ))
                ) : (
                  <Box className="flex flex-col items-center justify-center my-6">
                    <CircleLoader />
                    <Typography className="!mt-3">{prodsStatus}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/* Top selling Stores */}
          {/*  */}
          {/*  */}
          {/*  */}

          <Box className="mt-14">
            <Box className="px-3 md:px-10">
              {stores.length > 0 && (
                <SectionTitle black="Store" blue="Around You" />
              )}
              <Box className="!mt-6 flex flex-col md:flex-row justify-center">
                <Box className="w-full md:w-2/6 md:pr-6">
                  <Typography
                    variant="body2"
                    className="!text-xl !font-extrabold"
                    color="primary"
                  >
                    {/* Discover Our <br /> Best-Selling Stores */}
                    Discover Stores <br /> Closer to you
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
                    onClick={() => router.push('/explore')}
                  >
                    Shop Now
                  </Button>
                </Box>
                <Box className="w-full md:w-4/6 mt-10 md:mt-0">
                  <ReactSlickSlider>
                    {stores.map((store, i) => (
                      <TopStores
                        name={store.businessName}
                        store={store.store}
                        branch={store.branch}
                        key={i}
                        followers={store.followers}
                        rating={store?.feedback?.averageRating}
                        image={
                          store.profile_image || '/images/misc/storeImage.png'
                        }
                      />
                    ))}
                  </ReactSlickSlider>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex justify-center my-16 w-full px-2">
            <Box
              className="flex flex-col md:flex-row items-center p-4 py-10 md:w-full lg:w-4/5 !rounded-xl"
              bgcolor="custom.pri"
            >
              <Box className="flex-shrink-0 flex justify-center w-full md:w-auto">
                <Image
                  src="/images/misc/storeImage.png"
                  alt="flyer"
                  width={400}
                  height={400}
                  className="w-full md:!w-[450px] lg:!w-[500px] md:h-[400px] md:-ml-16 -mb-14 !rounded-full flex-shrink-0 -mt-6"
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
          <br />
          <br />
          <Box className="px-2 md:px-16 mt-4">
            <SectionTitle black="What our" blue="Customers has to say" />
            <br />
            <br />
            <TestimonialsComponent />
            <Box className="flex justify-center">
              <WhoIsWaiting />
            </Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default HomePage
