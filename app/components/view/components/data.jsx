import IconifyIcon from '@/app/components/icon'
import { Badge, Box, Button, Typography } from '@mui/material'

export const desktopOptions = (staffInfo) => [
  {
    text: 'View as admin',
    rest: 'viewAsAdmin',
    icon: (
      <IconifyIcon
        icon={
          staffInfo.viewAsAdmin ? 'tabler:toggle-right' : 'tabler:toggle-left'
        }
        className={`mr-3 !text-[26px] ${
          staffInfo.viewAsAdmin && 'text-green-500'
        }`}
      />
    ),
  },
  {
    text: 'Settings',
    rest: 'settings',
    icon: <IconifyIcon icon="tabler:user-cog" className="mr-3 !text-[26px]" />,
  },
  {
    rest: 'upgrade',
    component: (
      <Button fullWidth className="!w-60 !h-8 !mt-4" variant="contained">
        Upgrade
      </Button>
    ),
  },
  {
    rest: 'logout',
    component: (
      <Button fullWidth className="!w-60 !h-8" variant="outlined">
        Logout
      </Button>
    ),
  },
]

export const mobileOptions = (staffInfo, unreadNotif) => [
  {
    rest: 'notification',
    component: (
      <Box className="flex justify-between items-center w-full pr-3">
        <Box className="flex items-center">
          <IconifyIcon icon="tabler:bell" className={`mr-3 !text-[26px]`} />
          <Typography>Notifications</Typography>
        </Box>
        <Badge badgeContent={unreadNotif || 0} color="error" />
      </Box>
    ),
  },
  {
    rest: 'Inbox',
    component: (
      <Box className="flex justify-between items-center w-full pr-3">
        <Box className="flex items-center">
          <IconifyIcon icon="tabler:message" className={`mr-3 !text-[26px]`} />
          <Typography>Inbox</Typography>
        </Box>
        <Badge badgeContent={6} color="error" />
      </Box>
    ),
  },
  {
    text: 'View as admin',
    rest: 'viewAsAdmin',
    icon: (
      <IconifyIcon
        icon={
          staffInfo.viewAsAdmin ? 'tabler:toggle-right' : 'tabler:toggle-left'
        }
        className={`mr-3 !text-[26px] ${
          staffInfo.viewAsAdmin && 'text-green-500'
        }`}
      />
    ),
  },
  {
    text: 'Settings',
    rest: 'settings',
    icon: <IconifyIcon icon="tabler:user-cog" className="mr-3 !text-[26px]" />,
  },
  {
    rest: 'upgrade',
    component: (
      <Button fullWidth className="!w-60 !h-8 !mt-4" variant="contained">
        Upgrade
      </Button>
    ),
  },
  {
    rest: 'logout',
    component: (
      <Button fullWidth className="!w-60 !h-8" variant="outlined">
        Logout
      </Button>
    ),
  },
]
