import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useUserData } from "@/app/hooks/useData";
const { Box, Button, Typography } = require("@mui/material");
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogout } from "@/app/redux/state/slices/auth/Login";
import IconifyIcon from "@/app/components/icon";

const UserSideBar = () => {
  const { overLay, isOffline, showOverlay } = useUserData();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const getPath = pathname.split("/");

  const LinkStyled = styled(Link)(({}) => ({
    fontSize: "0.869rem",
    fontWeight: 500,
    textDecoration: "none",
    // color: "black",
  }));

  const pages = {
    isOffline: [
      { name: "Home", link: "/", icon: "tabler:home" },
      { name: "About", link: "/about", icon: "tabler:dots-circle-horizontal" },
      { name: "Seller", link: "/seller", icon: "tabler:building-store" },
      { name: "Support", link: "/support", icon: "tabler:heart-handshake" },
    ],

    isOnline: [
      { name: "Home", link: "", icon: "tabler:home" },
      { name: "Order", link: "order", icon: "tabler:shopping-bag" },
      { name: "Inbox", link: "chat", icon: "tabler:message" },
      { name: "Saved Items", link: "saved-items", icon: "tabler:heart" },
      { name: "Account", link: "user", icon: "tabler:user-square-rounded" },
    ],
  };

  return (
    <Box
      className={`fixed ${
        overLay === "sidebar" ? "left-0" : "-left-full sm:left-2/5"
      } transition-all ease-in-out duration-500 top-0 h-screen w-full sm:w-2/5 bg-white pt-20 px-3 z-50`}
    >
      <Box className="flex flex-col w-full">
        <Box className="px-3">
          <Box className="flex items-center">
            <IconifyIcon
              icon="tabler:current-location"
              className="text-[18px] mr-2"
            />
            <Typography variant="caption"> 6.000, -7.40003</Typography>
          </Box>
          <Typography variant="caption">
            unnamed road, 76, Olorunsogo Street, Okeigbo, Ondo State, Nigeria
          </Typography>
        </Box>
        {pages[isOffline ? "isOffline" : "isOnline"]?.map((page, i) => (
          <LinkStyled
            key={i}
            href={`/${page.link}`}
            onClick={showOverlay(null)}
            className={`!mx-2 px-2 mt-1.5 lg:!mx-4 ${
              getPath[1] === page.link ? "text-yellow-500" : "text-black"
            } hover:text-yellow-400 !text-[14px] border-b border-b-gray-100 shadow-sm h-12 flex items-center justify-between`}
          >
            <Box className="flex items-center justify-between">
              <IconifyIcon icon={page.icon} className="text-[22px] mr-4" />
              {page.name}
            </Box>
            <IconifyIcon icon="tabler:chevron-right" className="" />
          </LinkStyled>
        ))}
      </Box>
      <Box className="flex items-center justify-center !mt-4">
        {isOffline ? (
          <>
            <Button
              variant="outlined"
              className="!rounded-full !text-xs h-11 w-1/2 ml-2 md:!ml-5"
              size="small"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="!rounded-full h-11 w-1/2 !text-xs !ml-2 md:!ml-5"
              size="small"
            >
              Register
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            className="!rounded-full !text-xs h-11 w-1/2 ml-2 md:!ml-5"
            size="small"
            onClick={() => dispatch(userLogout())}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserSideBar;
