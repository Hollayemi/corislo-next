'use client'
import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import HomeWrapper from '@/app/components/view/home'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/app/hooks/useData'
import { ngnPrice } from '@/app/utils/format'
import { copyToClipboard } from '@/app/utils/clipboard'
import Icon from '@/app/components/icon'
import Image from 'next/image'
import useSWR from 'swr'

const Referral = () => {
  const { userInfo } = useUserData()
  const [isCopied1, setIsCopied1] = useState(false)
  const [isCopied2, setIsCopied2] = useState(false)
  const route = useRouter()
  const { data, isLoading } = useSWR('/corisio/agent-rewards')
  console.log(data)
  const storeReward = data?.filter((item) => item.type === 'store_reg') || []
  return (
    <HomeWrapper noFooter>
      <Image
        src="/images/misc/gradient.png"
        alt="circle"
        width={1400}
        height={1400}
        className="absolute top-0 left-0 w-full"
      />
      <Box className="w-full flex flex-col md:justify-around z-40 items-center relative px-2 md:min-h-[80vh]">
        <Box className="sm:w-full px-3 md:w-1/2 flex flex-col justify-center items-center mt-14">
          <Typography
            variant="body1"
            className="!text-2xl md:!text-3xl !text-black !font-black !text-center !leading-8 md:!leading-10 ref"
          >
            Earn valuable tokens for every friend or store you introduce to us.
          </Typography>
          <Box className="w-11/12 md:w-8/12 text-center mt-5">
            <Typography variant="caption" className="!mt-5 !text-center">
              Invite your friends and stores to join us and unlock exclusive
              rewards! For each referral, earn valuable tokens that can be
              redeemed for exciting perks.
            </Typography>
          </Box>
        </Box>

        <Box className="w-full md:w-[440px] h-[300px]  bg-white rounded-md shadow-md mt-16 md:mt-10 py-8 px-6">
          <Box className="w-full flex items-center px-3">
            <Box className="w-6/12">
              <Typography
                className="!text-[12px] !text-gray-400 !font-bold"
                variant="caption"
              >
                Referral ID
              </Typography>
              <Box className="flex items-center">
                <Icon
                  icon={isCopied1 ? 'tabler:copy-check' : 'tabler:copy'}
                  onClick={() =>
                    copyToClipboard(userInfo.username, setIsCopied1)
                  }
                  className="mr-2 cursor-pointer hover:text-blue-900"
                />
                <Typography
                  noWrap
                  className="!text-[12px] !text-gray-800 !font-black"
                  variant="caption"
                >
                  {userInfo.username}
                </Typography>
              </Box>
            </Box>
            <Box className="w-6/12">
              <Typography
                className="!text-[12px] !text-gray-400 !font-bold"
                variant="caption"
              >
                Referral Link
              </Typography>
              <Box className="w-11/12 flex items-center">
                <Icon
                  icon={isCopied2 ? 'tabler:copy-check' : 'tabler:copy'}
                  onClick={() =>
                    copyToClipboard(
                      `https://corisio.com/refferal?id=${userInfo.username}`,
                      setIsCopied2
                    )
                  }
                  className="mr-2 cursor-pointer hover:text-blue-900"
                />
                <Typography
                  noWrap
                  className="!text-[12px] !w-full !text-gray-800 !font-black"
                  variant="body2"
                >
                  https://corisio.com/refferal?id={userInfo.username}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="w-full flex items-center bg-gray-100 p-3 mt-6 rounded">
            <Box className="w-6/12">
              <Typography
                className="!text-[12px] !text-gray-400 !font-bold"
                variant="caption"
              >
                You Receive
              </Typography>
              <Box>
                <Icon />
                <Typography
                  noWrap
                  className="!text-[12px] !text-gray-800 !font-black"
                  variant="caption"
                >
                  {`${storeReward[0]?.amount} Points`}
                </Typography>
              </Box>
            </Box>
            <Box className="w-6/12">
              <Typography
                className="!text-[12px] !text-gray-400 !font-bold"
                variant="caption"
              >
                Stores Receive
              </Typography>
              <Box className="w-11/12">
                <Icon />
                <Typography
                  noWrap
                  className="!text-[12px] !w-full !text-gray-800 !font-black"
                  variant="body2"
                >
                  {`${storeReward[0]?.amount} + ${storeReward[0]?.point} Points`}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() =>
              route.push(`/dashboard/register?ref=${userInfo.username}`)
            }
            className="!mt-6 !shadow-none !text-white !h-10 w-full !text-[12px]"
          >
            Register Store
          </Button>
          <Button
            onClick={() => route.push('/referral/dashboard')}
            className="!mt-2 !shadow-none !h-10 w-full !text-[11px]"
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
      <Box className="absolute w-full h-full top-0 left-0 z-10">
        <Image
          src="/images/star/3.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-24 absolute top-16 left-2 md:left-36"
        />
        <Image
          src="/images/star/4.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-20 absolute top-10 right-10"
        />
        {/* <Image
            src="/images/star/5.png"
            alt="logo"
            width={100}
            height={100}
            className="!w-20 absolute top-1/3 left-1/2"
          /> */}
        <Image
          src="/images/star/6.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-20 absolute -bottom-8 left-20"
        />
      </Box>
    </HomeWrapper>
  )
}
export default Referral
