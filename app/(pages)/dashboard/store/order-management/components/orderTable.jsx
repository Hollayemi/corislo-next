import { useState } from 'react'
import { Typography, Box, Grid, Button, TextField } from '@mui/material'
import Image from 'next/image'
import { OrderListComponents } from '.'
import IconifyIcon from '@/app/components/icon'
import { CircleLoader } from '@/app/components/cards/loader'
import { MyTextField } from '@/app/(pages)/user/components'
import useSWR from 'swr'
import {
  storeConfirmPicker,
  storeFetchOrderByPicker,
} from '@/app/redux/state/slices/shop/order'
import { useDispatch } from 'react-redux'

const OrderTable = ({ selectRow, isLoading, setRightOpen }) => {
  const { data, isLoading: counterLoading } = useSWR('/branch/order-count')
  const [foundbyPicker, setFindbyPicker] = useState([])
  const [search, setSearch] = useState('')
  const counter = data?.data || {}
  const [value, setValue] = useState('all')
  const Epl = ({ title, info }) => (
    <Box className="h-full pl-4 pt-1 border-r w-full min-w-28">
      <Typography
        noWrap
        variant="body1"
        className="!text-gray-500 w-11/12 pb-1 !text-[12px]"
      >
        {title}
      </Typography>
      <Typography variant="body1" className="!font-bold mt-0 !text-[13px]">
        {info}
      </Typography>
    </Box>
  )
  return (
    <Box className="w-full">
      <Box
        className="w-full h-48 md:px-10 flex items-center justify-between rounded-2xl p-5 py-7 overflow-hidden"
        bgcolor="custom.pri"
      >
        <Box className="w-7/12 md:w-7/12 shrink-0">
          <Typography
            variant="body1"
            className="!font-black !text-white !text-[15px] sm:!text-xl md:!text-3xl"
          >
            Fetch Order for Pickers
          </Typography>
          <Typography
            variant="body1"
            className="!text-[11px] md:!text-[12px]  !text-gray-300 !leading-4"
          >
            Access a comprehensive overview of orders, including picker's
            details, dates, and status.
          </Typography>
          <br />
          <Button
            className="!shadow-none w-36 md:!mt-4 !px-0 !bg-white !text-blue-900 !rounded-md"
            variant="contained"
            onClick={() =>
              setRightOpen(
                <ConfirmPicker
                  setSearch={setSearch}
                  setRightOpen={setRightOpen}
                />
              )
            }
          >
            Check By Picker
          </Button>
        </Box>
        <Image
          src="/images/misc/store-picker.png"
          alt="picker-img"
          className=" -ml-20 md:ml-0 -mt-8"
          width={400}
          height={400}
        />
      </Box>
      <br />
      <Box className="flex items-center justify-between px-3 py-3 mb-4">
        <Box className="flex items-center">
          <Typography variant="h5" className="!font-bold !text-sm md:text-2xl">
            Orders
          </Typography>
          <input
            type="text"
            className="block ml-2 w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by order ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <TextField
            placeholder="Search by order Id"
            className="!outline-none !ml-2"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </Box>
        <Box>
          <Button
            className="w-20 md:w-24 !px-0 !bg-white !text-black !rounded-lg !mr-2 md:!mr-5 !text-[12px] md:!text-[13px]"
            variant="contained"
          >
            Export
          </Button>
          <Button
            className="w-24 md:w-32 !px-0  !text-white !rounded-lg !text-[12px] md:!text-[13px]"
            variant="contained"
            onClick={() => setRightOpen(<CreateOrder />)}
          >
            Create Order
          </Button>
        </Box>
      </Box>
      <Box className="h-16 w-full overflow-auto overflow-y-hidden rounded-md py-2 flex justify-evenly items-center bg-white">
        <Box className="flex items-center w-full h-full px-3 border-r">
          <IconifyIcon icon="tabler:calendar" />
          <Typography variant="caption" className="!text-[12px] !ml-4">
            Today
          </Typography>
        </Box>
        <Epl
          title="Total orders"
          info={counterLoading ? <CircleLoader /> : counter.totalOrder || 0}
        />
        <Epl
          title="Ordered items over time"
          info={counterLoading ? <CircleLoader /> : counter.totalItems || 0}
        />
        <Epl
          title="Returns"
          info={counterLoading ? <CircleLoader /> : counter.returned || 0}
        />
        <Epl
          title="Fulfilled orders over time"
          info={counterLoading ? <CircleLoader /> : counter.completed || 0}
        />
        <Epl
          title="Pickup / Waybilling"
          info={
            counterLoading ? (
              <CircleLoader />
            ) : (
              `${counter.pickup || 0} / ${counter.waybilling || 0}`
            )
          }
        />
      </Box>
      <Box className="mt-6">
        {isLoading ? (
          <Box className="h-40 w-full border flex items-center justify-center rounded-lg">
            <CircleLoader width={20} />
          </Box>
        ) : (
          <OrderListComponents
            value={value}
            foundbyPicker={foundbyPicker.length > 0 ? foundbyPicker : false}
            isLoading={isLoading}
            rows={selectRow.data}
            setValue={setValue}
            search={search}
          />
        )}
      </Box>
    </Box>
  )
}

export default OrderTable

export const ConfirmPicker = ({ setRightOpen, setSearch }) => {
  const [pickerSlug, setPickerId] = useState('')
  const [orderSlug, setOrderId] = useState('')
  const dispatch = useDispatch()

  return (
    <Box className="px-5 pt-5">
      <MyTextField
        title="Picker ID"
        onChange={(e) => setPickerId(e.target.value)}
        value={pickerSlug}
        PClassName="w-full md:w-auto"
      />
      <MyTextField
        title="Order ID"
        value={orderSlug}
        onChange={(e) => setOrderId(e.target.value)}
        PClassName="w-full !-mb-0 md:w-auto"
      />
      <Box className="flex items-center justify-between mt-3">
        <Button
          onClick={() => {
            setOrderId('')
            setPickerId('')
          }}
          variant="outlined"
          className="w-32 !text-[12px] !h-10 !shadow-none !rounded-md !border"
        >
          Reset
        </Button>
        <Button
          className="w-32 !text-[12px] !h-10 !shadow-none !rounded-md"
          variant="contained"
          onClick={() =>
            storeConfirmPicker(
              dispatch,
              { orderSlug, pickerSlug },

              (res) => {
                // setOrderId('')
                // setPickerId('')
                setRightOpen(false)
                setSearch(orderSlug)
              }
            )
          }
        >
          Verify
        </Button>
      </Box>
    </Box>
  )
}

const CreateOrder = () => {
  return (
    <Box className="h-full pt-2">
      <Box className="h-80 flex justify-center flex-col items-center -mt-6">
        <Typography
          variant="body2"
          className="!font-bold !text-[12px] !text-black"
        >
          Sorry!!!
        </Typography>
        <Typography variant="caption" className="!text-[13px] !text-gray-500">
          Service not available at the moment
        </Typography>
      </Box>
    </Box>
  )
}
