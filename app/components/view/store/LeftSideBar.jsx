'use client'
import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import IconifyIcon from '@/app/components/icon'
import CssBaseline from '@mui/material/CssBaseline'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import StoreDashboardAppBar from './AppBar'
import {
  ServicesSidebarContent,
  SidebarContent,
} from '@/app/data/store/sidebarContents'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import themeConfig from '@/app/configs/themeConfig'
import Link from 'next/link'
import {
  Avatar,
  AvatarGroup,
  Button,
  Typography,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@mui/material'

import InnerBar from './InnerBar'
import BottomBar from './BottomBar'
import { useStoreData, useUserData } from '@/app/hooks/useData'
import StoreOverlay from './components/storeOverlay'

const drawerWidth = 260

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 0px)`,
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})
export const getStaticPaths = async (context) => {
  return {
    prpos: {
      fallback: false,
      paths: [],
    },
  }
}
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 2),
  backgroundColor: 'white',
  position: 'sticky',
  zIndex: theme.zIndex.appBar + 1,
  top: 0,
  left: 0,
  right: 0,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const StyleList = styled(List)(({ theme }) => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#f0eeee', // Color of the scrollbar thumb
    borderRadius: '6px', // Rounded corners of the thumb
    display: 'none !important',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#42496b', // Color of the scrollbar thumb on hover
  },
  '&::--webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  cursor: 'pointer',
  transition: 'all 1.5s',
  // Firefox
  scrollbarWidth: 'thin', // Width of the scrollbar
  scrollbarColor: '#bdbdbd #f1f1f1',
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: theme.zIndex.drawer,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

// Dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const StoreLeftSideBar = React.memo(
  ({
    children,
    path,
    InnerList,
    rightOpen,
    setRightOpen,
    permission,
    BottomList,
    hidebreadCrumb,
    breadCrumbRIghtChildren,
    crumb,
    dialogInfo,
    dialogComponent,
    updateDialogInfo,
    popup,
  }) => {
    const {
      staffInfo,
      storeInfo: { business },
      overLay,
    } = useStoreData()
    const router = useRouter()
    const permissions = staffInfo.permissions
    const [open, setOpen] = React.useState(false)
    const theme = useTheme()

    React.useLayoutEffect(() => {
      if (permissions) {
        permissions[permission] === false && router.push('/dashboard/store/401')
      }
    }, [permissions])

    const handleCloseDialog = () =>
      updateDialogInfo((prev) => {
        return { ...prev, open: false }
      })

    const onSideBar = !path?.sidebar ? '' : `/${path.sidebar}`
    const handleDrawerOpen = () => {
      if (rightOpen) {
        setRightOpen(false)
      }
      setOpen(true)
    }

    const handleDrawerClose = () => {
      setOpen(false)
    }

    const MyBreadcrumbs = () => {
      const skip = onSideBar && 0
      return (
        <Breadcrumbs
          slotProps={{ collapsedIcon: '.' }}
          maxItems={3}
          separator={
            <IconifyIcon
              icon="tabler:chevron-right"
              className="!text-[14px] md:!text-[20px]"
            />
          }
          aria-label="breadcrumb"
        >
          {crumb?.map(
            (item, index) =>
              skip !== index && (
                <Link
                  underline="hover"
                  key={index}
                  color="inherit"
                  href={`/dashboard/store/${item.link}`}
                >
                  <Typography
                    className="!text-[12px] md:!text-[14px] !font-[500] !text-black"
                    variant="body2"
                  >
                    {item.text}
                  </Typography>
                </Link>
              )
          )}
        </Breadcrumbs>
      )
    }

    return (
      <React.Fragment>
        <Box
          sx={{ display: 'flex' }}
          className="!overflow-hidden"
          bgcolor="custom.bodyGray"
        >
          <CssBaseline />
          <StoreDashboardAppBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerWidth={drawerWidth}
            staffInfo={staffInfo}
          />
          {overLay && <StoreOverlay />}
          <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
              sx: { backgroundColor: 'custom.bodyLight' },
              elevation: 0,
              overflow: 'hidden',
            }}
          >
            <DrawerHeader className="" elevation={0} color="inherit">
              <Box className="flex justify-between items-center relative w-full">
                <Image
                  src={themeConfig.vertical1}
                  alt="logo"
                  width={120}
                  height={80}
                />
              </Box>
            </DrawerHeader>
            <StyleList className="overflow-y-auto overflowStyle">
              <List
                className="overflow-hidden shrink-0"
                sx={{ bgcolor: 'custom.bodyLight' }}
              >
                {SidebarContent.map((each, index) => (
                  <Link href={`/dashboard/store${each.path}`} key={index}>
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{ display: 'block', color: 'gray' }}
                      className="text-xs"
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          fontSize: '13px',
                          my: 0.5,
                          px: 2.5,
                          color: onSideBar !== each.path ? '#666' : '#fff',
                          bgcolor: onSideBar !== each.path ? '#fff' : '#2C337C',
                          borderRadius: 2,
                          mx: 1,
                          transition: 'none',
                          '&:hover': {
                            color: 'white !important',
                            bgcolor: '#2C337C',
                            borderRadius: 2,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: 'inherit',
                            fontSize: '2px',
                          }}
                        >
                          {each.icon}
                        </ListItemIcon>
                        {/* <ListItemText primary={each.name} sx={{ opacity: open ? 1 : 0, fontSize: "10px", }} /> */}
                        <ListItemText>
                          <Typography
                            variant="h5"
                            style={{ fontSize: '13px', opacity: open ? 1 : 0 }}
                          >
                            {each.name}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>

              <Box
                className="flex flex-col justify-center items-start ml-6"
                style={{ display: open ? 'flex' : 'none' }}
              >
                <Typography
                  variant="h5"
                  style={{ fontSize: '13px' }}
                  className="text-black font-bold py-2"
                >
                  Stores
                </Typography>
                <AvatarGroup total={10}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/images/avatar/1.png"
                    sx={{ width: 34, height: 34 }}
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="/images/avatar/2.png"
                    sx={{ width: 34, height: 34 }}
                  />
                  <Avatar
                    alt="Agnes Walker"
                    src="/images/avatar/4.png"
                    sx={{ width: 34, height: 34 }}
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/images/avatar/5.png"
                    sx={{ width: 34, height: 34 }}
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="/images/avatar/2.png"
                    sx={{ width: 34, height: 34 }}
                  />
                </AvatarGroup>

                <Box
                  className="flex items-center pb-2 flex-col justify-center w-52 my-5 rounded-md"
                  sx={{ bgcolor: 'custom.bodyGray' }}
                >
                  <Image
                    src="/images/more/upgradenow.png"
                    alt="upgrade now"
                    width={150}
                    height={70}
                  />
                  <Typography
                    variant="h5"
                    style={{ color: '#254980' }}
                    className="!text-black !text-center !font-bold !text-xs"
                  >
                    Unlock more features by <br /> upgrading your plan.
                  </Typography>

                  <Button
                    className="!my-3 !h-8 !w-32 !text-white !bg-blue-900 !hover:bg-blue-800 !rounded-md !text-xs"
                    variant="h5"
                  >
                    Upgrade Now
                  </Button>
                </Box>
              </Box>
            </StyleList>
          </Drawer>
          <Box
            className={`top-0 ${
              open
                ? 'left-[270px]'
                : rightOpen
                  ? ' -left-[330px] '
                  : ' md:left-16 '
            } w-full transition-all duration-300 absolute flex-shrink-0 h-full md:pl-4 !pr-3 md:!pr-16 z-30`}
            bgcolor="custom.bodyGray"
          >
            {/* <Box className=""> */}

            <Box className="flex flex-col w-full pt-16 md:pt-20 md:px-7 px-3 ">
              {onSideBar === '' && (
                <Typography
                  color="primary"
                  className="!mb-5 !font-bold !text-2xl"
                >
                  Welcome back, {staffInfo.fullname || 'Staff Name'} 👋🏻
                </Typography>
              )}
            </Box>
            {!hidebreadCrumb && (
              <Box className="flex items-center sticky top-16 md:top-20 justify-between mb-2 px-2 md:px-11">
                <MyBreadcrumbs />
                {breadCrumbRIghtChildren}
              </Box>
            )}
            <Box className="flex flex-col relative md:flex-row items-start md:px-1.5">
              {InnerList && (
                <Box className="w-full hidden md:block sticky top-[68px] h-[85vh] md:w-52  bg-white rounded-md">
                  <InnerBar path={path} InnerList={InnerList} />
                </Box>
              )}
              <Box
                className="!w-full h-full pl-2 md:pl-3 md:pr-6 rounded-md pb-14"
                bgcolor="custom.bodyGray"
              >
                {children}
                {InnerList && (
                  <Box
                    className="fixed md:hidden bottom-0 left-0 w-full"
                    sx={{ zIndex: 1190 }}
                  >
                    <BottomBar
                      path={path}
                      InnerList={BottomList || InnerList}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            className={`transition-all duration-300 ${
              rightOpen ? 'right-0' : '-right-[440px]'
            } h-full w-[330px] fixed top-0  z-20 py-6 mt-7 `}
          >
            <Box className="bg-white w-full h-full pt-5 shadow relative">
              <Box
                className="flex items-center w-fit cursor-pointer mb-2 px-4"
                onClick={() => setRightOpen(false)}
              >
                <IconifyIcon icon="tabler:arrow-left" className="mr-3" />
                <Typography variant="caption" className="">
                  Back
                </Typography>
              </Box>
              <Box
                onClick={() => setRightOpen(false)}
                className="flex items-center justify-center z-50 rounded-full h-7 w-7 shadow-lg animate-bounce cursor-pointer  bg-white absolute -left-3 -mt-4 top-1/2"
              >
                <IconifyIcon
                  icon="tabler:chevron-right"
                  className="text-[24px]"
                />
              </Box>
              <Box className="border-t pt-4">{rightOpen}</Box>
            </Box>
          </Box>
        </Box>
        {dialogInfo && (
          <Dialog
            open={dialogInfo?.open || false}
            keepMounted
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
            aria-labelledby="custom-confirmation"
            aria-describedby="desc"
          >
            <DialogTitle
              id="custom-confirmation"
              className="!text-[16px] !mt-4"
            >
              {dialogInfo.title}
            </DialogTitle>
            <DialogContent>
              {dialogInfo?.alert || dialogInfo?.dialogComponent}
            </DialogContent>
            <DialogActions className="dialog-actions-dense !mb-4">
              <Button onClick={handleCloseDialog}>Close</Button>
              {dialogInfo.AvatarGroupacceptFunctionText && (
                <Button
                  variant="contained"
                  className="!shadow-none"
                  onClick={dialogInfo.acceptFunction}
                >
                  {dialogInfo.acceptFunctionText}
                </Button>
              )}
            </DialogActions>
          </Dialog>
        )}
        {popup}
      </React.Fragment>
    )
  }
)

export default StoreLeftSideBar
