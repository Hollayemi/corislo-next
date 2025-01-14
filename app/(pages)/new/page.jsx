import IconifyIcon from '@/app/components/icon'
import UserServiceWrapper from '@/app/components/view/user-service'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

const UserServicePage = () => {
   const topLinks = [
    //  { name: 'All Categories', icon: 'layout-dashboard', link: '#' },
     { name: 'Food', link: '#', icon: 'paper-bag' },
     { name: 'Laundry', link: '#', icon: 'wash-dry-1' },
     { name: 'Professional Services', link: '#', icon: 'heart-handshake' },
   ]
  return (
    <UserServiceWrapper bg="white">
      <Box className="px-4">
        <Box className="flex items-center shadow-xl shadow-gray-100">
          <Link
            href={'/'}
            className="mx-1 px-6 h-12 !text-white rounded rounded-tr-[100px] flex items-center bg-[#2C337C]"
          >
            <IconifyIcon icon={`tabler:layout-dashboard`} />
            <Typography className="!text-[13px] !ml-3">
              All Categories
            </Typography>
          </Link>
          {topLinks.map((each, i) => (
            <Link
              href={each.link}
              key={i}
              className="mx-1 pl-4 pr-8 h-12 flex items-center hover:border rounded rounded-tr-[100px]"
            >
              <IconifyIcon icon={`tabler:${each.icon}`} />
              <Typography className="!text-gray-500 !text-[13px] !ml-3">
                {each.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </UserServiceWrapper>
  )
}

export default UserServicePage