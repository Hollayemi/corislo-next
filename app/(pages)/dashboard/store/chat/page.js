"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
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
