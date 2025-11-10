'use client'
import { Box, Typography } from '@mui/material'
import { reshapePrice } from '../../dashboard/store/marketing/components'
import Image from 'next/image'
import { Dot } from '@/app/components/cards'

const Freemium = ({ viewing }) => {
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
    <Box>
      <Box className="flex flex-col-reverse md:flex-row">
        <Box className="md:w-1/2 !px-3 mt-6 md:mt-0 md:!px-6">
          <Box className="flex flex-col justify-center md:h-[400px] items-center">
            <Image
              src="/images/misc/no-payment.png"
              alt="no-payment"
              className="w-52 h-52"
              width={300}
              height={300}
            />
            <Typography
              variant="body2"
              className="!font-black !text-[18px] !text-center !text-black !mt-5"
            >
              No Payment Required
            </Typography>
          </Box>
        </Box>
        <Box className="md:w-1/2 h-[500px] !px-3 md:!px-10 ">
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
                <Box className="absolute w-full h-full flex justify-center items-center !px-4">
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
                      Freemium Payment
                    </Typography>
                    <Typography
                      variant="body2"
                      className="!text-[11px] !text-gray-500"
                    >
                      {reshapePrice(0)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="mt-16">
              <Box className="!px-6">
                <DotText text="Nearest Store Distance: View distance to the closest store offering desired products." />
                <DotText text="Designate Picker: Assign someone to pick up purchases on your behalf." />
                <DotText text="Private Chat: Communicate directly with stores through in-app private messaging." />
                <DotText text="Referral Program: Register and refer friends to earn rewards and incentives." />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Freemium
