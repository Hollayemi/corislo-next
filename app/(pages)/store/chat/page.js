"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";
import {
  sendMsg,
  fetchUserProfile,
  fetchChatsContacts,
  removeSelectedChat,
} from "@/app/redux/state/slices/chat";

// ** Utils Imports
import { getInitials } from "@/app/utils/get-initials";
import { formatDateToMonthShort } from "@/app/utils/format";

// ** Chat App Components Imports
import SidebarLeft from "@/app/(pages)/chat/SidebarLeft";
import ChatContent from "@/app/(pages)/chat/ChatContent";
import HomeWrapper from "@/app/components/view/home";
import useSWR from "swr";
import { useStoreData } from "@/app/hooks/useData";

const AppChat = () => {
  // ** States
  const [userStatus, setUserStatus] = useState("online");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [selectedChat, selectChat] = useState("");
  const [selectedContact, selectContact] = useState({});

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down("lg"));
  const { storeInfo } = useStoreData();
  const store = useSelector((state) => state.chat);

  const { data, isLoading: storeListLoading } = useSWR("/chat/stores");
  const storeList = (data && data?.data) || {};
  const itIsNewChat = selectedChat.split("-")[0] === "new_chat"
  const { data: storeChat, isLoading: loadingChat } = useSWR(
    selectedChat && !itIsNewChat && `/chat/messages?chatId=${selectedChat}`
  );
  const messageLog = storeChat?.data || [];

  // ** Vars
  const smAbove = useMediaQuery(theme.breakpoints.up("sm"));
  const sidebarWidth = smAbove ? 360 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up("md"));

  const statusObj = {
    busy: "error",
    away: "warning",
    online: "success",
    offline: "secondary",
  };
  useEffect(() => {
    // dispatch(fetchUserProfile())
    // dispatch(fetchChatsContacts())
  }, [dispatch]);
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () =>
    setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () =>
    setUserProfileRightOpen(!userProfileRightOpen);

  // const fakeStore = {
  //   chats: [
  //     {
  //       id: 1,
  //       fullName: "Felecia Rower",
  //       role: "Frontend Developer",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       avatar: "/images/misc/shop/2.png",
  //       status: "offline",
  //       chat: {
  //         id: 1,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       id: 2,
  //       fullName: "Adalberto Granzin",
  //       role: "UI/UX Designer",
  //       avatarColor: "primary",
  //       about:
  //         "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
  //       status: "busy",
  //       chat: {
  //         id: 2,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "If it takes long you can mail me at my mail address.",
  //           time: "2023-12-22T03:29:36.775Z",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: false,
  //             isSeen: false,
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   contacts: [
  //     {
  //       id: 3,
  //       fullName: "Joaquina Weisenborn",
  //       role: "Town planner",
  //       about:
  //         "Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
  //       avatar: "/images/misc/shop/8.png",
  //       status: "busy",
  //     },
  //     {
  //       id: 4,
  //       fullName: "Verla Morgano",
  //       role: "Data scientist",
  //       about:
  //         "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
  //       avatar: "/images/misc/shop/3.png",
  //       status: "online",
  //     },
  //     {
  //       id: 5,
  //       fullName: "Margot Henschke",
  //       role: "Dietitian",
  //       avatarColor: "success",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       status: "busy",
  //     },
  //     {
  //       id: 6,
  //       fullName: "Sal Piggee",
  //       role: "Marketing executive",
  //       about:
  //         "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
  //       avatar: "/images/misc/shop/5.png",
  //       status: "online",
  //     },
  //     {
  //       id: 7,
  //       fullName: "Miguel Guelff",
  //       role: "Special educational needs teacher",
  //       about:
  //         "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",
  //       avatar: "/images/misc/shop/7.png",
  //       status: "online",
  //     },
  //     {
  //       id: 8,
  //       fullName: "Mauro Elenbaas",
  //       role: "Advertising copywriter",
  //       about:
  //         "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
  //       avatar: "/images/misc/shop/6.png",
  //       status: "away",
  //     },
  //     {
  //       id: 9,
  //       avatarColor: "warning",
  //       fullName: "Bridgett Omohundro",
  //       role: "Designer, television/film set",
  //       about:
  //         "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
  //       status: "offline",
  //     },
  //     {
  //       id: 10,
  //       avatarColor: "error",
  //       fullName: "Zenia Jacobs",
  //       role: "Building surveyor",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       status: "away",
  //     },
  //   ],
  //   userProfile: {
  //     id: storeInfo._id,
  //     avatar: "/images/misc/shop/1.png",
  //     role: "user",
  //     ...storeInfo,
  //     about: "",
  //     status: "online",
  //     settings: {
  //       isTwoStepAuthVerificationEnabled: true,
  //       isNotificationsOn: false,
  //     },
  //   },
  //   selectedChat: {
  //     chat: {
  //       id: 1,
  //       userId: storeInfo._id,
  //       unseenMsgs: 3,
  //       chat: [
  //         {
  //           message: "How can we help? We're here for you!",
  //           time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message:
  //             "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
  //           time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "It should be MUI v5 compatible.",
  //           time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Absolutely!",
  //           time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "This admin template is built with MUI!",
  //           time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Looks clean and fresh UI. 😍",
  //           time: "Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "It's perfect for my next project.",
  //           time: "Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "How can I purchase it?",
  //           time: "Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Thanks, From our official site  😇",
  //           time: "Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       ],
  //     },
  //     contact: {
  //       id: 1,
  //       fullName: "Felecia Rower",
  //       role: "Frontend Developer",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       avatar: "/images/misc/shop/2.png",
  //       status: "offline",
  //       chat: {
  //         id: 1,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  storeList.userProfile = {
    id: storeInfo._id,
    avatar: "/images/misc/shop/1.png",
    role: "customer",
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
    return (
      <HomeWrapper>
        <Box
          className="app-chat"
          sx={{
            width: "100%",
            display: "flex",
            borderRadius: 1,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "background.paper",
            boxShadow: 0,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <SidebarLeft
            store={storeList}
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

          <ChatContent
            store={storeList}
            hidden={hidden}
            sendMsg={sendMsg}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            selectedChat={selectedChat}
            userProfileRightOpen={userProfileRightOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileRightSidebarToggle={
              handleUserProfileRightSidebarToggle
            }
          />
        </Box>
      </HomeWrapper>
    );
};
AppChat.contentHeightFixed = true;

export default AppChat;
