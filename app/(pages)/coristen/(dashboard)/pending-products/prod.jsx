"use client";
import Chip from "@/app/components/chip";
import IconifyIcon from "@/app/components/icon";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { mySubstring } from "@/app/utils/format";
import { verifyAction } from "@/app/redux/state/slices/super/actions";

const PendingProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const {
    data: prod,
    isLoading,
    error,
  } = useSWR(`/products?productId=${productId}`);

  console.log(prod);
  const product = prod?.data ? prod?.data?.result[0] : {};
  console.log(product);
  const ImagesArray = [1, 2, 3, 4, 5, 6, 7];
  // ** State
  const [size, setSize] = useState("");
  const [more, setMore] = useState({
    variation: 7,
  });

  const otherVariations = Object.keys(
    product?.specifications?.variations || {}
  );

  const payload = {
    store: product.store,
    branch: product.branch,
    name: product.prodName,
    comment,
    _id: product._id,
  };

  const [showingImage, showImage] = useState(null);
  return (
    <Box className="!px-2 sm:!px-16 md:!px-16  md:!py-7 bg-white rounded-lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box className="w-full !max-w-[430px]">
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
          <Box className="md:pl-4">
            <Typography
              variant="body2"
              className="!font-semibold !text-xl !text-black"
            >
              {product.prodName}
            </Typography>

            <Box className="w-full mt-5 flex flex-wrap !max-w-[430px]">
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
              <Box>
                {product.discount && (
                  <Box className="flex items-center mt-3">
                    <Box className="h-5 w-fit px-2 min-w-20 bg-red-500 rounded flex justify-center items-center">
                      <Typography
                        variant="body2"
                        className="!text-white !text-[11px]"
                      >
                        {mySubstring(product.discountTitle, 20)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      className="!text-black !text-[12px] !ml-3"
                    >
                      {product.discount}% discount
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <br />

            <Typography
              variant="caption"
              className="!text-gray-500 !text-[12px] !mr-3 !mt-7"
            >
              Price
            </Typography>
            <Typography
              variant="body2"
              className="!font-black !text-black !text-2xl !mr-3 !mb-3"
            >
              NGN{product?.prodPrice?.toLocaleString()}
            </Typography>

            <Box className="bg-white w-full rounded-xl  mt-4 !max-w-[430px]">
              {/* sizes */}
              {product?.specifications?.size?.length && (
                <Box>
                  <Typography
                    variant="body2"
                    className="!font-bold text-center !mb-2"
                  >
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
                </Box>
              )}

              {otherVariations.length > 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    className="!font-bold text-center !mb-2"
                  >
                    Other Variations
                  </Typography>
                  <Box className="w-full mt-5 flex flex-wrap !max-w-[430px]">
                    {otherVariations?.map((each, i) => (
                      <TitleValue
                        title={each.replaceAll("_", " ") + ":"}
                        value={
                          Object.values(
                            product?.specifications?.variations || {}
                          )[i]
                        }
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="px-4 mt-4">
            <TextField
              multiline
              fullWidth
              minRows={4}
              maxRows={6}
              onChange={(e) => setComment(e.target.value)}
              label="Leave a comment"
              placeholder="Give a reashon ..."
            />
            <Box className="flex items-center flex-wrap justify-center mt-4">
              <Button
                variant="contained"
                className="!rounded-md h-10 !w-32 !shadow-none !mx-1 !text[10px] !my-3"
                onClick={() =>
                  verifyAction(dispatch, { ...payload, status: "approved" })
                }
                startIcon={
                  <IconifyIcon
                    icon="tabler:check"
                    className="!text-white !text-[20px]"
                  />
                }
              >
                Approve
              </Button>
              <Button
                startIcon={
                  <IconifyIcon
                    icon="tabler:x"
                    className="!text-white !text-[20px] !ml-3"
                  />
                }
                onClick={() => {
                  verifyAction(dispatch, { ...payload, status: "rejected" });
                  setComment("")
                }}
                variant="contained"
                className="!rounded-md h-10 w-32 !border !bg-red-500 !text-white !shadow-none !text[11px] !my-3"
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PendingProduct;

const TitleValue = ({ title, value }) => (
  <Box className="w-fit md:w-1/2 flex items-center">
    <Box className="md:w-16 md:w-24">
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-500 !leading-5"
      >
        {title}
      </Typography>
    </Box>
    <Box>
      <Typography
        variant="body2"
        noWrap
        className="!text-black !text-[12px] w-full !max-w-28 !leading-5 !ml-2 md:!ml-0 !mr-5 md:!mr-0 "
      >
        {mySubstring(value, 25)}
      </Typography>
    </Box>
  </Box>
);
