'use client'
import IconifyIcon from '@/app/components/icon'
import { GroupCartProducts } from '@/app/components/templates/productView'
import HomeWrapper from '@/app/components/view/home'
import { useUserData } from '@/app/hooks/useData'
import { addNewOrder } from '@/app/redux/state/slices/home/order'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { TitleSubtitle } from '../user/components'
import CustomOption from '@/app/components/option-menu/option'
import { detectCardType } from '@/app/utils/format'
import { CardTemplate } from '../user/billingAndAddress'
import Link from 'next/link'
import { reshapePrice } from '../dashboard/store/marketing/components'
import { MySwitch } from '../dashboard/store/stores/component'

const Checkout = () => {
  const dispatch = useDispatch()
  const { cartedProds, userInfo, temp, seletedCartProds, agentInfo } =
    useUserData()
  const [usingPoint, usPoint] = useState(false)
  console.log(usingPoint)
  const endpoint = `/user/cart-group?${
    seletedCartProds.length && `prods=${seletedCartProds.join('.')}`
  }`
  const { data: carts, error } = useSWR(endpoint)

  seletedCartProds.length && `prods=${seletedCartProds.join('.')}`
  console.log(agentInfo)

  const { data: agents } = useSWR('/user/pickers')
  const pickers = agents?.data || []
  const groupedCart = carts ? carts.data.result : []
  const amounts = carts ? carts.data.total : []

  const [payload, updatePayload] = useState({
    ids: seletedCartProds.length ? seletedCartProds : cartedProds,
    delivery: {},
    picker: {
      userId: userInfo?.userId || null,
      name: userInfo?.fullname || null,
      email: userInfo?.email || null,
      phone: userInfo?.phone || null,
      relationship: 'Myself',
    },
    usingPoint,
    shippingAddress: temp.address || userInfo?.selectedAddress || null,
    billingCard: userInfo?.selectedBilling || null,
  })
  console.log(payload)
  const address = payload.shippingAddress
  const card = payload.billingCard

  const myPoints = usingPoint ? agentInfo?.coin : 0
  const totPrice =
    (amounts?.discountedPrice || amounts?.originalPrice) - myPoints

  return (
    <HomeWrapper>
      <Box>
        <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <ChangeAddress address={address} updatePayload={updatePayload} />
              <Box className="bg-white rounded-md py-5 px-4 mt-5">
                {groupedCart.map((each, i) => (
                  <Box key={i}>
                    <GroupCartProducts
                      store={each._id.store}
                      branchPrice={each.branchCheckout}
                      branch={each.fromBranch}
                      updatePayload={updatePayload}
                      payload={payload}
                      pickers={pickers}
                    />
                    {groupedCart.length > i + 1 && (
                      <Box className="w-full border-[1px] my-5"></Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Box className="bg-white rounded-md py-5 px-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Summary
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Typography variant="body2" className="!text-[12px]">
                      Sub total
                    </Typography>
                    <Typography variant="body2" className="!text-[12px]">
                      {reshapePrice(amounts?.originalPrice)}
                    </Typography>
                  </Box>
                  {usingPoint && (
                    <Box className="w-full flex justify-between items-center !mt-5">
                      <Typography variant="body2" className="!text-[12px]">
                        Points
                      </Typography>
                      <Typography
                        variant="body2"
                        className="!text-[12px] !text-red-500"
                      >
                        - {reshapePrice(agentInfo.coin || 0)}
                      </Typography>
                    </Box>
                  )}
                  {amounts?.discountedPrice ? (
                    <Box className="w-full flex justify-between items-center !mt-2">
                      <Typography variant="body2" className="!text-[12px]">
                        Discount
                      </Typography>
                      <Typography
                        variant="body2"
                        className="!text-[12px] !text-red-500"
                      >
                        {reshapePrice(amounts?.originalPrice)}
                      </Typography>
                    </Box>
                  ) : null}
                  {/* <Box className="w-full flex justify-between items-center !mt-2">
                    <Typography variant="body2" className="!text-[12px]">
                      Way-Billing
                    </Typography>
                    <Typography variant="body2" className="!text-[12px]">
                      NGN9,500
                    </Typography>
                  </Box> */}

                  <Box className="w-full h-0.5 border-dashed border border-black mt-7"></Box>
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
                      {reshapePrice(totPrice)}
                    </Typography>
                  </Box>
                </Box>
                <Box className="bg-white rounded-md py-5 px-4 mt-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Voucher
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Typography
                      variant="body2"
                      className="!text-[11px] !font-[500] w-3/5"
                    >
                      FREE4ALLNOW
                    </Typography>
                    <Box className="flex justify-between float-right items-center w-2/5">
                      <Typography variant="body2" className="!text-[11px]">
                        All Products
                      </Typography>
                      <Typography variant="body2" className="!text-[11px]">
                        30%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <PaymentOptions
                  card={card}
                  coin={agentInfo?.coin}
                  updatePayload={updatePayload}
                  usPoint={usPoint}
                  usingPoint={usingPoint}
                />
                <Button
                  variant="contained"
                  className="w-full !mt-6 !h-12 !rounded-full !border-none !text-[14px] !text-white"
                  onClick={() =>
                    addNewOrder({ ...payload, usingPoint }, dispatch, endpoint)
                  }
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default Checkout

export const ChangeAddress = ({ address, updatePayload }) => {
  const { data: addrs } = useSWR('/user/addresses')
  const addresses = addrs?.data || []
  return (
    <Box className="bg-white rounded-md py-5 px-4">
      <Typography variant="body2" className="!font-bold !text-[16px]">
        Delivery Address
      </Typography>
      <Box className="w-full flex justify-between items-center !mt-5">
        <Typography variant="body2" className="!text-[11px] w-8/12">
          {address
            ? `${address?.address}, ${address?.state}, ${address?.city} (${address?.postal_code})`
            : 'No address'}
        </Typography>
        <CustomOption
          addBtn={
            <Link href="/user" className="!w-full">
              <Typography
                variant="body2"
                className="!text-[15px] !text-blue-800 mt-5"
              >
                <span className="mr-3 !text-[17px]">+</span> Add address
              </Typography>
            </Link>
          }
          icon={
            <Button
              variant="outlined"
              className="w-20 h-6 !rounded-full !border !border-blue-500 !text-[12px] !text-blue-600"
            >
              {address ? 'Change ' : 'Select '}
            </Button>
          }
          template={<TitleSubtitle />}
          options={addresses.map(
            (e) => `${e?.address}, ${e?.state}, ${e?.city} (${e?.postal_code})`
          )}
          butPush={addresses.map((e) => e)}
          clickFunction={(e) =>
            updatePayload((prev) => {
              return { ...prev, shippingAddress: e }
            })
          }
        />
      </Box>
      <Box className="w-full flex justify-between !text-black px-4 py-3 !rounded-md bg-red-100 items-center !mt-8">
        <Typography variant="body2" className="!text-[11px]">
          Before making an order, make sure the address is correct and matches
          your expected delivery location.
        </Typography>
        <IconifyIcon icon="tabler:chevron-right" className="text-[14px]" />
      </Box>
    </Box>
  )
}

export const PaymentOptions = ({
  card,
  coin = 0,
  updatePayload,
  usPoint,
  usingPoint,
}) => {
  const { data: cards } = useSWR('/user/billings')
  const billings = cards?.data || []
  return (
    <Box className="bg-white rounded-md py-5 px-4 mt-4">
      <Typography variant="body2" className="!font-bold !text-[15px]">
        Payment Option
      </Typography>
      {coin ? (
        <Box className="flex justify-between items-center mt-5">
          <Typography
            variant="body2"
            className="!text-[12px] !text-black !w-full"
          >
            Points ({reshapePrice(coin)})
          </Typography>
          <Box className="flex items-center">
            <Typography
              variant="body2"
              noWrap
              className="!text-[12px] !text-black !mr-2 !w-full"
            >
              - {reshapePrice(coin)}
            </Typography>
          </Box>
          <MySwitch
            edge="end"
            checked={usingPoint}
            className="!md:mr-2"
            onChange={(e) => usPoint(!usingPoint)}
          />
        </Box>
      ) : null}
      <Box className="w-full flex justify-between items-center mb-5">
        <Box className="flex items-center">
          {card ? (
            <CardTemplate
              cardType={detectCardType(card?.openDigits[0])}
              name={card?.name}
              openDigits={card?.openDigits}
              id={card?._id}
              expiry={card?.expiry}
              hideDelete
            />
          ) : (
            <Typography
              variant="body2"
              className="!text-[14px] !text-black !text-center !w-full"
            >
              No card selected
            </Typography>
          )}
        </Box>
      </Box>

      {/* <Link href="/user">
                    <Typography
                      variant="body2"
                      className="!text-[15px] !text-blue-800 mt-5"
                    >
                      <span className="mr-3 !text-[17px]">+</span> Add payment
                      option
                    </Typography>
                  </Link> */}
      <CustomOption
        addBtn={
          <Link href="/user" className="!w-full">
            <Typography
              variant="body2"
              className="!text-[15px] !text-blue-800 mt-5"
            >
              <span className="mr-3 !text-[17px]">+</span> Add Payment
            </Typography>
          </Link>
        }
        icon={
          <Typography
            variant="body2"
            className="!text-[15px] !text-blue-800 mt-5"
          >
            <span className="mr-3 !text-[17px]">+</span>{' '}
            {card ? 'Change ' : 'Select '}
            payment option
          </Typography>
        }
        options={billings?.map(
          (e) =>
            `${e?.name}, ${e?.openDigits[0]}****${e?.openDigits[1]}, ${
              e?.expiry
            }. (${detectCardType(e?.openDigits[0])})`
        )}
        butPush={billings.map((e) => e)}
        clickFunction={(e) =>
          updatePayload((prev) => {
            return { ...prev, billingCard: e }
          })
        }
      />
    </Box>
  )
}
