/* eslint-disable @next/next/no-img-element */
'use client'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share'
import IconifyIcon from '../icon'
import { mySubstring } from '@/app/utils/format'
import { useRouter } from 'next/navigation'
import { ShareIcon } from '@/app/(pages)/(users)/referral/dashboard/page'

export default function Share({
  shareUrl = 'https://corisio.com',
  message,
  close,
  searchParams,
}) {
  const router = useRouter()
  console.log({ shareUrl })
  let closeFunc
  if (!close) {
    const currentSearchParams = new URLSearchParams(router.asPath)
    console.log(currentSearchParams, router.asPath, searchParams)
    closeFunc = (_, page) => {
      for (const para of Object.keys(searchParams)) {
        const value = searchParams[para]
        para !== 'share' && currentSearchParams.set(para, value)
      }
      console.log(currentSearchParams.toString())
      router.push(`?${currentSearchParams.toString()}`)
    }
  }
  const closePop = close ? close : closeFunc
  console.log(shareUrl)
  const [metaData, setMetaData] = useState(null)
  console.log(metaData)

  const fetchMetaData = async () => {
    const response = await fetch(
      `https://api.linkpreview.net/?key=b4467e787dfe26e9ef549ede4f311a3d&q=${shareUrl}`
    )
    const data = await response.json()
    setMetaData(data)
  }
  useEffect(() => {
    fetchMetaData()
  }, [shareUrl])
  return (
    <Box className="flex items-center justify-center w-full h-full !px-4">
      <Box className="w-full max-w-[300px] h-[490px] mt-10 rounded-hidden  rounded-xl shadow-xl relative">
        <Box className="bg-slate-50 h-full w-full "></Box>
        <Box className="absolute left-0 top-0 w-full h-[100%] !px-3 pt-2">
          <Box className="flex justify-between items-center">
            <Typography
              variant="body2"
              className="!font-bold font-sans !text-[13px] !leading-5 !text-slate-900"
            >
              Share
            </Typography>
            <IconifyIcon
              icon="tabler:x"
              onClick={closePop}
              className="mt-0 right-2 !text-[15px] cursor-pointer hover:text-red-500"
            />
          </Box>

          {metaData && (
            <div className="preview">
              <img
                src={metaData.image}
                alt={metaData.title}
                width={600}
                height={600}
                className="w-full h-40 object-scale-down"
              />

              <Box className="!px-2">
                <Typography
                  variant="body2"
                  className="!font-bold font-sans !text-[13px] !leading-5 !text-slate-900 !text-pretty !w-full"
                >
                  {metaData.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px] !leading-5"
                >
                  {mySubstring(metaData.description, 95)}
                </Typography>
              </Box>
            </div>
          )}
          {/* WhatsApp Share */}
          <Box className="!px-2 border rounded-md mt-4 py-2">
            <Box className="flex flex-col mt-1">
              <WhatsappShareButton
                url={shareUrl}
                title={message}
                className="flex items-center h-10 !bg-gray-50 w-full !px-2 relative group"
              >
                <ShareIcon icon="whatsapp" />
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px] !leading-5 !ml-2"
                >
                  Whatsapp
                </Typography>
                <IconifyIcon
                  icon="tabler:send"
                  onClick={() => setOpen(false)}
                  className="absolute -mt-2 top-1/2 right-4 !text-[15px] opacity-0 cursor-pointer group-hover:!opacity-100 text-green-500"
                />
              </WhatsappShareButton>

              {/* Facebook Share */}
              <FacebookShareButton
                url={shareUrl}
                quote={message}
                className="flex items-center h-10 !bg-gray-50 w-full !px-2 relative group"
              >
                <ShareIcon icon="facebook" />
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px] !leading-5 !ml-2"
                >
                  Whatsapp
                </Typography>
                <IconifyIcon
                  icon="tabler:send"
                  onClick={() => setOpen(false)}
                  className="absolute -mt-2 top-1/2 right-4 !text-[15px] opacity-0 cursor-pointer group-hover:!opacity-100 text-blue-500"
                />
              </FacebookShareButton>

              {/* Twitter Share */}
              <TwitterShareButton
                url={shareUrl}
                title={message}
                className="flex items-center h-10 !bg-gray-50 w-full !px-2 relative group"
              >
                <ShareIcon icon="x" />
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px] !leading-5 !ml-2"
                >
                  X (Twitter)
                </Typography>
                <IconifyIcon
                  icon="tabler:send"
                  onClick={() => setOpen(false)}
                  className="absolute -mt-2 top-1/2 right-4 !text-[15px] opacity-0 cursor-pointer group-hover:!opacity-100 text-black"
                />
              </TwitterShareButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
