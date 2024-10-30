/* eslint-disable @next/next/no-img-element */
"use client"
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
  TwitterIcon,
} from 'react-share'
import IconifyIcon from '../icon'
import Image from 'next/image'
import { mySubstring } from '@/app/utils/format'

export default function Share({ shareUrl = 'https://corislo.vercel.app', message, close }) {
  
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
    <Box className="flex items-center justify-center w-full h-full px-4">
      <Box className="w-full max-w-[300px] h-[420px] mt-10 rounded-hidden  rounded-xl shadow-xl relative">
        <Box className="bg-slate-50 h-full w-full "></Box>
        <Box className="absolute left-0 top-0 w-full h-[100%] px-3 pt-2">
          <Box className="flex justify-between items-center">
            <Typography
              variant="body2"
              className="!font-bold font-sans !text-[13px] !leading-5 !text-slate-900"
            >
              Share
            </Typography>
            <IconifyIcon
              icon="tabler:x"
              onClick={close}
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
            </div>
          )}
          {/* WhatsApp Share */}
          <Box className="flex flex-col mt-4">
            <WhatsappShareButton
              url={shareUrl}
              title={message}
              className="flex items-center h-10 !bg-gray-50 w-full px-2 relative group"
            >
              <WhatsappIcon size={28} round />
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
              className="flex items-center h-10 !bg-gray-50 w-full px-2 relative group"
            >
              <FacebookIcon size={32} round />
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
              className="flex items-center h-10 !bg-gray-50 w-full px-2 relative group"
            >
              <XIcon size={32} round />
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
  )
}
