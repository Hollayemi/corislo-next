'use client'
import { Box, Button, Divider, Typography } from '@mui/material'
import { MyTextField } from '../user/components'
import { useState } from 'react'
import Payment from 'payment'
import {
  detectCardType,
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '@/app/utils/format'
import { OrderSummary } from '../store/dashboard/order-management/review/components'
import { reshapePrice } from '../store/dashboard/marketing/components'
import { useUserData } from '@/app/hooks/useData'
import OptionsMenu from '@/app/components/option-menu'
import { CardTemplate } from '../user/billingAndAddress'
import useSWR from 'swr'
import IconifyIcon from '@/app/components/icon'
import Image from 'next/image'
import { Dot } from '@/app/components/cards'

const Premium = ({ viewing }) => {
  const { userInfo } = useUserData()
  const [formerCard, setFormerCard] = useState()

  const { data: cards } = useSWR('/user/billings')
  const billings = cards?.data || []

  const [cardPayload, setCardData] = useState({
    number: '',
    cvv: '',
    expiry: '',
    name: '',
  })
  const handleInputChange =
    (prop) =>
    ({ target }) => {
      if (prop === 'number') {
        target.value = formatCreditCardNumber(target.value, Payment)
        setCardData({ ...cardPayload, [prop]: target.value })
      } else if (prop === 'expiry') {
        target.value = formatExpirationDate(target.value)
        setCardData({ ...cardPayload, [prop]: target.value })
      } else if (prop === 'cvv') {
        target.value = formatCVC(target.value, cardPayload.number, Payment)
        setCardData({ ...cardPayload, [prop]: target.value })
      } else {
        setCardData({ ...cardPayload, [prop]: target.value })
      }
    }
  const cardType = detectCardType(cardPayload.number)
  const DotText = ({ text }) => (
    <Box className="flex items-start mb-5">
      <Dot color="!bg-blue-900" />
      <Typography
        variant="body2"
        className="!ml-6 !-mt-1 !text-[12px] !text-gray-600"
      >
        {text}
      </Typography>
    </Box>
  )
  return (
    <Box
      className={`${viewing ? 'mt-0' : 'mt-10'} transition-all duration-300`}
    >
      <Box className="flex flex-col-reverse md:flex-row">
        <Box className="md:w-1/2 px-3 mt-6 md:mt-0 md:px-6">
          <Box className="h-10 max-h-10 w-full">
            <Typography variant="body2" className="!font-bold ">
              Payment details
            </Typography>
            {cardType && (
              <Image
                src={`/images/misc/others/${cardType}.png`}
                alt="mastercard"
                width={200}
                height={200}
                className="w-10 md:h-10 !mx-1 md:!mx-2.5"
              />
            )}
          </Box>
          <Box>
            <Box className="p-2 border border-dashed rounded-xl mb-4 ">
              {formerCard ? (
                <CardTemplate
                  cardType={detectCardType(formerCard?.openDigits[0])}
                  name={formerCard?.name}
                  openDigits={formerCard?.openDigits}
                  id={formerCard?._id}
                  expiry={formerCard?.expiry}
                  hideDelete
                />
              ) : (
                <Typography
                  variant="body2"
                  className="!text-[14px] !text-center !text-gray-600"
                >
                  No card selected
                </Typography>
              )}
            </Box>
            <OptionsMenu
              icon={
                <Button
                  className="!bg-gray-100 !mb-3"
                  fullWidth
                  endIcon={
                    <IconifyIcon
                      icon="tabler:credit-card-filled"
                      className="ml-4"
                    />
                  }
                >
                  Select Card
                </Button>
              }
              options={billings.map((card, i) => {
                return {
                  component: (
                    <CardTemplate
                      cardType={detectCardType(card?.openDigits[0])}
                      name={card?.name}
                      openDigits={card?.openDigits}
                      id={card?._id}
                      expiry={card?.expiry}
                      hideDelete
                    />
                  ),
                  rest: card,
                }
              })}
              setOption={(e) => setFormerCard(e)}
              iconButtonProps={{
                size: 'small',
                sx: { cursor: 'pointer' },
              }}
              itemsClassName="!bg-transparent hover:!bg-gray-50 !min-w-[320px]"
            />
          </Box>
          <Divider className="!my-4 !text-[13px]">OR</Divider>
          <Button
            className="!bg-gray-100 !mt-3"
            fullWidth
            endIcon={<IconifyIcon icon="tabler:credit-card" className="ml-4" />}
          >
            Add New Card
          </Button>
          <Box className="hidden">
            <MyTextField
              title="Name on card"
              value={cardPayload.name}
              onChange={handleInputChange('name')}
              PClassName="w-full px-1 !tracking-wider"
            />
            <MyTextField
              title="Card Number"
              value={cardPayload.number}
              placeholder="x x x x   x x x x  x x x x    x x x x"
              type="text"
              onChange={handleInputChange('number')}
              PClassName="w-full px-1 !tracking-wider"
            />

            <Box className="flex items-center justify-between flex-wrap w-full">
              <MyTextField
                title="Expiry Date"
                value={cardPayload.expiry}
                type="text"
                placeholder="MM/YYY"
                onChange={handleInputChange('expiry')}
                PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
              />
              <MyTextField
                title="CVV"
                value={cardPayload.cvv}
                type="number"
                placeholder="_ _ _"
                onChange={handleInputChange('cvv')}
                PClassName="w-full sm:w-1/2 px-1 !tracking-wider"
              />
            </Box>
          </Box>
          <br />
          <br />
          <br />
          <OrderSummary title="Subtotal" info={``} price={8000} />
          <OrderSummary title="Platform Fee" info="" price={20} />
          <Divider>...</Divider>
          <OrderSummary title="Total Amount" bold price={8020} />

          <br />
          <Button
            onClick={() => saveBilling(cardPayload, dispatch)}
            fullWidth
            variant="contained"
            className="!h-12 !w-full shadow-none !rounded-lg"
          >
            Make Payment
          </Button>
          <br />
        </Box>
        <Box className="md:w-1/2 h-[500px] px-3 md:px-10 ">
          <Box className="w-full h-full rounded-xl bg-gray-200 !overflow-hidden">
            <Box className="w-">
              <Box className="h-48 bg-blue-950 relative ">
                <Image
                  src="/images/misc/gradient.png"
                  alt="lj"
                  width={300}
                  height={300}
                  className="absolute -top-16 -right-28"
                />
                <Box className="w-full h-full bg-slate-900 opacity-60 absolute top-0"></Box>
                <Box className="absolute w-full h-full flex justify-center items-center px-4">
                  <Typography
                    variant="body2"
                    className="!font-black !text-[14px] !text-center !text-white"
                  >
                    Subscribe and start enjoying <br /> Corisio to the fullest
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="relative">
              <Box className="w-full flex justify-center absolute top-0 -mt-8">
                <Box className="w-5/6 h-16 flex items-center rounded-xl bg-white shadow-xl p-3">
                  <Image
                    src="/images/misc/wallet-verified.png"
                    alt="payment"
                    width={100}
                    height={100}
                    className="w-14 h-14 mr-2"
                  />
                  <Box className="flex flex-col">
                    <Typography
                      variant="body2"
                      className="!font-bold text-[13px] !text-black"
                    >
                      Premium Payment
                    </Typography>
                    <Typography
                      variant="body2"
                      className="!text-[11px] !text-gray-500"
                    >
                      {reshapePrice(8000)} / month
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="mt-16">
              <Box className="px-6">
                <DotText text="All feature in freemium" />
                <DotText text="Access to store map and route before buying product" />
                <DotText text="Ability to explore different locations for product availability" />
                <DotText text="Unlock advanced map features, including browsing store locations from map" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Premium
