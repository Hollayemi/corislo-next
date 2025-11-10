'use client'
import { SectionTitle } from '@/app/components/cards/homeCards'
import IconifyIcon from '@/app/components/icon'
import {
  HotDeal,
  PopularProduct,
} from '@/app/components/templates/productTemplates'
import { CartProductView } from '@/app/components/templates/productView'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useUserData } from '@/app/hooks/useData'
import { addCartHandler, deleteBulkCart, saveProduct } from '@/app/redux/state/slices/home/cart'
import { useDispatch } from 'react-redux'
import CustomOption from '@/app/components/option-menu/option'
import Link from 'next/link'
import useSWR from 'swr'
import Head from 'next/head'
import { BasicModal } from '@/app/components/cards/popup'
import RemoveFromCartModal from './components'
import { reshapePrice } from '../../dashboard/store/marketing/components'
import UserWrapper from '@/app/components/view/user'
import { useCart } from '@/app/context/CartContext'

const UserCart = () => {
  const dispatch = useDispatch()
  const { data: addrs } = useSWR('/user/addresses')
  const [modalOpen, setModalOpen] = useState(false)
  const addresses = addrs?.data || []
  const { cartItems: cartData, cartedProducts: cartedProds, selectCartProd: cartForCheckout, } = useCart()
  const {
    userInfo,
    temp,
    agentInfo,
    addTemp,
  } = useUserData()
  const [selected, selectCart] = useState([])
  const router = useRouter()
  const address = temp.address || userInfo?.selectedAddress || null

  useEffect(() => cartForCheckout(selected), [selected])

  return (
    <>
      <Head>
        <title>Home Page | Your Website Name</title>
        <meta
          name="description"
          content="This is the home page of Your Website."
        />
        <meta name="keywords" content="nextjs, homepage, website" />
      </Head>
      <UserWrapper
        popup={
          <BasicModal
            openModal={Boolean(modalOpen)}
            content={
              <RemoveFromCartModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaveForLater={() => {
                  // alert('Saved for later!')
                  addCartHandler(modalOpen, dispatch)
                  saveProduct(modalOpen, dispatch)
                  setModalOpen(false)
                }}
                onRemove={() => {
                  // alert('Item removed!')
                  addCartHandler(modalOpen, dispatch)
                  setModalOpen(false)
                }}
              />
            }
          />
        }
      >
        <Box className="!px-2 my-5 sm:!px-6 md:!px-24 lg:!px-32 md:!py-7 relative">
          <Box className="flex flex-col sm:flex-row items-start gap-4 md:gap-10">
            <Box className="w-full sm:w-8/12" >
              <Box className="w-full">
                <Box className="bg-white rounded-md py-5 !px-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[20px]"
                  >
                    Shopping Cart ({cartedProds.length})
                  </Typography>
                  <Box className="w-full flex justify-between s-center !mt-2">
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
                          checked={selected.length === cartedProds.length}
                          onChange={(e) => {
                            const checked = e.target.checked
                            selectCart(() => (checked ? cartedProds : []))
                          }}
                          disabled={false}
                          name="basic-checked"
                        />
                      }
                    />
                    <Button
                      variant="text"
                      className={`!text-[12px] !text-blue-700 !mt-1 ${!selected.length > 0 && 'cursor-cancel'
                        }`}
                      disabled={!selected.length > 0}
                      // onClick={() => deleteBulkCart(selected, dispatch)}
                      onClick={() => {
                        setModalOpen(true)
                        // dispatch(deleteBulkCart(selected))
                      }}
                    >
                      Delete selected items
                    </Button>
                  </Box>
                  <Box className="w-full flex justify-between !text-blue-700 !px-4 py-1 bg-blue-50 items-center !mt-2">
                    <Typography variant="body2" className="!text-[11px]">
                      You have a discount voucher for this products
                    </Typography>
                    <IconifyIcon
                      icon="tabler:chevron-right"
                      className="text-[14px]"
                    />
                  </Box>
                </Box>
                <Box className="bg-white w-full rounded-md py-5 !px-2 md:!px-4 mt-5">
                  {cartData?.products &&
                    cartData?.products.map(
                      (each, i) =>
                        i < 4 && (
                          <Box key={i}>
                            <CartProductView
                              store={each.store}
                              selected={selected}
                              selectCart={selectCart}
                              cartPopup={setModalOpen}
                              branch={each.branch}
                              cartId={each._id}
                              productId={each.product._id}
                              colors={each.product?.specifications?.colors}
                              prodName={each.product.prodName}
                              collection={each.product.collectionName}
                              image={each.product.image}
                              prodPrice={each.product.prodPrice}
                              quantity={each.quantity}
                            />
                            {cartData.products.length > i + 1 && (
                              <Box className="w-full border-[1px] border-gray-100 my-5"></Box>
                            )}
                          </Box>
                        )
                    )}
                </Box>
              </Box>
            </Box>
            <Box className="w-full sm:w-4/12">
              <Box>
                <Box className="bg-white rounded-md py-5 !px-4">
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
                      {reshapePrice(cartData?.originalPrice)}
                    </Typography>
                  </Box>
                  {cartData.discountedPrice ? (
                    <Box className="w-full flex justify-between items-center !mt-2">
                      <Typography variant="body2" className="!text-[12px]">
                        Discount
                      </Typography>
                      <Typography
                        variant="body2"
                        className="!text-[12px] !text-red-500"
                      >
                        - {reshapePrice(cartData?.discountAmount || 0)}
                      </Typography>
                    </Box>
                  ) : null}
                  <Box className="w-full border-2 border-dashed border-black mt-4"></Box>
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
                      {reshapePrice(cartData?.discountedPrice)}
                    </Typography>
                  </Box>
                </Box>
                <Box className="bg-white hidden rounded-md py-5 !px-4 mt-4">
                  <Typography
                    variant="body2"
                    className="!font-bold !text-[15px]"
                  >
                    Delivery Address
                  </Typography>
                  <Box className="w-full flex justify-between items-center !mt-5">
                    <Typography variant="body2" className="!text-[11px] w-8/12">
                      {(address &&
                        `${address.address}, ${address.state}, ${address.city} (${address.postal_code})`) ||
                        'No address selected'}
                    </Typography>
                    <CustomOption
                      addBtn={
                        <Link href="/user" className="!w-full">
                          <Typography
                            variant="body2"
                            className="!text-[15px] !text-blue-800 mt-5"
                          >
                            <span className="mr-3 !text-[17px]">+</span> Add
                            address
                          </Typography>
                        </Link>
                      }
                      icon={
                        <Button
                          variant="outlined"
                          className="w-20 h-6 !rounded-full !border !border-blue-500 !text-[12px] !text-blue-600"
                        >
                          {address ? 'Change' : 'Select'}
                        </Button>
                      }
                      options={addresses.map(
                        (e) =>
                          `${e?.address}, ${e?.state}, ${e?.city} (${e?.postal_code})`
                      )}
                      butPush={addresses.map((e) => e)}
                      clickFunction={(e) =>
                        addTemp((prev) => {
                          return { ...prev, address: e }
                        })
                      }
                    />
                  </Box>
                </Box>
                <Box className="bg-white hidden rounded-md py-5 !px-4 mt-4">
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
                  <Box className="flex justify-center mt-4">
                    <Box className="w-full relative !overflow-hidden">
                      <input
                        type="text"
                        value=""
                        placeholder="Enter the discount coupon code"
                        onChange={() => { }}
                        className="h-10 w-full bg-blue-50 rounded-full pl-12 pr-8 focus outline-none border-blue-200 focus:border"
                      />
                      <IconifyIcon
                        icon="tabler:search"
                        className="absolute top-[12px] left-4 text-[16px]"
                      />
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => router.push('/checkout')}
                  className="w-full !mt-6 h-12 !rounded-full !border-none !text-[14px] !text-white"
                >
                  Checkout ({selected.length || cartData?.products?.length})
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="mt-16">
            <SectionTitle black="More items from this seller" />
            <PopularProduct small />
          </Box>
          <Box className="mt-8">
            <SectionTitle black="You may also like" />
            <HotDeal small />
          </Box>
        </Box>
      </UserWrapper>
    </>
  )
}

export default UserCart
