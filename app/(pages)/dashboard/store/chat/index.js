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
import SidebarLeft from "@/app/(pages)/chat/SidebarLeft";
import ChatContent from "@/app/(pages)/chat/ChatContent";
import useSWR from "swr";
import { useStoreData } from "@/app/hooks/useData";
import dynamic from "next/dynamic";
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
);

const BusinessChat = () => {
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
    selectedChat && !itIsNewChat && `/store/chat/messages?chatId=${selectedChat}`
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

  console.log(storeList)

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      setMessageLog((prev) => { return { ...prev, log:data } });
    });
  }, [socket, messageLog]);

  useEffect(() => {
    setMessageLog(storeChat?.data || {});
  }, [storeChat]);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () =>
    setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () =>
    setUserProfileRightOpen(!userProfileRightOpen);
  storeList.userProfile = {
    id: storeInfo?.profile?.branchId,
    picture: storeInfo?.profile?.profile_image,
    role: "store",
  };

  if (!storeListLoading && storeChat && data) {
    storeList.selectedChat = {
      chat: itIsNewChat && loadingChat ? null : messageLog?.log,
      loadingChat,
      contact: {
        ...selectedContact,
        chatId: messageLog?._id,
        avatar: "/images/misc/shop/2.png",
      },
    };
  }

  if (!storeListLoading && !loadingChat && itIsNewChat) {
    storeList.selectedChat = {
      chat: null,
      contact: {
        ...selectedContact,
        picture: "/images/misc/shop/2.png",
      },
    };
  }

  return (
    
      <Box
        className="app-chat -mb-12"
        sx={{
          display: "flex",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
          boxShadow: 0,
        }}
      >
        <Box
          className={`!flex-shrink-0 ${
            selectedChat && "hidden md:block"
          }  !w-full md:!w-fit md:!min-w-fit`}
        >
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
            selectChat={selectChat}
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
    
  );
};

BusinessChat.contentHeightFixed = true;
export default BusinessChat;
