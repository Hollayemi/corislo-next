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
import SidebarLeft from "./SidebarLeft";
import ChatContent from "./ChatContent";
import HomeWrapper from "@/app/components/view/home";
import useSWR from "swr";
import { useUserData } from "@/app/hooks/useData";
import UserProfileRight, {
  UserProfileRightComponent,
} from "./UserProfileRight";

const AppChat = ({ searchParams }) => {
  
  const { data: branchData, isLoading: branchLoading } = useSWR(
    searchParams.new && `/branch/info?branchId=${searchParams.new}`
  );
  const branchInfo = branchData?.data || {};
  
  // ** States
  const [userStatus, setUserStatus] = useState("online");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [selectedChat, selectChat] = useState("");
  const [selectedContact, selectContact] = useState(branchInfo || {});
  const [messageLog, setMessageLog] = useState({});

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const { userInfo, socket } = useUserData();

  const { data, isLoading: storeListLoading } = useSWR("/chat/stores");
  const storeList = (data && data?.data) || {};
  const itIsNewChat = selectedChat?.split("-")[0] === "new_chat";
  const { data: storeChat, isLoading: loadingChat } = useSWR(
    selectedChat &&
      !itIsNewChat &&
      `/chat/messages?chatId=${selectedChat}`
  );
  // ** Vars
  const smAbove = useMediaQuery(theme.breakpoints.up("sm"));
  const sidebarWidth = smAbove ? 340 : 300;
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
      setMessageLog((prev) => {
        return { ...prev, log: data };
      });
    });
  }, [socket, messageLog]);

  useEffect(() => {
    setMessageLog(storeChat?.data || {});
  }, [storeChat]);

  // useEffect(() => {
  //   selectChat(branchInfo.chatId);
  //   selectContact(branchInfo);
  // }, [branchInfo]);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () =>
    setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () =>
    setUserProfileRightOpen(!userProfileRightOpen);

  storeList.userProfile = {
    id: userInfo._id,
    avatar: "/images/misc/shop/1.png",
    role: "customer",
    username: userInfo.username,
  };
  if (!branchLoading && branchInfo) {
    storeList.selectedChat = {
      chat: null,
      loadingChat,
      contact: {
        ...branchInfo,
        branchId: branchInfo?.branchId,
        avatar: "/images/misc/shop/2.png",
      },
    };
  }
  if (!storeListLoading && storeChat && data) {
    storeList.selectedChat = {
      chat: itIsNewChat && loadingChat ? null : messageLog?.log,
      loadingChat,
      contact: {
        ...selectedContact,
        chatId: messageLog?._id,
        chatName: selectedContact.chatName,
        avatar: "/images/misc/shop/2.png",
      },
    };
  }
  if (!storeListLoading && !loadingChat && itIsNewChat) {
    storeList.selectedChat = {
      chat: null,
      contact: {
        ...selectedContact,
        chatName: selectedContact.chatName,
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
    <HomeWrapper noFooter>
      <Box
        className="app-chat md:mx-4 "
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
            dispatch={dispatch}
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
            store={storeList}
            socket={socket}
            hidden={hidden}
            mdAbove={mdAbove}
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
        {storeList?.selectedChat?.contact?.branchId && (
          <Box
            className={`!flex-shrink-0 !ml-3 !rounded-md overflow-hidden hidden !bg-white lg:block !w-[340px] !min-w-[340px]`}
          >
            <UserProfileRightComponent
              hideCancel
              hidden={hidden}
              store={storeList}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              ScrollWrapper={ScrollWrapper}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={
                handleUserProfileRightSidebarToggle
              }
            />
          </Box>
        )}
      </Box>
    </HomeWrapper>
  );
};
AppChat.contentHeightFixed = true;

export default AppChat;
