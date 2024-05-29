import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Iconify from "@/app/components/icon";

import { useTheme } from "@emotion/react";
import themeConfig from "@/app/configs/themeConfig";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { useStoreData } from "@/app/hooks/useData";
import { IconImage } from "../home/header";

const Icons = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  height: "100%",
  backgroundColor: "custom.bodyGray",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.primary.main, 0.6),
}));

export default function StoreDashboardAppBar({
  open,
  handleDrawerOpen,
  drawerWidth,
  handleDrawerClose,
  staffInfo,
}) {
  const theme = useTheme();
  const route = useRouter();
  const { showOverlay } = useStoreData();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
    borderBottom: "",
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

  const menuId = "profile-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "bottom",
      }}
      id={menuId}
      // keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      // keepMounted
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
            <NotificationsIcon />
          </Badge>
        </Icons>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      // position="fixed"
      color="inherit"
      className="!duration-300 transition-all border-b"
      open={open}
      elevation={0}
    >
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
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search anything"
            onFocus={() => showOverlay("appSearch")}
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <Box className="relative mr-4 w-full md:w-auto px-2 md:px-0">
          <input
            type="text"
            placeholder="Search anything"
            defaultValue={""}
            className="w-full md:w-[350px] pl-10 text-[13px] !bg-[#F3F5FF] pr-4 h-10 border rounded-xl transition-all outline-none"
            onFocus={() => showOverlay("appSearch")}
          />
          <IconImage image="search" className="w-4 absolute top-1 mt-2 ml-4" />
        </Box>
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          className="items-center"
        >
          <Icons
            size="large"
            aria-label="show 17 new notifications"
            // color="inherit"
            onClick={() => showOverlay("notification")}
          >
            <Badge badgeContent={17} color="error">
              <Iconify
                icon="tabler:bell"
                className="!text-[30px] text-gray-700 hover:text-blue-900"
              />
            </Badge>
          </Icons>
          <Icons
            className="ml-6 mr-2"
            onClick={() => route.push("/store/dashboard/chat")}
          >
            <Badge badgeContent={12} color="error">
              <Iconify
                icon="tabler:message"
                className="!text-[30px] text-gray-700 hover:text-blue-900"
              />
            </Badge>
          </Icons>
          <Box className="flex items-center cursor-pointer ml-6 w-40">
            <Avatar
              alt="Remy Sharp"
              src="/images/avatar/stephen.jpeg"
              className="mr-2"
            />
            <Typography
              noWrap
              variant="body2"
              className="!font-bold text-ellipsis text-sm !ml-4 !text-black"
            >
              {staffInfo.username}
            </Typography>
            {/* <Box
              className="text-black flex items-center ml-2"
              onClick={handleProfileMenuOpen}
              aria-controls={menuId}
            >
              <ArrowDropDownIcon />
            </Box> */}
          </Box>
        </Box>
        <Box className="block md:hidden">
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
      {/* {renderMenu}
      {renderMobileMenu} */}
    </AppBar>
  );
}
