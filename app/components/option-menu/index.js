// ** React Imports
"use client";
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "@/app/components/icon";

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        {...option.linkProps}
        sx={{
          px: 4,
          py: 1.5,
          width: "100%",
          display: "flex",
          color: "inherit",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {children}
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

const direction = "ltr";

const OptionsMenu = (props) => {
  // ** Props
  const {
    icon,
    options,
    menuProps,
    iconProps,
    leftAlignMenu,
    butPush,
    iconButtonProps,
    setOption,
    addBtn,
  } = props;

  // ** State
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const optionClick = (option) => {
    setOption(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box aria-haspopup="true" onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <Icon icon="tabler:dots-vertical" {...iconProps} />}
      </Box>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: direction === "ltr" ? "right" : "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: direction === "ltr" ? "right" : "left",
          },
        })}
        {...menuProps}
      >
        {addBtn && (
          <MenuItem className="!min-w-[200px] !bg-gray-50 border-b">
            {addBtn}
          </MenuItem>
        )}
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <MenuItem
                key={index}
                className="!min-w-[200px]"
                onClick={() => optionClick(butPush ? butPush[index] : option)}
              >
                {option}
              </MenuItem>
            );
          } else if ("divider" in option) {
            return (
              option.divider && <Divider key={index} {...option.dividerProps} />
            );
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps}
                {...(option.href && { sx: { p: 0 } })}
                onClick={(e) => {
                  handleClose();
                  option.menuItemProps && option.menuItemProps.onClick
                    ? option.menuItemProps.onClick(e)
                    : null;
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};

export default OptionsMenu;
