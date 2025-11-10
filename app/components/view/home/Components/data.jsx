"use client"
import IconifyIcon from "@/app/components/icon";
import { Button } from "@mui/material";
import { userLogout } from '@/app/redux/state/slices/auth/Login'
import Link from "next/link";

export const desktopOptions = (offline, userInfo) => [
  {
    text: userInfo?.username,
    rest: 'username',
    icon: "",
  },
  {
    text: 'Orders',
    rest: 'orders',
    icon: <IconifyIcon icon="tabler:user-cog" className="mr-3 !text-[26px]" />,
  },
  {
    text: 'Saved Items',
    rest: 'saved',
    icon: <IconifyIcon icon="tabler:user-cog" className="mr-3 !text-[26px]" />,
  },
  {
    text: 'Account Settings',
    rest: 'settings',
    icon: <IconifyIcon icon="tabler:user-cog" className="mr-3 !text-[26px]" />,
  },

  {
    rest: 'logout',
    component: (

      !offline ? <Button onClick={() => userLogout()} fullWidth className="!w-60 !h-8" variant="outlined">
        Logout
      </Button> :
        <div className="flex items-center space-x-2 gap-4">
          <Link href="/auth/login" fullWidth className="!w-28 !h-8 !mt-4" variant="contained">
            Login
          </Link>
          <Link href="/auth/create-account" fullWidth className="!w-28 !h-8 !mt-4" variant="contained">
            Create Account
          </Link>
        </div>
    ),
  },
]
