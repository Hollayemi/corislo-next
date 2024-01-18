// ** React Imports
import { Fragment } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Custom Component Imports
import Sidebar from "@/app/components/sidebar";
import CustomAvatar from "@/app/components/avatar";
import { StyleList } from "./Styled";
import Image from "next/image";

const UserProfileRight = (props) => {
  const {
    store,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle,
  } = props;

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Sidebar
      direction="right"
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: "100%",
        width: sidebarWidth,
        borderTopRightRadius: (theme) => theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => theme.shape.borderRadius,
        "& + .MuiBackdrop-root": {
          zIndex: 8,
          borderRadius: 1,
        },
      }}
    >
      <UserProfileRightComponent
        store={store}
        hidden={hidden}
        statusObj={statusObj}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        ScrollWrapper={ScrollWrapper}
        userProfileRightOpen={userProfileRightOpen}
        handleUserProfileRightSidebarToggle={
          handleUserProfileRightSidebarToggle
        }
      />
    </Sidebar>
  );
};

export default UserProfileRight;

export const UserProfileRightComponent = ({
  store,
  hidden,
  statusObj,
  hideCancel,
  getInitials,
  sidebarWidth,
  userProfileRightOpen,
  handleUserProfileRightSidebarToggle,
}) =>
  store && store.selectedChat ? (
    <>
      <Box className="h-14 border-b pt-6 !rounded-t-md">
        <Box className="flex justify-between items-center px-3">
          <Typography className="!font-bold !text-[17px]">
            Store Information
          </Typography>
          <Icon icon="tabler:chevron-down" fontSize={20} />
        </Box>
      </Box>
      <StyleList sx={{ height: "calc(100vh - 14.3125rem)" }}>
        <Box className={`!rounded-b-md`}>
          <Box sx={{ position: "relative" }}>
            {!hideCancel && (
              <IconButton
                size="small"
                onClick={handleUserProfileRightSidebarToggle}
                sx={{
                  top: "0.5rem",
                  right: "0.5rem",
                  position: "absolute",
                  color: "text.disabled",
                }}
              >
                <Icon icon="tabler:x" />
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: (theme) => theme.spacing(5.25, 3, 2.5),
              }}
            >
              <Box className="mb-2 flex justify-evenly items-center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        color: `${
                          statusObj[store.selectedChat.contact.status]
                        }.main`,
                        boxShadow: (theme) =>
                          `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `${
                          statusObj[store.selectedChat.contact.status]
                        }.main`,
                      }}
                    />
                  }
                >
                  {store.selectedChat.contact.avatar ? (
                    <MuiAvatar
                      sx={{ width: "5rem", height: "5rem" }}
                      src={store.selectedChat.contact.avatar}
                      alt={store.selectedChat.contact.chatName}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={store.selectedChat.contact.avatarColor}
                      sx={{
                        width: "5rem",
                        height: "5rem",
                        fontWeight: 500,
                        fontSize: "2rem",
                      }}
                    >
                      {getInitials(store.selectedChat.contact.chatName)}
                    </CustomAvatar>
                  )}
                </Badge>
                <Image
                  src="/images/more/qr.png"
                  alt="qrcode"
                  width={70}
                  height={70}
                />
              </Box>
              <Typography
                variant="body2"
                className="!font-bold !text-[15]"
                sx={{ textAlign: "center" }}
              >
                {store.selectedChat.contact.chatName}
              </Typography>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                {store.selectedChat.contact.role}
              </Typography>
            </Box>
          </Box>

          <Box className="px-4">
            <Box sx={{ mb: 3 }}>
              <List dense sx={{ p: 0 }}>
                <ListItem sx={{ px: 1 }}>
                  {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                    <Icon icon="tabler:mail" className="mr-4 text-gray-500"ize="1.1rem" />
                  {/* </ListItemIcon> */}
                  <ListItemText
                    className="!text-[10px]"
                    sx={{ textTransform: "lowercase" }}
                    primaryTypographyProps={{ variant: "body1" }}
                    primary={`${store.selectedChat.contact.chatName.replace(
                      /\s/g,
                      "_"
                    )}@email.com`}
                  />
                </ListItem>
                <ListItem sx={{ px: 1 }}>
                  {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                    <Icon icon="tabler:phone-call" className="mr-4 text-gray-500" fontSize="1.1rem" />
                  {/* </ListItemIcon> */}
                  <ListItemText
                    className="!text-[10px]"
                    primaryTypographyProps={{ variant: "body1" }}
                    primary="+1(123) 456 - 7890"
                  />
                </ListItem>
                <ListItem sx={{ px: 1 }}>
                  {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                    <Icon icon="tabler:clock" className="mr-4 text-gray-500" size="1.1rem" />
                  {/* </ListItemIcon> */}
                  <ListItemText
                    className="!text-[10px]"
                    primaryTypographyProps={{ variant: "body1" }}
                    primary="Mon - Fri 10AM - 8PM"
                  />
                </ListItem>
              </List>
            </Box>

            <div>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.9,
                  color: "text.disabled",
                  textTransform: "uppercase",
                }}
              >
                Options
              </Typography>
              <List dense sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1 }}>
                    {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                      <Icon icon="tabler:badge" className="mr-4 text-gray-500" size="1.1rem" />
                    {/* </ListItemIcon> */}
                    <ListItemText
                      className="!text-[10px]"
                      primary="Add Tag"
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1 }}>
                    {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                      <Icon icon="tabler:star" className="mr-4 text-gray-500"ize="1.1rem" />
                    {/* </ListItemIcon> */}
                    <ListItemText
                      className="!text-[10px]"
                      primary="Important Contact"
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1 }}>
                    {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                      <Icon icon="tabler:photo" className="mr-4 text-gray-500" size="1.1rem" />
                    {/* </ListItemIcon> */}
                    <ListItemText
                      className="!text-[10px]"
                      primary="Shared Media"
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1 }}>
                    {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                      <Icon icon="tabler:trash" className="mr-4 text-gray-500" size="1.1rem" />
                    {/* </ListItemIcon> */}
                    <ListItemText
                      className="!text-[10px]"
                      primary="Delete Contact"
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 1 }}>
                    {/* <ListItemIcon sx={{ mr: 0.5 }} className="!w-6 !min-w-6"> */}
                      <Icon icon="tabler:ban" className="mr-4 text-gray-500"ze="1.1rem" />
                    {/* </ListItemIcon> */}
                    <ListItemText
                      className="!text-[10px]"
                      primary="Block Contact"
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Box>
        </Box>
      </StyleList>
    </>
  ) : null;
