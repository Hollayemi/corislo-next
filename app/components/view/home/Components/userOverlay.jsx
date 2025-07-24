import { useUserData } from "@/app/hooks/useData";
import Notification from "./notification";
import UserSideBar from "./sidebar";
import Enable2FA from "@/app/(pages)/user/enable2FA";
const { Box } = require("@mui/material");

const UserOverlay = () => {
  const { overLay, showOverlay } = useUserData();
  console.log(overLay);
  const pages = {
    notification: <Notification showOverlay={showOverlay} />,
    TwoFA: <Enable2FA showOverlay={showOverlay} />,
  };
  return (
    pages[overLay] && <Box className="w-full h-screen fixed z-50 top-0 left-0 overflow-hidden">
      <Box
        className="w-full h-full absolute bg-black opacity-75 top-0 left-0"
        onClick={showOverlay(null)}
      ></Box>
      {pages[overLay]}
    </Box>
  );
};

export default UserOverlay;
