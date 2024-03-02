import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useUserData } from "@/app/hooks/useData";
const { Box, Button } = require("@mui/material");
import { usePathname, useRouter } from "next/navigation";

const UserSideBar = ({ data }) => {
  const { overLay, isOffline, showOverlay  } = useUserData();
  const pathname = usePathname();
  const router = useRouter();
  const getPath = pathname.split("/");

  const LinkStyled = styled(Link)(({}) => ({
    fontSize: "0.869rem",
    fontWeight: 500,
    textDecoration: "none",
    // color: "black",
  }));

  const pages = {
    isOffline: [
      { name: "Home", link: "/" },
      // { name: "Products", link: "/products" },
      { name: "About", link: "/about" },
      { name: "Seller", link: "/seller" },
      { name: "Support", link: "/support" },
    ],

    isOnline: [
      { name: "Home", link: "" },
      // { name: "Products", link: "/products" },
      { name: "Order", link: "order" },
      { name: "Inbox", link: "chat" },
      { name: "Saved Items", link: "saved-items" },
      { name: "Account", link: "user" },
    ],
  };

  return (
    <Box
      className={`fixed ${
        overLay === "sidebar" ? "left-0" : "-left-10"
      } transition top-0 h-screen w-3/5 sm:w-2/5 bg-white pt-20 px-3`}
    >
      <Box className="flex flex-col">
        {pages[isOffline ? "isOffline" : "isOnline"]?.map((page, i) => (
          <LinkStyled
            key={i}
            href={`/${page.link}`}
            onClick={showOverlay(null)}
            className={`!mx-2 lg:!mx-4 leading-10 ${
              getPath[1] === page.link ? "text-yellow-500" : "text-black"
            } hover:text-yellow-400 !text-[14px]`}
          >
            {page.name}
          </LinkStyled>
        ))}
        </Box>
        <Box className="flex items-center !mt-4">
        <Button
              variant="outlined"
              className="!rounded-full !text-xs h-8 w-16 ml-2 md:!ml-5"
              size="small"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="!rounded-full h-8 w-24 !text-xs !ml-2 md:!ml-5"
              size="small"
            >
              Register
            </Button>
        </Box>
    </Box>
  );
};

export default UserSideBar;
