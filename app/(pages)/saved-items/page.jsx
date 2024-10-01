'use client'
import IconifyIcon from '@/app/components/icon'
import CustomOption from '@/app/components/option-menu/option'
import { GroupSavedProducts } from '@/app/components/templates/productView'
import HomeWrapper from '@/app/components/view/home'
import { userGroupCartData } from '@/app/data/home/homepage'
import { useUserData } from '@/app/hooks/useData'
import { deleteBulkSaved } from '@/app/redux/state/slices/home/cart'
import { addNewOrder, orderPrice } from '@/app/redux/state/slices/home/order'
import { ngnPrice } from '@/app/utils/format'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { TitleSubtitle } from '../user/components'
import { ChangeAddress, PaymentOptions } from '../checkout/page'

const SavedItems = () => {
  const dispatch = useDispatch()
  const { savedProds, userInfo, temp, seletedCartProds } = useUserData()
  const { data: saved, error } = useSWR('/user/saved-items/group')
  const { data: agents } = useSWR('/user/pickers')
  const pickers = agents?.data || []
  const groupedCart = saved ? saved.data : []
  const [selected, selectItem] = useState([])
  const [totalPrice, setTotalPrice] = useState([])

  console.log(selected)

  const [payload, updatePayload] = useState({
    ids: selected,
    delivery: {},
    picker: {},
    type: 'saved',
    shippingAddress: temp.address || userInfo?.selectedAddress || null,
    billingCard: userInfo?.selectedBilling || null,
  })

  useEffect(() => {
    orderPrice({ products: selected, model: 'saved' }, dispatch, setTotalPrice)
    updatePayload((prev) => ({ ...prev, ids: selected }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const address = payload.shippingAddress
  const card = payload.billingCard

  return (
    <HomeWrapper>
      <Box>
        <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box className="bg-white rounded-md py-5 px-4">
                <Typography variant="body2" className="!font-bold !text-[20px]">
                  Saved Items ({savedProds.length})
                </Typography>
                <Box className="w-full flex justify-between items-center !mt-2">
                  <FormControlLabel
                    className="!mt-2"
                    label={
                      <Box>
                        <Typography variant="caption" className="">
                          Select all items
                        </Typography>
                      </Box>
                    }
                    control={
                      <Checkbox
                        checked={selected.length === savedProds.length}
                        onChange={(e) => {
                          const checked = e.target.checked
                          selectItem(() => (checked ? savedProds : []))
                        }}
                        disabled={false}
                        name="basic-checked"
                      />
                    }
                  />
                  <Button
                    variant="text"
                    className={`!text-[12px] !text-blue-700 !mt-1 ${
                      !selected.length > 0 && 'cursor-cancel'
                    }`}
                    disabled={!selected.length > 0}
                    onClick={() => deleteBulkSaved(selected, dispatch)}
                  >
                    Delete selected items
                  </Button>
                </Box>
                <Box className="w-full flex justify-between !text-blue-700 px-4 py-1 bg-blue-50 items-center !mt-2">
                  <Typography variant="body2" className="!text-[11px]">
                    You have a discount voucher for this products
                  </Typography>
                  <IconifyIcon
                    icon="tabler:chevron-right"
                    className="text-[14px]"
                  />
                </Box>
              </Box>
              <Box className="mt-8">
                {groupedCart.map((each, i) => (
                  <Box key={i} className="bg-white rounded-md px-4 mb-7">
                    <GroupSavedProducts
                      store={each._id.store}
                      branch={each._id.branch}
                      branchPrice={each.branchCheckout}
                      fromBranch={each.fromBranch}
                      updatePayload={updatePayload}
                      payload={payload}
                      pickers={pickers}
                      selected={selected}
                      selectItem={selectItem}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Box className="bg-white rounded-md py-5 px-4 mb-4">
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
                      {ngnPrice(totalPrice?.originalPrice || 0)}
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
                      {ngnPrice(
                        totalPrice?.discountedPrice -
                          totalPrice?.sum_totalBeforeDiscount || 0
                      )}
                    </Typography>
                  </Box>

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
                      {ngnPrice(totalPrice?.discountAmount || 0)}
                    </Typography>
                  </Box>
                </Box>
                {/* <Box className="bg-white rounded-md py-5 px-4 mt-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Voucher
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Typography variant="body2" className="!text-[11px] w-3/5">
                      FREE4ALL%15%NOW
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
                </Box> */}
                <ChangeAddress
                  address={address}
                  updatePayload={updatePayload}
                />
                <PaymentOptions card={card} updatePayload={updatePayload} />
                <Button
                  variant="contained"
                  disabled={selected.length < 1}
                  className="w-full !mt-6 !h-12 !rounded-full !border-none !text-[14px] !text-white"
                  onClick={() =>
                    addNewOrder(payload, dispatch, '/user/saved-items/group')
                  }
                >
                  Place Order ({selected.length || 0})
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default SavedItems
