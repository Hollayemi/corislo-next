'use client'
import CustomAvatar from '@/app/components/avatar'
import { OrderBoxes } from '@/app/components/cards/homeCards'
import IconifyIcon from '@/app/components/icon'
import SuperLeftBar from '@/app/components/view/super/SuperLeftBar'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

const Referrals = ({ params }) => {
  const cards = {}
  return (
    <SuperLeftBar path={{ ...params, sidebar: 'referrals' }}>
      <Typography variant="body2" className="!font-bold !text-black !text-2xl">
        Referral Program Updates
      </Typography>

      <Box className="flex items-center bg-whit rounded-md">
        <OrderBoxes
          image="/images/misc/all-orders.png"
          title="Total Advocates"
          value={cards.user?.sum || 0}
          color="#000"
        />
        <OrderBoxes
          image="/images/misc/cancel-orders.png"
          title="This Week Referred"
          value={cards.agent?.sum || 0}
          color="#000"
        />
        <OrderBoxes
          image="/images/misc/ongoing-orders.png"
          title="Payouts"
          value={cards.business?.sum || 0}
          color="#000"
        />
        <OrderBoxes
          image="/images/misc/completed-orders.png"
          title="Revenew"
          value={cards.order?.sum || 0}
          color="#000"
        />
      </Box>

      <Box className="bg-white p-5 mt-4 rounded-md w-7/12">
        <Typography
          variant="body2"
          className="!font-bold !text-black !text-[16px] leading-10 !pb-2"
        >
          BEST OF THE WEEK
        </Typography>

        <TheBest
          icon="facebook"
          title="Most shared channel"
          type="Facebook Share"
          count={41}
          of="shares"
        />
        <TheBest
          icon="cash"
          title="Most used payout method"
          type="Coupon"
          count={13}
          of="times"
        />
        <TheBest
          url="https://lh3.googleusercontent.com/a/ACg8ocLDt5lVxBeDwlBF-kPge2NtfiQzckZNXgD-1unRSvRz6d-OsOo-=s96-c"
          title="Most shared channel"
          type="Best Advocate"
          count={8}
          of="referrals"
        />
      </Box>

    </SuperLeftBar>
  )
}

export default Referrals

const TheBest = ({ icon, url, title, type, count, of }) => {
  const icons = {
    facebook: {
      icon: 'brand-facebook',
      color: 'text-blue-500 border-blue-500',
    },
    whatsapp: {
      icon: 'brand-whatsapp',
      color: 'text-green-500 border-green-500',
    },
    x: { icon: 'brand-x', color: 'text-black border-black' },
    cash: { icon: 'cash', color: 'text-gray-500 border-gray-500' },
  }
  return (
    <Box className="flex items-center justify-between border-t border-gray-200 h-20 px-2  ">
      <Box className="flex items-center ">
        {icon && (
          <Box
            className={`w-10 h-10 mr-3 flex items-center justify-center rounded-full border-2 ${icons[icon]?.color}`}
          >
            <IconifyIcon icon={`tabler:${icons[icon]?.icon}`} />
          </Box>
        )}
        {url && (
          <Box className={``}>
            <CustomAvatar
              src={url}
              className="w-10 h-10 mr-3 flex items-center justify-center rounded-full"
              alt="Advocate"
            />
          </Box>
        )}
        <Box>
          <Typography
            variant="body2"
            className="!font-bold !text-gray-600 !text-[14px] !mr-2 "
          >
            {title}
          </Typography>
          <Typography variant="caption" className="">
            {type}
          </Typography>
        </Box>
      </Box>
      <Box className="flex items-center float-left w-20">
        <Typography
          variant="body2"
          className="!font-bold !text-black !text-[14px] !mr-2 "
        >
          {count}
        </Typography>
        <Typography variant="caption" className="">
          {of}
        </Typography>
      </Box>
    </Box>
  )
}
