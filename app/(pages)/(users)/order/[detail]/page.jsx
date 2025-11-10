'use client'
import { CartProductView } from '@/app/components/templates/productView'
import UserWrapper from '@/app/components/view/user'
import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import React, { use, useState } from 'react'
import useSWR from 'swr'
import TimelineLeft, { OrderStages } from '../timeline'
import {
  formatDate,
  formatDateToMonthShort,
  ngnPrice,
} from '@/app/utils/format'
import { OrderActionBtn, trackMainSteps } from './components'
import { useDispatch } from 'react-redux'
import { shopFeedbackHandler } from '@/app/redux/state/slices/home/feedback'
import { useUserData } from '@/app/hooks/useData'
import { useGetSingleOrderQuery } from '@/app/redux/user/slices/orderSlice'
import { useGetStoreInfoQuery } from '@/app/redux/user/slices/storeSlice'

const OrderDetails = ({ params, forPicker }) => {
  const dispatch = useDispatch()
  const { detail } = use(params)
  const { data: result } = useGetSingleOrderQuery(detail)
  const { userInfo } = useUserData()
  const orderProducts = result?.data || {}
  console.log({ orderProducts })
  const { data: branchInfo } = useGetStoreInfoQuery({ branch: orderProducts.branch, store: orderProducts.store },)
  const [mouseOn, setMouseOn] = useState(-1)
  const [review, setReview] = useState('')
  const orderFrom = branchInfo?.data || {}
  const TitleValue = ({ title, value }) => (
    <Box className="flex items-center">
      <Typography variant="body2" className="!text-xs">
        {title} <span className="ml-2 !text-black">{value}</span>
      </Typography>
    </Box>
  )
  const emojis = ['Bad', 'Poor', 'Average', 'Good', 'Best']
  const orderStatus = orderProducts?.statusHistory?.[(orderProducts?.statusHistory?.length || 0) - 1]?.status || ""

  const feedbackPayload = {
    review,
    rate: mouseOn,
    store: orderProducts._id?.store,
    branch: orderProducts._id?.branch,
    orderId: detail,
  }

  const picker = orderProducts?.picker ? orderProducts.picker : {}
  const address = orderProducts?.shippingAddress || {}
  const deliveryMedium = orderProducts?.deliveryMedium



  return (
    <UserWrapper>
      <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
        <Box className="flex flex-col sm:flex-row items-start gap-4 md:gap-10">
          <Box className="w-full sm:w-8/12" >
            <Box className="">
              <Box className="bg-white rounded-md py-5 !px-4 flex items-start justify-between">
                <Box>
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[20px]"
                  >
                    {orderStatus} Order
                  </Typography>
                  <Typography
                    variant="caption"
                    className="!text-black !text-[12px]"
                  >
                    as of today{' '} {orderStatus?.toLowerCase()}
                    {formatDateToMonthShort(new Date(), false, {
                      month: 'long',
                      year: 'numeric',
                    })}
                    .
                  </Typography>
                </Box>
                {
                  !['processing', 'pickable' || 'cancelled'].includes(orderStatus?.toLowerCase()) && <OrderActionBtn
                    action={orderStatus?.toLowerCase()}
                    orderId={detail}
                  />
                }
              </Box>
              {orderStatus?.toLowerCase() === 'completed' && (
                <Box className="bg-white w-full rounded-md py-5 !px-2 md:!px-4 mt-5">
                  <Typography
                    variant="caption"
                    className="!text-black !text-[13px]"
                  >
                    How was your experience with the seller?
                  </Typography>
                  <Box className="flex items-center mt-3">
                    {emojis.map((tag, i) => (
                      <EmojiRating
                        name={tag}
                        index={i}
                        key={i}
                        mouseOn={mouseOn}
                        setMouseOn={setMouseOn}
                      />
                    ))}
                  </Box>

                  <Box className="md:flex md:items-start mt-4">
                    <textarea
                      onChange={(e) => setReview(e.target.value)}
                      value={review}
                      placeholder="Write about your experience in this section"
                      className="w-full md:w-9/12 h-32 rounded bg-gray-100 !px-5 py-3 resize-none outline-none border-blue-800 focus:border"
                    ></textarea>
                    <Box className="w-full md:w-fit flex !justify-end mt-1 md:mt-0">
                      <Button
                        variant="contained"
                        className="!rounded-full !text-[14px] !h-10 !w-32 !shadow-none md:!mx-4"
                        onClick={() =>
                          shopFeedbackHandler(feedbackPayload, dispatch)
                        }
                      >
                        Send
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box className="bg-white w-full rounded-md py-5 !px-2 md:!px-4 mt-5">
                <Typography variant="body2" className="!font-bold !text-[14px]">
                  Product Details
                </Typography>
                <Box className="flex justify-between items-center mt-3 !mb-5">
                  <TitleValue
                    title="Order date:"
                    value={formatDate(orderProducts?._id?.createdAt)}
                  />
                  <TitleValue
                    title="Order ID:"
                    value={orderProducts?.orderSlug}
                  />
                </Box>
                {orderProducts?.items?.map(
                  (each, i) =>
                    i < 4 && (
                      <Box key={i}>
                        <CartProductView
                          hideQtyFunc
                          hideCheckbox
                          prodName={each.name}
                          collection={each.collection}
                          store={each.store}
                          quantity={each.quantity}
                          image={each.image}
                          prodPrice={each.totalPrice}
                        />
                      </Box>
                    )
                )}
                <Box className="w-full border-2 border-dashed border-gray-200 mt-7"></Box>
                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography variant="body2" className="!text-[12px]">
                    Sub total
                  </Typography>
                  <Typography variant="body2" className="!text-[12px]">
                    {ngnPrice(orderProducts?.totalAmount)}
                  </Typography>
                </Box>
                <Box className="w-full flex justify-between items-center !mt-2">
                  <Typography variant="body2" className="!text-[12px]">
                    Discount
                  </Typography>
                  <Typography
                    variant="body2"
                    className="!text-[12px] !text-red-500"
                  >
                    -{ngnPrice(orderProducts?.discount)}
                  </Typography>
                </Box>

                <Box className="w-full flex justify-between items-center !mt-5">
                  <Typography
                    variant="body2"
                    className="!text-[13px] !font-bold"
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body2"
                    className="!text-[13px] !font-bold"
                  >
                    {ngnPrice(
                      orderProducts?.paymentInfo?.amount
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="bg-white rounded-md !px-4 py-10 md:p-14 mt-6">
                <Typography variant="body2" className="!font-bold !text-[16px]">
                  Tracking Details
                </Typography>
                <Box>
                  <OrderStages
                    at={
                      trackMainSteps[
                      orderStatus?.toLowerCase()?.replaceAll(' ', '_')
                      ] || 0
                    }
                    price={500000}
                    delivery={orderProducts?.deliveryMedium}
                  />
                </Box>
                <br />
                <br />
                <TimelineLeft
                  orderSlug={detail}
                  currentStatus={orderStatus}
                  statusHistory={orderProducts.statusHistory || []}
                />
              </Box>
            </Box>
          </Box>
          <Box className="w-full sm:w-4/12" >
            <Box>
              <Box className="bg-white rounded-md py-5 !px-4">
                <Typography
                  variant="body2"
                  className="!font-bold !text-[16px] !mb-5"
                >
                  Customer Delivery Details
                </Typography>

                <TitleWithValueUnder
                  title="Delivery Medium"
                  value={deliveryMedium}
                />
                {deliveryMedium === 'pickup' ? (
                  <>
                    <TitleWithValueUnder
                      title="Picker Name"
                      value={picker.name}
                    />
                    <TitleWithValueUnder
                      title="Picker Phone Number"
                      value={picker.phone}
                    />
                    <TitleWithValueUnder
                      title="Relationship"
                      value={picker.relationship}
                    />
                  </>
                ) : (
                  <>
                    <TitleWithValueUnder
                      title="Customer Name"
                      value={userInfo.fullname}
                    />
                    <TitleWithValueUnder
                      title="Customer Phone Number"
                      value={userInfo.phone}
                    />
                    <TitleWithValueUnder
                      title="Delivery Address"
                      value={`${address.address}, ${address.city}, ${address.state}`}
                    />
                  </>
                )}
              </Box>
              <Box className="bg-white rounded-md py-5 !px-4 mt-4">
                <Typography
                  variant="body2"
                  className="!font-bold !text-[16px] !mb-5"
                >
                  Store Support (Sender)
                </Typography>
                <TitleWithValueUnder
                  title="Store Name"
                  value={orderFrom.businessName}
                />
                <TitleWithValueUnder
                  title="Store Phone Number"
                  value={orderFrom.phone}
                />
                <TitleWithValueUnder
                  title="Delivery Address"
                  value={orderFrom.address}
                />
                <TitleWithValueUnder
                  title="Store Support Email Address"
                  value={orderFrom.email}
                  link={`mailto:${orderFrom.email}`}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </UserWrapper>
  )
}

export default OrderDetails

const TitleWithValueUnder = ({ title, value, link }) => {
  return (
    <Box className="mb-5">
      <Typography
        variant="body2"
        className="!font-bold !text-black  !text-[11x]"
      >
        {title}
      </Typography>
      {!link ? (
        <Typography variant="caption" className="!text-[14px]">
          {value}
        </Typography>
      ) : (
        <Link href={link}>
          <Typography
            variant="caption"
            className="!text-[14px] !text-blue-700 underline"
          >
            {value}
          </Typography>
        </Link>
      )}
    </Box>
  )
}

export const EmojiRating = ({ name, index, mouseOn, setMouseOn }) => {
  return (
    <Box className="flex flex-col items-center justify-center mx-2">
      <Image
        src={`/images/misc/emoji/${index + 1}.png`}
        alt="emoji"
        width={100}
        onMouseEnter={() => setMouseOn(index + 1)}
        height={100}
        className={`w-10 h-10 !mb-2 !filter ${mouseOn <= index ? '!grayscale' : '!grayscale-0'
          }`}
      />
      <Typography variant="caption" color="custom.sec" className="!text-[12px]">
        {name}
      </Typography>
    </Box>
  )
}
