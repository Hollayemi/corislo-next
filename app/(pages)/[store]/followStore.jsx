'use client'
import { useUserData } from '@/app/hooks/useData'
import { mySubstring, summarizeFollowers } from '@/app/utils/format'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

const { default: IconifyIcon } = require('@/app/components/icon')
const { followStore } = require('@/app/redux/state/slices/users/following')
const { Button, Box, Typography } = require('@mui/material')
const { default: Link } = require('next/link')

const FollowStore = ({ getStore }) => {
  const dispatch = useDispatch()
  const { following, socket } = useUserData()

  const { data } = useSWR(
    `/branch/info?store=${getStore[0]}&branch=${getStore[1]}`
  )

  const branchInfo = data ? data.data : {}

  const isIncluded = following.includes(branchInfo?.branchId)
  return (
    <Box className="w-full flex justify-end relative">
      <Box className="flex items-start justify-between mt-5 px-4 md:px-5 w-full md:w-9/12">
        <Box className="w-6/12">
          <Typography
            variant="body2"
            noWrap
            className=" !text-lg md:!text-2xl !font-bold !-mb-2"
            color="custom.pri"
          >
            {branchInfo?.businessName}
          </Typography>
          <Typography
            variant="caption"
            className="!font-bold !text[11px]"
            color="custom.sec"
          >
            @{branchInfo.store} @{branchInfo.branch}
          </Typography>

          <Box className="flex items-center mt-1">
            <IconifyIcon icon="tabler:link" className="!mr-2 !text-[14px]" />

            <Link
              href={`www.corisio.com/${branchInfo.store}`}
              className="!text-[12px]"
              color="custom.pri"
            >
              {mySubstring(`www.corisio.com/${branchInfo.store}`, 25)}
            </Link>
          </Box>
          <Box className="flex items-center">
            <Typography noWrap className="!font-bold !text-[13px]">
              {summarizeFollowers(branchInfo.followers || 0)} Followers
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center">
          <Link href={`?share=${branchInfo.store}`}>
            <Box
              variant="outlined"
              className="!rounded-full h-8 cursor-pointer !w-9 border border-blue-900 !bg-white mr-2 flex items-center justify-center"
            >
              <IconifyIcon
                icon="tabler:share-2"
                className="!text-blue-800 text-[16px]"
              />
            </Box>
          </Link>
          <Link href={`/chat?new=${branchInfo?.branchId}`}>
            <Box
              variant="outlined"
              className="!rounded-full h-8 cursor-pointer !w-9 border border-blue-900 !bg-white mr-2 flex items-center justify-center"
            >
              <IconifyIcon
                icon="tabler:message-2-plus"
                className="!text-blue-800 text-[16px]"
              />
            </Box>
          </Link>
          <Button
            onClick={() =>
              followStore(branchInfo, dispatch, socket, isIncluded)
            }
            variant="outlined"
            className="!rounded-full h-8 !w-28 !bg-white"
            startIcon={
              <IconifyIcon
                icon={isIncluded ? 'tabler:user-minus' : 'tabler:user-plus'}
                className="!text-blue-800 !text-[16px]"
              />
            }
          >
            {isIncluded ? 'Following' : 'Follow'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FollowStore
