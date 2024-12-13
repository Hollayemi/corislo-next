import IconifyIcon from "@/app/components/icon";
import { Button } from "@mui/material";
import { userLogout } from '@/app/redux/state/slices/auth/Login'

export const desktopOptions = (dispatch) => [
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
      <Button
        onClick={() => userLogout()}
        fullWidth
        className="!w-60 !h-8"
        variant="outlined"
      >
        Logout
      </Button>
    ),
  },
]
