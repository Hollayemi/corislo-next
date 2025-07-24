import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material'
import IconifyIcon from '../../icon'
import OptionsMenu from '../../option-menu'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { desktopOptions } from '../store/components/data'
import { updateStaff } from '@/app/redux/state/slices/shop/branches/staffs'
import { useStoreData } from '@/app/hooks/useData'
import { formatName } from '@/app/utils/get-initials'


export function ServiceHeaderComponents() {
    const { showOverlay, showSnackbar, staffInfo, notifications } = useStoreData()
    const dropdownFunctions = (action) => {
    if (action === 'viewAsAdmin') {
      updateStaff(
        dispatch,
        {
          viewAsAdmin: true,
        },
        showSnackbar,
        () =>
          route.push(
            `/dashboard/login?authorize=changes&for=${staffInfo.store}&by=${staffInfo.username}`
          )
      )
    }

    if (action === 'notification') {
      showOverlay('notification')
      
    }
    if (action === 'inbox') {
      route.push("/dashboard/store/chat")
    }
    if (action === 'logout') {
      localStorage.removeItem('store_token')
    }
  }
    return (
      <Box className="flex items-center">
        <Box>
          <TextField
            placeholder='Search anything'
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton type="button" aria-label="search" size="small">
                    <IconifyIcon icon="tabler:search" />
                  </IconButton>
                ),
                sx: { pr: 0.5 },
              },
            }}
            
          />
        </Box>
         <Box className="flex items-center cursor-pointer relative ml-6 w-40 max-w-40">
            <Avatar
              alt={staffInfo.fullname}
              title={staffInfo.fullname}
              src={staffInfo.picture || '/images/misc/no-profile.png'}
              className="mr-2"
            />

            {/* <Typography
              noWrap
              variant="body2"
              className="!font-bold text-ellipsis text-sm !ml-4 !text-black"
            >
              {staffInfo.username}
            </Typography> */}

            <OptionsMenu
              icon={
                <Box className="flex items-center">
                  <Typography
                    noWrap
                    variant="body2"
                    className="!font-bold text-ellipsis text-sm !ml-4 !text-black"
                  >
                    {formatName(staffInfo.username)}
                  </Typography>
                  <ArrowDropDownIcon />
                </Box>
              }
              options={desktopOptions(staffInfo)}
              setOption={(e) => dropdownFunctions(e)}
              iconButtonProps={{
                size: 'small',
                sx: { cursor: 'pointer' },
              }}
              itemsClassName="!bg-transparent hover:!bg-gray-50"
            />
          </Box>
      </Box>
    )
  }