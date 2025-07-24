'use client'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import { Add, Remove } from '@mui/icons-material'
import useSWR from 'swr'
import Image from 'next/image'
import {
  detectCardType,
  formatCVC,
  formatCreditCardNumber,
  formatExpirationDate,
} from '@/app/utils/format'
import Payment from 'payment'
import { saveBilling } from '@/app/redux/state/slices/users/billing'
import { useDispatch } from 'react-redux'
import { useStoreData } from '@/app/hooks/useData'
import { MyTextField, TitleSubtitle } from '@/app/(pages)/user/components'
import IconifyIcon from '@/app/components/icon'

const BillingCard = ({ card }) => {
  const {} = useStoreData()
  const [cardPayload, setCardData] = useState({
    number: '',
    cvv: '',
    expiry: card.expiry || '',
    name: card.name || '',
    email: card.email || '',
  })

  const dispatch = useDispatch()
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
  return (
    <Box className="px-3">
      <Box className="flex justify-between items-center"></Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box className="">
            <Box className=" flex justify-between h-10 max-h-10 w-full">
              <TitleSubtitle
                title="Payment Cards"
                subtitle="Add your card and billing details"
              />
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
            <br />
            <MyTextField
              title="Name on card"
              value={cardPayload.name}
              onChange={handleInputChange('name')}
              PClassName="w-full px-1 !tracking-wider"
              placeholder="e.g Samuel Colson Tobiloba"
            />
            <MyTextField
              title="Billing email"
              value={cardPayload.email}
              onChange={handleInputChange('email')}
              PClassName="w-full px-1 !tracking-wider"
              placeholder="e.g bill@me.com"
            />
            <MyTextField
              title="Card Number"
              value={cardPayload.number}
              placeholder="_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _"
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
            <Button
              onClick={() => saveBilling(cardPayload, dispatch, true)}
              fullWidth
              variant="contained"
              className="!h-10 !w-full"
            >
              Save Card
            </Button>
            <br />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BillingCard
