import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useTheme } from '@emotion/react';
import themeConfig from '@/app/configs/themeConfig'
import Image from 'next/image';
import { Avatar } from '@mui/material';
import { useStoreData } from '@/app/hooks/useData';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.07),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  color: alpha(theme.palette.common.black, 0.4),
  alignItems: 'center',
  justifyContent: 'center',
}));

const Icons = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  height: '100%',
  backgroundColor: "custom.bodyGray",
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.primary.main, 0.6),
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    color: "black",
    fontWeight: "400",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export default function StoreDashboardAppBar({
  open,
  handleDrawerOpen,
  drawerWidth,
  handleDrawerClose,
  staffInfo,
}) {
  const theme = useTheme();
  const { showOverlay } = useStoreData()
  const [anchorEl, setAnchorEl] = useState();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "custom.bodyLight",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        bgcolor: alpha(theme?.palette?.common?.white, 0.4),
      }}
    >
      <MenuItem>
        <Icons size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={5} color="success">
            <MailIcon color="secondary" />
          </Badge>
        </Icons>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => alert("notification")}>
        <Icons
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon  />
          </Badge>
        </Icons>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Icons
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </Icons>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed" color="inherit" open={open} elevation={1}>
      <Toolbar
        className="flex items-center"
        sx={{ backgroundColor: "custom.bodyLight" }}
      >
        <Icons
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </Icons>
        {!open && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
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
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </Box>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search anything"
            onFocus={() => showOverlay("appSearch")}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Icons
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => showOverlay("notification")}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </Icons>
          <Box
            onClick={handleProfileMenuOpen}
            className="flex items-center cursor-pointer ml-6 w-40"
          >
            <Avatar
              alt="Remy Sharp"
              src="/images/avatar/stephen.jpeg"
              className="mr-2"
            />
            <Typography
              noWrap
              variant="body2"
              className="font-bold flex items-center text-ellipsis text-sm ml-6 text-black"
            >
              {staffInfo.username}
            </Typography>
            <Box className="text-black flex items-center ml-2">
              <ArrowDropDownIcon />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Icons
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </Icons>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
