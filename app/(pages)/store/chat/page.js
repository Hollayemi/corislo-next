"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";

import PerfectScrollbar from "react-perfect-scrollbar";

// ** Utils Imports
import { getInitials } from "@/app/utils/get-initials";
import { formatDateToMonthShort } from "@/app/utils/format";

// ** Chat App Components Imports
import SidebarLeft from "../../chat/SidebarLeft";
import ChatContent from "../../chat/ChatContent";
import useSWR from "swr";
import { useStoreData } from "@/app/hooks/useData";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";

const AppChat = () => {
  // ** States
  const [userStatus, setUserStatus] = useState("online");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [selectedChat, selectChat] = useState("");
  const [selectedContact, selectContact] = useState({});
  const [messageLog, setMessageLog] = useState({});

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const { storeInfo, socket } = useStoreData();

  const { data, isLoading: storeListLoading } = useSWR("/chat/users");
  const storeList = (data && data?.data) || {};
  const itIsNewChat = selectedChat.split("-")[0] === "new_chat";
  const { data: storeChat, isLoading: loadingChat } = useSWR(
    selectedChat && !itIsNewChat && `/chat/messages?chatId=${selectedChat}`
  );

  // ** Vars
  const smAbove = useMediaQuery(theme.breakpoints.up("sm"));
  const sidebarWidth = smAbove ? 340 : 300;
  const chatType = "store";
  const mdAbove = useMediaQuery(theme.breakpoints.up("md"));

  const statusObj = {
    busy: "error",
    away: "warning",
    online: "success",
    offline: "secondary",
  };

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      console.log(data, messageLog);
      setMessageLog(data);
    });
  }, [socket, messageLog]);

  console.log(messageLog);

  useEffect(() => {
    setMessageLog(storeChat?.data || {});
  }, [storeChat]);
  
  
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () =>
    setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () =>
    setUserProfileRightOpen(!userProfileRightOpen);

  storeList.userProfile = {
    id: storeInfo._id,
    avatar: "/images/misc/shop/1.png",
    role: "store",
    ...storeInfo,
    about: "",
    status: "online",
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false,
    },
    avatar: "/images/misc/shop/1.png",
  };

  if (!storeListLoading && !loadingChat && storeChat && data) {
    storeList.selectedChat = {
      chat: {
        id: 1,
        userId: storeInfo._id,
        unseenMsgs: 3,
        chat: itIsNewChat ? null : messageLog.log,
      },
      contact: {
        ...selectedContact,
        avatar: "/images/misc/shop/2.png",
      },
    };
  }
  if (!storeListLoading && !loadingChat && itIsNewChat) {
    storeList.selectedChat = {
      chat: {
        id: 1,
        userId: storeInfo._id,
        unseenMsgs: 3,
        chat: null,
      },
      contact: {
        ...selectedContact,
        avatar: "/images/misc/shop/2.png",
      },
    };
  }

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

  console.log(storeList);

  return (
    <StoreLeftSideBar subListBar={false}>
      <Box
        className="app-chat md:mx-4 md:mt-8"
        sx={{
          display: "flex",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
          boxShadow: 0,
        }}
      >
        <Box className="!flex-shrink-0 !w-fit !min-w-fit">
          <SidebarLeft
            store={storeList}
            socket={socket}
            hidden={hidden}
            mdAbove={mdAbove}
            statusObj={statusObj}
            userStatus={userStatus}
            selectChat={selectChat}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            selectContact={selectContact}
            setUserStatus={setUserStatus}
            leftSidebarOpen={leftSidebarOpen}
            removeSelectedChat={() => {}}
            userProfileLeftOpen={userProfileLeftOpen}
            formatDateToMonthShort={formatDateToMonthShort}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileLeftSidebarToggle={
              handleUserProfileLeftSidebarToggle
            }
          />
        </Box>
        <Box className="flex-grow rounded-md overflow-hidden">
          <ChatContent
            hidden={hidden}
            socket={socket}
            store={storeList}
            mdAbove={mdAbove}
            chatType={chatType}
            dispatch={dispatch}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            selectedChat={selectedChat}
            setMessageLog={setMessageLog}
            userProfileRightOpen={userProfileRightOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileRightSidebarToggle={
              handleUserProfileRightSidebarToggle
            }
          />
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

AppChat.contentHeightFixed = true;
export default AppChat;
