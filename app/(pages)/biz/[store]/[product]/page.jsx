/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Chip from '@/app/components/chip'
import IconifyIcon from '@/app/components/icon'
import HomeWrapper from '@/app/components/view/home'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import { productSizes } from '@/app/data/store/productData'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, Rating, Tab, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ProdDescription, Specifications } from './tabs'
import { SectionTitle } from '@/app/components/cards/homeCards'
import { hotDealData, popularProducts } from '@/app/data/home/homepage'
import {
  HotDeal,
  PopularProduct,
} from '@/app/components/templates/productTemplates'
import { Review } from './review'
import useSWR from 'swr'
import { removeOrAddToArray } from '@/app/utils/arrayFunctions'
import { useDispatch } from 'react-redux'
import { addCartHandler, saveProduct } from '@/app/redux/state/slices/home/cart'
import { useUserData } from '@/app/hooks/useData'
import { addNewViewProduct } from '@/app/redux/state/slices/home/view/view'
import { ProductSellerCard } from '@/app/components/cards/seller/product.sellercard'
import { mySubstring } from '@/app/utils/format'
import { CircleLoader } from '@/app/components/cards/loader'

const ProductDisplay = ({ params, searchParams }) => {
  const dispatch = useDispatch()
  const { product: prodNameParam } = params
  const { cartedProds, savedProds } = useUserData()
  const {
    data: prod,
    isLoading,
    error,
  } = useSWR(`/products?prodName=${prodNameParam.split('%2B').join(' ')}`)

  const product = prod?.data ? prod?.data?.result[0] : {}

  // ** State
  const [colors, setColors] = useState([])
  const [size, setSize] = useState('')
  const [more, setMore] = useState({
    variation: 7,
  })
  const [value, setTabValue] = useState('1')

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const filteredSizes = productSizes.filter(
    (obj) => obj.size.split('-')[0] === 'EU'
  )

  useEffect(() => {
    addNewViewProduct(
      {
        productId: product?._id,
        branchId: product?.branchId,
        store: product?.store,
        branch: product?.branch,
      },
      dispatch
    )
  }, [isLoading])

  const payload = {
    productId: product?._id,
    variation: {
      size: size,
      color: colors,
    },
    store: product?.store,
    branch: product?.branch,
  }

  const colorArray = [
    '#eefabb',
    '#aecabb',
    '#eabdbb',
    '#beea45',
    '#afedda',
    '#34ee',
    '#000',
  ]

  const otherVariations = Object.keys(product?.specifications?.variations || {})

  const [showingImage, showImage] = useState(
    product?.images ? product?.images[0] : ''
  )

  useEffect(() => {
    showImage(product?.images ? product?.images[0] : '')
  }, [isLoading])
  return (
    <HomeWrapper>
      <Box className="!px-2 sm:!px-16 md:!px-10 lg:!px-32 md:!py-7">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box className="flex justify-center w-full">
              <Box className="w-full !max-w-[430px]">
                <Box className="!rounded-xl overflow-hidden mb-3 md:mb-6">
                  {!isLoading ? (
                    <Image
                      src={showingImage || '/images/misc/no-image.png'}
                      alt=""
                      width={700}
                      height={700}
                      className="md:m-0 flex-shrink-0 w-full h-[400px] !object-scale-down"
                    />
                  ) : (
                    <Box className="md:m-0 flex-shrink-0 w-full h-[400px] flex justify-center items-center">
                      <CircleLoader />
                    </Box>
                  )}
                </Box>
                <Box className="flex w-full px-6 justify-center">
                  <Box className="md:mt-0 w-full md:block md:w-10/12">
                    <ReactSlickSlider noArrowStyle>
                      {product?.images?.length > 1
                        ? product.images.map((item, i) => (
                            <Image
                              src={item}
                              key={i}
                              onClick={() => showImage(item)}
                              alt=""
                              width={150}
                              height={150}
                              className="m-1 md:mb-0 !w-16 !h-16 !rounded-md !object-scale-down"
                            />
                          ))
                        : null}
                    </ReactSlickSlider>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {product ? (
            <Grid item xs={12} md={7}>
              <Typography
                variant="body2"
                className="!font-semibold !text-xl !text-black"
              >
                {product.prodName}
              </Typography>

              <Box className="w-full mt-5 flex flex-wrap">
                <TitleValue title="Collection" value={product.collectionName} />
                <TitleValue title="Category" value={product.category} />
                <TitleValue
                  title="Sub-Category"
                  value={product.subCollectionName}
                />
                <TitleValue title="Classes" value={product.group} />
                <Box className="w-1/2 mt-1 flex items-center">
                  <Box className="w-20">
                    <Typography variant="caption" className="!text-gray-400">
                      Rating ({product?.totalReviews?.toLocaleString() || 0})
                    </Typography>
                  </Box>
                  <Box>
                    <Rating
                      value={product?.star || 0}
                      className=" mt-2"
                      readOnly
                      precision={0.1}
                      name="size-small"
                      size="small"
                    />
                  </Box>
                </Box>
                <Box
                  className="w-1/2 mt-1 flex items-center cursor-pointer"
                  onClick={() => saveProduct(payload, dispatch)}
                >
                  <Box className="w-6">
                    <Typography variant="caption" className="!text-gray-400">
                      <IconifyIcon
                        icon="tabler:heart"
                        className={` ${
                          savedProds.includes(product?._id) && '!text-red-500'
                        } hover:text-red-500 !text-[17px]`}
                      />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" className="!text-black">
                      Add to wishlist
                    </Typography>
                  </Box>
                </Box>
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

              <Box className="bg-white w-full rounded-xl p-4 mt-4">
                {product?.specifications?.color?.length && (
                  <Box>
                    <Typography variant="caption" className="!font-bold">
                      Colors Available
                    </Typography>
                    <Box className="flex items-center mb-1.5">
                      {colorArray.map((col, i) => (
                        <Box
                          key={i}
                          bgcolor={col}
                          onClick={() =>
                            removeOrAddToArray(col, colors, setColors)
                          }
                          className={`w-4 h-4 rounded-full m-1.5 flex items-center justify-center`}
                        >
                          {colors.includes(col) && (
                            <Image
                              src="/images/misc/check.png"
                              alt="."
                              className="w-2.5 h-2.5"
                              width={150}
                              height={150}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                {/* sizes */}
                {product?.specifications?.size?.length && (
                  <Box>
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
                              sx={{ margin: 0.5, borderRadius: '5px' }}
                              className={`hover:!text-white ${
                                size === each && '!bg-blue-900 !text-white'
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
                    <Box className="flex items-center justify-center flex-wrap mb-5">
                      {otherVariations?.map(
                        (each, i) =>
                          i < more.variation && (
                            <Box key={i} className="flex items-center">
                              <Typography
                                variant="body2"
                                className="!text-[12px] !mr-2"
                              >
                                {each.replaceAll('_', ' ')}:
                              </Typography>
                              <Typography
                                variant="body2"
                                className="!text-[12px] !mr-4"
                              >
                                {
                                  Object.values(
                                    product?.specifications?.variations || {}
                                  )[i]
                                }
                                ,
                              </Typography>
                            </Box>
                          )
                      )}
                      {otherVariations?.length > 7 && (
                        <Box
                          onClick={() =>
                            setMore((prev) => {
                              return {
                                ...prev,
                                variation: more.variation === 7 ? 1000 : 7,
                              }
                            })
                          }
                          variant="body2"
                          className="!text-[12px] !text-blue-600 -ml-2 cursor-pointer"
                        >
                          {more.variation === 7 ? 'more' : 'less'}...
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

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
                        className=" !text-white"
                      />
                    }
                  >
                    {cartedProds.includes(product?._id)
                      ? 'Remove from cart'
                      : 'Add to cart'}
                  </Button>
                  {/* <Button
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
                  </Button> */}
                </Box>
              </Box>

              {product?.branchId && (
                <ProductSellerCard branchId={product?.branchId} />
              )}
            </Grid>
          ) : (
            <Grid item xs={12} md={7}></Grid>
          )}
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
                    Customer Reviews
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
                    Specifications
                  </Typography>
                }
              />
            </TabList>
            <TabPanel value="1" className="!px-3">
              <ProdDescription desc={product?.prodInfo} />
            </TabPanel>
            <TabPanel value="2">
              <Review productId={product._id} searchParams={searchParams} />
            </TabPanel>
            <TabPanel value="3" className="!px-0">
              <Specifications otherVariations={otherVariations} />
            </TabPanel>
          </TabContext>
        </Box>

        <Box className="mt-16">
          <SectionTitle black="More items from this seller" />
          {product && (
            <PopularProduct
              endpoint={`/home/popular-products?store=${product.store}&branch=${product.branch}`}
              small
            />
          )}
        </Box>
        <Box className="mt-8">
          <SectionTitle black="You may also like" />
          <HotDeal small />
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default ProductDisplay

const TitleValue = ({ title, value }) => (
  <Box className="w-fit md:w-1/2 flex items-center">
    <Box className="md:w-24">
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
        className="!text-black !text-[12px] w-full !leading-5 !ml-2 md:!ml-0 !mr-5 md:!mr-0 "
      >
        {value ? mySubstring(value, 25): <CircleLoader />}
      </Typography>
    </Box>
  </Box>
)
