import { Dot } from '@/app/components/cards'
import IconifyIcon from '@/app/components/icon'
import {
  formatCurrency,
  formatDate,
  formatDateToMonthShort,
  mySubstring,
} from '@/app/utils/format'
import { CancelOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useUserData } from '@/app/hooks/useData'
import useSWR from 'swr'
import Link from 'next/link'

const { Box, Typography, Rating } = require('@mui/material')
const { default: Image } = require('next/image')

const Notification = () => {
  const { notifications, showOverlay } = useUserData()
  const {} = useSWR('/user/notification/view-all')
  return (
    <Box className="mt-16 relative md:absolute px-2 md:right-2">
      <Box className="w-full md:w-[420px] h-[600px] md:h-[500px] relative bg-white rounded-xl md:mr-10 flex flex-col">
        <Box className="flex justify-between items-center px-4 h-14 border-b !w-full flex-shrink-0">
          <Typography variant="body2" className="!font-bold">
            Notification
          </Typography>
          <Box onClick={showOverlay(null)}>
            <CancelOutlined />
          </Box>
        </Box>
        <Box className="grow-1 h-auto md:h-[400px] max-h-[450px] w-full !overflow-auto overflowStyle">
          {notifications.map((data, i) => (
            <OrderNotif key={i} data={data} />
          ))}
        </Box> 
        <Box className="h-14 flex items-center justify-center absolute bottom-0 !text-[12px] w-full text-center ">
          See all notifications
        </Box>
      </Box>
    </Box>
  )
}

export default Notification

export const OrderNotif = ({ data, forStore }) => {
  const [open, setOpen] = useState(0)
  return (
    <Box className="w-full border-b-2">
      <Box className="px-4 w-full flex justify between items-center mt-2">
        <Typography variant="caption" className="!text-[11px] !font-bold">
          {data._id}
        </Typography>
      </Box>
      {data.info.map((each, i) => (
        <Box
          key={i}
          className="flex items-start p-3 w-full border-b border-gray-100"
        >
          {data.image && (
            <Box className="w-11 h-11 flex-shrink-0">
              <Image
                src={`/images/misc/shop/${i + 1}.png`}
                alt="display_image"
                width={100}
                height={100}
                className="rounded-full h-full w-full"
              />
            </Box>
          )}
          <Box className="pl-3 relative w-full min-w-48">
            <Box className=" w-11/12 md:w-9/12 min-w-48">
              <Typography variant="body2" className="!font-bold !text-black">
                {each.title}
              </Typography>
              <Typography variant="body2" className="!text-[11px] !mt-2">
                {mySubstring(each.note, open == i ? 1000 : 100)}
              </Typography>
            </Box>

            {!each.isText && (
              <Box
                className={`rounded-md ${
                  open === i ? 'h-20 p-2 border' : 'h-0'
                } transition-all duration-300 !mt-3 w-full !overflow-hidden`}
              >
                {each?.orderId && (
                  <NotifOrderDisplay
                    forStore={forStore}
                    orderId={each.orderId}
                  />
                )}
                {each?.productId && (
                  <NotifProductDisplay productId={each.productId} />
                )}
              </Box>
            )}

            <Box className="absolute top-0 right-0 pr-2 flex flex-col items-end">
              {each.unread ? (
                <Box
                  className="w-2 h-2 rounded-full bg-orange-400 -mt-1 mb-2"
                  bgcolor="warning"
                ></Box>
              ) : null}
              <Typography variant="caption" className="!text-[10px]">
                {formatDateToMonthShort(each.date)}
              </Typography>
              <Box className="w-full flex justify-end mt-2 -ml-3">
                {each.isText ||
                  (each?.note?.length > 100 && (
                    <Box
                      onClick={() => setOpen((prev) => (prev === i ? 100 : i))}
                      className="flex justify-center items-center w-4 h-4 cursor-pointer rounded-full border border-black"
                    >
                      <IconifyIcon
                        icon={`${
                          open === i
                            ? 'tabler:chevron-up'
                            : 'tabler:chevron-down'
                        }`}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const NotifProductDisplay = ({ productId }) => {
  const { data: prod, error } = useSWR(`/products?productId=${productId}`)
  const product = prod ? prod?.data[0] : {}
  return (
    <Box className="flex items-center relative ">
      <Box className="w-12 h-12 flex-shrink-0">
        <Image
          src="/images/more/2.png"
          alt="display_image"
          width={100}
          height={100}
          className="h-full w-full !rounded-md"
        />
      </Box>
      <Box className="pl-3 w-full">
        <Box className="w-9/12">
          <Typography
            variant="body2"
            noWrap
            className="!font-bold w-fit md:w-44 max-w-[190px] md:max-w-[250px] !text-[12px] !text-black"
          >
            {product.prodName}
          </Typography>
          <Box className="mt-0.5">
            <Box className="flex w-full">
              <Box className="flex items-center">
                <Rating
                  name="half-rating"
                  defaultValue={product.star}
                  max={1}
                  readOnly
                  precision={0.1}
                  className="!text-orange-500 !text-[16px]"
                />
                <Typography
                  variant="body2"
                  className="!font-bold !text-[10px] !ml-2 !text-black"
                >
                  {product.totalReviews || 0}
                </Typography>
              </Box>
              <Box className="flex items-center ml-4 flex-shrink-0">
                <Dot color="!bg-black" />
                <Typography
                  variant="body2"
                  className="!font-bold !text-[10px] !ml-2 !text-gray-500"
                >
                  {product.sold || 0} Items sold
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="mt-px flex items-center">
            <Typography
              variant="body2"
              className="!font-bold !text-[14px] !text-black"
            >
              {formatCurrency(product.prodPrice)}
            </Typography>
            <Typography
              variant="body2"
              className="!font-bold !text-[10px] !ml-3 !text-gray-400 line-through"
            >
              {formatCurrency(4500)}
            </Typography>
          </Box>
        </Box>
        <Box className="absolute bottom-0 md:top-0 right-0 pr-2 flex flex-col items-end">
          <Box className="flex justify-center items-center w-6 h-6 md:w-9 md:h-9 cursor-pointer rounded-full border border-black">
            <IconifyIcon
              icon="tabler:arrow-up-right"
              className="!text-[16px] md:!text-[26px]"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const NotifOrderDisplay = ({ orderId, forStore = false }) => {
  const { data: result } = useSWR(`/user/order/${orderId}`)
  const orderProducts = result?.data[0] || {}
  return (
    <Box className="flex items-start relative !overfow-hidden ">
      <Box className="w-12 h-12 flex-shrink-0">
        <Image
          src="/images/more/4.png"
          alt="display_image"
          width={100}
          height={100}
          className="h-full w-full !rounded-md"
        />
      </Box>
      <Box className="pl-3 w-full">
        <Box className="w-9/12">
          <Typography
            variant="body2"
            noWrap
            className="!font-bold w-40 md:w-44 max-w-[190px] md:max-w-[250px] !text-[12px] !text-black"
          >
            Order-ID: {orderProducts?._id?.orderSlug}
          </Typography>
          <Box className="mt-0.5">
            <Box className="flex w-full">
              <Box className="flex items-center flex-shrink-0">
                <Typography
                  variant="body2"
                  className="!font-bold !text-[10px] !text-gray-500"
                >
                  {formatDate(orderProducts?._id?.dateAdded)}
                </Typography>
              </Box>
              <Box className="flex items-center ml-4 flex-shrink-0">
                <Typography
                  variant="body2"
                  className="!text-[10px] !text-gray-500"
                >
                  {orderProducts?._id?.status}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="mt-1.5 flex items-center">
            <Typography variant="body2" className="!text-[10px] !text-gray-400">
              No of item: {orderProducts?.products?.length}
            </Typography>
          </Box>
        </Box>
        {!forStore && (
          <Box className="absolute bottom-0 md:top-0 right-0 flex flex-col items-end">
            <Link href={`/order/${orderId}`}>
              <Box className="flex justify-center items-center w-6 h-6 md:w-9 md:h-9 mt-2 cursor-pointer rounded-full border border-black">
                <IconifyIcon
                  icon="tabler:arrow-up-right"
                  className="!text-[16px] md:!text-[26px]"
                />
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  )
}
