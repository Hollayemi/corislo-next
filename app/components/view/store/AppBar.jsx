'use client'
import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import MuiAppBar from '@mui/material/AppBar'
import {
  Badge,
  Box,
  Toolbar,
  Avatar,
  Typography,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import Iconify from '@/app/components/icon'

import { useTheme } from '@emotion/react'
import themeConfig from '@/app/configs/themeConfig'
import Image from 'next/image'
import { useStoreData } from '@/app/hooks/useData'
import { IconImage } from '../home/header'
import OptionsMenu from '../../option-menu'
import { updateStaff } from '@/app/redux/state/slices/shop/branches/staffs'
import { useDispatch } from 'react-redux'
import { desktopOptions, mobileOptions } from './components/data'

const Icons = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  height: '100%',
  backgroundColor: 'custom.bodyGray',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.primary.main, 0.6),
}))

export default function StoreDashboardAppBar({
  open,
  handleDrawerOpen,
  drawerWidth,
  handleDrawerClose,
  staffInfo,
}) {
  const theme = useTheme()
  const route = useRouter()
  const dispatch = useDispatch()
  const { showOverlay, showSnackbar, notifications } = useStoreData()

  const unread = notifications.reduce((sum, notification) => {
    return sum + (notification?.unread || 0)
  }, 0)

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
      route.push('/dashboard/store/chat')
    }
    if (action === 'logout') {
      localStorage.removeItem('store_token')
    }
  }

  const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'custom.bodyLight',
    borderBottom: '',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  return (
    <AppBar
      // position="relative"
      color="inherit"
      className="!duration-300 transition-all border-b"
      open={open}
      elevation={0}
    >
      <Toolbar
        className="flex items-center"
        sx={{ backgroundColor: 'custom.bodyLight' }}
      >
        <Icons
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{
            mr: 2,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </Icons>
        {!open && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Image
              src={themeConfig.vertical1}
              width={120}
              alt="logo"
              height={80}
            />
          </Typography>
        )}
        {open && (
          <Box className="flex justify-between items-center relative w-full">
            <Box
              elevation={16}
              className="shadow-md -ml-10 flex text-black bg-white items-center justify-center cursor-pointer shadow-slate-500 text-4xl w-8 h-8 rounded-full"
              onClick={handleDrawerClose}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </Box>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Box className="relative mr-4 w-full md:w-auto px-2 md:px-0">
          <input
            type="text"
            placeholder="Search anything"
            defaultValue={''}
            className="w-full md:w-[350px] pl-10 text-[13px] !bg-[#F3F5FF] pr-4 h-10 border rounded-xl transition-all outline-none"
            onFocus={() => showOverlay('appSearch')}
          />
          <IconImage image="search" className="w-4 absolute top-1 mt-2 ml-4" />
        </Box>
        <Box
          sx={{ display: { xs: 'none', md: 'flex' } }}
          className="items-center"
        >
          <Icons
            size="large"
            aria-label="show new notifications"
            // color="inherit"
            onClick={() => dropdownFunctions('notification')}
          >
            <Badge badgeContent={unread} color="error">
              <Iconify
                icon="tabler:bell"
                className="!text-[30px] text-gray-700 hover:text-blue-900"
              />
            </Badge>
          </Icons>
          <Icons
            className="ml-6 mr-2"
            onClick={() => route.push('/dashboard/store/chat')}
          >
            <Badge badgeContent={12} color="error">
              <Iconify
                icon="tabler:message"
                className="!text-[30px] text-gray-700 hover:text-blue-900"
              />
            </Badge>
          </Icons>
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
                    {staffInfo.username}
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
        <Box className="block md:hidden">
          <OptionsMenu
            icon={
              <Icons
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </Icons>
            }
            options={mobileOptions(staffInfo, unread)}
            setOption={(e) => dropdownFunctions(e)}
            iconButtonProps={{
              size: 'small',
              sx: { cursor: 'pointer' },
            }}
            itemsClassName="!bg-transparent hover:!bg-gray-50"
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
