import React from "react";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Link from "next/link";
import IconifyIcon from "../../icon";
import Image from "next/image";
import themeConfig from "@/app/configs/themeConfig";
import { useUserData } from "@/app/hooks/useData";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Chip from "../../chip";
import CustomAvatar from "../../avatar";
import { getInitials } from "@/app/utils/get-initials";
import { useRouter, usePathname } from "next/navigation";
import { userLogout } from "@/app/redux/state/slices/auth/Login";
import {
  NotificationsActiveOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";

function Header({ search, setSearch, showNotif }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOffline, userInfo, cartedProds } = useUserData();

  const getPath = pathname.split("/");

  // let holla = "dsdsdfa".
  const theme = useTheme();
  const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: "0.869rem",
    fontWeight: 500,
    textDecoration: "none",
    // color: "black",
  }));

  const pages = {
    isOffline: [
      { name: "Home", link: "/" },
      // { name: "Products", link: "/products" },
      { name: "About", link: "/about" },
      { name: "Seller", link: "/seller" },
      { name: "Support", link: "/support" },
    ],

    isOnline: [
      { name: "Home", link: "" },
      // { name: "Products", link: "/products" },
      { name: "Order", link: "order" },
      { name: "Inbox", link: "chat" },
      { name: "Saved Items", link: "saved-items" },
    ],
  };

  const MyCartBtn = ({ num }) => (
    <Box className="flex items-center">
      <Box
        bgcolor={theme.palette.primary.main}
        className="!mr-0.5 md:!mr-1 w-[18px] h-[18px] flex-shrink-0 !text-white !rounded-full flex items-center !text-[12px] justify-center font-bold"
      >
        {num}
      </Box>
      <ShoppingCartCheckout
        color="primary"
        className="!text-[16px] !flex-shrink-0"
      />
      {/* <Image
        src="/images/misc/bag.png"
        alt="cart"
        width={15}
        height={20}
        className="w-7"
      /> */}
    </Box>
  );

  return (
    <Box className="!px-2 shadow md:!px-8 py-4 h-14 !bg-white flex items-center md:justify-between header-zindex">
      <Box className="flex items-center mr-1 md:mr-0 !flex-shrink-0">
        <Box className="md:hidden !flex-shrink-0">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className="!w-7 !h-7"
            onClick={() => {}}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Image
          src={
            typeof window !== "undefined"
              ? window.innerWidth < 640
                ? themeConfig.main1_sm
                : themeConfig.vertical1
              : themeConfig.vertical1
          }
          onClick={() => router.push("/")}
          alt="logo"
          width={400}
          height={400}
          className="!w-10 md:!w-28 ml-1 !flex-shrink-0"
        />
      </Box>
      <Box className="items-center hidden md:block !flex-shrink-0">
        {pages[isOffline ? "isOffline" : "isOnline"]?.map((page, i) => (
          <LinkStyled
            key={i}
            href={`/${page.link}`}
            className={`px-1 !mx-2 lg:!mx-4 leading-10 ${
              getPath[1] === page.link ? "text-yellow-500" : "text-black"
            } hover:text-yellow-400`}
          >
            {page.name}
          </LinkStyled>
        ))}
      </Box>
      <Box className="flex items-center w-full md:w-auto">
        <Box className="relative mr-2 md:mr-4 md:block w-full md:w-auto px-2 md:px-0">
          <input
            type="text"
            placeholder="Search by keyword"
            value={search}
            className="w-full md:w-40 pl-10 text-[13px] !bg-[#F3F5FF] pr-4 h-8 border rounded-xl transition-all outline-none  md:focus:w-64"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconifyIcon
            icon="tabler:search"
            className="!text-[17px] text-gray-400 absolute top-2 ml-4"
          />
        </Box>
        {!isOffline && (
          <Box className="mr-3 md:!mr-5">
            <Badge badgeContent={5} size="small" variant="dot" color="primary">
              <NotificationsActiveOutlined
                onClick={showNotif}
                color="primary"
                className="!text-[24px] !flex-shrink-0"
              />
            </Badge>
          </Box>
        )}
        {!isOffline ? (
          <>
            <Box
              onClick={() => router.push("/cart")}
              sx={{
                borderColor:
                  getPath[1] === "cart"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                border: 1,
              }}
              className="h-7 !cursor-pointer min-h-7 py-2 !border !rounded-full w-14 px-1 md:w-12 !bg-white flex justify-center items-center"
            >
              <MyCartBtn variant="contained" num={cartedProds?.length || 0} />
            </Box>
            <Typography
              noWrap
              variant="body2"
              title={userInfo?.username}
              className="!font-bold hidden md:block !text-[14px] w-20 sm:!max-w-16 md:!max-w-24 !ml-4"
            >
              {userInfo?.username}
            </Typography>
            {userInfo.picture ? (
              <CustomAvatar
                src={userInfo.picture}
                alt={getInitials(userInfo?.fullname || "New User").substring(
                  0,
                  2
                )}
                className="!w-10 !h-10 !ml-2 flex-shrink-0"
              />
            ) : (
              <CustomAvatar
                skin="light"
                color="primary"
                className="!w-10 !h-10 !font-black !text-[15px] !ml-2 flex-shrink-0"
                onClick={() => userLogout()}
                // sx={{ ml: 3, width: 30, height: 30, fontSize: "0.85rem" }}
              >
                {getInitials(userInfo?.fullname || "New User").substring(0, 2)}
              </CustomAvatar>
            )}
          </>
        ) : (
          <>
            <IconifyIcon
              icon="tabler:shopping-cart"
              className="!text-[19px] mx-1 flex-shrink-0 md:mx-2 "
            />

            <Button
              variant="outlined"
              className="!rounded-2xl !text-xs h-8 w-20 ml-2 md:!ml-5"
              size="small"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="!rounded-2xl !hidden md:!block h-8 w-20 !text-xs !ml-2 md:!ml-5"
              size="small"
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Header;
