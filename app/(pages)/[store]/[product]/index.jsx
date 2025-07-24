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
import Link from 'next/link'

const ProductDisplay = ({ params, searchParams }) => {
  const dispatch = useDispatch()
  const { product: urlKey } = params
  const { cartedProds, savedProds } = useUserData()
  const { data: prod, isLoading, error } = useSWR(`/products?urlKey=${urlKey}`)

  const product = prod?.data ? prod?.data?.result[0] : {}

  // ** State
  const [colors, setColors] = useState([])
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [more, setMore] = useState({
    variation: 7,
  })
  const [value, setTabValue] = useState('3')

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
    quantity: quantity,
  }

  const colorArray = product?.specifications?.color || [
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

  const handleColorSelect = (color) => {
    removeOrAddToArray(color, colors, setColors)
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1)
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }
  }

  return (
    <Box className="!px-2 sm:!px-16 md:!px-10 lg:!px-32 md:!py-7">
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={5}>
          <Box className="flex justify-center w-full">
            <Box className="w-full !max-w-[430px]">
              <Box className="!rounded-xl overflow-hidden mb-3 md:mb-6 bg-gray-50 flex items-center justify-center h-[400px]">
                {!isLoading ? (
                  <Image
                    src={showingImage || '/images/misc/no-image.png'}
                    alt={product.prodName || 'Product image'}
                    width={700}
                    height={700}
                    className="w-full h-full object-contain"
                    priority
                  />
                ) : (
                  <Box className="flex justify-center items-center h-full">
                    <CircleLoader />
                  </Box>
                )}
              </Box>
              {product?.images?.length > 1 && (
                <Box className="px-2">
                  <ReactSlickSlider
                    hideArrow
                    slidesToShow={4}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 5,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                    ]}
                  >
                    {product.images.map((item, i) => (
                      <Box
                        key={i}
                        onClick={() => showImage(item)}
                        className={`p-1 cursor-pointer`}
                      >
                        <Image
                          src={item}
                          alt={`Thumbnail ${i + 1}`}
                          width={80}
                          height={80}
                          className="w-16 h-16 rounded-md object-cover border border-gray-200"
                        />
                      </Box>
                    ))}
                  </ReactSlickSlider>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Product Details */}
        {product ? (
          <Grid item xs={12} md={7}>
            {/* Product Title */}
            <Typography
              variant="h4"
              className="!font-bold !text-2xl !text-gray-900 !mb-2"
            >
              {product.prodName}
            </Typography>

            {/* Rating and Wishlist */}
            <Box className="flex items-center justify-between mb-4">
              <Box className="flex items-center">
                <Rating
                  value={product?.star || 0}
                  precision={0.1}
                  readOnly
                  size="medium"
                  className="!mr-2"
                />
                <Typography variant="body2" className="!text-gray-600">
                  ({product?.totalReviews?.toLocaleString() || 0} reviews)
                </Typography>
              </Box>
              <Box className="flex items-center">
                <Link href={`?share=${urlKey}`} title="Share this product link">
                  <IconifyIcon
                    icon="tabler:share-2"
                    className="!text-blue-800 text-[24px] mr-3"
                  />
                </Link>
                <Box
                  title="Save this product"
                  className="flex items-center cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => saveProduct(payload, dispatch)}
                >
                  <IconifyIcon
                    icon="tabler:heart"
                    className={`!text-xl !mr-1 text-[24px] ${
                      savedProds.includes(product?._id) ? '!text-red-500' : ''
                    }`}
                  />
                  <Typography
                    variant="body2"
                    className={`!text-sm !mr-1 ${
                      savedProds.includes(product?._id) ? '!text-red-500' : ''
                    }`}
                  >
                    {savedProds.includes(product?._id) ? 'Saved' : 'Save'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Discount Badge */}
            {product.discount && (
              <Box className="bg-red-100 text-red-800 inline-flex items-center px-3 py-1 rounded-full mb-4">
                <Typography variant="caption" className="!font-bold">
                  {product.discount}% OFF - {product.discountTitle}
                </Typography>
              </Box>
            )}

            {/* Product Metadata */}
            <Box className="grid grid-cols-2 gap-4 mb-6">
              <TitleValue title="Collection" value={product.collectionName} />
              <TitleValue title="Category" value={product.category} />
              <TitleValue
                title="Sub-Category"
                value={product.subCollectionName}
              />
              <TitleValue title="Classes" value={product.group} />
            </Box>

            {/* Product Variations */}
            <Box className="bg-white w-full rounded-xl p-6 shadow-sm mb-6">
              {/* Color Selection */}
              {colorArray.length > 0 && (
                <Box className="mb-6">
                  <Typography
                    variant="subtitle2"
                    className="!font-semibold !mb-3"
                  >
                    Colors Available
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {colorArray.map((col, i) => (
                      <Box
                        key={i}
                        onClick={() => handleColorSelect(col)}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                          border-2 ${
                            colors.includes(col)
                              ? 'border-blue-600'
                              : 'border-transparent'
                          }
                          transition-all duration-200 hover:scale-105
                        `}
                        sx={{ backgroundColor: col }}
                      >
                        {colors.includes(col) && (
                          <IconifyIcon
                            icon="mdi:check"
                            className="text-white text-lg"
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Size Selection */}
              {product?.specifications?.size?.length > 0 && (
                <Box className="mb-6">
                  <Typography
                    variant="subtitle2"
                    className="!font-semibold !mb-3"
                  >
                    Sizes Available
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {product.specifications.size.map((each, i) => (
                      <Chip
                        key={i}
                        onClick={() => setSize(each)}
                        label={each}
                        className={`
                          !rounded-md !px-3 !py-1 !cursor-pointer !transition-all
                          ${
                            size === each
                              ? '!bg-blue-600 !text-white'
                              : '!bg-gray-100 hover:!bg-gray-200'
                          }
                        `}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Quantity Selector */}
              <Box className="mb-6">
                <Typography
                  variant="subtitle2"
                  className="!font-semibold !mb-3"
                >
                  Quantity
                </Typography>
                <Box className="flex items-center border border-gray-300 rounded-md w-fit">
                  <Button
                    onClick={() => handleQuantityChange('decrease')}
                    className="!min-w-0 !w-10 !h-10 !text-xl !text-gray-600"
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography className="!w-10 !text-center !font-medium">
                    {quantity}
                  </Typography>
                  <Button
                    onClick={() => handleQuantityChange('increase')}
                    className="!min-w-0 !w-10 !h-10 !text-xl !text-gray-600"
                  >
                    +
                  </Button>
                </Box>
              </Box>

              {/* Other Variations */}
              {otherVariations.length > 0 && (
                <Box className="mb-6">
                  <Typography
                    variant="subtitle2"
                    className="!font-semibold !mb-3"
                  >
                    Other Variations
                  </Typography>
                  <Box className="flex flex-wrap gap-4">
                    {otherVariations
                      .slice(0, more.variation === 7 ? 3 : undefined)
                      .map((key, i) => (
                        <Box key={i}>
                          <Typography
                            variant="body2"
                            className="!text-gray-600 !capitalize"
                          >
                            {key.replace(/_/g, ' ')}:
                          </Typography>
                          <Typography variant="body2" className="!font-medium">
                            {product.specifications.variations[key]}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                  {otherVariations.length > 3 && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() =>
                        setMore((prev) => ({
                          ...prev,
                          variation: prev.variation === 7 ? 1000 : 7,
                        }))
                      }
                      className="!mt-2 !text-blue-600"
                    >
                      {more.variation === 7 ? 'Show more' : 'Show less'}
                    </Button>
                  )}
                </Box>
              )}

              {/* Price and Action Buttons */}
              <Box className="pt-4 border-t border-gray-200">
                <Typography
                  variant="h5"
                  className="!font-bold !text-2xl !text-gray-900 !mb-4"
                >
                  NGN {product?.prodPrice?.toLocaleString()}
                </Typography>

                <Box className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="contained"
                    color="primary"
                    className="!rounded-full !py-3 !flex-1"
                    onClick={() => addCartHandler(payload, dispatch)}
                    startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
                  >
                    {cartedProds.includes(product?._id)
                      ? 'Remove from Cart'
                      : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="!rounded-full !py-3 !flex-1"
                    startIcon={<IconifyIcon icon="tabler:wallet" />}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Seller Info */}
            {product?.branchId && (
              <ProductSellerCard branchId={product?.branchId} />
            )}
          </Grid>
        ) : (
          <Grid item xs={12} md={7}></Grid>
        )}
      </Grid>

      {/* Product Tabs */}
      <Box className="w-full bg-white !rounded-lg shadow-sm py-5 px-2 md:px-6 mt-8">
        <TabContext value={value}>
          <TabList
            onChange={handleChangeTab}
            className="border-b border-gray-200"
            aria-label="Product Details Tabs"
          >
            <Tab
              value="3"
              label={
                <Typography variant="subtitle2" className="!font-semibold">
                  Specifications
                </Typography>
              }
            />
            <Tab
              value="1"
              label={
                <Typography variant="subtitle2" className="!font-semibold">
                  Description
                </Typography>
              }
              className="!mr-6"
            />
            <Tab
              value="2"
              label={
                <Typography variant="subtitle2" className="!font-semibold">
                  Reviews
                </Typography>
              }
              className="!mr-6"
            />
          </TabList>
          <TabPanel value="1" className="!px-0 !py-6">
            <ProdDescription desc={product?.prodInfo} />
          </TabPanel>
          <TabPanel value="2" className="!px-0 !py-6">
            <Review productId={product?._id} searchParams={searchParams} />
          </TabPanel>
          <TabPanel value="3" className="!px-0 !py-6">
            <Specifications specifications={product?.specifications} />
          </TabPanel>
        </TabContext>
      </Box>

      {/* Recommended Products */}
      <Box className="mt-16">
        <SectionTitle black="More items from this seller" />
        {product && (
          <PopularProduct
            endpoint={`/home/popular-products?store=${product.store}&branch=${product.branch}`}
            small
          />
        )}
      </Box>
      <Box className="mt-8 mb-12">
        <SectionTitle black="You may also like" />
        <HotDeal small />
      </Box>
    </Box>
  )
}

export default ProductDisplay

const TitleValue = ({ title, value }) => (
  <Box className="w-full">
    <Typography variant="body2" className="!text-gray-500 !text-sm !mb-1">
      {title}
    </Typography>
    <Typography variant="body2" className="!font-medium !text-gray-900">
      {value || 'N/A'}
    </Typography>
  </Box>
)
