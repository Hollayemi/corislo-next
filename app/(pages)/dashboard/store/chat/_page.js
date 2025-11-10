"use client";
import dynamic from "next/dynamic";
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
);
import BusinessChat from ".";

const AppChat = () => {
 

  return (
    <StoreLeftSideBar
      hidebreadCrumb
      subListBar={false}
      path={{ sidebar: "chat" }}
    >
      <BusinessChat />
      
    </StoreLeftSideBar>
  );
};

AppChat.contentHeightFixed = true;
export default AppChat;
