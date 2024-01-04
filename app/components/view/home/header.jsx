import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
import { useRouter } from "next/navigation";
import { userLogout } from "@/app/redux/state/slices/auth/Login";

function Header({ search, setSearch }) {
  const router = useRouter();
  const { isOffline, userInfo, cartedProds } = useUserData();

  // let holla = "dsdsdfa".
  const theme = useTheme();
  const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: "0.869rem",
    fontWeight: 500,
    textDecoration: "none",
    color: "black",
  }));
  const pages = [
    { name: "Home", link: "/" },
    // { name: "Products", link: "/products" },
    { name: "About", link: "/about" },
    { name: "Seller", link: "/seller" },
    { name: "Support", link: "/support" },
  ];

  const MyCartBtn = ({ num }) => (
    <Box className="flex items-center my-2">
      <Box
        color={theme.palette.primary.main}
        className="!mr-1.5 w-5 h-5 flex-shrink-0 bg-white !rounded-full flex items-center !text-sm justify-center font-bold"
      >
        {num}
      </Box>
      <ShoppingCartIcon className="text-white !text-[18px] !flex-shrink-0" />
    </Box>
  );

  return (
    <Box className="!px-2 sm:!px-8 py-4 h-14 !bg-white flex items-center md:justify-between">
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
          alt="logo"
          width={400}
          height={400}
          className="!w-10 md:!w-28 ml-1 !flex-shrink-0"
        />
      </Box>
      <Box className="items-center hidden md:block">
        {pages.map((page, i) => (
          <LinkStyled
            key={i}
            href={page.link}
            color={theme.palette.primary.main}
            className="px-1 w-2 md:!mx-4 leading-10 hover:text-yellow-400"
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
        {!isOffline ? (
          <>
            <Chip
              onClick={() => router.push("/cart")}
              sx={{ backgroundColor: theme.palette.primary.main }}
              className="h-9 min-h-9 py-2 !rounded-full w-16 hover:!bg-blue-900"
              label={
                <MyCartBtn variant="contained" num={cartedProds?.length || 0} />
              }
              size="large"
            />
            <Typography
              noWrap
              variant="body2"
              className="!font-bold hidden md:block !text-[14px] w-fit sm:!max-w-16 md:!max-w-32 !ml-4"
            >
              {userInfo?.username}
            </Typography>
            {userInfo.image ? (
              <CustomAvatar
                src={userInfo.image}
                alt="Pic"
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
