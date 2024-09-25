import React, { useEffect } from 'react'
import {
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import IconifyIcon from '../../icon'
import Image from 'next/image'
import themeConfig from '@/app/configs/themeConfig'
import { useUserData } from '@/app/hooks/useData'
import CustomAvatar from '../../avatar'
import { getInitials } from '@/app/utils/get-initials'
import { useRouter, usePathname } from 'next/navigation'
import { userLogout } from '@/app/redux/state/slices/auth/Login'
import OptionsMenu from '../../option-menu'
import { UserPages } from './Components'

export const IconImage = ({ image, className, onClick }) => (
  <Image
    src={`/images/misc/${image}.png`}
    alt="image"
    width={700}
    onClick={onClick}
    height={700}
    className={className}
  />
)

const menuToHide = (menu = []) => {
  let hide = 1
  const width = window.screen.width
  if (width < 1300) hide = 2
  if (width < 1200) hide = 3
  const toHide = menu.splice(hide * -1)
  return toHide
}

function Header({ search, setSearch, setPinSearch }) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    isOffline,
    userInfo,
    cartedProds,
    notifications,
    overLay,
    showOverlay,
  } = useUserData()

  const getPath = pathname.split('/')
  const unread = notifications.reduce((sum, notification) => {
    return sum + (notification?.unread || 0)
  }, 0)
  // let holla = "dsdsdfa".
  const theme = useTheme()
  const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: '0.869rem',
    fontWeight: 500,
    textDecoration: 'none',
    // color: "black",
  }))

  
  const onlinePages = UserPages.isOnline.map((x) => x.link.toLowerCase())
  const menu = [...UserPages[isOffline ? 'isOffline' : 'isOnline']]
  const hiddenMenu = menuToHide(menu)

  useEffect(() => {
    if (
      isOffline &&
      onlinePages.includes(getPath[1].toLowerCase()) &&
      getPath[1] !== ''
    ) {
      router.push(`/auth/login?returnurl=${getPath[1]}`)
    }
  }, [onlinePages, isOffline])

  const MyCartBtn = ({ num }) => (
    <Box className="flex items-center">
      <Box
        bgcolor={theme.palette.primary.main}
        className="!mr-0.5 md:!mr-1 w-[18px] h-[18px] flex-shrink-0 !text-white !rounded-full flex items-center !text-[12px] justify-center font-bold"
      >
        {num}
      </Box>
      {/* <ShoppingCartCheckout
        color="primary"
        className="!text-[16px] !flex-shrink-0"
      /> */}
      <IconImage image="bag" className="w-7 md:w-4" />
    </Box>
  )

  return (
    <Box className="!px-2 shadow md:!px-8 py-4 h-14 !bg-white flex items-center !justify-between header-zindex">
      <Box className="flex items-center mr-1 md:mr-0 !flex-shrink-0">
        <Box className="md:hidden !flex-shrink-0">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className="!w-12 !h-12 !text-black !text-[40px]"
            onClick={showOverlay('sidebar')}
          >
            {overLay !== 'sidebar' ? (
              <IconifyIcon icon="tabler:menu" />
            ) : (
              <IconifyIcon icon="tabler:x" />
            )}
          </IconButton>
        </Box>
        <Image
          src={themeConfig.vertical1}
          onClick={() => router.push('/')}
          alt="logo"
          width={400}
          height={400}
          className="!w-28 ml-1 md:ml-1 !flex-shrink-0 cursor-pointer"
        />
      </Box>
      <Box className="items-center hidden md:flex !flex-shrink-0">
        {menu?.map((page, i) => (
          <LinkStyled
            key={i}
            href={`/${page.link}`}
            className={`px-1 !mx-2 lg:!mx-4 leading-10 ${
              getPath[1] === page.link ? 'text-yellow-500' : 'text-black'
            } hover:text-yellow-400`}
          >
            {page.name}
          </LinkStyled>
        ))}
        {hiddenMenu.length > 0 && (
          <OptionsMenu
            icon={
              <IconifyIcon
                icon="tabler:dots-circle-horizontal"
                className="ml-4"
              />
            }
            options={hiddenMenu.map((page, i) => {
              return {
                component: (
                  <LinkStyled
                    key={i}
                    href={`/${page.link}`}
                    className={`px-1  leading-10 ${
                      getPath[1] === page.link
                        ? 'text-yellow-500'
                        : 'text-black'
                    } hover:text-yellow-400 !w-full !h-full`}
                  >
                    {page.name}
                  </LinkStyled>
                ),
              }
            })}
            setOption={(e) => {}}
            iconButtonProps={{
              size: 'small',
              sx: { cursor: 'pointer' },
            }}
            itemsClassName="!bg-transparent hover:!bg-gray-50 !min-w-[200px]"
          />
        )}
      </Box>
      <Box className="flex items-center md:w-auto">
        <Box className="relative hidden mr-4 md:block w-full md:w-auto px-2 md:px-0">
          <input
            type="text"
            placeholder="Search by keyword"
            value={search}
            className="w-full md:hidden lg:block lg:w-40 pl-10 text-[13px] !bg-[#F3F5FF] pr-4 h-8 border rounded-xl transition-all outline-none  md:focus:w-64"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconImage image="search" className="w-4 absolute top-2 ml-4" />
        </Box>
        <IconImage
          image="search"
          onClick={() => router.push("/explore")}
          className="w-6 md:hidden mx-3"
        />
        {!isOffline && (
          <Box className="mx-3 md:!mr-5">
            <Badge
              badgeContent={unread}
              size="small"
              variant=""
              color="primary"
            >
              <IconImage
                image="rre"
                className="w-6 !flex-shrink-0"
                onClick={showOverlay('notification')}
              />
            </Badge>
          </Box>
        )}
        {!isOffline ? (
          <>
            {/* display cart on desktop view */}
            <Box
              onClick={() => router.push('/cart')}
              sx={{
                borderColor:
                  getPath[1] === 'cart'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                border: 1,
              }}
              className="h-7 hidden md:flex !cursor-pointer min-h-7 py-2 !border !rounded-full w-12 px-1 !bg-white justify-center items-center"
            >
              <MyCartBtn variant="contained" num={cartedProds?.length || 0} />
            </Box>
            {/* display cart on phone view */}
            <Box className="mx-3 md:hidden">
              <Badge
                badgeContent={cartedProds?.length}
                size="small"
                variant=""
                color="primary"
              >
                <IconImage
                  image="bag-black"
                  onClick={() => router.push('/cart')}
                  className="w-6 !flex-shrink-0"
                />
              </Badge>
            </Box>
            <Typography
              noWrap
              variant="body2"
              title={userInfo?.username}
              className="!font-bold hidden md:block !text-[14px] w-20 sm:!max-w-16 md:!max-w-28 !ml-4"
            >
              {userInfo?.username}
            </Typography>
            {userInfo.picture ? (
              <CustomAvatar
                src={userInfo.picture}
                alt={getInitials(userInfo?.fullname || 'New User').substring(
                  0,
                  2
                )}
                className="!w-10 !hidden md:!block !h-10 !ml-2 flex-shrink-0"
              />
            ) : (
              <CustomAvatar
                skin="light"
                color="primary"
                className="!w-10 !hidden md:!flex !h-10 !font-black !text-[15px] !ml-2 flex-shrink-0"
                onClick={() => userLogout()}
                // sx={{ ml: 3, width: 30, height: 30, fontSize: "0.85rem" }}
              >
                {getInitials(userInfo?.fullname || 'New User').substring(0, 2)}
              </CustomAvatar>
            )}
          </>
        ) : (
          <>
            <Button
              variant="text"
              className="!rounded-2xl !text-xs h-8 !w-fit !text-black md:!text-blue-900 md:!w-20 !ml-1 md:!ml-5"
              size="small"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant="text"
              className="!rounded-2xl h-8 !w-fit md:!w-20 !text-xs !ml-1 md:!ml-5"
              size="small"
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Header
