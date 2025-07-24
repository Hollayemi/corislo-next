'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Grid, Typography } from '@mui/material'
import HomeWrapper from '@/app/components/view/home'
import { hexToRGBA } from '@/app/utils/hex-to-rgba'
import { rgbaToHex } from '@/app/utils/rgba-to-hex'
import IconifyIcon from '@/app/components/icon'
import OptionsMenu from '@/app/components/option-menu'
import { OrderProductView } from '@/app/components/templates/productView'
import useSWR from 'swr'
import { OrderBoxes } from '@/app/components/cards/homeCards'
import MyPagination from '@/app/components/templates/pagination'

const OrderPage = ({ searchParams }) => {
  const [orderShowing, setOrderShowing] = useState('All Orders')
  const { page } = searchParams
  const { data: result } = useSWR(
    `/user/order?status=${orderShowing.split(' ')[0]}&page=${page || 1}`
  )
  const { data: count } = useSWR(`/user/order-count`)
  const counter = count?.data || {}
  const { result: fetchedOrder, totalNumber } = result?.data || {}
  const [dateInterval, setDateInterval] = useState('March 2023 - October 2023')
  const [clipboard, setIsCopied] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredOrder, setFilteredOrder] = useState([])

  const handleFilter = (input) => {
    setSearchQuery(input)
    if (fetchedOrder.length) {
      const searchFilterFunction = (order) =>
        order.store.toLowerCase().includes(input.toLowerCase()) ||
        order.orderSlug.toLowerCase().includes(input.toLowerCase()) ||
        order.items.tracker.toLowerCase().includes(input.toLowerCase())
      const filteredOrdersArr = fetchedOrder.filter(searchFilterFunction)
      setFilteredOrder(filteredOrdersArr)
    }
  }

  useEffect(() => {
    setSearchQuery('')
    setFilteredOrder([])
  }, [orderShowing])

  const orderArray = !filteredOrder?.length ? fetchedOrder || [] : filteredOrder

  return (
    <HomeWrapper>
      <Box>
        <Box className="!px-2 my-2 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
          <Box className="flex items-center flex-wrap">
            <OrderBoxes
              image="/images/misc/all-orders.png"
              title="All Orders"
              value={counter.all}
              color="#D65C48"
            />
            <OrderBoxes
              image="/images/misc/cancel-orders.png"
              title="Cancelled Orders"
              value={counter.cancelled}
              color="#9736BE"
            />
            <OrderBoxes
              image="/images/misc/ongoing-orders.png"
              title="Ongoing orders"
              value={counter.ongoing}
              color="#2FA794"
            />
            <OrderBoxes
              image="/images/misc/completed-orders.png"
              title="Completed Orders"
              value={counter.completed}
              color="#3B47AF"
            />
          </Box>
          {/* timeline */}
          <Box className="flex items-center mt-6">
            <Typography variant="body2" className="!font-bold !text-[15px]">
              Timeline
            </Typography>
            <Box
              className="bg-blue-200 !ml-4 rounded px-4 py-1"
              bgcolor="#D5DAFA"
            >
              <Typography variant="caption" className="!text-blue-800">
                Live Preview
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-col md:flex-row items-start md:h-68 mt-5 bg-blue-100">
            <Box className="md:w-7/12 h-full">
              <Image
                src="/images/misc/order-timeline.png"
                alt="timeline"
                width={1000}
                height={1000}
                className="h-full"
              />
            </Box>
            <Box className="md:w-5/12 h-full relative bg-blue-100">
              <Box className="p-6 bg-blue-100 h-full">
                <Box className="flex h-24 items-start">
                  <Box className="flex items-center w-40">
                    <IconifyIcon
                      icon="tabler:user-plus"
                      className="!text-blue-800 mr-5"
                    />
                    <Typography
                      variant="body2"
                      className="!text-blue-800 !font-bold"
                    >
                      Now
                    </Typography>
                  </Box>
                  <Box className="">
                    <Typography variant="caption" className="!text-[14px]">
                      Status:{' '}
                      <span className="!font-bold !text-blue-800">
                        En Route
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption" className="!text-[11px]">
                      Expected Delivery: Between May 26 - June 12, 2023.
                    </Typography>
                  </Box>
                </Box>
                <Box className="w-full border-[1px] border-blue-200 my-4"></Box>
                <Box className="flex items-start">
                  <Box className="flex items-center w-40">
                    <IconifyIcon
                      icon="tabler:user-plus"
                      className="!text-blue-800 mr-5"
                    />
                    <Typography
                      variant="body2"
                      className="!text-blue-800 !font-bold"
                    >
                      Now
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" className="!text-[14px]">
                      Status:{' '}
                      <span className="!font-bold !text-blue-800">
                        Processing
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption" className="!text-[11px]">
                      Expected Delivery: Between May 26 - June 12, 2023.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* choose order list type*/}

          <Box className="flex items-center justify-between mt-8">
            <Typography variant="body2" className="!font-bold !text-[14px]">
              Orders
            </Typography>
            <Box className="hidden">
              <OptionsMenu
                icon={
                  <Button
                    variant="outlined"
                    className="!text-xs !rounded-full !text-blue-600"
                    endIcon={
                      <IconifyIcon
                        icon="tabler:chevron-down"
                        className="!ml-3 !text-[14px]"
                      />
                    }
                  >
                    {dateInterval}
                  </Button>
                }
                options={[
                  'January 2021 - December 2021',
                  'March 2022 - October 2022',
                  'March 2023 - October 2023',
                ]}
                setOption={setDateInterval}
                iconButtonProps={{
                  size: 'small',
                  sx: { color: 'text.disabled', cursor: 'pointer' },
                  // disableRipple: true,
                }}
              />
            </Box>
          </Box>
          <Box className="flex items-center justify-between mt-4 relative">
            <Box className="w-3/5 flex items-center">
              <Box>
                <OptionsMenu
                  icon={
                    <Button
                      variant="contained"
                      className="!text-xs !w-44 !rounded-full  !shadow-none !border-none !text-gray-800 h-10 !bg-white"
                      endIcon={
                        <IconifyIcon
                          icon="tabler:chevron-down"
                          className="!ml-3 !text-[14px]"
                        />
                      }
                    >
                      {orderShowing}
                    </Button>
                  }
                  options={[
                    'All Orders',
                    'Pending Orders',
                    'Unpaid Orders',
                    'Paid Orders',
                    'Processing Orders',
                    'Completed Orders',
                    'Cancelled Orders',
                  ]}
                  setOption={setOrderShowing}
                  iconButtonProps={{
                    size: 'small',
                    sx: { color: 'text.disabled', cursor: 'pointer' },
                    // disableRipple: true,
                  }}
                />
              </Box>
              <Box className="flex justify-center ml-4 w-full top-16 md:top-0 md:left-0 -left-4 px-4 md:px-0 absolute md:relative">
                <Box className="w-full relative !overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search using the order id, track id, or store."
                    onChange={(e) => handleFilter(e.target.value)}
                    className="h-10 w-full bg-white rounded-full pl-12 pr-8 focus outline-none border-blue-200 focus:border"
                  />
                  <IconifyIcon
                    icon="tabler:search"
                    className="absolute top-[12px] left-4 text-[16px]"
                  />
                </Box>
              </Box>
            </Box>

            <Box className="flex items-center" color="custom.pri">
              <IconifyIcon icon="tabler:trash" className="!text-[14px]" />
              <span className="ml-2 !text-[14px]">Recycled Order</span>
            </Box>
          </Box>

          {/* order list  */}
          <Box className="!mt-20 md:mt-6">
            {(searchQuery.length && !filteredOrder.length) ||
            !orderArray.length ? (
              <Box className="mt-20 md:mt-6 w-full h-32 flex flex-col items-center rounded-md justify-center bg-white">
                <IconifyIcon
                  icon="tabler:truck-delivery"
                  className="text-blue-500"
                />
                <Typography variant="caption">No record found</Typography>
              </Box>
            ) : (
              <Box>
                {orderArray.map((res, i) => (
                  <OrderProductView
                    key={i}
                    clipboard={clipboard}
                    setIsCopied={setIsCopied}
                    deliveryMedium={res.deliveryMedium}
                    totalAmount={parseInt(res.totalAmount)}
                    product={res.items.storeProducts}
                    status={res?.status[res?.status?.length - 1]?.state}
                    orderSlug={res.orderSlug}
                    orderId={res._id}
                    createdAt={res.createdAt}
                    store={res.store}
                    mutateStatus={`/user/order?status=${
                      orderShowing.split(' ')[0]
                    }&page=${page || 1}`}
                  />
                ))}
                <Box className="flex justify-center mt-6">
                  <MyPagination
                    searchParams={searchParams}
                    currentPage={searchParams?.page || 1}
                    totalNumber={totalNumber || 0}
                    limit={6}
                    query="page"
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default OrderPage
