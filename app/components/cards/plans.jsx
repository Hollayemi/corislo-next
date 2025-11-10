import { Box, Button, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import IconifyIcon from '../icon'
import { reshapePrice } from '@/app/(pages)/dashboard/store/marketing/components'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

const Plans = ({
  opportunities,
  from,
  hideChoosePlan,
  price,
  discount = 0,
  name,
  prof,
  interval,
}) => {
  const annPrice = price * 12
  const discounted = annPrice - (annPrice * discount) / 100
  return (
    <Box
      className={`w-full sm:w-1/2 lg:w-1/3 md:!px-2 ${!prof && 'md:mt-0'
        } md:py-10`}
    >
      <Box
        className={`relative w-full !rounded-xl  border py-8 md:m-2 my-4 ${prof ? 'md:shadow-2xl' : 'md:shadow-xl'
          }`}
      >
        <Box className="flex flex-col items-center">
          <Typography
            variant="body2"
            className="!text-xl !text-blue-800 !font-bold"
          >
            {name || '-'}
          </Typography>
          <Typography
            variant="body2"
            className="!text-2xl !py-5 !text-blue-800 !font-black !font-sans"
          >
            {reshapePrice(interval === 'annual' ? discounted : price)}{' '}
            <span className="!text-[12px] !font-normal !text-gray-500">
              /{interval}
            </span>
          </Typography>

          {!hideChoosePlan && (
            <Button
              variant="outlined"
              className="!rounded-full w-48 h-11 !text-[14px] !text-blue-600 !bg-white !shadow-none"
            >
              Choose Plan
            </Button>
          )}
        </Box>
        <Box className="mt-10 !px-8 md:!px-3">
          <Typography
            variant="body2"
            className="!text-md !text-gray-600 !font-bold"
          >
            What you get
          </Typography>
          <br />
          {opportunities.map((each, i) => (
            <CheckList text={each} key={i} cancel={i > from} />
          ))}
        </Box>
        {prof && (
          <Box className="absolute top-0 -mt-4 w-full flex items-center justify-center">
            <Box className="w-40 text-[12px] rounded-full h-8 bg-blue-900 text-orange-200 !font-bold flex items-center justify-center">
              📢 20% OFF Yearly Plan
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export const CheckList = ({ cancel, text }) => (
  <Box className="flex items-start !mb-2">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor={cancel ? 'gray-[50]' : 'white'}
    >
      <IconifyIcon
        icon={cancel ? 'tabler:x' : 'tabler:check'}
        className="!text-[12px] !text-blue-500"
      />
    </Box>
    <Box className="ml-2">
      <Typography variant="caption" className="!text-[12px] !text-gray-500">
        {text}
      </Typography>
    </Box>
  </Box>
)

export const opp1 = [
  'Business profile creation',
  'limited product listings',
  'Basic analytics and insights',
  'Standard analytics reports (e.g., weekly)',
  'Basic support (email only)',
  'Store branches',
  'Access to premium advertising options',
  // "Unlimited access to store visitors",
  // "Priority support with SLAs",
  // "Detailed analytics, custom reports",
  // "Exclusive promotions and marketing opportunities",
]
export const opp2 = [
  'Business profile creation',
  'limited product listings',
  'Advanced analytics and insights',
  'Limited business branches',
  'Limited business staffs',
  'Limited access to business visitors',
  'Limited premium advertising options',
  'Priority support with SLAs',
  'Detailed analytics, custom reports',
]
export const opp3 = [
  'Business profile creation',
  'Unlimited product listings',
  'Professional analytics and insights',
  'Manage unlimited business branches',
  'Unlimited business staffs',
  'Unlimited direct messaging with visitors',
  'Priority support with SLAs',
  'Detailed analytics, custom reports',
  'Exclusive promotions and marketing opportunities',
]
const AllPlans = ({ hideChoosePlan }) => {
  const [interval, setMyInterval] = useState('Monthly')

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="${encodeURIComponent(
            '#ffffff'
          )}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M15 19l2 2l4 -4" /></svg>')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-month" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="${encodeURIComponent(
          '#ffffff'
        )}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }))

  return (
    <Box>
      <Box className="flex justify-center mt-5">
        <Box className="flex items-center rounded-full bg-gray-100 !px-3 py-0.5 w-fit">
          <Typography
            variant="body2"
            className={`mr-2 !text-[14px] !font-bold transition-all duration-300 ${interval === 'Monthly' ? '!text-blue-800' : '!text-gray-400'
              }`}
          >
            Monthly
          </Typography>
          <MaterialUISwitch
            sx={{ mx: 1 }}
            defaultChecked={interval === 'Annually'}
            onClick={() =>
              setMyInterval((prev) =>
                prev === 'Monthly' ? 'Annually' : 'Monthly'
              )
            }
          />
          <Typography
            variant="body2"
            className={`ml-2 !text-[14px] !font-bold transition-all duration-300 ${interval === 'Annually' ? '!text-blue-800' : '!text-gray-400'
              }`}
          >
            Annally
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-col md:flex-row items-start overflow-auto">
        <Plans
          opportunities={opp1}
          interval={interval === 'Monthly' ? 'month' : 'annual'}
          from={4}
          hideChoosePlan={hideChoosePlan}
          price={1000}
          name="Small Business"
        />

        <Plans
          opportunities={opp2}
          interval={interval === 'Monthly' ? 'month' : 'annual'}
          from={6}
          hideChoosePlan={hideChoosePlan}
          price={4000}
          name="Medium Business"
        />
        <Plans
          opportunities={opp3}
          interval={interval === 'Monthly' ? 'month' : 'annual'}
          from={8}
          discount={12}
          hideChoosePlan={hideChoosePlan}
          price={8000}
          name="Enterprise Plan"
          prof
        />
      </Box>
    </Box>
  )
}

export default AllPlans
