import React from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Link from 'next/link'
import IconifyIcon from '../../icon';
import Image from 'next/image';
import themeConfig from '@/app/configs/themeConfig';

function Header() {
  const theme = useTheme()
    const LinkStyled = styled(Link)(({ theme }) => ({
      fontSize: "0.749rem",
      textDecoration: "none",
      color: theme.palette.primary.main,
    }));
    const pages = [
        { name: "Home", link: "/" },
        { name: "Products", link: "/products" },
        { name: "About", link: "/about" },
        { name: "Seller", link: "/seller" },
        { name: "Support", link: "/support" },
    ]
  return (
    <Box className="flex items-center justify-between px-3 md:px-16 py-4 h-14">
      <Image
        src={themeConfig.vertical1}
        alt="logo"
        width={400}
        height={400}
        className="!w-28"
      />
      <Box className="flex items-center hidden md:block">
        {pages.map((page, i) => (
          <LinkStyled
            key={i}
            href={page.link}
            color={theme.palette.primary.main}
            className="px-1 mx-4 font-bold leading-10"
          >
            {page.name}
          </LinkStyled>
        ))}
      </Box>
      <Box className="flex items-center">
        <IconifyIcon icon="tabler:search" className="!text-[15px] mx-2 " />
        <IconifyIcon
          icon="tabler:shopping-cart"
          className="!text-[15px] mx-2 "
        />

        <Button
          variant="outlined"
          className="!rounded-full !text-xs !ml-5"
          size="small"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Header