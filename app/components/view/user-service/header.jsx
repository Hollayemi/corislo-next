'use client'
import themeConfig from '@/app/configs/themeConfig'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { IconImage } from '../home/header'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@emotion/react'

const topLinks = [
  { name: 'Promo', link: '#' },
  { name: ' Corisio News', link: '#' },
  { name: 'Help & Center', link: '#' },
  { name: 'Language', link: '#' },
]
const UserServiceHeader = () => {
  const theme = useTheme()
  const [search, setSearch] = useState()
  const router = useRouter()

  return (
    <Box>
      <Box className="h-12 bg-gray-800 flex items-center justify-between px-8">
        <Link href="#">
          <Typography className="!text-gray-400 !text-[13px]">
            Download Corisio mobile app now
          </Typography>
        </Link>
        <Box className="flex items-center">
          {topLinks.map((each, i) => (
            <Link href={each.link} key={i} className="mx-1 px-3 h-full">
              <Typography className="!text-gray-400 !text-[13px]">
                {each.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>

      <Box className="py-4 flex items-center justify-between px-10">
        <Link href="/">
          <Image
            src={themeConfig.vertical1}
            alt="logo"
            width={400}
            height={400}
            className="!w-28 ml-1 md:ml-1 !flex-shrink-0 cursor-pointer"
          />
        </Link>

        <Box className="flex items-center">
          <Box className="relative hidden mr-4 md:block w-full md:w-auto rounded-md px-2 md:px-0 overflow-hidden">
            <input
              type="text"
              placeholder="Search anything"
              value={search}
              className="w-full md:hidden lg:block md:w-68 rounded-l-md pl-4 text-[13px] !bg-[#F3F5FF] pr-14 h-10 border  transition-all outline-none  md:focus:w-64"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  router.push(`/explore?search=${search}`)
                }
              }}
            />
            <Box
              className="w-10 h-10  absolute top-0 right-0 ml-4 flex justify-center items-center bg-blue-400 rounded-md"
              bgcolor="custom.pri"
            >
              <IconImage image="search-white" className="w-5" />
            </Box>
          </Box>
          <Box className="flex items-center">
            <Button className="!px-4 !h-10 !mr-3 !ml-10">Log In</Button>
            <Button className="!px-4 !h-10 !mx-3" variant="contained">
              Register
            </Button>
          </Box>
        </Box>
      </Box>

      
    </Box>
  )
}

export default UserServiceHeader
