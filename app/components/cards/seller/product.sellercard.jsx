import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useUserData } from '@/app/hooks/useData'
import IconifyIcon from '@/app/components/icon'
import useSWR from 'swr'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { summarizeFollowers } from '@/app/utils/format'
import { followStore } from '@/app/redux/state/slices/users/following'
import Link from 'next/link'

export const ProductSellerCard = ({ branchId }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, error } = useSWR(`/branch/info?branchId=${branchId}`)
  const storeInfo = data?.data || {}
  const { following, socket } = useUserData()
  const isFollowing = following.includes(branchId)
  return (
    <Box className="bg-white w-full rounded-xl p-4 mt-4 relative">
      <Box className="flex  justify-between">
        <Box className="flex item-start">
          <Image
            src="/images/misc/shop/1.png"
            alt="store_logo"
            width={100}
            height={100}
            className="w-14 h-14 border border-blue-700 !rounded-full"
          />
          <Link href={`/${storeInfo.store}-${storeInfo.branch}`}>
            <Box className="mt-3 ml-2">
              <Typography
                variant="body2"
                className="!text-[14px] !font-bold !leading-3 !w-36 md:!w-52"
                noWrap
                color="custom.pri"
              >
                {storeInfo.businessName}
              </Typography>
              <Typography
                variant="caption"
                className="!text-[11px] !text-gray-400 !leading-3"
                color="custom.pri"
              >
                {storeInfo.branchName}
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box className="flex items-center justify-center">
          <Button
            variant="outlined"
            className="!rounded-full h-9 w-9 !min-w-[12px] md:w-32 !bg-white !shadow-none"
            startIcon={
              <IconifyIcon
                icon="tabler:message-2-plus"
                className="!text-blue-800 ml-3"
              />
            }
            onClick={() => router.push(`/chat?new=${branchId}`)}
          >
            <span className="hidden md:block">Message</span>
          </Button>
          <Button
            variant="outlined"
            className="!rounded-full h-9 w-9 !min-w-[12px] md:w-28 !bg-white !shadow-none !ml-3"
            startIcon={
              <IconifyIcon
                icon={isFollowing ? 'tabler:user-minus' : 'tabler:user-plus'}
                className="!text-blue-800 ml-3"
              />
            }
            onClick={() =>
              followStore(storeInfo, dispatch, socket, isFollowing)
            }
          >
            <span className="hidden md:block">
              {isFollowing ? 'Following' : 'Follow'}
            </span>
          </Button>
        </Box>
      </Box>
      <Box className="mt-3 flex flex-col md:flex-row ">
        <Box className="flex items-center justify-evenly md:w-3/5">
          <StoreNumberStatus
            status="Items"
            value={storeInfo.totalItems || '...'}
          />
          <Box className="w-0.5 h-6 bg-gray-300"></Box>
          <StoreNumberStatus
            status="Followers"
            value={summarizeFollowers(storeInfo.followers)}
          />
          <Box className="w-0.5 h-6 bg-gray-300"></Box>
          <StoreNumberStatus
            status="Reviews"
            value={storeInfo?.feedback?.totalReviews}
          />
        </Box>

        {/* <Box className="mt-2 md:mt-0 md:w-2/5 block">
          <TickCheck title="Order Fufilment Rate:" icon result="Average" />
          <TickCheck title="Customer Rating:" icon result="Good" />
        </Box> */}
      </Box>
    </Box>
  )
}

const TickCheck = ({ title, result, icon }) => (
  <Box className="flex items-center my-1">
    <Box className="flex items-center">
      {icon && (
        <IconifyIcon
          icon="tabler:check"
          className="w-3.5 h-3.5 !text-white p-px !rounded-full bg-green-600 mr-1"
        />
      )}
      <Typography variant="body2" className="!text-gray-400 !text-[13px]">
        {title}
      </Typography>
    </Box>
    <Box>
      <Typography variant="body2" className="!text-black !text-[13px] !ml-4">
        {result}
      </Typography>
    </Box>
  </Box>
)

const StoreNumberStatus = ({ status, value }) => (
  <Box className="flex items-center">
    <Box className="">
      <Typography
        variant="caption"
        className="!text-black !font-bold !text-[16px]"
      >
        {value}
      </Typography>
    </Box>

    <Box>
      <Typography
        variant="body2"
        className="!text-gray-400 !text-[10px] !pb-px !ml-1"
      >
        {status}
      </Typography>
    </Box>
  </Box>
)
