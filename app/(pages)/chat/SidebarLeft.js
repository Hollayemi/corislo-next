// ** React Imports
import { useState, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/navigation";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import MuiAvatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import InputAdornment from "@mui/material/InputAdornment";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Util Import
import { hexToRGBA } from "@/app/utils/hex-to-rgba";

// ** Custom Components Import
import CustomAvatar from "@/app/components/avatar";

// ** Chat App Components Imports
import UserProfileLeft from "./UserProfileLeft";
import { StyleList } from "./Styled";
import { mySubstring } from "../../utils/format";

const SidebarLeft = (props) => {
  // ** Props
  const {
    store,
    hidden,
    mdAbove,
    statusObj,
    userStatus,
    selectChat,
    getInitials,
    sidebarWidth,
    selectContact,
    setUserStatus,
    leftSidebarOpen,
    userProfileLeftOpen,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle,
  } = props;

  // ** States
  const [query, setQuery] = useState("");
  const [filteredChat, setFilteredChat] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [active, setActive] = useState(null);

  // ** Hooks
  const router = useRouter();

  const handleChatClick = (type, id, store) => {
    selectChat(id);
    selectContact(store);
    setActive({ type, id });
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  useEffect(() => {
    // router.events.on('routeChangeComplete', () => {
    //   setActive(null)
    //   dispatch(removeSelectedCheat())
    // })

    return () => {
      setActive(null);
      // dispatch(removeSelectedChat())
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasActiveId = (id) => {
    if (store.chat !== null) {
      const arr = store.chat.filter((i) => i.id === id);
      return !!arr.length;
    }
  };

  const renderChats = () => {
    if (store && store.chat?.length) {
      if (query.length && !filteredChat.length) {
        return (
          <ListItem>
            <Typography sx={{ color: "text.secondary" }}>
              No Store Found
            </Typography>
          </ListItem>
        );
      } else {
        const arrToMap =
          query.length && filteredChat.length ? filteredChat : store.chat;

        return arrToMap.map((chatLog, index) => {
          const { lastMessage, id } = chatLog.chat;
          const activeCondition =
            (active && active.id === id) ||
            (active && active.id === `new_chat-${index}`);

          return (
            <ListItem
              key={index}
              disablePadding
              sx={{ "&:not(:last-child)": { mb: 0.5 } }}
            >
              <ListItemButton
                disableRipple
                onClick={() =>
                  handleChatClick(
                    "chat",
                    id.length ? id : `new_chat-${index}`,
                    chatLog
                  )
                }
                sx={{
                  py: 1.6,
                  px: 1.4,
                  width: "100%",
                  borderRadius: 1,
                  alignItems: "flex-start",
                  // ...(activeCondition && {
                  //   background: (theme) =>
                  //     `linear-gradient(72.47deg, ${
                  //       theme.palette.primary.main
                  //     } 22.16%, ${hexToRGBA(
                  //       theme.palette.primary.main,
                  //       0.7
                  //     )} 76.47%) !important`,

                  //   background: "custom.bodyGray !important",
                  //   color: "custom.sec !important",
                  // }),
                }}
                className={`${activeCondition && "!bg-[#F3F5FF]"}`}
              >
                <ListItemAvatar
                  sx={{ m: 0, alignSelf: "center" }}
                  className="!min-w-fit !mr-4"
                >
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
                          width: 6,
                          height: 6,

                          borderRadius: "50%",
                          color: `${statusObj[chatLog.status]}.main`,
                          backgroundColor: `${statusObj[chatLog.status]}.main`,
                          boxShadow: (theme) =>
                            `0 0 0 2px ${
                              !activeCondition
                                ? theme.palette.background.paper
                                : theme.palette.common.white
                            }`,
                        }}
                      />
                    }
                  >
                    {chatLog.avatar ? (
                      <MuiAvatar
                        src={chatLog.avatar}
                        alt={chatLog.chatName}
                        sx={{
                          width: 38,
                          height: 38,
                          outline: (theme) =>
                            `2px solid ${
                              activeCondition
                                ? theme.palette.common.white
                                : "transparent"
                            }`,
                        }}
                      />
                    ) : (
                      <CustomAvatar
                        color={chatLog?.avatarColor || "primary"}
                        skin={activeCondition ? "filled" : "light"}
                        sx={{
                          width: 34,
                          height: 34,
                          fontSize: "0.90rem",
                          outline: (theme) =>
                            `2px solid ${
                              activeCondition
                                ? theme.palette.common.white
                                : "transparent"
                            }`,
                        }}
                      >
                        {getInitials(chatLog.chatName || "")}
                      </CustomAvatar>
                    )}
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    my: 0,
                    ml: 0.2,
                    mr: 0.2,
                    "& .MuiTypography-root": {
                      ...(activeCondition && { color: "text.secondary" }),
                    },
                  }}
                  primary={
                    <Typography
                      noWrap
                      className="!font-bold !text-[14px]"
                      sx={{ fontWeight: 500 }}
                    >
                      {chatLog.chatName}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      // noWrap
                      variant="body2"
                      className="!leading-2 !text-[11px]"
                      sx={{
                        ...(!activeCondition && { color: "text.secondary" }),
                      }}
                    >
                      {lastMessage
                        ? mySubstring(lastMessage.message, 80)
                        : null}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    className="!text-[11px]"
                    sx={{
                      whiteSpace: "nowrap",
                      color: activeCondition
                        ? "text.secondary"
                        : "text.disabled",
                    }}
                  >
                    <>
                      {lastMessage &&
                        formatDateToMonthShort(lastMessage?.time, true)}
                    </>
                  </Typography>
                  {chatLog?.chat?.unseenMsgs &&
                  chatLog?.chat?.unseenMsgs > 0 ? (
                    <Chip
                      color="error"
                      label={chatLog.chat.unseenMsgs}
                      sx={{
                        mt: 0.25,
                        height: 18,
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "& .MuiChip-label": { pt: 0.5, px: 1.655 },
                      }}
                    />
                  ) : null}
                </Box>
              </ListItemButton>
            </ListItem>
          );
        });
      }
    }
  };

  const handleFilter = (e) => {
    setQuery(e.target.value);
    if (store.chat !== null && store.contacts !== null) {
      const searchFilterFunction = (contact) =>
        contact.chatName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      const filteredChatsArr = store.chat.filter(searchFilterFunction);
      setFilteredChat(filteredChatsArr);
    }
  };

  return (
    <div className="md:pr-3 !rounded-md overflow-hidden">
      <Box className={`!w-full md:!w-[300px] bg-white`}>
        <Box className="h-14 border-b pt-6">
          <Box className="flex justify-between items-center px-3">
            <Typography className="!font-bold !text-[17px]">Inbox</Typography>
            <Icon
              icon="tabler:search"
              fontSize={20}
              onClick={() => setShowSearch(!showSearch)}
            />
          </Box>
        </Box>

        <Box
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* {store && store.userProfile ? (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{ mr: 1.5 }}
              onClick={handleUserProfileLeftSidebarToggle}
              badgeContent={
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    color: `${statusObj[userStatus]}.main`,
                    backgroundColor: `${statusObj[userStatus]}.main`,
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.background.paper}`,
                  }}
                />
              }
            >
              <MuiAvatar
                src={store.userProfile.avatar}
                alt={store.userProfile.chatName}
                sx={{
                  width: "2.375rem",
                  height: "2.375rem",
                  cursor: "pointer",
                }}
              />
            </Badge>
          ) : null} */}
          {mdAbove && (
              <TextField
                fullWidth
                size="small"
                value={query}
                onChange={handleFilter}
                className="border-none"
                placeholder="Search for store..."
                sx={{
                  "& .MuiInputBase-root": { borderRadius: 5, border: "none" },
                  border: "none",
                }}
                InputProps={{
                  className: "!bg-gray-50 !border-none",
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "text.secondary" }}
                    >
                      <Icon icon="tabler:search" fontSize={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          {/* {!mdAbove ? (
            <IconButton
              sx={{ p: 1, ml: 1 }}
              onClick={() => setShowSearch(false)}
            >
              <Icon icon="tabler:x" />
            </IconButton>
          ) : null} */}
        </Box>

        <StyleList sx={{ height: "calc(100vh - 11.5375rem)" }}>
          <Box className="overflow-hidden">
            <Box sx={{ p: (theme) => theme.spacing(2, 2, 2) }}>
              {/* <Typography
                variant="h6"
                className="!text-[16px] !font-bold"
                sx={{ ml: 1.5, mb: 1.5, color: "primary.main" }}
              >
                Following Stores
              </Typography> */}
              <List sx={{ mb: 2.5, p: 0 }}>{renderChats()}</List>
            </Box>
          </Box>
        </StyleList>
      </Box>

      <UserProfileLeft
        store={store}
        hidden={hidden}
        statusObj={statusObj}
        userStatus={userStatus}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        userProfileLeftOpen={userProfileLeftOpen}
        handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
      />
    </div>
  );
};

export default SidebarLeft;
