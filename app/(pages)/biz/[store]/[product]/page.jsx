"use client";
import Chip from "@/app/components/chip";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { productSizes } from "@/app/data/store/productData";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Grid, Rating, Tab, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProdDescription } from "./tabs";
import { SectionTitle } from "@/app/components/cards/homeCards";
import { hotDealData, popularProducts } from "@/app/data/home/homepage";
import {
  HotDeal,
  PopularProduct,
} from "@/app/components/templates/productTemplates";
import { ReviewTab } from "./reviewTab";
import useSWR from "swr";
import { removeOrAddToArray } from "@/app/utils/arrayFunctions";
import { useDispatch } from "react-redux";
import {
  addCartHandler,
  saveProduct,
} from "@/app/redux/state/slices/home/cart";
import { useUserData } from "@/app/hooks/useData";
import { addNewViewProduct } from "@/app/redux/state/slices/home/view/view";
import { ProductSellerCard } from "@/app/components/cards/seller/product.sellercard";


const ProductDisplay = ({ params }) => {
  const dispatch = useDispatch();
  const { product: prodNameParam } = params;
  const { cartedProds } = useUserData();
  console.log(prodNameParam.split("%2B").join(" "));
  const { data: prod, error } = useSWR(
    `/products?prodName=${prodNameParam.split("%2B").join(" ")}`
  );
  const product = prod ? prod?.data[0] : {};
  const ImagesArray = [1, 2, 3, 4, 5, 6, 7];
  // ** State
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [value, setTabValue] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredSizes = productSizes.filter(
    (obj) => obj.size.split("-")[0] === "EU"
  );

  useEffect(() => {
    addNewViewProduct(
      {
        productId: product?._id,
        branchId: product?.branchId,
        store: product?.store,
        branch: product?.branches,
      },
      dispatch
    );
  }, [product]);

  const payload = {
    productId: product?._id,
    variation: {
      size: size,
      color: colors,
    },
    store: product?.store,
    branch: product?.branches,
  };

  const colorArray = [
    "#eefabb",
    "#aecabb",
    "#eabdbb",
    "#beea45",
    "#afedda",
    "#34ee",
    "#000",
  ];

  const [showingImage, showImage] = useState(null);
  return (
    <HomeWrapper>
      <Box className="!px-2 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box className="w-full">
              <Box className="!rounded-xl overflow-hidden mb-3 md:mb-6">
                <img
                  src={showingImage || "/images/misc/about-image.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="m-3 md:m-0 flex-shrink-0 w-full h-[400px]"
                />
              </Box>
              <Box className="flex w-full px-6 justify-center">
                <Box className="md:mt-0 w-full md:block md:w-10/12">
                  <ReactSlickSlider noArrowStyle>
                    {ImagesArray.map((item, i) => (
                      <img
                        src={`/images/more/${i + 1}.png`}
                        key={i}
                        onClick={() => showImage(`/images/more/${i + 1}.png`)}
                        alt=""
                        width={150}
                        height={150}
                        className="m-1 md:mb-0 !w-16 !h-16 !rounded-md"
                      />
                    ))}
                  </ReactSlickSlider>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="body2" className="!font-semibold !text-xl">
              {product.prodName}
            </Typography>

            <Box className="w-full mt-5 flex flex-wrap">
              <TitleValue
                title="Collection"
                value={product.collectionName || "Flangesio"}
              />
              <TitleValue
                title="Category"
                value={product.category || "Clothing and Fashion"}
              />
              <TitleValue
                title="Sub-Category"
                value={product.subCollectionName || "Shoes"}
              />
              <TitleValue
                title="Classes"
                value={product.group || "Men’s Shoes"}
              />
              <Box className="w-1/2 mt-1 flex items-center">
                <Box className="w-20">
                  <Typography variant="caption" className="!text-gray-400">
                    Rating ({product?.totalReviews?.toLocaleString() || 0})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" className="!text-black">
                    {product?.star ? (
                      <Rating
                        defaultValue={product.star || 0}
                        className=" mt-2"
                        name="size-small"
                        size="small"
                      />
                    ) : (
                      <Rating
                        defaultValue={0}
                        className=" mt-2"
                        name="size-small"
                        size="small"
                      />
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="w-1/2 mt-1 flex items-center">
                <Box className="w-6">
                  <Typography variant="caption" className="!text-gray-400">
                    <IconifyIcon
                      icon="tabler:heart"
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </Typography>
                </Box>
                <Box onClick={() => saveProduct(payload, dispatch)}>
                  <Typography variant="caption" className="!text-black">
                    Add to wishlist
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="bg-white w-full rounded-xl p-4 mt-4">
              <Typography variant="caption" className="!font-bold">
                Colors Available
              </Typography>
              <Box className="flex items-center mb-1.5">
                {colorArray.map((col, i) => (
                  <Box
                    key={i}
                    bgcolor={col}
                    onClick={() => removeOrAddToArray(col, colors, setColors)}
                    className={`w-4 h-4 rounded-full m-1.5 flex items-center justify-center`}
                  >
                    {colors.includes(col) && (
                      <img
                        src="/images/misc/check.png"
                        alt="."
                        className="w-2.5 h-2.5"
                      />
                    )}
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" className="!font-bold">
                Sizes Available
              </Typography>
              <Box className="flex items-center flex-wrap mb-5">
                {product?.specifications?.size?.map(
                  (each, i) =>
                    i < 7 && (
                      <Chip
                        onClick={() => setSize(each)}
                        bgcolor="#000"
                        sx={{ margin: 0.5, borderRadius: "5px" }}
                        className={`hover:!text-white ${
                          size === each && "!bg-blue-900 !text-white"
                        }`}
                        label={
                          <Box className="flex items-center ">
                            {each}
                            {/* <IconifyIcon
                              icon="tabler:x"
                              fontSize={20}
                              className="ml-2"
                            /> */}
                          </Box>
                        }
                        key={i}
                        skin="light"
                        color="primary"
                      />
                    )
                )}
              </Box>

              <Box className="flex items-center flex-wrap justify-center">
                <Typography
                  variant="body2"
                  className="!font-black !text-black !text-2xl !mr-3 !my-3"
                >
                  NGN{product?.prodPrice?.toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  className="!rounded-full h-10 !w-44 !shadow-none !mx-1 !text[10px] !my-3"
                  onClick={() => addCartHandler(payload, dispatch)}
                  startIcon={
                    <IconifyIcon
                      icon="tabler:shopping-cart"
                      className="!text-blue-800 !text-white"
                    />
                  }
                >
                  {cartedProds.includes(product?._id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </Button>
                <Button
                  startIcon={
                    <IconifyIcon
                      icon="tabler:wallet"
                      className="!text-blue-800  !ml-3"
                    />
                  }
                  variant="outlined"
                  className="!rounded-full h-10 w-32 !border !border-blue-800 !text-blue-800 !shadow-none !text[11px] !bg-white !my-3"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            <ProductSellerCard branchId={product?.branchId} />
          </Grid>
        </Grid>

        <Box className="w-full bg-white !rounded-md py-5 px-3 mt-5">
          <TabContext value={value}>
            <TabList
              orientation="horizontal"
              onChange={handleChangeTab}
              className="flex-shrink-0 border-b"
              aria-label="Product Page"
            >
              <Tab
                value="1"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Product Description
                  </Typography>
                }
              />
              <Tab
                value="2"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Specifications
                  </Typography>
                }
              />
              <Tab
                value="3"
                label={
                  <Typography
                    variant="body2"
                    className="!text-xs md:!w-44 !font-bold !text-left"
                  >
                    Customer Reviews
                  </Typography>
                }
              />
            </TabList>
            <TabPanel value="1" className="!px-3">
              <ProdDescription />
            </TabPanel>
            <TabPanel value="2"></TabPanel>
            <TabPanel value="3" className="!px-3">
              <ReviewTab />
            </TabPanel>
          </TabContext>
        </Box>

        <Box className="mt-16">
          <SectionTitle black="More items from this seller" />
          <ReactSlickSlider>
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
        <Box className="mt-8">
          <SectionTitle black="You may also like" />
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
    </HomeWrapper>
  );
};

export default ProductDisplay;

const TitleValue = ({ title, value }) => (
  <Box className="w-fit md:w-1/2 flex items-center">
    <Box className="md:w-16 md:w-28">
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-400 !leading-5"
      >
        {title}
      </Typography>
    </Box>
    <Box>
      <Typography
        variant="body2"
        className="!text-black !text-[12px] !leading-5 !ml-2 md:!ml-0 !mr-5 md:!mr-0 "
      >
        {value}
      </Typography>
    </Box>
  </Box>
);