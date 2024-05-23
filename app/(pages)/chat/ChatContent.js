// ** React Imports
import { Fragment } from "react";
import { useEffect, useRef } from "react";

// ** MUI Imports
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Custom Components Import
import ChatLog from "./ChatLog";
import SendMsgForm from "./SendMsgForm";
import CustomAvatar from "@/app/components/avatar";
import OptionsMenu from "@/app/components/option-menu";
import UserProfileRight from "./UserProfileRight";
import SidebarLeft from "./SidebarLeft";
import { Circles } from "react-loader-spinner";
import { ChevronLeft } from "@mui/icons-material";

// ** Styled Components
const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "calc(100vh - 5.0375rem)",
  display: "flex",
  borderRadius: 1,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

const ChatContent = (props) => {
  // ** Props
  const {
    store,
    hidden,
    socket,
    mdAbove,
    dispatch,
    chatType,
    statusObj,
    selectChat,
    getInitials,
    sidebarWidth,
    setMessageLog,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props;
  const containerRef = useRef(null);
  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  useEffect(() => {
    // Function to scroll to the bottom of the container
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [store?.selectedChat]);

  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat;
      if (!selectedChat?.contact?.branchId) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove
                ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                : {}),
            }}
          >
            <MuiAvatar
              sx={{
                mb: 4,
                pt: 5,
                pb: 4.2,
                px: 4.8,
                width: 110,
                height: 110,
                boxShadow: 3,
              }}
              // className=" mb-4 p-5 h-[110px] w-[110px] shadow-md flex justify-center items-center"
            >
              {selectedChat?.loadingChat ? (
                <Box className=" -mt-1.5 ">
                  <Circles
                    height="500"
                    width="50"
                    color="white"
                    ariaLabel="line-wave"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                  />
                </Box>
              ) : (
                <Icon icon="tabler:message" fontSize="6.125rem" />
              )}
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                py: 1,
                px: 3,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: "background.paper",
                cursor: mdAbove ? "default" : "pointer",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  lineHeight: "normal",
                }}
              >
                {selectedChat?.loadingChat ? "Loading" : "Start"} Conversation
              </Typography>
            </Box>
          </ChatWrapperStartChat>
        );
      } else {
        return (
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              // height: "100%",
              backgroundColor: "action.hover",
            }}
            className="!bg-white w-full"
          >
            <Box
              sx={{
                py: 1,
                px: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {mdAbove ? null : (
                  <IconButton onClick={() => selectChat("")} sx={{ mr: 1 }}>
                    {/* <Icon icon="tabler:menu-2" /> */}
                    <ChevronLeft />
                  </IconButton>
                )}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    sx={{ mr: 1.5 }}
                    badgeContent={
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          color: `${
                            statusObj[selectedChat.contact.status]
                          }.main`,
                          boxShadow: (theme) =>
                            `0 0 0 2px ${theme.palette.background.paper}`,
                          backgroundColor: `${
                            statusObj[selectedChat.contact.status]
                          }.main`,
                        }}
                      />
                    }
                  >
                    {selectedChat.contact.avatar ? (
                      <MuiAvatar
                        sx={{ width: 38, height: 38 }}
                        src={selectedChat.contact.avatar}
                        alt={selectedChat.contact.chatName}
                      />
                    ) : (
                      <CustomAvatar
                        skin="light"
                        color={selectedChat.contact.avatarColor}
                        sx={{ width: 38, height: 38, fontSize: "1rem" }}
                      >
                        {getInitials(selectedChat.contact.chatName)}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {selectedChat.contact.chatName}
                    </Typography>
                    <Typography sx={{ color: "text.disabled" }}>
                      {selectedChat.contact.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {mdAbove ? (
                  <Fragment>
                    {/* <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <Icon icon="tabler:phone-call" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <Icon icon="tabler:video" />
                    </IconButton> */}
                    <IconButton size="small" className="!text-red-500">
                      <Icon icon="tabler:delete" />
                    </IconButton>
                  </Fragment>
                ) : null}

                <OptionsMenu
                  menuProps={{ sx: { mt: 1 } }}
                  icon={<Icon icon="tabler:dots-vertical" />}
                  iconButtonProps={{
                    size: "small",
                    sx: { color: "text.secondary" },
                  }}
                  options={[
                    "View Contact",
                    "Mute Notifications",
                    "Block Contact",
                    "Clear Chat",
                    "Report",
                  ]}
                />
              </Box>
            </Box>

            {selectedChat && store.userProfile ? (
              <ChatLog
                hidden={hidden}
                data={{ ...selectedChat, userProfile: store.userProfile }}
                socket={socket}
              />
            ) : null}

            <SendMsgForm
              store={store}
              dispatch={dispatch}
              socket={socket}
              setMessageLog={setMessageLog}
            />
            {chatType !== "store" && (
              <UserProfileRight
                store={store}
                hidden={hidden}
                statusObj={statusObj}
                getInitials={getInitials}
                sidebarWidth={sidebarWidth}
                userProfileRightOpen={userProfileRightOpen}
                handleUserProfileRightSidebarToggle={
                  handleUserProfileRightSidebarToggle
                }
              />
            )}
          </Box>
        );
      }
    } else {
      return null;
    }
  };

  return renderContent();
};

export default ChatContent;
